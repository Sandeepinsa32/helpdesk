import React, {useState, useEffect} from 'react';
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Textfield from '../FormField/Textfield';

// mui
import {Grid, Box, Alert, Typography, Button, TextField, InputAdornment, FormControlLabel, Checkbox} from '@mui/material';
import {BASEURL, errorToast} from '../../../utils/Utils';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
// mui Icon

function RequestCharge() {
	const phoneRegExp = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;
	const INITIAL_FORM_STATE = {
		cardHolderName: 'sandeep',
		cardHolderNumber: '8427175003',
		cardNumber: '8427155003',
		cvv: '0123',
		expiryDate: null,
		email: 'test@gmail.com',
		phone: '8427155003',
		amount: '1.2',
		address: 'adress',
		description: 'desciption',
		markup: '1.2',
	};
	const FORM_VALIDATION = Yup.object({
		cardHolderName: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
		cardHolderNumber: Yup.string().required('phone is required').matches(phoneRegExp, 'Phone number is not valid').required('Phone is required'),
		cardNumber: Yup.string(),
		email: Yup.string().email('Invalid email address').required('Required'),
		phone: Yup.string().required('phone is required').matches(phoneRegExp, 'Phone number is not valid').required('Phone is required'),
		cvv: Yup.number().test(
			'min 3 && max 4 digit required', // this is used internally by yup
			'atleat 3 and atmost 4 character should be there', //validation message
			(value) => value == 0 || value > 0
		),
		expiryDate: Yup.string().nullable(),
		amount: Yup.number('input must consist if number')
			.required('This Field is required')
			.test(
				'number should be postive', // this is used internally by yup
				'value should be greater or Equal to 0', //validation message
				(value) => value == 0 || value > 0
			),
		markup: Yup.number('input must consist if number')
			.required('This Field is required')
			.test(
				'number should be postive', // this is used internally by yup
				'value should be greater or Equal to 0', //validation message
				(value) => value == 0 || value > 0
			),
		address: Yup.string(),
		description: Yup.string(),
	});
	return (
		<>
			<Formik
				initialValues={{...INITIAL_FORM_STATE}}
				validationSchema={FORM_VALIDATION}
				onSubmit={(values) => {
					console.log('formik submitted', values);

					// axios
					// 	.put(BASEURL + `/ticket/${data._id}`, {
					// 		data: {alternateEmail, alternatePhone, pnrNo, airlineLocator},
					// 		cards: inputList,
					// 	})
					// 	.then((res) => console.log(res.data))
					// 	.catch((e) => console.log(e));
				}}>
				{(props) => {
					const {errors, setFieldValue, touched, handleBlur, handleChange, values, submitCount, handleSubmit} = props;
					console.log(errors, touched);
					return (
						<Form onSubmit={handleSubmit}>
							<Box sx={{m: 1}}>
								<Typography variant='h6' gutterBottom sx={{my: 4}}>
									Request Charge :
								</Typography>
							</Box>
							<Grid container spacing={3}>
								{/* Card Holder NAme field */}
								<Grid item xs={6} md={4}>
									<Textfield name='cardHolderName' label='NAME ON CC' fullWidth />
								</Grid>
								{/*  Card Holder Phone no. */}
								<Grid item xs={6} md={4}>
									<Textfield name='cardHolderNumber' label='PHONE NO.' fullWidth />
								</Grid>
								{/* CardNumber Field */}
								<Grid item xs={6} md={4}>
									<Textfield name='cardNumber' label='CARD NUMBER' fullWidth />
								</Grid>
								{/* CVV Field */}
								<Grid item xs={4} md={2}>
									<Textfield name='cvv' label='CVV' fullWidth />
								</Grid>

								{/* expiry date field */}
								<Grid item xs={4} md={2}>
									<LocalizationProvider fullWidth dateAdapter={AdapterDateFns}>
										<DatePicker
											fullWidth
											views={['year', 'month']}
											name='expiryDate'
											label='EXPIRY DATE'
											inputFormat='MM/yyyy'
											placeholder='MM/yyyy'
											error={Boolean(touched.password && errors.password)}
											helperText={touched.password && errors.password}
											onChange={(newValue) => {
												setFieldValue(
													'expiryDate',
													new Date(newValue).toLocaleDateString('en-US', {
														day: '2-digit',
														month: '2-digit',
														year: 'numeric',
													})
												);
											}}
											renderInput={(params) => <TextField placeholder='MM/yyyy' {...params} />}
										/>
									</LocalizationProvider>
								</Grid>

								{/*  EMail Fields */}
								<Grid item xs={4} md={4} sm={4}>
									<Textfield name='email' label='EMAIL' />
								</Grid>
								{/*  Phone Fields */}
								<Grid item xs={4} md={4} sm={4}>
									<Textfield name='phone' label='PHONE' />
								</Grid>
								{/*  AMOUNT Fields */}
								<Grid item xs={3} sm={3} md={2}>
									<Textfield
										name='amount'
										label='AMOUNT'
										InputProps={{
											startAdornment: <InputAdornment position='start'>$</InputAdornment>,
										}}
									/>
								</Grid>
								{/*  MARKUP Fields */}
								<Grid item xs={3} sm={3} md={2}>
									<Textfield
										name='markup'
										label='MARKUP'
										InputProps={{
											startAdornment: <InputAdornment position='start'>$</InputAdornment>,
										}}
									/>
								</Grid>
								{/* Description Fields */}
								<Grid item xs={4} md={4} sm={4}>
									<Textfield name='description' label='DESCRIPTION' />
								</Grid>
								{/* ADDRESS Fields */}
								<Grid item xs={4} md={4} sm={4}>
									<Textfield name='address' label='ADDRESS' />
								</Grid>

								<Grid item xs={10} md={10}></Grid>
								<Grid item xs={10} md={2}>
									<Button variant='contained' type='submit' sx={{mt: 3, ml: 1}}>
										Submit
									</Button>
								</Grid>
							</Grid>
						</Form>
					);
				}}
			</Formik>
		</>
	);
}

export default RequestCharge;
