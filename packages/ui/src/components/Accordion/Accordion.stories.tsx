import { Meta, StoryObj } from '@storybook/react';
import { Accordion, AccordionItem } from './Accordion';

const meta = {
  component: Accordion,

  tags: ['autodocs'],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render() {
    const items = [
      {
        title: 'Item 1',
        content:
          'Pariatur velit proident ullamco occaecat eiusmod veniam occaecat in. Tempor laborum duis magna est sunt aute cupidatat sint in sunt duis deserunt incididunt. Anim irure ex dolor sit duis qui. Ea tempor Lorem reprehenderit aliquip do nisi. Veniam anim nostrud sit est reprehenderit ex ipsum ipsum qui quis pariatur dolore.',
      },
      {
        title: 'Item 2',
        content: (
          <>
            <p className="mb-2">
              Minim voluptate magna exercitation consectetur sunt qui elit
              mollit amet voluptate amet. Officia nostrud ut cillum ut ullamco
              et labore excepteur nulla ad. Ut magna qui dolor enim occaecat.
              Mollit qui sint ipsum et.
            </p>
            <p>
              Minim voluptate magna exercitation consectetur sunt qui elit
              mollit amet voluptate amet. Officia nostrud ut cillum ut ullamco
              et labore excepteur nulla ad. Ut magna qui dolor enim occaecat.
              Mollit qui sint ipsum et.
            </p>
          </>
        ),
      },
    ];
    return (
      <Accordion>
        {items.map((item) => (
          <AccordionItem title={item.title}>{item.content}</AccordionItem>
        ))}
      </Accordion>
    );
  },
};
