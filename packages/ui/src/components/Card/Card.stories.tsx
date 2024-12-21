import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardBody, CardFooter } from './Card';
import { Button } from '../Button';
const meta = {
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <h4 className="text-xl font-bold leading-none">Card Title</h4>

        <div>
          <p>
            Sunt minim officia adipisicing deserunt mollit commodo tempor mollit
            reprehenderit proident adipisicing aliqua.
          </p>
          <p>
            Magna elit veniam duis non consequat laborum dolore aute Lorem
            nostrud proident tempor nostrud sit.
          </p>
          <p>Dolore exercitation proident eu id sint.</p>
        </div>

        <div className="flex gap-2">
          <Button>Button</Button>
          <Button>Button</Button>
          <Button>Button</Button>
        </div>
      </>
    ),
  },
};
