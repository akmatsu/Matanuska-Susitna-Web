'use client';
import { Button, Card, CardBody } from '@matsugov/ui';
import { Dialog, DialogPanel, DialogTitle } from '@matsugov/ui/Dialog';
import { Text } from '@matsugov/ui/Text';
import { useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@matsugov/ui/Carousel';
import Image from 'next/image';

export function TrailReportImageDialog(props: { images?: string[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);

  function open(slide?: number) {
    setSlideIndex(slide ?? 0);
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  return (
    <div>
      <Text type="heading3" className="mb-0">
        Images
      </Text>
      <div className="flex flex-row flex-wrap gap-2">
        {props.images?.map((src, index) => (
          <>
            <button
              onClick={() => open(index)}
              key={index}
              title="View Image"
              aria-label="View Image"
              className="size-24 rounded"
            >
              <Image
                src={src}
                alt={`Trail Report Image ${index + 1}`}
                quality={25}
                width={100}
                height={25}
                className="object-cover rounded cursor-pointer h-full w-full"
              />
            </button>
          </>
        ))}
      </div>

      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
      >
        <div className="fixed inset-0 z-10 w-screen">
          <div className="flex h-full min-h-full items-center justify-center">
            <DialogPanel
              transition
              className="w-screen h-screen min-h-screen bg-black/10 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              <div className="flex justify-end items-center">
                <Button onClick={close} color="black" icon title="Close">
                  <span className="icon-[mdi--close] size-6" />
                  <span className="sr-only">Close</span>
                </Button>
              </div>
              <div className="w-full h-full sm:px-12 flex justify-center items-center">
                <Carousel
                  className="w-full"
                  opts={{
                    loop: true,
                    startIndex: slideIndex,
                  }}
                >
                  <CarouselContent>
                    {props.images?.map((src, index) => {
                      return (
                        <CarouselItem key={index}>
                          <img
                            src={src}
                            alt={`Trail Report Image ${index + 1}`}
                            className="max-h-[85vh] object-contain rounded w-full h-full"
                          />
                        </CarouselItem>
                      );
                    })}
                  </CarouselContent>
                  <CarouselPrevious className="hidden sm:block" />
                  <CarouselNext className="hidden sm:block" />
                </Carousel>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
