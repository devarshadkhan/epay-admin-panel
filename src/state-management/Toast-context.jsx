import React, { useEffect, useState } from "react";
import axios from "axios";
import ToastContext from "./CreateContext";
import { Alert, Snackbar } from "@mui/material";

const Toast_Context = ({ children }) => {
 
    const [toastOpen, setToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [loader, setLoader] = useState(false);
    const [toastSeverity, setToastSeverity] = useState("success");
    const handleToastClose = () => {
        setToastOpen(false);
      };
  return (
    <ToastContext.Provider value={{ toastOpen, setToastOpen, toastMessage, setToastMessage, loader, setLoader, toastSeverity, setToastSeverity }}>
      {children}
      <Snackbar
          open={toastOpen}
          autoHideDuration={6000}
          onClose={handleToastClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert severity={toastSeverity} onClose={handleToastClose}>
            {toastMessage}
          </Alert>
        </Snackbar>

    </ToastContext.Provider>
  );
};

export default Toast_Context;
