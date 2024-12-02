import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render() {
    return (
      <div className="d-flex flex-col">
        <p>
          This is an <a>internal link</a> and it's going places
        </p>

        <p>
          This is an{' '}
          <a href="#" className="external">
            external link
          </a>{' '}
          and it's going places
        </p>
      </div>
    );
  },
};
