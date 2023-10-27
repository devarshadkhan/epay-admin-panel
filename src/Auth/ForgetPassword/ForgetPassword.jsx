import React, { useContext } from "react";
import "./ForgetPassword.css";
import Item from "@mui/material/Grid";
import Grid from "@mui/material/Grid";
import { Box, Button, CircularProgress, Container, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import Axiosintance from "../../services/axios";
import { API } from "../../services/apiendpoints";
import ToastContext from "../../state-management/CreateContext";
const ForgetPassword = () => {
    const navigate = useNavigate()
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
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
  const onSubmit = async (data) => {
    setLoader(true);
    console.log(data);
    await Axiosintance.post(API.forget_password, data)
      .then((res) => {
         // Set toast message and severity based on the response
         setToastMessage(res?.data?.message);
         setToastSeverity("success");
 
         // Open the toast
         setToastOpen(true);
         setLoader(false);
        const email = data.email
        navigate(`/verify-forget-password-otp?email=${email}`);
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
                 Forget Password <span>Hope You are doing well</span>
                </h1>
                <form action="" onSubmit={handleSubmit(onSubmit)}>
                  <Box className="login_input">
                    <Controller
                      name="email" // Specify the field name
                      control={control} // Pass the 'control' object from useForm
                      render={({ field, fieldState }) => (
                        <TextField
                          id="standard-basic"
                          label="Email"
                          variant="standard"
                          fullWidth
                          error={!!fieldState.error}
                          helperText={fieldState.error?.message}
                          {...field}
                        />
                      )}
                      rules={{
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                          message: "Invalid email address",
                        },
                      }}
                    />
                  </Box>
                
                  <Box className="login_btn">
                    <Button
                      disableRipple
                      disableFocusRipple
                      disableTouchRipple
                      color="primary"
                      variant="contained"
                      type="submit"
                    >

{loader ? (
                        <>
                          {" "}
                          <CircularProgress color="info" size={"20px"} />
                        </>
                      ) : (
                        "Continue"
                      )}
                      
                    </Button>
                  </Box>
                </form>
                <Box className="forget_psw">
                  <a href="">
                    Forget Password? <span>Click here</span>
                  </a>
                  <p>
                    Your journey to hassle-free utility payments begins here{" "}
                    <Link to="/register">register</Link>
                  </p>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
};

export default ForgetPassword;
