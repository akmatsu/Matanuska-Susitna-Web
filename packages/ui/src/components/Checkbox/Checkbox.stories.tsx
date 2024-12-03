import { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';
import { useState } from 'react';

const meta = {
  component: Checkbox,
  tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render() {
    const [enabled, setEnabled] = useState(false);

    return (
      <form>
        <Checkbox label="Muffins" checked={enabled} onChange={setEnabled} />
      </form>
    );
  },
};
