import React, { useContext, useState } from "react";
import "./Login.css";
import Item from "@mui/material/Grid";
import Grid from "@mui/material/Grid";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  Input,
  InputAdornment,
  Snackbar,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import Axiosintance from "../../services/axios";
import { API } from "../../services/apiendpoints";
import Toast from "../../Components/Toast/Toast";
import ToastContext from "../../state-management/CreateContext";
import { Visibility, VisibilityOff } from "@mui/icons-material";
// import { _loginHandler } from "../restapi/Loginhandler";
const Login = () => {
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
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const onSubmit = async (data) => {
    setLoader(true);
    await Axiosintance.post(API.admin_login, data)
      .then((res) => {
        // Set toast message and severity based on the response
        setToastMessage(res?.data?.message);
        setToastSeverity("success");

        // Open the toast
        setToastOpen(true);
        setLoader(false);
        localStorage.setItem("Admin_Token", res.data.result.token);
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

  // const hdnl =   _loginHandler(data)
  // // console.log(hdnl);
  return (
    <>
      {/* <Toast
      open={toastOpen}
      onClose={() => setToastOpen(false)}
      message={toastMessage}
      severity={toastSeverity}
    /> */}
      <div className="login_wrapper">
        <Container className="container">
          <Grid container spacing={2}>
            <Grid item xs={12} md={12} lg={5}>
              <Box className="login_sec_right">
                <h1>
                  New Member Login <span>Hope You are doing well</span>
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
                  <Box className="login_input">
                    <Box className="login_input">
                      <Controller
                        name="password"
                        control={control}
                        render={({ field, fieldState }) => (
                          <TextField
                            id="standard-basic"
                            label="Password"
                            variant="standard"
                            type={showPassword ? "text" : "password"}
                            fullWidth
                            // type="password" // Set the input type to 'password'
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                            {...field}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                  >
                                    {showPassword ? (
                                      <VisibilityOff style={{color: fieldState.error ? "red":"#fff"}} />
                                    ) : (
                                      <Visibility style={{color: fieldState.error ? "red":"#fff"}} />
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                          />
                        )}
                        rules={{
                          required: "Password is required",
                          minLength: {
                            value: 8,
                            message:
                              "Password should be at least 8 characters long",
                          },
                          maxLength: {
                            value: 20,
                            message: "Password should not exceed 20 characters",
                          },
                          pattern: {
                            value:
                              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~`!@#$%^&*()_\-\+=:;"'?\/>.<,{}\[\]])[a-zA-Z\d~`!@#$%^&*()_\-\+=:;"'?\/>.<,{}\[\]]{8,}$/,
                            message:
                              "Password must be 8 characters and must contain atleast 1 small alphabet, 1 capital alphabet, 1 numeric value and 1 special character",
                          },
                        }}
                      />
                    </Box>
                    {/* <Box className="login_input">
        <Controller
          name="password"
          control={control}
          defaultValue=""
          rules={{
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password should be at least 8 characters long",
            },
            maxLength: {
              value: 20,
              message: "Password should not exceed 20 characters",
            },
            pattern: {
              value:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~`!@#$%^&*()_\-\+=:;"'?\/>.<,{}\[\]])[a-zA-Z\d~`!@#$%^&*()_\-\+=:;"'?\/>.<,{}\[\]]{8,}$/,
              message:
                "Password must be 8 characters and must contain at least 1 lowercase letter, 1 uppercase letter, 1 digit, and 1 special character",
            },
          }}
          render={({ field, fieldState }) => (
            <Input
              {...field}
              fullWidth
              id="password"
              type={showPassword ? "text" : "password"}
              label="Password"
              error={!!fieldState.error}
              helperText={fieldState.error ? fieldState.error.message : ""}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          )}
        />
      </Box> */}
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
                        "Login"
                      )}
                    </Button>
                  </Box>
                </form>
                <Box className="forget_psw">
                  <Link to="forget-password">
                    Forget Password? <span>Click here</span>
                  </Link>
                  <p>
                    Your journey to hassle-free utility payments begins here{" "}
                    <Link to="/register"> register</Link>
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

export default Login;
