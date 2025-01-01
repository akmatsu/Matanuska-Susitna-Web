import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ProcessList, ProcessListItem } from './ProcessList';

const meta = {
  title: 'Components/ProcessList',
  component: ProcessList,
  parameters: {},
  tags: ['autodocs'],
} satisfies Meta<typeof ProcessList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: (args) => (
    <ProcessList {...args}>
      <ProcessListItem title="Step 1">
        <p>
          Nulla laborum minim ullamco sit tempor amet deserunt voluptate.
          Consectetur magna dolore dolore.
        </p>
      </ProcessListItem>
    </ProcessList>
  ),
};

export const Multiple: Story = {
  args: {},
  render: (args) => (
    <ProcessList {...args}>
      <ProcessListItem title="Step 1">
        <p>
          Nulla laborum minim ullamco sit tempor amet deserunt voluptate.
          Consectetur magna dolore dolore.
        </p>
      </ProcessListItem>
      <ProcessListItem title="Step 2">
        <p>Nulla laborum minim ullamco sit tempor amet deserunt voluptate.</p>
      </ProcessListItem>
    </ProcessList>
  ),
};

export const WithChildren: Story = {
  args: {},
  render: (args) => (
    <div className="prose">
      <ProcessList {...args}>
        <ProcessListItem title="Step 1">
          <p>
            Nulla laborum minim ullamco sit tempor amet deserunt voluptate.
            Consectetur magna dolore dolore.
          </p>
          <ul>
            <li>Muffins</li>
            <li>Pancakes</li>
            <li>Waffles</li>
          </ul>
        </ProcessListItem>
        <ProcessListItem title="Step 2">
          <p>
            Nulla laborum minim ullamco sit tempor amet deserunt voluptate.
            Consectetur magna dolore dolore.
          </p>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Muffins</td>
                <td>$1.99</td>
              </tr>
            </tbody>
          </table>
        </ProcessListItem>
        <ProcessListItem title="Step 3">
          <p>
            Nulla laborum minim ullamco sit tempor amet deserunt voluptate.
            Consectetur magna dolore dolore.
          </p>
        </ProcessListItem>
      </ProcessList>
    </div>
  ),
};
