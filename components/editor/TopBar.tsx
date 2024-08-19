'use client';
import { useEditor } from '@craftjs/core';
import { Box, Button, FormControlLabel, FormControlLabelProps, Grid, Switch } from '@mui/material';

export const TopBar = () => {
  const { actions, query, enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  const setEnable: FormControlLabelProps['onChange'] = (_, value) =>
    actions.setOptions((options) => (options.enabled = value));

  return (
    <Box px={1} py={1} mt={3} mb={1} bgcolor="#cbe8e7">
      <Grid container alignItems="center">
        <Grid item xs>
          <FormControlLabel
            control={<Switch checked={enabled} onChange={setEnable} />}
            label="enable"
          />
        </Grid>
        <Grid item>
          <Button
            size="small"
            variant="outlined"
            color="secondary"
            onClick={() => {
              console.log(query.serialize());
            }}
          >
            Serialize JSON to console
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
