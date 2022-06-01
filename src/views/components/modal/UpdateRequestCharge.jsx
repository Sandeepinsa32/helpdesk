import React, {useState, useEffect} from 'react';
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Textfield from '../FormField/Textfield';

// mui
import {Grid, Box, Typography, Button, TextField, InputAdornment, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Checkbox} from '@mui/material';
import {BASEURL, errorToast} from '../../../utils/Utils';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';

function UpdateRequestCharge({formData}) {
	console.log(formData);

	const {_id, cardHolderName, cardHolderNumber, cardNumber, cvv, expiryDate, amount, address, description, markup, email, phone} = formData;
	const [cardDetail, setCardDetail] = useState();
	const [selectedCard, setSelectedCard] = useState();
	const [disable, setDisable] = useState(true);

	const phoneRegExp = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;
	const INITIAL_FORM_STATE = {
		cardHolderName: cardHolderName,
		cardHolderNumber: phone,
		cardNumber: cardNumber,
		cvv: cvv,
		expiryDate: expiryDate,
		email: email,
		phone: phone,
		amount: amount,
		address: address,
		description: description,
		markup: markup,
		comment: '',
		status: '',
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
		description: Yup.string(),
		comment: Yup.string().required('Required'),
		status: Yup.string().required('Required'),
	});

	function formateDate(value) {
		let today = new Date(value);
		let dd = String(today.getDate()).padStart(2, '0');
		let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
		let yyyy = today.getFullYear();

		today = mm + '/' + yyyy;
		return today;
	}

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
					console.log(errors);
					return (
						<Form onSubmit={handleSubmit}>
							<Box sx={{m: 1}}>
								<Typography variant='h6' gutterBottom sx={{my: 4}}>
									View Charge Request :
								</Typography>
							</Box>

							<Grid container spacing={3}>
								{/* Card Holder NAme field */}
								{/* <Grid item xs={4} md={2}>
									<Textfield name='cardHolderName' label='NAME ON CC' disabled={disable} />
								</Grid> */}
								{/* Card Holder Phone no. */}
								{/* <Grid item xs={4} md={2}>
									<Textfield name='cardHolderNumber' label='PHONE NO.' disabled={disable} />
								</Grid> */}
								{/*  EMail Fields */}
								<Grid item xs={4} md={4} sm={3}>
									<Textfield name='email' label='EMAIL' disabled={disable} />
								</Grid>
								{/* CardNumber Field */}
								<Grid item xs={4} md={3}>
									<Textfield name='cardNumber' label='CARD NUMBER' disabled={disable} />
								</Grid>
								{/* CVV Field */}
								<Grid item xs={4} md={2}>
									<Textfield name='cvv' label='CVV' disabled={disable} />
								</Grid>
								{/* expiry date field */}
								<Grid item xs={4} md={3}>
									<LocalizationProvider fullWidth disabled={disable} dateAdapter={AdapterDateFns}>
										<DatePicker
											fullWidth
											disabled={disable}
											views={['year', 'month']}
											name='expiryDate'
											label='EXPIRY DATE'
											inputFormat='MM/yyyy'
											placeholder='MM/yyyy'
											value={values.expiryDate}
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
								{/*  Phone Fields */}
								<Grid item xs={4} md={4} sm={4}>
									<Textfield name='phone' label='PHONE' disabled={disable} />
								</Grid>
								{/*  AMOUNT Fields */}
								<Grid item xs={3} sm={3} md={2}>
									<Textfield
										name='amount'
										label='AMOUNT'
										disabled={disable}
										InputProps={{
											startAdornment: <InputAdornment position='start'>$</InputAdornment>,
										}}
									/>
								</Grid>
								{/*  MARKUP Fields */}
								<Grid item xs={3} sm={3} md={2}>
									<Textfield
										disabled={disable}
										name='markup'
										label='MARKUP'
										InputProps={{
											startAdornment: <InputAdornment position='start'>$</InputAdornment>,
										}}
									/>
								</Grid>
								{/* Description Fields */}
								<Grid item xs={4} md={4} sm={4}>
									<Textfield name='description' disabled={disable} label='DESCRIPTION' multiline rows={2} />
								</Grid>
								{/* ADDRESS Fields */}
								<Grid item xs={4} md={4} sm={4}>
									<Textfield name='address' label='ADDRESS' disabled={disable} multiline rows={2} />
								</Grid>
								<Grid item xs={4} md={4} sm={4}>
									<Textfield name='comment' label='COMMENT' multiline rows={2} />
								</Grid>
								<Grid item xs={12} sm={6} md={4}>
									<FormControl fullWidth>
										<InputLabel id='Status-label'>Status</InputLabel>
										<Select
											labelId='Status-label'
											fullWidth
											name='status'
											label='Status'
											error={Boolean(touched.status && errors.status)}
											value={values.status}
											onChange={handleChange}>
											<MenuItem value='approve'>APPROVE</MenuItem>
											<MenuItem value='decline'>DECLINE</MenuItem>
										</Select>
									</FormControl>
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

export default UpdateRequestCharge;
