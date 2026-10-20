'use client';

export function PrintButtons() {
  const print = (borders: boolean) => {
    const root = document.documentElement;
    if (borders) {
      delete root.dataset.printBorders;
    } else {
      root.dataset.printBorders = 'none';
    }

    // Some browsers return from window.print() before the dialog closes, so
    // wait for afterprint to switch the borders back on.
    window.addEventListener(
      'afterprint',
      () => delete root.dataset.printBorders,
      { once: true },
    );
    window.print();
  };

  return (
    <div className="flex flex-wrap gap-1 print:hidden">
      <button
        type="button"
        onClick={() => print(true)}
        className="msb-btn-primary"
      >
        <span className="icon-[mdi--printer] mr-1 size-5" aria-hidden="true" />
        Print
      </button>
      <button
        type="button"
        onClick={() => print(false)}
        className="msb-btn-primary"
        title="Print without table borders to save ink"
      >
        <span
          className="icon-[mdi--printer-outline] mr-1 size-5"
          aria-hidden="true"
        />
        Print Without Borders
      </button>
    </div>
  );
}
