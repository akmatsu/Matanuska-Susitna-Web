import { TrailItem } from '@msb/js-sdk';

export function PageTrailInfo({ trail }: { trail: TrailItem }) {
  return (
    <>
      <section>
        <h2>Trail Seasons</h2>
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
        <h2>Trail Activities</h2>
        {trail.hiking && (
          <span className="icon-[material-symbols--hiking] size-8 text-green-700" />
        )}
        {trail.biking && (
          <span className="icon-[material-symbols--pedal-bike] size-8 text-blue-700" />
        )}
        {trail.horsebackRiding && (
          <span className="icon-[mdi--horse] size-8 text-yellow-700" />
        )}
        {trail.crossCountrySkiing && (
          <span className="icon-[mdi--snowboard] size-8 text-sky-400" />
        )}
        {trail.snowshoeing && (
          <span className="icon-[material-symbols--snowshoeing] size-8 text-sky-400" />
        )}
        {trail.atv && (
          <span className="icon-[material-symbols--two-wheeler] size-8 text-orange-700" />
        )}
        {trail.dirtBiking && (
          <span className="icon-[material-symbols--motorcycle] size-8 text-orange-700" />
        )}
        {trail.snowMachining && (
          <span className="icon-[material-symbols--snowmobile] size-8 text-orange-700" />
        )}
        {trail.dogWalking && (
          <span className="icon-[mdi--dog-side] size-8 text-orange-700" />
        )}
        {trail.frisbeeGolf && (
          <span className="icon-[material-symbols--disc-golf] size-8 text-orange-700" />
        )}
      </section>
    </>
  );
}
