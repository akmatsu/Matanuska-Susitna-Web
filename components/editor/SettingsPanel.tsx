'use client';
import { useEditor } from '@craftjs/core';
import { Box, Button, Chip, FormControl, FormLabel, Grid, Slider, Typography } from '@mui/material';
import React from 'react';

export const SettingsPanel = () => {
  const { selected } = useEditor((state) => {
    const [currentlySelectedId] = Array.from(state.events.selected);
    let selected;
    if (currentlySelectedId) {
      selected = {
        id: currentlySelectedId,
        name: state.nodes[currentlySelectedId].data.name,
        settings: state.nodes[currentlySelectedId].related?.settings,
      };
    }
    return {
      selected,
    };
  });

  return selected ? (
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
        {selected.settings && React.createElement(selected.settings)}
        <FormControl size="small" component="fieldset">
          <FormLabel component="legend">Prop</FormLabel>
          <Slider defaultValue={0} step={1} min={7} max={50} valueLabelDisplay="auto" />
        </FormControl>
        <Button variant="contained" color="inherit">
          Delete
        </Button>
      </Grid>
    </Box>
  ) : null;
};
