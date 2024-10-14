import { ReactNode } from 'react';

export type CarouselProps = {
  slides: { title: string; content: ReactNode }[];
};
