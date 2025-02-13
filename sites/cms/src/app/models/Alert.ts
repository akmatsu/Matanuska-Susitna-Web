import { list, ListConfig } from '@keystone-6/core';
import { timestamps } from '../fieldUtils';
import { select, text } from '@keystone-6/core/fields';
import { customText } from '../../components/customFields/Markdown';
import { isContentManager } from '../access/roles';
import { elevatedOperationAccess } from '../access';
import axios from 'axios';

export const Alert: ListConfig<any> = list({
  access: {
    operation: elevatedOperationAccess,
  },
  ui: {
    isHidden: ({ session }) => !isContentManager(session),
  },
  fields: {
    title: text({
      validation: {
        isRequired: true,
        length: {
          max: 100,
          min: 2,
        },
      },
      ui: {
        displayMode: 'input',
        description:
          'The title of your alert. Titles should be short and descriptive.',
      },
    }),
    body: customText(),
    urgency: select({
      type: 'integer',
      options: [
        { label: 'Low', value: 1 },
        { label: 'Standard', value: 2 },
        { label: 'Important', value: 3 },
        { label: 'Urgent', value: 4 },
        { label: 'Emergency', value: 5 },
      ],
      validation: {
        isRequired: true,
      },
    }),
    ...timestamps,
    editorNotes: text({
      ui: {
        displayMode: 'textarea',
      },
    }),
  },
  hooks: {
    afterOperation: {
      create: async ({ item }) => {
        try {
          await axios.request({
            method: 'post',
            maxBodyLength: Infinity,
            url: `https://${process.env.GOV_DELIVERY_SUB_DOMAIN}.govdelivery.com/api/account/${process.env.GOV_DELIVERY_ACCOUNT_CODE}/bulletins/send_now`,
            auth: {
              username: process.env.GOV_DELIVERY_USERNAME!,
              password: process.env.GOV_DELIVERY_PASSWORD!,
            },
            headers: {
              'Content-Type': 'application/xml',
            },
            data: `<bulletin>
          <header>ENTER HEADER</header>
   <FROM_ADDRESS_ID>${process.env.GOV_DELIVERY_FROM_ADDRESS}</FROM_ADDRESS_ID>
   <subject>${item.title}</subject>
   <body><![CDATA[${item.body}]]></body>
       <footer>THIS IS A TEST EMAIL FROM THE CMS</footer>
   <publish_rss type='boolean'>false</publish_rss>
   <open_tracking type='boolean'>true</open_tracking>
   <click_tracking type='boolean'>true</click_tracking>
   <share_content_enabled type='boolean'>true</share_content_enabled>
   <topics type='array'>
   <topic>
   <code>AKMATSUGOVSTAGE_TEST_TOPIC</code>
   </topic>
   </topics>
   <categories type='array' />
   </bulletin>`,
          });
        } catch (error) {
          console.error('Error sending alert to GovDelivery', error);
        }
      },
    },
  },
});
