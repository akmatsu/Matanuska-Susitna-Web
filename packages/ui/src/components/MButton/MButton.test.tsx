import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MButton } from './MButton';

test('MButton', () => {
  const res = render(<MButton>CLICK ME!</MButton>);
  expect(res).toMatchSnapshot();
});
