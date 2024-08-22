'use client';
import { useEditor } from '@craftjs/core';
import copy from 'copy-to-clipboard';
import lz from 'lzutf8';
import { useState } from 'react';

export const TopBar = () => {
  const { actions, query, enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  const [message, setMessage] = useState<string>();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [stateToLoad, setStateToLoad] = useState<string>();

  const setEnable: FormControlLabelProps['onChange'] = (_, value) =>
    actions.setOptions((options) => (options.enabled = value));

  function copyState() {
    const json = query.serialize();
    copy(lz.encodeBase64(lz.compress(json)));
    setMessage('State copied to clipboard.');
  }

  function loadState() {
    setDialogOpen(false);
    if (stateToLoad) {
      const json = lz.decompress(lz.decodeBase64(stateToLoad));
      actions.deserialize(json);
      setMessage('State loaded.');
    }
  }

  function logState() {
    console.log(q);
  }

  return (
    <Box px={1} py={1} mt={3} mb={1} bgcolor="#cbe8e7">
      <Grid container alignItems="center">
        <Grid item xs>
          <FormControlLabel
            className="enable-disable-toggle"
            control={<Switch checked={enabled} onChange={setEnable} />}
            label="enable"
          />
        </Grid>
        <Grid item>
          <Button
            className="copy-state-btn"
            size="small"
            variant="outlined"
            color="secondary"
            onClick={logState}
          >
            console log current state
          </Button>
          <Button
            className="copy-state-btn"
            size="small"
            variant="outlined"
            color="secondary"
            onClick={copyState}
          >
            Copy current state
          </Button>
          <Button
            className="copy-state-btn"
            size="small"
            variant="outlined"
            color="secondary"
            onClick={() => setDialogOpen(true)}
          >
            Load
          </Button>
          <Dialog
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
            fullWidth
            maxWidth="md"
          >
            <DialogTitle id="alert-dialog-title">Load state</DialogTitle>
            <DialogContent>
              <TextField
                multiline
                fullWidth
                placeholder='Paste the contents that was copied from the "copy Current State" button'
                size="small"
                value={stateToLoad}
                onChange={(e) => setStateToLoad(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button color="primary" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button color="primary" autoFocus onClick={loadState}>
                Load
              </Button>
            </DialogActions>
          </Dialog>
          <Snackbar
            autoHideDuration={1000}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            open={!!message}
            onClose={() => setMessage(undefined)}
            message={<span>{message}</span>}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
