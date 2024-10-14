import { OfficialGovSiteNotice } from './OfficialGovSiteNotice';
import { Alerts } from '../Alerts';

export function SiteInfo() {
  return (
    <>
      <OfficialGovSiteNotice />
      <Alerts />
    </>
  );
}
