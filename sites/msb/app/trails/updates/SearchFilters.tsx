'use client';
import { TextField } from '@matsugov/ui/TextField';
import { useRouter, useSearchParams } from 'next/navigation';
import { Select } from '@matsugov/ui/Select';
import { useCallback } from 'react';
import { format, subMonths } from 'date-fns';

export function TrailsUpdateSearchFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const query = searchParams.get('query') || undefined;
  const date = searchParams.get('date') || undefined;
  const maintainer = searchParams.get('maintainer') || undefined;

  let timeoutId: NodeJS.Timeout;
  function handleSearch(value: string) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      router.push(`?${createQueryString('query', value)}`);
    }, 350);
  }

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className="flex flex-row gap-2 items-center flex-wrap"
    >
      <TextField
        id="search"
        defaultValue={query}
        onChange={(e) => handleSearch(e.target.value)}
        label="Search"
        placeholder="Search for reports"
        maxLength={27}
      />
      <div className="w-full">
        <Select
          options={[
            'All',
            'AURORA DOG MUSHERS CLUB',
            'BIG LAKE TRAILS',
            'CURRY RIDGE RIDERS',
            'DENALI NORDIC SKI CLUB',
            'LAKE LOUISE SNOWMACHINE CLUB',
            'MAT-SU SKI CLUB',
            'MID-VALLEY TRAIL CLUB',
            'PETERSVILLE COMMUNITY NON-PROFIT CORP',
            'SKEETAWK',
            'SKWENTNA TRAIL GROOMING COMMITTEE',
            'VALLEY MOUNTAIN BIKERS AND HIKE',
            'WILLOW TRAIL COMMITTEE',
            'MAT-SU BOROUGH',
          ]}
          label="Maintainer"
          defaultValue={maintainer}
          onChange={(e) =>
            router.push(
              `?${createQueryString('maintainer', e.target.value.toLowerCase() === 'all' ? '' : e.target.value)}`,
            )
          }
        />
      </div>
      <TextField
        id="date"
        type="date"
        label="Start Date"
        defaultValue={
          date ? date : format(subMonths(new Date(), 1), 'yyyy-MM-dd')
        }
        onChange={(e) =>
          router.push(`?${createQueryString('date', e.target.value)}`)
        }
      />
    </form>
  );
}
