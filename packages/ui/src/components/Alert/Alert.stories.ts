import { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';

const meta: Meta<typeof Alert> = {
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    title: 'Aliquip fugiat voluptate duis labore.',
    message:
      'Ea esse dolor ex aliquip laboris. Est velit aliquip quis voluptate eiusmod Lorem cillum ipsum aliqua consequat. Magna duis ut adipisicing pariatur.',
  },
};
