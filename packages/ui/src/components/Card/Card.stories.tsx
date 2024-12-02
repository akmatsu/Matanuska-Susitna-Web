import { Meta, StoryObj } from '@storybook/react';
import { Card, CardBody, CardFooter, CardHeader } from './Card';
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
  render() {
    return (
      <Card>
        <CardHeader>Card</CardHeader>
        <CardBody>
          <p>
            Occaecat laboris consectetur duis nulla sint ut quis. Culpa
            exercitation officia Lorem tempor quis ea velit nulla et elit
            commodo nostrud. Labore cillum ipsum magna ut ipsum exercitation
            voluptate. Nulla sit culpa consectetur nisi dolore reprehenderit
            adipisicing excepteur. Do ex cupidatat excepteur pariatur in officia
            do adipisicing qui veniam commodo. Sit tempor id consectetur
            occaecat ipsum dolor incididunt ut minim esse ad incididunt non
            sint.
          </p>
        </CardBody>
        <CardFooter>
          <Button color="primary">Click me!</Button>
        </CardFooter>
      </Card>
    );
  },
};
