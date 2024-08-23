import type { Meta, StoryObj } from '@storybook/react';

import { CoreEditor } from '@matsugov/ui-editor';

const meta = {
  component: CoreEditor,
} satisfies Meta<typeof CoreEditor>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
