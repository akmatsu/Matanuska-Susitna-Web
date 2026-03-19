'use client';
import { useState } from 'react';

export function MobileMenu(props: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="h-full lg:hidden">
      <button
        onClick={() => setIsOpen(true)}
        className="bg-primary hover:bg-primary-dark active:bg-primary-darker focus-ring relative z-10 flex aspect-square h-full items-center justify-center p-1 text-center text-sm leading-none text-white shadow-2xs"
        aria-label="Open menu"
        color="primary"
      >
        <span className="icon-[mdi--hamburger-menu] size-full"></span>
      </button>

      <div
        className={`fixed inset-0 z-50 bg-black/50 transition-opacity lg:hidden ${isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
      >
        <div
          className={`fixed inset-y-0 right-0 w-64 transform bg-white shadow-lg transition-transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} h-full overflow-y-auto`}
        >
          <div className="h-full p-4">
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
              className="bg-primary hover:bg-primary-dark active:bg-primary-darker focus-ring flex size-8 items-center justify-center rounded-xs text-white"
            >
              <span className="icon-[mdi--close] size-4"></span>
            </button>

            <ul className="flex flex-col gap-4">{props.children}</ul>
          </div>
        </div>
      </div>
    </div>
  );
}
