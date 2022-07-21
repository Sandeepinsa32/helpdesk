import React, {useState, useEffect} from 'react';
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Textfield from '../FormField/Textfield';

// mui
import {
	Grid,
	Box,
	Typography,
	Button,
	TextField,
	InputAdornment,
	Card,
	CardHeader,
	CardContent,
	CircularProgress,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	FormControlLabel,
	Checkbox,
	CardActions,
	Divider,
} from '@mui/material';
import {BASEURL, errorToast} from '../../../utils/Utils';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';

function UpdateRequestCharge({formData, onClose}) {
	const {_id, cardHolderName, cardHolderNumber, remarks, cardNumber, cvv, expiryDate, amount, address, description, markup, email, phone, bookingId} = formData;
	console.log('formData', formData);

	const [cardDetail, setCardDetail] = useState();
	const [selectedCard, setSelectedCard] = useState();
	const [disable, setDisable] = useState(true);
	const [isLoading, setIsLoading] = useState(true);

	// const phoneRegExp = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;

	const phoneRegExp = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;

	function formateDate(value) {
		let today = new Date(value);
		let dd = String(today.getDate()).padStart(2, '0');
		let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
		let yyyy = today.getFullYear();

		today = mm + '/' + yyyy;
		return today;
	}

	const FORM_VALIDATION = Yup.object({
		// cardHolderName: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
		cardHolderNumber: Yup.string().required('phone is required').matches(phoneRegExp, 'Phone number is not valid'),
		cardNumber: Yup.string(),
		email: Yup.string().email('Invalid email address'),
		// .required('Required'),
		phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
		// .required('Phone is required'),
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

	const fetchCards = async (id) => {
		setIsLoading(true);
		axios
			.post(BASEURL + '/ticket/mask/', {
				id,
				cardNumber,
				cvv,
			})
			.then((response) => {
				setCardDetail(response.data.data['cardNumber']);
				setIsLoading(false);
			})
			.catch((e) => {
				console.log(e);
				setIsLoading(false);
			});
	};

	useEffect(() => {
		fetchCards(bookingId);
	}, []);

	const INITIAL_FORM_STATE = {
		// cardHolderName: cardHolderName,
		cardHolderNumber: phone,
		cardNumber: cardNumber,
		cvv: cvv,
		expiryDate: expiryDate,
		email: email,
		phone: phone,
		amount: amount,
		address: address,
		description: remarks,
		markup: markup,
		comment: '',
		status: '',
	};

	return (
		<>
			<Formik
				initialValues={{...INITIAL_FORM_STATE}}
				validationSchema={FORM_VALIDATION}
				onSubmit={(values) => {
					// console.log('formik submitted', values, bookingId);
					setIsLoading(true);
					axios
						.put(BASEURL + `/ticket/payment/${bookingId}`, {
							id: bookingId,
							status: values.status,
							description: values.comment,
						})
						.then((res) => {
							console.log(res.data);
							setIsLoading(false);
							onClose();
						})
						.catch((e) => {
							console.log(e);
							setIsLoading(false);
						});
				}}>
				{(props) => {
					const {errors, setFieldValue, touched, handleBlur, handleChange, values, submitCount, handleSubmit} = props;
					return (
						<Card>
							<Form onSubmit={handleSubmit}>
								<CardHeader title='	View Charge Request :' />
								<Divider />
								<CardContent>
									{isLoading ? (
										<div
											style={{
												display: 'flex',
												justifyContent: 'center',
												margin: '10%',
											}}>
											<CircularProgress />
										</div>
									) : (
										<Grid container spacing={3}>
											{/* Card Holder NAme field */}

											{/*  EMail Fields */}
											<Grid item xs={4} md={4} sm={3}>
												<Textfield name='email' label='EMAIL' disabled={disable} />
											</Grid>
											{/* CardNumber Field */}
											<Grid item xs={4} md={3}>
												<Textfield name='cardNumber' label='CARD NUMBER' disabled={disable} value={cardDetail} />
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
														<MenuItem value='accepted'>ACCEPTED</MenuItem>
														<MenuItem value='declined'>DECLINE</MenuItem>
														<MenuItem value='rejected'>REJECTED</MenuItem>
														{/* "accepted", "declined", "new", "rejected" */}
													</Select>
												</FormControl>
											</Grid>
										</Grid>
									)}
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

export default UpdateRequestCharge;
