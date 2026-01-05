'use client';
import { Button } from '@matsugov/ui';
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

export function TrailReportImageDialog(props: { images?: string[] }) {
  const [isOpen, setIsOpen] = useState(false);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  return (
    <>
      <Button size="sm" onClick={open}>
        View Images
      </Button>
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
              <div className="flex justify-between items-center">
                <DialogTitle as="h3" className="font-medium">
                  <Text type="heading3">Images</Text>
                </DialogTitle>
                <Button
                  onClick={close}
                  color="black"
                  icon
                  size="sm"
                  title="Close"
                >
                  <span className="icon-[mdi--close] size-6" />
                  <span className="sr-only">Close</span>
                </Button>
              </div>
              <div className="w-full h-full sm:px-12 flex justify-center items-center">
                <Carousel
                  className="w-full"
                  opts={{
                    loop: true,
                  }}
                >
                  <CarouselContent>
                    {props.images?.map((src, index) => {
                      return (
                        <CarouselItem key={index}>
                          <img
                            src={src}
                            alt={`Trail Report Image ${index + 1}`}
                            className="w-full h-auto max-h-[80vh] object-contain rounded"
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
    </>
  );
}
