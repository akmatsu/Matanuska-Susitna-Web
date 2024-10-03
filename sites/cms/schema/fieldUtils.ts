import { BaseFields } from '@keystone-6/core';
import { text, timestamp } from '@keystone-6/core/fields';
import { document } from '@keystone-6/fields-document';
import { componentBlocks } from '../component-blocks';

export const urlRegex = /^(https?:\/\/)[^\s/$.?#].[^\s]*$/;

export const timestamps: BaseFields<any> = {
  createdAt: timestamp({
    defaultValue: { kind: 'now' },
    ui: {
      itemView: {
        fieldMode: 'read',
        fieldPosition: 'sidebar',
      },
      createView: { fieldMode: 'hidden' },
    },
  }),
  updatedAt: timestamp({
    defaultValue: { kind: 'now' },
    db: { updatedAt: true },
    ui: {
      itemView: { fieldMode: 'read', fieldPosition: 'sidebar' },
      createView: { fieldMode: 'hidden' },
    },
  }),
};

export const publishable: BaseFields<any> = {
  publishAt: timestamp({
    ui: {
      itemView: {
        fieldPosition: 'sidebar',
      },
    },
  }),
  unpublishAt: timestamp({
    ui: {
      itemView: {
        fieldPosition: 'sidebar',
      },
    },
  }),
};

export function titleAndDescription(opts?: {
  title?: {
    required?: boolean;
    lengthMin?: number;
    lengthMax?: number;
    description?: string;
  };
  description?: {
    description?: string;
  };
}): BaseFields<any> {
  return {
    title: text({
      validation: {
        // If required is undefined will default to true, otherwise uses the value of required
        isRequired:
          opts?.title?.required !== undefined ? opts.title.required : true,
        length: {
          max: opts?.title?.lengthMax || 100,
          min: opts?.title?.lengthMin || 2,
        },
      },
      ui: {
        displayMode: 'input',
        description: opts?.title?.description,
      },
    }),
    description: text({
      validation: {
        length: {
          max: 255,
        },
      },
      ui: {
        displayMode: 'textarea',
        description: opts?.description?.description,
      },
    }),
  };
}

export const pageContentEditor: BaseFields<any> = {
  content: document({
    formatting: {
      inlineMarks: {
        bold: true,
        italic: true,
        underline: true,
        strikethrough: true,
        code: true,
        superscript: true,
        subscript: true,
        keyboard: true,
      },
      listTypes: {
        ordered: true,
        unordered: true,
      },
      alignment: {
        center: true,
        end: true,
      },
      headingLevels: [2, 3, 4, 5, 6],
      blockTypes: {
        blockquote: true,
        code: true,
      },
      softBreaks: true,
    },
    dividers: true,
    links: true,
    layouts: [
      [1, 1],
      [1, 1, 1],
    ],
    ui: {
      description: 'Be aware that heading 1 has been intentionally disabled.',
      views: './component-blocks',
    },

    componentBlocks,
  }),
};

export const slug = text({
  isIndexed: 'unique',
  ui: {
    createView: {
      fieldMode: 'hidden',
    },
    itemView: {
      fieldPosition: 'sidebar',
    },
  },

  hooks: {
    resolveInput: ({ operation, resolvedData, fieldKey }) => {
      console.log('ran');
      if (operation === 'create') {
        if (resolvedData['title']) {
          const title = resolvedData['title'] as string;
          return title.toLowerCase().replace(/\s/gi, '-');
        }
      }
      return resolvedData[fieldKey];
    },
  },
});
