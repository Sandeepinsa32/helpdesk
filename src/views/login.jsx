import React from 'react';
import {Routes, Route, NavLink} from 'react-router-dom';
import {useFormik} from 'formik';

import * as Yup from 'yup';
import {Box, Button, Container, Grid, Link, TextField, Typography, Checkbox, InputAdornment, IconButton} from '@mui/material';

// material UI-icon
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// local icon
import {Facebook as FacebookIcon} from '../assets/icons/facebook';
import {Google as GoogleIcon} from '../assets/icons/google';
import {useState} from 'react';

const Login = () => {
	// const router = useRouter();
	const formik = useFormik({
		initialValues: {
			email: 'admin@helpdesk.crm',
			password: 'Password123',
		},
		validationSchema: Yup.object({
			email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
			password: Yup.string().max(255).required('Password is required'),
		}),
		// onSubmit: () => {
		// 	router.push('/');
		// },
	});

	const [showPassword, setShowPassword] = useState();

	return (
		<>
			<Box
				component='main'
				sx={{
					alignItems: 'center',
					display: 'flex',
					flexGrow: 1,
					minHeight: '100%',
				}}>
				<Container maxWidth='sm'>
					{/* <NavLink href='/' passHref> */}
					<Button component='a' startIcon={<ArrowBackIcon fontSize='small' />}>
						Dashboard
					</Button>
					{/* </NavLink> */}

					<form onSubmit={formik.handleSubmit}>
						<Box sx={{my: 3}}>
							<Typography color='textPrimary' variant='h4'>
								Login to your Account
							</Typography>
							<Typography color='textSecondary' gutterBottom variant='body2'>
								use your email address for login
							</Typography>
						</Box>

						<TextField
							error={Boolean(formik.touched.email && formik.errors.email)}
							fullWidth
							helperText={formik.touched.email && formik.errors.email}
							label='Email Address'
							margin='normal'
							name='email'
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
							type='email'
							value={formik.values.email}
							variant='outlined'
						/>
						<TextField
							error={Boolean(formik.touched.password && formik.errors.password)}
							fullWidth
							helperText={formik.touched.password && formik.errors.password}
							label='Password'
							margin='normal'
							name='password'
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
							// type="password"
							type={showPassword ? 'text' : 'password'}
							value={formik.values.password}
							variant='outlined'
						/>

						{/* show password checkbox  */}

						<Box
							sx={{
								alignItems: 'center',
								display: 'flex',
								ml: -1,
							}}>
							<Checkbox
								name='showPassword'
								onChange={(e) => {
									e.target.checked ? setShowPassword(true) : setShowPassword();
								}}
							/>
							<Typography color='textSecondary' variant='body2'>
								Show Password
							</Typography>
						</Box>

						<Box sx={{py: 2}}>
							<Button color='primary' disabled={formik.isSubmitting} fullWidth size='large' type='submit' variant='contained'>
								Log In
							</Button>
						</Box>
						<Typography color='textSecondary' variant='body2'>
							Facing any issue While login? {/* <NavLink href='/login' passHref> */}
							<Link variant='subtitle2' underline='hover'>
								Forget Password
							</Link>
							{/* </NavLink> */}
						</Typography>
					</form>
				</Container>
			</Box>
		</>
	);
};

export default Login;
