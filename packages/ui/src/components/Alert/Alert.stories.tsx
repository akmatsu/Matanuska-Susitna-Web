import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';

const meta = {
  component: Alert,
  parameters: {},
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
  args: {
    title: 'Informative Status',
    type: 'info',
    children: <p>This is a message woo!</p>,
  },
};

export const Warning: Story = {
  args: {
    title: 'Warning Status',
    type: 'warning',
    children: <p>Be careful!</p>,
  },
};

export const Success: Story = {
  args: {
    title: 'Success Status',
    type: 'success',
    children: <p>Great job!</p>,
  },
};

export const Error: Story = {
  args: {
    title: 'Error Status',
    type: 'error',
    children: <p>Oh no!</p>,
  },
};

export const Emergency: Story = {
  args: {
    title: 'Emergency Status',
    type: 'emergency',
    children: <p>Run for your lives!</p>,
  },
};

export const NoTitle: Story = { args: { children: <p>Just a message</p> } };

export const Slim: Story = {
  args: { slim: true, children: <p>Slim alert</p> },
};

export const SlimHideIcon: Story = {
  args: {
    slim: true,
    hideIcon: true,
    children: <p>Slim alert with hidden icon</p>,
  },
};
