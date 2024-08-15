import { Box, Button, Grid, Typography } from '@mui/material';

export function Toolbox() {
  return (
    <Box px={2} py={2}>
      <Grid container direction="column" alignItems="center" justifyContent="center" spacing={1}>
        <Box pb={2}>
          <Typography>Drag to add</Typography>
        </Box>
        <Grid container direction="column" item>
          <Button variant="contained">Button</Button>
        </Grid>
        <Grid container direction="column" item>
          <Button variant="contained">Text</Button>
        </Grid>
        <Grid container direction="column" item>
          <Button variant="contained">Container</Button>
        </Grid>
        <Grid container direction="column" item>
          <Button variant="contained">Card</Button>
        </Grid>
      </Grid>
    </Box>
  );
}
