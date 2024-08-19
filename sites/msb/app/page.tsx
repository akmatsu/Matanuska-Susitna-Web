import { CoreEditor } from '@/components';
import { Typography } from '@mui/material';

export default function Home() {
  return (
    <main style={{ margin: '0 auto', width: '800px' }}>
      <Typography variant="h5" align="center">
        A super simple page editor
      </Typography>
      <CoreEditor />
    </main>
  );
}
