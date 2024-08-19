import { Typography } from '@mui/material';
import { MButton } from 'components';

export default function Home() {
  return (
    <main style={{ margin: '0 auto', width: '800px' }}>
      <Typography variant="h5" align="center">
        A super simple page editor
      </Typography>
      <MButton>Yeehaw</MButton>
    </main>
  );
}
