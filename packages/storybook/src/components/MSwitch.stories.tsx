import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import { MSwitch } from '@matsugov/ui';

const meta = {
  component: MSwitch,
} satisfies Meta<typeof MSwitch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    checked: false,
    appendLabel: 'Allow stuff',
  },
  render(args) {
    const [{ checked }, updateArgs] = useArgs();

    function onChange() {
      updateArgs({ checked: !checked });
    }

    return (
      <MSwitch
        checked={checked}
        onChange={onChange}
        appendLabel={args.appendLabel}
        prependLabel={args.prependLabel}
      />
    );
  },
};
