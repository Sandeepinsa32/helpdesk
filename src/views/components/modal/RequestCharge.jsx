import React, {useState, useEffect} from 'react';
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Textfield from '../FormField/Textfield';

// mui
import {
	Grid,
	Box,
	Alert,
	Typography,
	Button,
	TextField,
	InputAdornment,
	CircularProgress,
	Card,
	CardHeader,
	CardContent,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	FormControlLabel,
	Checkbox,
	CardActions,
	Divider,
} from '@mui/material';
import {BASEURL, errorToast, successToast} from '../../../utils/Utils';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';

// mui Icon
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
function RequestCharge({data, onClose}) {
	const {bookingId, _id, email, phone} = data;
	const [cardDetail, setCardDetail] = useState();
	const [selectedCard, setSelectedCard] = useState();

	const [isLoading, setIsLoading] = useState(false);

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
		cardNumber: Yup.string().required('This is Field is required'),
		email: Yup.string().email('Invalid email address').required('Required'),
		phone: Yup.string().required('phone is required').matches(phoneRegExp, 'Phone number is not valid').required('Phone is required'),
		cvv: Yup.number().required('This is Field is required'),
		expiryDate: Yup.string().nullable().required('This is Field is required'),
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
		address: Yup.string().required('This is Field is required'),
		remarks: Yup.string().required('This is Field is required'),
	});
	// console.log(data);

	const fetchCards = async (id) => {
		setIsLoading(true);
		axios
			.get(BASEURL + '/ticket/details/' + id)
			.then((response) => {
				setCardDetail(response.data.data);
				setIsLoading(false);
			})
			.catch((e) => {
				console.log(e);
				setIsLoading(false);
			});
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
					axios
						.post(BASEURL + `/charge/`, {
							...values,
							ticket: bookingId,
							phone: values.cardHolderNumber,
						})
						.then((res) => {
							successToast('Request sent to admin');
							onClose();
						})
						.catch((e) => {
							console.log(e);
							errorToast(e.response.data.message);
						});
				}}>
				{(props) => {
					const {errors, setFieldValue, touched, handleBlur, handleChange, values, submitCount, handleSubmit} = props;
					console.log(values);
					return (
						<Card>
							<Form onSubmit={handleSubmit}>
								<CardHeader title='Request Charge' />
								<Divider />
								<CardContent>
									{isLoading ? (
										<Box
											sx={{
												display: 'flex',
												justifyContent: 'center',
												alignItems: 'center',
												minHeight: '50vh',
											}}>
											<CircularProgress />
										</Box>
									) : (
										<>
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
																const {cardHolderName, cardHolderNumber, cardNumber, cvv, expiryDate, billingAddress} = e.target.value;
																setFieldValue('cardHolderName', cardHolderName);
																setFieldValue('cardHolderNumber', cardHolderNumber);
																setFieldValue('cardNumber', cardNumber);
																setFieldValue('cvv', cvv);
																setFieldValue('expiryDate', expiryDate);
																setFieldValue('address', billingAddress);
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

												{/* ADDRESS Fields */}
												<Grid item xs={4} md={4} sm={4}>
													<Textfield name='address' label='ADDRESS' multiline rows={2} value={values.address} disabled={true} />
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
												<Grid item xs={6} md={6} sm={6}>
													<Textfield name='remarks' label='DESCRIPTION' multiline rows={4} />
												</Grid>
											</Grid>
										</>
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

export default RequestCharge;
