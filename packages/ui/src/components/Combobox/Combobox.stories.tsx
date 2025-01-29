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
    type Hit = { objectID: number; title: string; description: string };
    const hits: Hit[] = [
      { objectID: 1, title: 'Page 1', description: 'Page 1 description' },
      { objectID: 2, title: 'Page 2', description: 'Page 2 description' },
      { objectID: 3, title: 'Page 3', description: 'Page 3 description' },
      { objectID: 4, title: 'Page 4', description: 'Page 4 description' },
      { objectID: 5, title: 'Page 5', description: 'Page 5 description' },
    ];

    const [query, setQuery] = React.useState('');

    const filteredHits =
      query === ''
        ? hits
        : hits.filter((hit) =>
            hit.title.toLowerCase().includes(query.toLowerCase()),
          );

    function handleChange(value?: Hit | null) {
      console.log(value);
    }

    return (
      <Combobox<Hit>
        label="Search Pages"
        idKey="objectID"
        displayValueKey="title"
        descriptionKey="description"
        onChangeQuery={(e) => setQuery(e.target.value)}
        onChange={handleChange}
        items={filteredHits}
        placeholder="Search for a page..."
        autoFocus
      />
    );
  },
};
