import { TrailItem } from '@msb/js-sdk';
import clsx from 'clsx';

export function PageTrailInfo({ trail }: { trail: TrailItem }) {
  return (
    <>
      <section>
        <h2 className="text-2xl font-bold mb-4">Trail Seasons</h2>
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
      </section>
      <section>
        <h2 className="text-2xl font-bold mb-4">Trail Activities</h2>
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
      </section>
      <section>
        <h2 className="text-2xl font-bold mb-4">Trail Details</h2>
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
        <p>
          <span className="font-bold">Groomed</span>:{' '}
          {trail.groomed ? 'Yes' : 'No'}
        </p>
      </section>
    </>
  );
}
