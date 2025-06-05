import { Banner } from '@matsugov/ui/Banner';
import { Alerts } from '../../server/Alerts';

export function SiteInfo() {
  return (
    <>
      <Banner orgName="Matanuska-Susitna Borough" />
      <Alerts />
    </>
  );
}
