import * as React from "react";
import Snackbar from "@mui/material/Snackbar";

const SnackBar = (props) => {
  const { snackOpen, setSnackOpen, snackbarMessage } = props;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackOpen(false);
  };

  return (
      <Snackbar
        open={snackOpen}
        autoHideDuration={4000}
        onClose={handleClose}
        message={snackbarMessage}
      />
  );
}

export default SnackBar;