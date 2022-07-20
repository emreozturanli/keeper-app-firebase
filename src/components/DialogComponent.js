import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, Typography } from "@mui/material";
import { useEffect, useRef } from "react";

const DialogComponent = ({ title, author, desc, open, setOpen }) => {

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll='paper'
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle sx={{ minWidth: '300px' }} id="scroll-dialog-title">
        <Typography variant="h4" gutterBottom component="h4"> {title}</Typography>
      </DialogTitle>
      <DialogTitle sx={{ minWidth: '300px' }} id="scroll-dialog-title">
        <i>@{author}</i></DialogTitle>
      <DialogContent dividers={true} sx={{ minWidth: '300px' }}>
        <DialogContentText
          id="scroll-dialog-description"
          ref={descriptionElementRef}
          tabIndex={-1}
        >
          {desc}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ minWidth: '300px' }}>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )

}

export default DialogComponent;