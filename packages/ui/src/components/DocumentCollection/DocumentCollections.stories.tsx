import type { Meta, StoryObj } from '@storybook/react';
import { DocumentCollection } from './DocumentCollection';

const meta = {
  title: 'Components/DocumentCollection',
  component: DocumentCollection,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DocumentCollection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    collection: {
      title: 'Document Collection',
      id: '1',
      documents: [
        {
          id: '1',
          title:
            'This is a super duper long label to see what happens when labels are like super duper duper duper long',
          file: {
            filename: 'document1.pdf',
            url: 'https://example.com/document1.pdf',
            filesize: 123456,
          },
        },
        {
          id: '2',
          title: 'Document 2',
          file: {
            filename: 'document2.pdf',
            url: 'https://matsugov.us/document2.pdf',
            filesize: 123456,
          },
        },
        {
          id: '3',
          title: 'Document 3',
          file: {
            filename: 'document3.docx',
            url: 'https://example.com/document3.docx',
            filesize: 123456,
          },
        },
        {
          id: '4',
          title: 'Document 4',
          file: {
            filename: 'document4.pdf',
            url: 'https://matsugov.us/document4.pdf',
            filesize: 123456,
          },
        },
        {
          id: '5',
          title: 'Document 5',
          file: {
            filename: 'document5.pdf',
            url: 'https://example.com/document5.pdf',
            filesize: 123456,
          },
        },
        {
          id: '6',
          title: 'Document 6',
          file: {
            filename: 'document6.pdf',
            url: 'https://example.com/document6.pdf',
            filesize: 123456,
          },
        },
      ],
    },
  },
};
