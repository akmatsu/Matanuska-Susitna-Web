import React from 'react';
import { StoryObj, Meta } from '@storybook/react';
import { Map } from './Map';

const meta = {
  title: 'Components/Map',
  component: Map,
  parameters: {},
  tags: ['autodocs'],
} satisfies Meta<typeof Map>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    itemId: 'WILLOW',
    itemKey: 'CC_NAME',
  },
  render: (args) => {
    return (
      <div className="h-96 w-96 overflow-hidden border">
        <Map {...args} />
      </div>
    );
  },
} satisfies Story;
