'use client';
import { useEditor } from '@craftjs/core';
import copy from 'copy-to-clipboard';
import lz from 'lzutf8';
import { useState } from 'react';
import { MCard, MButton } from '@matsugov/ui';

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
    <MCard>
      <div className="flex items-center justify-between">
        <div>
          {/* <FormControlLabel
            className="enable-disable-toggle"
            control={<Switch checked={enabled} onChange={setEnable} />}
            label="enable"
          /> */}
        </div>
        <div>
          <MButton
            className="copy-state-btn"
            color="secondary"
            onClick={logState}
          >
            console log current state
          </MButton>
          <MButton
            className="copy-state-btn"
            color="secondary"
            onClick={copyState}
          >
            Copy current state
          </MButton>
          <MButton
            className="copy-state-btn"
            color="secondary"
            onClick={() => setDialogOpen(true)}
          >
            Load
          </MButton>
          {/* <Dialog
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
          /> */}
        </div>
      </div>
    </MCard>
  );
};
