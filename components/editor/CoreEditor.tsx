'use client';
import { Grid, Paper } from '@mui/material';
import { TopBar } from './TopBar';
import { Btn, Card, Container, Text } from '../user';
import { Toolbox } from './Toolbox';
import { SettingsPanel } from './SettingsPanel';
import { Editor, Frame, Element } from '@craftjs/core';

export function CoreEditor() {
  return (
    <Editor resolver={{ Card, Btn, Text, Container }}>
      <Grid container direction="column" spacing={3} style={{ paddingTop: '10px' }}>
        <TopBar />
        <Grid container spacing={3}>
          <Grid item xs>
            <Frame>
              <Element is={Container} padding={5} background="#eee" canvas>
                <Card />
                <Btn size="small" variant="outlined" color="primary">
                  Click
                </Btn>
                <Text text="Hi world!" fontSize="16" />
                <Element is={Container} padding={6} background="#999" canvas>
                  <Text fontSize="16" text="It's me again!" />
                </Element>
              </Element>
            </Frame>
          </Grid>
          <Grid item xs={4}>
            <Paper>
              <Toolbox />
              <SettingsPanel />
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Editor>
  );
}
