import React, {useState, useEffect} from 'react';
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Textfield from '../FormField/Textfield';

// mui
import {Grid, Box, Alert, Typography, Button, TextField, InputAdornment, Card, CardHeader, Divider, CardContent, CardActions, FormControlLabel, Checkbox} from '@mui/material';
import {BASEURL, errorToast, successToast} from '../../../utils/Utils';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
// mui Icon

function RequestCharge() {
	// const phoneRegExp = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;

	const phoneRegExp = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
	const INITIAL_FORM_STATE = {
		confirmationNo: '',
		agencyRefNo: '',
		name: '',
		email: 'test@gmail.com',
		phone: '8427155003',
		dob: '',
		dob: '',
		ticketnumber: '',
		passportNumber: '',
		description: 'desciption',
		billingAddress: 'adress',
		cardHolderName: 'sandeep',
		cardHolderNumber: '8427175003',
		cardNumber: '8427155003',
		cvv: '0123',
		expiryDate: null,
	};
	const FORM_VALIDATION = Yup.object({
		confirmationNo: Yup.string(),
		agencyRefNo: Yup.string(),
		name: Yup.string(),
		email: Yup.string(),
		phone: Yup.string(),
		dob: null,

		ticketnumber: Yup.string(),
		passportNumber: Yup.string(),

		description: Yup.string(),
		billingAddress: Yup.string(),

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
	});
	return (
		<>
			<Formik
				initialValues={{...INITIAL_FORM_STATE}}
				validationSchema={FORM_VALIDATION}
				onSubmit={(values) => {
					// console.log('formik submitted', values);
					// console.log(CreateEmailHTML(values));

					axios
						.post(BASEURL + `/ticket/confirmation`, {
							data: CreateEmailHTML(values),
						})
						.then((res) => {
							// console.log(res.data);
							successToast('Email sent successfully!');
						})
						.catch((e) => {
							console.log(e);
							errorToast(e.response.data.message);
						});
				}}>
				{(props) => {
					const {errors, setFieldValue, touched, handleBlur, handleChange, values, submitCount, handleSubmit} = props;
					{
						/* console.log(errors); */
					}
					return (
						<Card>
							<CardHeader title='AIRLINE CALLING' />
							<Divider />
							<Form onSubmit={handleSubmit}>
								<CardContent>
									<Grid container spacing={3}>
										{/* CONFIRMATION NO.field */}

										<Grid item xs={6} md={6}>
											<Textfield name='confirmationNo' label='CONFIRMATION NO.' />
										</Grid>

										{/*  TRAVEL AGENCY REFERENCE NO.*/}
										<Grid item xs={6} md={6}>
											<Textfield name='agencyRefNo' label='TRAVEL AGENCY REFERENCE NO.' />
										</Grid>

										{/* name Field */}
										<Grid item xs={6} md={3}>
											<Textfield name='name' label='NAME ' />
										</Grid>

										{/* email Field */}
										<Grid item xs={6} md={3}>
											<Textfield name='email ' label='EMAIL ' />
										</Grid>
										{/* phone Field */}
										<Grid item xs={6} md={3}>
											<Textfield name='phone ' label='PHONE ' />
										</Grid>
										{/* DOB field */}
										<Grid item xs={4} md={3}>
											<LocalizationProvider dateAdapter={AdapterDateFns}>
												<DatePicker
													name='dob'
													label='Date of Birth'
													inputFormat='MM/dd/yyyy'
													placeholder='MM/dd/yyyy'
													onChange={(newValue) => {
														setFieldValue(
															'dob',
															new Date(newValue).toLocaleDateString('en-US', {
																day: '2-digit',
																month: '2-digit',
																year: 'numeric',
															})
														);
													}}
													renderInput={(params) => <TextField placeholder='MM/dd/yyyy' {...params} />}
												/>
											</LocalizationProvider>
										</Grid>

										{/* ticketnumber Field */}
										<Grid item xs={6} md={3}>
											<Textfield name='ticketNumber' label='TICKET No. ' />
										</Grid>

										{/* Passport number Field */}
										<Grid item xs={6} md={3}>
											<Textfield name='passportNumber' label='PASSPORT NO. ' />
										</Grid>

										{/* Description Fields */}
										<Grid item xs={4} md={3} sm={4}>
											<Textfield name='description' label='DESCRIPTION' multiline rows={6} />
										</Grid>
										{/* billingAddress Fields */}
										<Grid item xs={4} md={3} sm={4}>
											<Textfield name='billingAddress' label='BILLING ADDRESS' multiline rows={4} />
										</Grid>

										{/* Card Holder NAme field */}
										<Grid item xs={4} md={2}>
											<Textfield name='cardHolderName' label='NAME ON CC' />
										</Grid>
										{/*  Card Holder Phone no. */}
										<Grid item xs={4} md={2}>
											<Textfield name='cardHolderNumber' label='PHONE NO.' />
										</Grid>
										{/* CardNumber Field */}
										<Grid item xs={4} md={3}>
											<Textfield name='cardNumber' label='CARD NUMBER' />
										</Grid>
										{/* CVV Field */}
										<Grid item xs={4} md={2}>
											<Textfield name='cvv' label='CVV' />
										</Grid>
										{/* expiry date field */}
										<Grid item xs={4} md={3}>
											<LocalizationProvider fullWidth dateAdapter={AdapterDateFns}>
												<DatePicker
													fullWidth
													views={['year', 'month']}
													name='expiryDate'
													label='EXPIRY DATE'
													inputFormat='MM/yyyy'
													placeholder='MM/yyyy'
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
													value={values.expiryDate}
													renderInput={(params) => <TextField placeholder='MM/yyyy' {...params} />}
												/>
											</LocalizationProvider>
										</Grid>
									</Grid>
								</CardContent>
								<Divider />
								<CardActions sx={{display: 'flex', justifyContent: 'flex-end', p: 2}}>
									<Button variant='contained' type='submit'>
										Submit
									</Button>
								</CardActions>
							</Form>
						</Card>
					);
				}}
			</Formik>
		</>
	);
}

export default RequestCharge;

function CreateEmailHTML(data) {
	const {confirmationNo, agencyRefNo, name, email, phone, dob, ticketnumber, passportNumber, description, billingAddress, cardHolderName, cardHolderNumber, cardNumber, cvv, expiryDate} = data;
	return `

			<table class='tableoutter' style='margin-top:1rem;display: inline-block;border: 0; '>
				<tr>
					<td style='font-weight:bold;'>CONFIRMATION NO</td>
					<td style=''>${confirmationNo}</td>
				</tr>
				<tr>
					<td style='font-weight:bold;'>AGENCY REF NO</td>
					<td style=''>${agencyRefNo}</td>
				</tr>
				<tr>
					<td style='font-weight:bold;'>NAME</td>
					<td style=''>${name}</td>
				</tr>
				<tr>
					<td style='font-weight:bold;'>EMAIL</td>
					<td style=''>${email}</td>
				</tr>
				<tr>
					<td style='font-weight:bold;'>PHONE</td>
					<td style=''>${phone}</td>
				</tr>
				<tr>
					<td style='font-weight:bold;'>DOB</td>
					<td style=''>${dob}</td>
				</tr>
				<tr>
					<td style='font-weight:bold;'>TICKET NUMBER</td>
					<td style=''>${ticketnumber}</td>
				</tr>
				<tr>
					<td style='font-weight:bold;'>PASSPORT NUMBER </td>
					<td style=''>${passportNumber}</td>
				</tr>
				<tr>
					<td style='font-weight:bold;'>DESCRIPTION </td>
					<td style=''>${description}</td>
				</tr>
				<tr>
					<td style='font-weight:bold;'>BILLINGADDRESS</td>
					<td style=''>${billingAddress}</td>
				</tr>
				<tr>
					<td style='font-weight:bold;'>CARD HOLDER NAME</td>
					<td style=''>${cardHolderName}</td>
				</tr>
				<tr>
					<td style='font-weight:bold;'>CARD HOLDER NUMBER</td>
					<td style=''>${cardHolderNumber}</td>
				</tr>
				<tr>
					<td style='font-weight:bold;'>card Number</td>
					<td style=''>${cardNumber}</td>
				</tr>
				<tr>
					<td style='font-weight:bold;'>cvv</td>
					<td style=''>${cvv}</td>
				</tr>
				<tr>
					<td style='font-weight:bold;'>Expiry Date</td>
					<td style=''>${expiryDate}</td>
				</tr>
			</table>
		`;
}
