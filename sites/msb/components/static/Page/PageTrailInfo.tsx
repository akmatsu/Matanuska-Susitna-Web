import clsx from 'clsx';
import { PageSection } from './PageSection';
import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';

const trailInfoFragment = gql(`
  fragment TrailInfo on Trail {
    spring
    summer
    fall
    winter
    hiking
    biking
    horsebackRiding
    crossCountrySkiing
    snowshoeing
    atv
    dirtBiking
    snowMachining
    dogWalking
    frisbeeGolf
    running
    mushing
    open
    difficulty
    length
    elevationChange
    open
  }
`);

export function PageTrailInfo(props: {
  trail: FragmentType<typeof trailInfoFragment>;
}) {
  const trail = getFragmentData(trailInfoFragment, props.trail);
  return (
    <>
      <PageSection title="Trails Seasons">
        {trail.spring && (
          <span className="icon-[mdi--flower-tulip] size-8 text-green-700" />
        )}
        {trail.summer && (
          <span className="icon-[mdi--weather-sunny] size-8 text-yellow-700" />
        )}
        {trail.fall && (
          <span className="icon-[mdi--leaf] size-8 text-orange-700" />
        )}
        {trail.winter && (
          <span className="icon-[mdi--snowflake] size-8 text-sky-400" />
        )}
      </PageSection>
      <PageSection title="Trail Activities">
        <div className="flex gap-2">
          {trail.hiking && (
            <span
              className="icon-[mdi--walk] size-8 text-green-700"
              title="Walking/Hiking"
            />
          )}
          {trail.biking && (
            <span
              className="icon-[mdi--bike] size-8 text-blue-700"
              title="Biking"
            />
          )}
          {trail.horsebackRiding && (
            <span
              className="icon-[mdi--horse] size-8 text-yellow-700"
              title="Horseback Riding"
            />
          )}
          {trail.crossCountrySkiing && (
            <span
              className="icon-[mdi--ski-cross-country] size-8 text-sky-400"
              title="Cross Country Skiing"
            />
          )}
          {trail.snowshoeing && (
            <span
              className="icon-[material-symbols--snowshoeing] size-8 text-sky-400"
              title="Snow Shoeing"
            />
          )}
          {trail.atv && (
            <span
              className="icon-[fa6-solid--motorcycle] size-8 text-orange-700"
              title="ATV (Four-wheeler)"
            />
          )}
          {trail.dirtBiking && (
            <span
              className="icon-[ph--motorcycle] size-8 text-orange-700"
              title="Dirt Biking"
            />
          )}
          {trail.snowMachining && (
            <span
              className="icon-[material-symbols--snowmobile] size-8 text-orange-700"
              title="Snow Machining"
            />
          )}
          {trail.dogWalking && (
            <span
              className="icon-[mdi--dog-side] size-8 text-orange-700"
              title="Dog Walking"
            />
          )}
          {trail.frisbeeGolf && (
            <span
              className="icon-[tabler--disc-golf] size-8 text-orange-700"
              title="Frisbee Golf"
            />
          )}
          {trail.running && (
            <span
              className="icon-[material-symbols--directions-run] size-8 text-orange-700"
              title="Running"
            />
          )}
          {trail.mushing && (
            <span
              className="icon-[material-symbols--sledding] size-8 text-orange-700"
              title="Dog Sledding"
            />
          )}
        </div>
      </PageSection>
      <PageSection title="Trail Details">
        <p
          className={clsx('font-bold', {
            'text-green-700': trail.open,
            'text-red-700': !trail.open,
          })}
        >
          {trail.open ? 'Open' : 'Closed'}
        </p>
        <p>
          <span className="font-bold">Difficulty</span>: {trail.difficulty}
        </p>

        {trail.length && (
          <p>
            <span className="font-bold">Length</span>: {trail.length}
          </p>
        )}
        {trail.elevationChange && (
          <p>
            <span className="font-bold">Elevation Change</span>:{' '}
            {trail.elevationChange}
          </p>
        )}
      </PageSection>
    </>
  );
}
