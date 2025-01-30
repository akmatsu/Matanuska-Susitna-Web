import { AdminConfig } from '@keystone-6/core/types';
import { CustomNavigation } from './components/CustomNavigation';
import { Button } from '@keystone-ui/button';

function CustomLogo() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      <img
        src="https://images.matsu.gov/logo.png"
        alt="The Matanuska-Susitna Borough Seal"
        width="50"
        height="50"
      ></img>
    </div>
  );
}

export const components: AdminConfig['components'] = {
  Logo: CustomLogo,
  Navigation: CustomNavigation,
};
