import { Box, Button, Chip, FormControl, FormLabel, Grid, Slider, Typography } from '@mui/material';

export function SettingsPanel() {
  return (
    <Box bgcolor="rgba(0,0,0,0.06)" mt={2} px={2} py={2}>
      <Grid container direction="column" spacing={0}>
        <Grid item>
          <Box pb={2}>
            <Grid container alignItems="center">
              <Grid item xs>
                <Typography variant="subtitle1">Selected</Typography>
              </Grid>
              <Grid item>
                <Chip size="small" color="primary" label="Selected" />
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <FormControl size="small" component="fieldset">
          <FormLabel component="legend">Prop</FormLabel>
          <Slider defaultValue={0} step={1} min={7} max={50} valueLabelDisplay="auto" />
        </FormControl>
        <Button variant="contained" color="inherit">
          Delete
        </Button>
      </Grid>
    </Box>
  );
}
