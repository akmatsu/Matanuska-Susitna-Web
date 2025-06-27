export function BoardListLoading() {
  return (
    <table className="border-collapse table-auto">
      <thead>
        <tr className="bg-neutral-200">
          <th className="border border-base-light py-1 px-4">Name</th>
          <th className="border border-base-light py-1 px-4">Directory</th>
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: 10 }).map((_, index) => (
          <tr key={index} className="border-b not-odd:bg-neutral-100">
            <td className="border border-base-lighter py-1 px-4">
              <div className="animate-pulse bg-gray-300 h-6 rounded-full"></div>
            </td>
            <td className="border border-base-lighter py-2 px-4">
              <div className="animate-pulse bg-gray-300 h-6 rounded-full"></div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
