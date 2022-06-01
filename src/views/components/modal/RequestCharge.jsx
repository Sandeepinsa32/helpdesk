import React, {useState, useEffect} from 'react';
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Textfield from '../FormField/Textfield';

// mui
import {Grid, Box, Alert, Typography, Button, TextField, InputAdornment, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Checkbox} from '@mui/material';
import {BASEURL, errorToast, successToast} from '../../../utils/Utils';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';

// mui Icon
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
function RequestCharge({data}) {
	console.log(data);
	const {bookingId, _id, email, phone} = data;
	const [cardDetail, setCardDetail] = useState();
	const [selectedCard, setSelectedCard] = useState();
	const phoneRegExp = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;
	const INITIAL_FORM_STATE = {
		cardHolderName: '',
		cardHolderNumber: '',
		cardNumber: '',
		cvv: '',
		expiryDate: null,
		email: email,
		phone: phone,
		amount: '',
		address: '',
		remarks: '',
		markup: '',
	};
	const FORM_VALIDATION = Yup.object({
		cardHolderName: Yup.string(),
		cardHolderNumber: Yup.string(),
		cardNumber: Yup.string(),
		email: Yup.string().email('Invalid email address').required('Required'),
		phone: Yup.string().required('phone is required').matches(phoneRegExp, 'Phone number is not valid').required('Phone is required'),
		cvv: Yup.number(),
		expiryDate: Yup.string().nullable(),
		amount: Yup.number('input must consist if number')
			// .required('This Field is required')
			.test(
				'number should be postive', // this is used internally by yup
				'value should be greater or Equal to 0', //validation message
				(value) => value == 0 || value > 0
			),
		markup: Yup.number('input must consist if number')
			// .required('This Field is required')
			.test(
				'number should be postive', // this is used internally by yup
				'value should be greater or Equal to 0', //validation message
				(value) => value == 0 || value > 0
			),
		address: Yup.string(),
		remarks: Yup.string(),
	});
	// console.log(data);

	const fetchCards = async (id) => {
		axios
			.get(BASEURL + '/ticket/details/' + id)
			.then((response) => {
				setCardDetail(response.data.data);
			})
			.catch((e) => console.log(e));
	};

	function formateDate(value) {
		let today = new Date(value);
		let dd = String(today.getDate()).padStart(2, '0');
		let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
		let yyyy = today.getFullYear();

		today = mm + '/' + yyyy;
		return today;
	}

	useEffect(() => {
		fetchCards(_id);
	}, []);

	return (
		<>
			<Formik
				initialValues={{...INITIAL_FORM_STATE}}
				validationSchema={FORM_VALIDATION}
				onSubmit={(values) => {
					console.log('formik submitted', values, bookingId);
					axios
						.post(BASEURL + `/charge/`, {...values, ticket: _id})
						.then((res) => {
							console.log(res.data);
							successToast('Request sent to admin');
						})
						.catch((e) => {
							console.log(e);
							errorToast(e.response.data.message);
						});
				}}>
				{(props) => {
					const {errors, setFieldValue, touched, handleBlur, handleChange, values, submitCount, handleSubmit} = props;
					console.log(errors);
					return (
						<Form onSubmit={handleSubmit}>
							<Box sx={{m: 1}}>
								<Typography variant='h6' gutterBottom sx={{my: 4}}>
									Request Charge :
								</Typography>
							</Box>

							<Grid container spacing={3}>
								<Grid item xs={12} sm={6} md={6} sx={{my: 3}}>
									<FormControl fullWidth>
										<InputLabel id='CARD-label'>Card</InputLabel>
										<Select
											labelId='CARD-label'
											fullWidth
											name='cardValue'
											label=' CARD'
											error={Boolean(touched.cardValue && errors.cardValue)}
											value={values.cardValue}
											onChange={(e) => {
												const {cardHolderName, cardHolderNumber, cardNumber, cvv, expiryDate} = e.target.value;
												setFieldValue('cardHolderName', cardHolderName);
												setFieldValue('cardHolderNumber', cardHolderNumber);
												setFieldValue('cardNumber', cardNumber);
												setFieldValue('cvv', cvv);
												setFieldValue('expiryDate', expiryDate);
											}}>
											{cardDetail &&
												cardDetail.map((x, i) => {
													const {_id, cardHolderName, cardNumber} = x;
													return (
														<MenuItem value={x}>
															{cardHolderName}-{cardNumber}
														</MenuItem>
													);
												})}
										</Select>
									</FormControl>
								</Grid>
							</Grid>

							<Grid container spacing={3}>
								{/* Card Holder NAme field */}
								<Grid item xs={4} md={2}>
									<Textfield name='cardHolderName' label='NAME ON CC' disabled={true} />
								</Grid>
								{/*  Card Holder Phone no. */}
								<Grid item xs={4} md={2}>
									<Textfield name='cardHolderNumber' label='PHONE NO.' disabled={true} />
								</Grid>
								{/* CardNumber Field */}
								<Grid item xs={4} md={3}>
									<Textfield name='cardNumber' label='CARD NUMBER' disabled={true} />
								</Grid>
								{/* CVV Field */}
								<Grid item xs={4} md={2}>
									<Textfield name='cvv' label='CVV' disabled={true} />
								</Grid>
								{/* expiry date field */}
								<Grid item xs={4} md={3}>
									<LocalizationProvider fullWidth disabled={true} dateAdapter={AdapterDateFns}>
										<DatePicker
											disabled={true}
											fullWidth
											views={['year', 'month']}
											name='expiryDate'
											label='EXPIRY DATE'
											inputFormat='MM/yyyy'
											placeholder='MM/yyyy'
											value={values.expiryDate}
											renderInput={(params) => <TextField placeholder='MM/yyyy' {...params} />}
										/>
									</LocalizationProvider>
								</Grid>
								<Grid item xs={12} md={12}></Grid>
							</Grid>

							<Grid container spacing={3}>
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
								{/* remarks Fields */}
								<Grid item xs={4} md={4} sm={4}>
									<Textfield name='remarks' label='DESCRIPTION' />
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
