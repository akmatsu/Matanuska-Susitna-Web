import { toTitleCase } from '@/utils/stringHelpers';
import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';

const HourFields = gql(`
  fragment HourFields on OperatingHour {
    day
    open
    close
  }
`);

export function HourCard(props: { hour: FragmentType<typeof HourFields> }) {
  const hour = getFragmentData(HourFields, props.hour);

  return (
    <div>
      <p className="font-bold">{toTitleCase(hour.day!.replace(/-/g, ' '))}</p>
      <p className="text-sm">
        {hour.open} - {hour.close}
      </p>
    </div>
  );
}
