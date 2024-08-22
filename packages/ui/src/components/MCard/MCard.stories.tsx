import type { Meta, StoryObj } from '@storybook/react';
import { MCard } from './MCard';

const meta = {
  component: MCard,
} satisfies Meta<typeof MCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'This is the title',
    subtitle: 'This is the subtitle',
    children: 'This is the body!',
  },
};
