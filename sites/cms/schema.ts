// Welcome to your schema
//   Schema driven development is Keystone's modus operandi
//
// This file is where we define the lists, fields and hooks for our data.
// If you want to learn more about how lists are configured, please read
// - https://keystonejs.com/docs/config/lists

import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { componentBlocks } from './component-blocks';

// see https://keystonejs.com/docs/fields/overview for the full list of fields
//   this is a few common fields for an example
import {
  text,
  relationship,
  password,
  timestamp,
  select,
} from '@keystone-6/core/fields';

// the document field is a more complicated field, so it has it's own package
import { document } from '@keystone-6/fields-document';
// if you want to make your own fields, see https://keystonejs.com/docs/guides/custom-fields

// when using Typescript, you can refine your types to a stricter subset by importing
// the generated types from '.keystone/types'
import { type Lists } from '.keystone/types';
import {
  pageContentEditor,
  publishable,
  timestamps,
  titleAndDescription,
  urlRegex,
} from './fieldUtils';

export const lists = {
  User: list({
    // WARNING
    //   for this starter project, anyone can create, query, update and delete anything
    //   if you want to prevent random people on the internet from accessing your data,
    //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
    access: allowAll,

    // this is the fields for our User list
    fields: {
      // by adding isRequired, we enforce that every User should have a name
      //   if no name is provided, an error will be displayed
      name: text({ validation: { isRequired: true } }),

      email: text({
        validation: { isRequired: true },
        // by adding isIndexed: 'unique', we're saying that no user can have the same
        // email as another user - this may or may not be a good idea for your project
        isIndexed: 'unique',
      }),

      password: password({ validation: { isRequired: true } }),

      // we can use this field to see what Posts this User has authored
      //   more on that in the Post list below
      posts: relationship({ ref: 'Post.author', many: true }),

      createdAt: timestamp({
        // this sets the timestamp to Date.now() when the user is first created
        defaultValue: { kind: 'now' },
      }),
    },
  }),

  Post: list({
    // WARNING
    //   for this starter project, anyone can create, query, update and delete anything
    //   if you want to prevent random people on the internet from accessing your data,
    //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
    access: allowAll,

    // this is the fields for our Post list
    fields: {
      title: text({ validation: { isRequired: true } }),

      // the document field can be used for making rich editable content
      //   you can find out more at https://keystonejs.com/docs/guides/document-fields
      content: document({
        formatting: true,
        layouts: [
          [1, 1],
          [1, 1, 1],
          [2, 1],
          [1, 2],
          [1, 2, 1],
        ],
        links: true,
        dividers: true,
      }),

      // with this field, you can set a User as the author for a Post
      author: relationship({
        // we could have used 'User', but then the relationship would only be 1-way
        ref: 'User.posts',

        // this is some customisations for changing how this will look in the AdminUI
        ui: {
          displayMode: 'cards',
          cardFields: ['name', 'email'],
          inlineEdit: { fields: ['name', 'email'] },
          linkToItem: true,
          inlineConnect: true,
        },

        // a Post can only have one author
        //   this is the default, but we show it here for verbosity
        many: false,
      }),

      // with this field, you can add some Tags to Posts
      tags: relationship({
        // we could have used 'Tag', but then the relationship would only be 1-way
        ref: 'Tag.posts',

        // a Post can have many Tags, not just one
        many: true,

        // this is some customisations for changing how this will look in the AdminUI
        ui: {
          displayMode: 'cards',
          cardFields: ['name'],
          inlineEdit: { fields: ['name'] },
          linkToItem: true,
          inlineConnect: true,
          inlineCreate: { fields: ['name'] },
        },
      }),
    },
  }),

  Service: list({
    access: allowAll,
    fields: {
      ...titleAndDescription(),
      ...publishable,
      // contacts: relationship({ ref: 'user', many: true, isOrderable: true }),
      ...pageContentEditor,
      externalLinks: relationship({
        ref: 'ExternalLink',
        many: true,
        isOrderable: true,
        ui: {
          displayMode: 'cards',
          cardFields: ['label', 'url'],
          inlineEdit: { fields: ['label', 'url'] },
          inlineConnect: true,
          inlineCreate: { fields: ['label', 'url'] },
        },
      }),
      ...timestamps,
    },
  }),

  ExternalLink: list({
    access: allowAll,
    ui: {
      isHidden: true,
    },
    fields: {
      label: text({
        validation: {
          isRequired: true,
          length: {
            min: 2,
            max: 50,
          },
        },
        ui: {
          displayMode: 'input',
          description: 'Label to be used on link.',
          itemView: {
            fieldPosition: 'sidebar',
          },
        },
      }),
      url: text({
        validation: {
          isRequired: true,
          length: {
            min: 7,
          },
          match: {
            regex: urlRegex,
            explanation:
              'You must provide a valid URL. Valid urls start with http:// or https:// and end with something like .com or .org etc.',
          },
        },
        ui: {
          displayMode: 'input',
          description: 'Please provide a URL to the external web page',
        },
      }),
      ...timestamps,
    },
  }),

  // this last list is our Tag list, it only has a name field for now
  Tag: list({
    // WARNING
    //   for this starter project, anyone can create, query, update and delete anything
    //   if you want to prevent random people on the internet from accessing your data,
    //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
    access: allowAll,

    // setting this to isHidden for the user interface prevents this list being visible in the Admin UI
    ui: {
      isHidden: true,
    },

    // this is the fields for our Tag list
    fields: {
      name: text(),
      // this can be helpful to find out all the Posts associated with a Tag
      posts: relationship({ ref: 'Post.tags', many: true }),
    },
  }),

  Alert: list({
    access: allowAll,
    hooks: {},
    ui: {},
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

      message: document({
        relationships: {
          post: {
            listKey: 'Post',
            label: 'Link to post',
            selection: 'id title',
          },
        },
        links: true,
        formatting: {
          inlineMarks: {
            bold: true,
            italic: true,
            underline: true,
          },
        },
      }),

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
    },
  }),
} satisfies Lists;
