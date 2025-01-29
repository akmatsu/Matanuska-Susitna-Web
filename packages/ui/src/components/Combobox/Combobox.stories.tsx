import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Combobox } from './Combobox';

const meta: Meta<typeof Combobox> = {
  title: 'Components/Combobox',
  component: Combobox,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Combobox>;

export const Default: Story = {
  render() {
    type Hit = { objectID: number; title: string };
    const hits = [
      { objectID: 1, title: 'Page 1' },
      { objectID: 2, title: 'Page 2' },
      { objectID: 3, title: 'Page 3' },
      { objectID: 4, title: 'Page 4' },
      { objectID: 5, title: 'Page 5' },
    ];

    const [selectedPage, setSelectedPage] = React.useState<
      Hit | undefined | null
    >(hits[0]);

    const [query, setQuery] = React.useState('');

    const filteredHits =
      query === ''
        ? hits
        : hits.filter((hit) =>
            hit.title.toLowerCase().includes(query.toLowerCase()),
          );

    return (
      <Combobox<Hit>
        label="Search Pages"
        idKey="objectID"
        displayValueKey="title"
        items={filteredHits}
        onChangeQuery={(e) => setQuery(e.target.value)}
        onChange={(value) => setSelectedPage(value)}
        placeholder="Search for a page..."
        value={selectedPage}
      />
    );
  },
};
