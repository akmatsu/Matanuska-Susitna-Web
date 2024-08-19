'use client';
import { Box, Button, Grid, Typography } from '@mui/material';
import { Btn, Card, Container, Text } from '../user';
import { Element, useEditor } from '@craftjs/core';
import { ifTrue } from '@/utils/jsHelpers';

export function Toolbox() {
  const { connectors, query } = useEditor();

  return (
    <Box px={2} py={2}>
      <Grid container direction="column" alignItems="center" justifyContent="center" spacing={1}>
        <Box pb={2}>
          <Typography>Drag to add</Typography>
        </Box>
        <Grid container direction="column" item>
          <Button
            variant="contained"
            ref={(ref) =>
              ifTrue(ref, (r) => connectors.create(r, <Btn size="small">Click me</Btn>))
            }
          >
            Button
          </Button>
        </Grid>
        <Grid container direction="column" item>
          <Button
            variant="contained"
            ref={(ref) => ifTrue(ref, (r) => connectors.create(r, <Text text="hello world!" />))}
          >
            Text
          </Button>
        </Grid>
        <Grid container direction="column" item>
          <Button
            variant="contained"
            ref={(ref) =>
              ifTrue(ref, (r) =>
                connectors.create(r, <Element is={Container} padding={20} canvas />)
              )
            }
          >
            Container
          </Button>
        </Grid>
        <Grid container direction="column" item>
          <Button
            variant="contained"
            ref={(ref) => ifTrue(ref, (r) => connectors.create(r, <Card />))}
          >
            Card
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
