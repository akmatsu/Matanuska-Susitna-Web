'use client';
import { Button } from '@matsugov/ui';
import { useSwiper } from 'swiper/react';

export function CarouselMenu(props: { slides: string[] }) {
  const swiper = useSwiper();
  function slideTo(index: number) {
    swiper.slideTo(index);
  }
  return (
    <div className="position-absolute bottom-0 width-full z-100 padding-1 display-flex flex-justify-center flex-align-center">
      {props.slides.map((slide, index) => (
        <Button onClick={() => slideTo(index)} key={index}>
          {slide}
        </Button>
      ))}
    </div>
  );
}
