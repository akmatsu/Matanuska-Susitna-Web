'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { CarouselMenu } from './CarouselMenu';
import 'swiper/css';
import { CarouselProps } from './types';

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
