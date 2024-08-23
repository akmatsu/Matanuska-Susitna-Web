import type { Meta, StoryObj } from '@storybook/react';
import { MSwitch } from '../../../ui/src/components/MSwitch/MSwitch';

const meta = {
  component: MSwitch,
} satisfies Meta<typeof MSwitch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
