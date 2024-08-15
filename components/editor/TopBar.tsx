import { Box, Button, FormControlLabel, Grid, Switch } from '@mui/material';

export function TopBar() {
  return (
    <Box px={1} py={1} mt={3} mb={1} bgcolor="#cbe8e7">
      <Grid container alignItems="center">
        <Grid item xs>
          <FormControlLabel control={<Switch checked={true} />} label="enable" />
        </Grid>
        <Grid item>
          <Button size="small" variant="outlined" color="secondary">
            Serialize JSON to console
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
