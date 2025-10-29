'use client';
import { TextField } from '@matsugov/ui/TextField';
import { useRouter } from 'next/navigation';

export function TrailsUpdateSearchFilters() {
  const router = useRouter();

  let timeoutId: NodeJS.Timeout;
  function handleSearch(value: string) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      router.push(`?query=${encodeURIComponent(value)}`);
    }, 350);
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <TextField id="search" onChange={(e) => handleSearch(e.target.value)} />
    </form>
  );
}
