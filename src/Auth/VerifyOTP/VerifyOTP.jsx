import React, { useContext, useState } from "react";
import "./VerifyOTP.css";
import Item from "@mui/material/Grid";
import Grid from "@mui/material/Grid";
import { Box, Button, CircularProgress, Container, TextField } from "@mui/material";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import OtpInput from "react-otp-input";
import Axiosintance from "../../services/axios";
import { API } from "../../services/apiendpoints";
import ToastContext from "../../state-management/CreateContext";
const VerifyOTP = () => {
  const navigate = useNavigate();
  const {
    toastOpen,
    setToastOpen,
    toastMessage,
    setToastMessage,
    loader,
    setLoader,
    toastSeverity,
    setToastSeverity,
  } = useContext(ToastContext);
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const param1 = searchParams.get("email");


  /**
   * veridy otp register
   * api integrate function
   */
  const handle_Verify_OTP = async () => {
    setLoader(true);
    await Axiosintance.post(API.register_verify_otp, {
      email: param1,
      emailOtp: otp,
    })
      .then((res) => {
        setToastMessage(res?.data?.message);
        setToastSeverity("success");

        // Open the toast
        setToastOpen(true);

        // set loader
        setLoader(false);
        navigate("/");
      })
      .catch((err) => {
        setLoader(false);
        // Set toast message and severity for an error
        setToastMessage(err?.response?.data?.message);
        setToastSeverity("error");

        // Open the toast
        setToastOpen(true);
      });
  };
  return (
    <>
      <div className="login_wrapper">
        <Container className="container">
          <Grid container spacing={2}>
            <Grid item xs={12} md={12} lg={5}>
              <Box className="login_sec_right">
                <h1>
                  Verify OTP <span>Hope You are doing well </span>
                </h1>
                <form action="">
                  <Box className="login_input">
                    <TextField
                      id="standard-basic"
                      label="email"
                      variant="standard"
                      value={param1}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Box>
                  <Box className="login_input otp_in">
                    <OtpInput
                      value={otp}
                      onChange={setOtp}
                      numInputs={6}
                      renderSeparator={<span>-</span>}
                      renderInput={(props) => (
                        <input {...props} style={{ width: "47px" }} />
                      )}
                    />
                  </Box>

                  <Box className="login_btn">
                    <Button
                      disableRipple
                      disableFocusRipple
                      disableTouchRipple
                      color="primary"
                      variant="contained"
                      onClick={handle_Verify_OTP}
                    >
                     {loader ? (
                        <>
                          {" "}
                          <CircularProgress color="info" size={"20px"} />
                        </>
                      ) : (
                        "Verify OTP"
                      )}
                      
                    </Button>
                  </Box>
                </form>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
};

export default VerifyOTP;
