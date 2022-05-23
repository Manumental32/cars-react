import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
const ConfirmDialog = (props) => {
  const {
    children,
    open,
    setOpen,
    onConfirm,
    titleText,
    acceptText,
    declineText,
  } = props;
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby='confirm-dialog'
    >
      <DialogTitle id='confirm-dialog'>{titleText}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button
          variant='contained'
          onClick={() => setOpen(false)}
          color='inherit'
        >
          {declineText}
        </Button>
        <Button
          variant='contained'
          onClick={() => {
            onConfirm();
          }}
          color='secondary'
        >
          {acceptText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ConfirmDialog;
