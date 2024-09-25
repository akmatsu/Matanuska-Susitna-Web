import { BaseFields } from '@keystone-6/core';
import { text, timestamp } from '@keystone-6/core/fields';
import { document } from '@keystone-6/fields-document';
import { componentBlocks } from './component-blocks';

export const urlRegex = /^(https?:\/\/)[^\s/$.?#].[^\s]*$/;

export const timestamps: BaseFields<any> = {
  createdAt: timestamp({
    defaultValue: { kind: 'now' },
    ui: { itemView: { fieldMode: 'read', fieldPosition: 'sidebar' } },
  }),
  updatedAt: timestamp({
    defaultValue: { kind: 'now' },
    db: { updatedAt: true },
    ui: { itemView: { fieldMode: 'read', fieldPosition: 'sidebar' } },
  }),
};

export const publishable: BaseFields<any> = {
  publishAt: timestamp({
    ui: {
      description:
        "This field is required to publish the item on the website. Articles without a 'Publish At' date are treated as drafts and won't be visible until the specified date is reached. To publish immediately, set this date to today.",
    },
  }),
  unpublishAt: timestamp({
    ui: {
      description:
        "This field is optional. If an 'Unpublish At' date is set, the item will automatically be removed from the website once that date is reached.",
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
      description:
        'This is a rich text editor for the page contents. It supports basic Markdown editing. Additionally it supports internal links and some component blocks. Be aware that heading 1 has been intentionally disabled. This is because every page in a website should only have a single header 1 and our page templates use the title has the header 1 for every page.',
      views: './component-blocks',
    },
    componentBlocks,
  }),
};
