'use client';
import { createContext, useContext, useEffect, useRef, useState } from 'react';

const SideNavDrawerContext = createContext({
  isOpen: false,
  open: () => {},
  close: () => {},
  panelRef: { current: null as HTMLDivElement | null },
});

export function SideNavDrawerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      panelRef.current?.focus();
    }
  }, [isOpen]);
  return (
    <SideNavDrawerContext.Provider value={{ isOpen, open, close, panelRef }}>
      {children}
    </SideNavDrawerContext.Provider>
  );
}

export const useSideNavDrawer = () => useContext(SideNavDrawerContext);
