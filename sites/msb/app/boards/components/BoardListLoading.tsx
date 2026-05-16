export function BoardListLoading() {
  return (
    <table className="table-auto border-collapse">
      <thead>
        <tr className="bg-neutral-200">
          <th className="border-msb-base-light border px-4 py-1">Name</th>
          <th className="border-msb-base-light border px-4 py-1">Directory</th>
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: 10 }).map((_, index) => (
          <tr key={index} className="border-b not-odd:bg-neutral-100">
            <td className="border-msb-base-lighter border px-4 py-1">
              <div className="h-6 animate-pulse rounded-full bg-gray-300"></div>
            </td>
            <td className="border-msb-base-lighter border px-4 py-2">
              <div className="h-6 animate-pulse rounded-full bg-gray-300"></div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
