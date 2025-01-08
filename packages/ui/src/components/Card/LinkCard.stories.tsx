import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CardBody, CardHeader, CardTitle, LinkCard } from './Card';
import { Button } from '../Button';

const meta = {
  component: LinkCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LinkCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    href: 'https://example.com',
    children: (
      <>
        <CardHeader>
          <CardTitle>Link Card Title</CardTitle>
        </CardHeader>
        <CardBody>
          <p>
            This card is a clickable link that navigates to another page. Click
            anywhere on the card to visit the linked page.
          </p>
          <p>
            The entire card acts as a large click target, improving
            accessibility and user experience.
          </p>
        </CardBody>
      </>
    ),
  },
};
