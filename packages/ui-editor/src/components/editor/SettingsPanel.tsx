'use client';
import { useEditor } from '@craftjs/core';
// import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import React from 'react';
import { MButton } from '@matsugov/ui';

export const SettingsPanel = () => {
  const { actions, selected } = useEditor((state, query) => {
    const [currentNodeId] = Array.from(state.events.selected);
    let selected;

    if (currentNodeId) {
      selected = {
        id: currentNodeId,
        name: state.nodes[currentNodeId].data.name,
        settings: state.nodes[currentNodeId].related?.settings,
        isDeletable: query.node(currentNodeId).isDeletable(),
      };
    }

    return {
      selected,
    };
  });

  return selected ? (
    <div>
      {/* <Grid container direction="column" spacing={0}> */}
      {/* <Grid item> */}
      {/* <Box pb={2}> */}
      {/* <Grid container alignItems="center"> */}
      {/* <Grid item xs> */}
      <p>Selected</p>
      {/* </Grid> */}
      {/* <Grid item> */}
      {/* <Chip size="small" color="primary" label="Selected" /> */}
      {/* </Grid> */}
      {/* </Grid> */}
      {/* </Box> */}
      {/* </Grid> */}
      {selected.settings && React.createElement(selected.settings)}
      {selected.isDeletable ? (
        <MButton color="danger" onClick={() => actions.delete(selected.id)}>
          Delete
        </MButton>
      ) : null}
      {/* </Grid> */}
    </div>
  ) : null;
};
