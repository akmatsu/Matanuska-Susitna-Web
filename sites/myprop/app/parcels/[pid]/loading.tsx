const SkeletonRow = () => (
  <tr className="border-b border-gray-300">
    <td className="w-32 border-r border-gray-300 bg-gray-300 px-1 py-3" />
    <td className="bg-gray-200 px-1 py-3" />
  </tr>
);

const SkeletonDataRow = ({ cols = 4 }: { cols?: number }) => (
  <tr className="border-b border-gray-300 bg-gray-100">
    {[...Array(cols)].map((_, i) => (
      <td
        key={i}
        className={`bg-gray-200 px-1 py-3 ${i !== cols - 1 ? 'border-r border-gray-300' : ''}`}
      />
    ))}
  </tr>
);

export default function ParcelDetailSkeleton() {
  return (
    <main>
      <div className="pt-6">
        <div className="animate-pulse space-y-4 bg-white font-sans text-sm">
          {/* Title */}
          <div className="h-8 w-2/5 rounded bg-gray-300" />

          {/* Site Information */}
          <div>
            <div className="mb-2 h-6 w-1/4 rounded bg-gray-300" />
            <div className="grid grid-cols-1 gap-1 md:grid-cols-2">
              <table className="w-full border border-gray-300">
                <tbody>
                  {[...Array(4)].map((_, i) => (
                    <SkeletonRow key={i} />
                  ))}
                </tbody>
              </table>
              <table className="w-full border border-gray-300">
                <tbody>
                  {[...Array(3)].map((_, i) => (
                    <SkeletonRow key={i} />
                  ))}
                </tbody>
              </table>
            </div>
            <table className="mt-1 w-full border border-gray-300">
              <tbody>
                <SkeletonRow />
              </tbody>
            </table>
          </div>

          {/* Ownership */}
          <div>
            <div className="mb-2 h-6 w-1/4 rounded bg-gray-300" />
            <div className="grid grid-cols-1 gap-1 md:grid-cols-2">
              <table className="w-full border border-gray-300">
                <tbody>
                  {[...Array(2)].map((_, i) => (
                    <SkeletonRow key={i} />
                  ))}
                </tbody>
              </table>
              <table className="w-full border border-gray-300">
                <tbody>
                  {[...Array(2)].map((_, i) => (
                    <SkeletonRow key={i} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Appraisals & Assessments */}
          <div className="grid grid-cols-1 gap-1 md:grid-cols-2">
            <div>
              <div className="mb-2 h-6 w-1/3 rounded bg-gray-300" />
              <table className="w-full border border-gray-300">
                <tbody>
                  <tr className="border-b border-gray-300 bg-gray-200">
                    {[...Array(4)].map((_, i) => (
                      <td
                        key={i}
                        className={`bg-gray-300 px-1 py-2 ${i !== 3 ? 'border-r border-gray-300' : ''}`}
                      />
                    ))}
                  </tr>
                  {[...Array(3)].map((_, i) => (
                    <SkeletonDataRow key={i} cols={4} />
                  ))}
                </tbody>
              </table>
            </div>
            <div>
              <div className="mb-2 h-6 w-1/3 rounded bg-gray-300" />
              <table className="w-full border border-gray-300">
                <tbody>
                  <tr className="border-b border-gray-300 bg-gray-200">
                    {[...Array(4)].map((_, i) => (
                      <td
                        key={i}
                        className={`bg-gray-300 px-1 py-2 ${i !== 3 ? 'border-r border-gray-300' : ''}`}
                      />
                    ))}
                  </tr>
                  {[...Array(3)].map((_, i) => (
                    <SkeletonDataRow key={i} cols={4} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Tax/Billing & Recorded Documents */}
          <div className="grid grid-cols-1 gap-1 md:grid-cols-12">
            <div className="col-span-4">
              <div className="mb-2 h-6 w-1/2 rounded bg-gray-300" />
              <table className="w-full border border-gray-300">
                <tbody>
                  <tr className="border-b border-gray-300 bg-gray-200">
                    {[...Array(5)].map((_, i) => (
                      <td
                        key={i}
                        className={`bg-gray-300 px-1 py-2 ${i !== 4 ? 'border-r border-gray-300' : ''}`}
                      />
                    ))}
                  </tr>
                  {[...Array(3)].map((_, i) => (
                    <SkeletonDataRow key={i} cols={5} />
                  ))}
                </tbody>
              </table>
            </div>
            <div className="col-span-8">
              <div className="mb-2 h-6 w-1/2 rounded bg-gray-300" />
              <table className="w-full border border-gray-300">
                <tbody>
                  <tr className="border-b border-gray-300 bg-gray-200">
                    {[...Array(3)].map((_, i) => (
                      <td
                        key={i}
                        className={`bg-gray-300 px-1 py-2 ${i !== 2 ? 'border-r border-gray-300' : ''}`}
                      />
                    ))}
                  </tr>
                  {[...Array(3)].map((_, i) => (
                    <SkeletonDataRow key={i} cols={3} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Tax Account Status */}
          <div>
            <div className="mb-2 h-6 w-1/3 rounded bg-gray-300" />
            <table className="w-full border border-gray-300">
              <tbody>
                <tr className="border-b border-gray-300 bg-gray-200">
                  {[...Array(7)].map((_, i) => (
                    <td
                      key={i}
                      className={`bg-gray-300 px-1 py-2 ${i !== 6 ? 'border-r border-gray-300' : ''}`}
                    />
                  ))}
                </tr>
                <SkeletonDataRow cols={7} />
              </tbody>
            </table>
          </div>

          {/* Land and Miscellaneous */}
          <div>
            <div className="mb-2 h-6 w-1/2 rounded bg-gray-300" />
            <table className="w-full border border-gray-300">
              <tbody>
                <tr className="border-b border-gray-300 bg-gray-200">
                  {[...Array(6)].map((_, i) => (
                    <td
                      key={i}
                      className={`bg-gray-300 px-1 py-2 ${i !== 5 ? 'border-r border-gray-300' : ''}`}
                    />
                  ))}
                </tr>
                <SkeletonDataRow cols={6} />
              </tbody>
            </table>
          </div>

          {/* Footnotes */}
          <div className="mt-4 space-y-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-4 w-4/5 rounded bg-gray-300" />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
