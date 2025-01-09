import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TwoColumnLayout } from './TwoColumnLayout';

const meta: Meta<typeof TwoColumnLayout> = {
  title: 'Components/TwoColumnLayout',
  component: TwoColumnLayout,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TwoColumnLayout>;

export const Default: Story = {
  args: {
    gap: 4,
    leftColumn: (
      <div className="p-5 bg-base-lightest f-full">
        <p>Left Column Content</p>
        <p>Left Column Content</p>
      </div>
    ),
    rightColumn: (
      <div className="p-5 bg-base-lighter">
        <p>Right Column Content</p>
        <p>Right Column Content</p>
      </div>
    ),
  },
};
