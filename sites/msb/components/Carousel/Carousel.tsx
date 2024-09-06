'use client';
import { ReactNode } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { CarouselMenu } from './CarouselMenu';
import 'swiper/css';

export type CarouselProps = {
  slides: { title: string; content: ReactNode }[];
};

export function Carousel(props: CarouselProps) {
  return (
    <Swiper>
      {props.slides.map((slide) => (
        <SwiperSlide key={slide.title}>{slide.content}</SwiperSlide>
      ))}
      {props.slides.length > 1 && (
        <CarouselMenu slides={props.slides.map((slides) => slides.title)} />
      )}
    </Swiper>
  );
}
