import { toTitleCase } from '@/utils/stringHelpers';
import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';

const HourFields = gql(`
  fragment HourFields on OperatingHour {
    day
    open
    close
  }
`);

function formatTo12Hour(value?: string | null) {
  if (!value) {
    return '';
  }

  const match = value.match(/^(\d{1,2}):(\d{2})$/);

  if (!match) {
    return value;
  }

  const [, hourStr, minutes] = match;
  const hour = Number(hourStr);

  if (Number.isNaN(hour)) {
    return value;
  }

  const period = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;

  return `${hour12}:${minutes} ${period}`;
}

export function HourCard(props: { hour: FragmentType<typeof HourFields> }) {
  const hour = getFragmentData(HourFields, props.hour);

  return (
    <div>
      <p className="font-bold">{toTitleCase(hour.day!.replace(/-/g, ' '))}</p>
      <p className="text-sm">
        {formatTo12Hour(hour.open)} - {formatTo12Hour(hour.close)}
      </p>
    </div>
  );
}
