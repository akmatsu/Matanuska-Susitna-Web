'use client';

import { CellContainer } from '@keystone-6/core/admin-ui/components';
import Link from 'next/link';
import { useEffect, useState, type MouseEvent } from 'react';
import {
  CardValueComponent,
  CellComponent,
  FieldController,
  FieldControllerConfig,
  FieldProps,
} from '@keystone-6/core/types';

import {
  FieldContainer,
  FieldLabel,
  FieldDescription,
  TextInput,
} from '@keystone-ui/fields';

export function Field({
  field,
  value,
  onChange,
}: FieldProps<typeof controller>) {
  const [isDragging, setIsDragging] = useState(false);

  const [backgroundPosition, setBackgroundPosition] = useState(
    getPosition(value || ''),
  );
  const [image, setImage] = useState(getBaseUrl(value || ''));

  function getBaseUrl(value: string) {
    const [baseUrl, _] = value.split('?');

    return baseUrl;
  }

  function getPosition(value: string) {
    const [_, search] = value.split('?');
    const params = new URLSearchParams(search);
    const position = params.get('position');

    return position || '50% 50%';
  }

  function drag(e: MouseEvent<HTMLDivElement>) {
    if (!isDragging) return;

    const container = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - container.left;
    const offsetY = e.clientY - container.top;

    const x = Math.min(100, Math.max(0, (offsetX / container.width) * 100));
    const y = Math.min(100, Math.max(0, (offsetY / container.height) * 100));

    setBackgroundPosition(`${x}% ${y}%`);
  }

  useEffect(() => {
    onChange?.(`${image}?position=${backgroundPosition}`);
  }, [backgroundPosition]);

  return (
    <FieldContainer as="fieldset">
      <FieldLabel>{field.label}</FieldLabel>
      <FieldDescription id={`${field.path}-description`}>
        {field.description}
        Search for an image in{' '}
        <Link href="https://images.matsu.gov" target="_blank">
          Blue Harvest
        </Link>{' '}
        and paste the URL in the input below.
      </FieldDescription>
      <TextInput
        value={value || ''}
        onChange={(e) => onChange?.(e.target.value)}
      />
      {value && (
        <div
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onMouseMove={drag}
          style={{
            backgroundImage: `url(${image})`,
            width: '100%',
            backgroundPosition,
            backgroundSize: 'cover',
            cursor: 'move',
            aspectRatio: '6.4/1',
          }}
        />
      )}
    </FieldContainer>
  );
}

export const Cell: CellComponent = ({ item, field }) => {
  return (
    <CellContainer>
      <p>I AM A CELL</p>
    </CellContainer>
  );
};

export const CardValue: CardValueComponent = ({ field, item }) => {
  return (
    <FieldContainer>
      <FieldLabel>{field.label}</FieldLabel>
      <p>I AM THE CARD YAYAYAY</p>
    </FieldContainer>
  );
};

export const controller = (
  config: FieldControllerConfig<{}>,
): FieldController<string | null, string> => {
  return {
    path: config.path,
    label: config.label,
    description: config.description,
    graphqlSelection: config.path,
    defaultValue: null,
    deserialize: (data) => {
      const value = data[config.path];
      return typeof value === 'string' ? value : null;
    },
    serialize: (value) => ({ [config.path]: value }),
  };
};
