import React from "react";
// import {Routes, Route, NavLink} from 'react-router-dom';
import { useFormik } from "formik";

import * as Yup from "yup";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  Checkbox,
} from "@mui/material";

// material UI-icon
import { useNavigate } from "react-router-dom";
// local icon
import { useState } from "react";
import { BASEURL, successToast, errorToast } from "../utils/Utils";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  // const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "jack@gmail.com",
      password: "test",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
      password: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: () => {
      handleLogin();
    },
  });

  const [showPassword, setShowPassword] = useState();

  const handleLogin = async (e) => {
    // e.preventDefault();

    axios
      .post(BASEURL + "/agent/login", formik.values)
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("role", response.data.data.agent.role);
        localStorage.setItem("token", JSON.stringify(response.data.data.token));
        successToast("Login Successfull");
        navigate("/");
      })
      .catch((e) => {
        // console.log(e.response.data.message);
        errorToast(e.response.data.message);
      });
  };

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: "100%",
          height: "100vh",
          bgcolor: `rgba(0, 0, 0, 0.04)!Important`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Container maxWidth="sm">
          <Paper
            variant="outlined"
            sx={{
              my: { xs: 2, md: 3 },
              p: { xs: 2, md: 3, borderRadius: "10px" },
            }}
          >
            <form onSubmit={formik.handleSubmit}>
              <Box sx={{ my: 3 }}>
                <Typography color="textPrimary" variant="h4">
                  Login to your Account
                </Typography>
                <Typography color="textSecondary" gutterBottom variant="body2">
                  use your email address for login
                </Typography>
              </Box>

              <TextField
                error={Boolean(formik.touched.email && formik.errors.email)}
                fullWidth
                helperText={formik.touched.email && formik.errors.email}
                label="Email Address"
                margin="normal"
                name="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="email"
                value={formik.values.email}
                variant="outlined"
              />
              <TextField
                error={Boolean(
                  formik.touched.password && formik.errors.password
                )}
                fullWidth
                helperText={formik.touched.password && formik.errors.password}
                label="Password"
                margin="normal"
                name="password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                // type="password"
                type={showPassword ? "text" : "password"}
                value={formik.values.password}
                variant="outlined"
              />

              {/* show password checkbox  */}

              <Box
                sx={{
                  alignItems: "center",
                  display: "flex",
                  ml: -1,
                }}
              >
                <Checkbox
                  name="showPassword"
                  onChange={(e) => {
                    e.target.checked
                      ? setShowPassword(true)
                      : setShowPassword();
                  }}
                />
                <Typography color="textSecondary" variant="body2">
                  Show Password
                </Typography>
              </Box>

              <Box sx={{ py: 2 }}>
                <Button
                  color="primary"
                  disabled={formik.isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  //   onClick={handleLogin}
                >
                  Log In
                </Button>
              </Box>
              {/* <Typography color='textSecondary' variant='body2'>
								Facing any issue While login? 
								<Link variant='subtitle2' underline='hover'>
									Forget Password
								</Link>
								
							</Typography> */}
            </form>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default Login;
