import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { MdEditor } from './Editor';
import { MdEditorProps } from './types';

const meta = {
  title: 'Example/Editor',
  component: MdEditor,
  tags: ['autodocs'],
  args: {
    initialValue: `# This is a header! 
    Woo this is the body
    `,
    onChange: fn() as MdEditorProps['onChange'],
  },
} satisfies Meta<typeof MdEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
