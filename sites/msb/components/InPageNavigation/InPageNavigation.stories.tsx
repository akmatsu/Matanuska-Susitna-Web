import type { Meta, StoryObj } from '@storybook/react';
import { InPageNavigation } from './InPageNavigation';

const meta: Meta<typeof InPageNavigation> = {
  title: 'Components/InPageNavigation',
  component: InPageNavigation,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof InPageNavigation>;

export const Default: Story = {
  args: {},
};
