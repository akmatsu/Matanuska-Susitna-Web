import { Select } from '../Select';

export function SearchFieldBody({
  handleSubmit,
  searchParams,
  searchOptions,
}: {
  handleSubmit?: (formData: FormData) => Promise<void>;
  searchParams?: { [key: string]: string | string[] };
  searchOptions?: { value: string; label: string }[];
}) {
  return (
    <fieldset className="border-border bg-surface mx-auto mb-16 max-w-185 border p-2 pt-0">
      <legend className="text-xs font-semibold">Search</legend>
      <form className="mb-2 flex items-end gap-1" action={handleSubmit}>
        <label htmlFor="search-type" className="sr-only">
          Search Type
        </label>
        <Select
          options={searchOptions}
          name="search-type"
          defaultValue={searchParams?.type || 'owner'}
          id="search-type"
        />
        <label htmlFor="search-query" className="sr-only">
          Search Query
        </label>
        <input
          type="text"
          placeholder="Search for by name, address, or parcel ID..."
          name="query"
          id="search-query"
          className="w-full"
          defaultValue={searchParams?.query || ''}
          aria-describedby="search-help-text"
        />
      </form>
      <div className="flex items-start gap-1" id="search-help-text">
        <span
          className="icon icon-[mdi--info] size-4 text-blue-600"
          aria-hidden="true"
        />
        <p className="text-xs italic">
          If searching by owner/buyer name, search by last name first. For
          example, to search for &quot;Bill Jones&quot;, enter &quot;Jones
          Bill&quot; or just &quot;Jones&quot;.
        </p>
      </div>
    </fieldset>
  );
}
