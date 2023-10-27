import React, { useContext } from "react";
import "./ResetPassword..css";
import Item from "@mui/material/Grid";
import Grid from "@mui/material/Grid";
import { Box, Button, CircularProgress, Container, IconButton, InputAdornment, TextField } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import Axiosintance from "../../services/axios";
import { API } from "../../services/apiendpoints";
import ToastContext from "../../state-management/CreateContext";
import { Visibility, VisibilityOff } from "@mui/icons-material";
const ResetPassword = () => {
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
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const param1 = searchParams.get("email");

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const onSubmit = async (data) => {
    setLoader(true);
    await Axiosintance.post(API.reset_password, data)
      .then((res) => {
         // Set toast message and severity based on the response
         setToastMessage(res?.data?.message);
         setToastSeverity("success");
 
         // Open the toast
         setToastOpen(true);
         setLoader(false);
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
                 Reset Password <span>Hope You are doing well</span>
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
                          // value={param1}
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
                      <Controller
                        name="newPassword"
                        control={control}
                        render={({ field, fieldState }) => (
                          <TextField
                            id="standard-basic"
                            label="Password"
                            variant="standard"
                            fullWidth
                            type={showPassword ? "text" : "password"} // Set the input type to 'password'
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
                        "  Reset Password"
                      )}
                    
                    </Button>
                  </Box>
                </form>
                {/* <Box className="forget_psw">
                  <a href="">
                    Forget Password? <span>Click here</span>
                  </a>
                  <p>
                    Your journey to hassle-free utility payments begins here{" "}
                    <Link to="/register">register</Link>
                  </p>
                </Box> */}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
};

export default ResetPassword;
