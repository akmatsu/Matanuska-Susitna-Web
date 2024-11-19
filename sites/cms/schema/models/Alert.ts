import { list, ListConfig } from '@keystone-6/core';
import { timestamps } from '../fieldUtils';
import { select, text } from '@keystone-6/core/fields';
import { customText } from '../../customFields/Markdown';
import { isContentManager } from '../access/roles';
import { elevatedOperationAccess } from '../access';

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
});
