'use client';
import { createContext, useContext, useEffect, useRef, useState } from 'react';

export type HeadingNode = {
  id: string;
  text: string;
  level: number;
};

const SideNavDrawerContext = createContext({
  isOpen: false,
  open: () => {},
  close: () => {},
  headings: [] as HeadingNode[],
  panelRef: { current: null as HTMLDivElement | null },
  setHeadings: (headings: HeadingNode[]) => {},
});

export function SideNavDrawerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [headings, setHeadings] = useState<HeadingNode[]>([]);
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
    <SideNavDrawerContext.Provider
      value={{ isOpen, open, close, panelRef, headings, setHeadings }}
    >
      {children}
    </SideNavDrawerContext.Provider>
  );
}

export const useSideNavDrawer = () => useContext(SideNavDrawerContext);
