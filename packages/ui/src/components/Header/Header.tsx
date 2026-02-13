export function Header(props: { children: React.ReactNode }) {
  return (
    <header className="bg-surface-base border-b-base-lighter flex h-12 items-center justify-between border-b pl-4 lg:h-20 lg:pr-4">
      <div className="flex h-full w-full items-center justify-between">
        {props.children}
      </div>
    </header>
  );
}
