export default function SearchLoading() {
  return (
    <div className="animate-pulse">
      <div className="border-border bg-surface mx-auto mb-16 max-w-185 border p-2 pt-0">
        <div className="mb-2 h-3 w-10 rounded bg-gray-300" />
        <div className="flex gap-1">
          <div className="h-9 w-32 rounded bg-gray-300" />
          <div className="h-9 flex-1 rounded bg-gray-300" />
          <div className="h-9 w-20 rounded bg-gray-300" />
        </div>
      </div>
      <div className="rounded-md bg-gray-200 p-4">
        <div className="mb-2 h-4 w-1/3 rounded bg-gray-300" />
        <div className="mb-2 h-3 w-full rounded bg-gray-300" />
        <div className="mb-2 h-3 w-full rounded bg-gray-300" />
        <div className="mb-2 h-3 w-full rounded bg-gray-300" />
      </div>
    </div>
  );
}
