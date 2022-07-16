import React, {useState, useEffect} from 'react';
import AddNewRecordForm from './AddTicketForm/AddNewRecordForm';
import {Formik, Form} from 'formik';
import valid from 'card-validator';
import * as Yup from 'yup';
import axios from 'axios';

//mui
import {Grid, Box, Typography, Button, TextField, InputAdornment, FormControlLabel, FormLabel, FormControl, Checkbox, Card, CardHeader, CardContent, IconButton} from '@mui/material';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {BASEURL, successToast} from '../../utils/Utils';
import {useNavigate} from 'react-router-dom';
// mui Icon
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

// custom Formik field
import Textfield from './FormField/Textfield';

const AddNewRecord = ({isView, data}) => {
	const navigate = useNavigate();

	// const phoneRegExp = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;
	const phoneRegExp = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;

	const [inputList, setInputList] = useState([
		{
			cardHolderName: '',
			cardHolderNumber: '',
			cardNumber: '',
			expiryDate: null,
			cvv: null,
			billingAddress: '',
		},
	]);
	const [isCompanyCard, setIsCompanyCard] = useState(false);

	const items = [
		{
			name: 'ccTimes',
			label: 'CC USED HOW MANY TIMES? ',
		},
		{
			name: 'ccAmount',
			label: 'COMPANY CC USED AMOUNT',
		},
		{
			name: 'ccDigits',
			label: 'LAST 4 DIGITS OF OF COMPANY CC ',
		},
	];
	var err = [];
	const yesterday = new Date(Date.now());
	// const INITIAL_FORM_STATE = {
	// 	firstName: 'john',
	// 	lastName: 'doe',
	// 	email: 'john@doe.com',
	// 	phone: 9874561230,
	// 	//
	// 	alternateEmail: '',
	// 	alternatePhone: '',
	// 	//
	// 	pnrNo: '1 SS2 5D5D D5JCJHBDC CNCAJNHC CSCS',
	// 	airlineCode: 'DL',
	// 	airlineLocator: 'H3YKZI',
	// 	//
	// 	bookingType: 'new',
	// 	bookedOn: 'trippro',
	// 	fareType: 'publish',
	// 	//
	// 	productType: '',

	// 	//
	// 	mcoNo: 55,
	// 	totalInhouseCharge: 20,
	// 	adultCount: 2,
	// 	childCount: 2,
	// 	elderCount: 0,
	// 	grandTotal: 2,
	// 	childPrice: 2,
	// 	adultPrice: 2,
	// 	elderPrice: 0,
	// 	//date
	// 	departureDate: null,
	// 	returnDate: null,
	// 	//companyCard details
	// 	isCompanyCCUsed: isCompanyCard,
	// 	ccTimes: '',
	// 	ccAmount: '',
	// 	ccDigits: '',

	// 	//paymentCard
	// 	card: inputList,
	// };

	const INITIAL_FORM_STATE = {
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		//
		alternateEmail: null,
		alternatePhone: null,
		//
		pnrNo: '',
		airlineCode: '',
		airlineLocator: '',
		//
		bookingType: null,
		bookedOn: 'web',
		fareType: null,
		//
		productType: '',

		//
		mcoNo: '',
		totalInhouseCharge: '',
		adultCount: 1,
		childCount: 0,
		elderCount: 0,
		grandTotal: '',
		childPrice: '',
		adultPrice: 0,
		elderPrice: '',
		//date
		departureDate: null,
		returnDate: null,
		//companyCard details
		isCompanyCCUsed: isCompanyCard,
		ccTimes: '',
		ccAmount: '',
		ccDigits: '',

		//paymentCard
		card: inputList,
		//update
		remarks: '',
	};

	const FORM_VALIDATION = Yup.object({
		//basic
		firstName: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
		lastName: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
		email: Yup.string().email('Invalid email address').required('Required'),
		phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Required'),

		alternateEmail: Yup.string()
			.email('Invalid email address')
			//.notOneOf([Yup.ref('email')], 'alternative Email should be unique')
			.nullable(),

		alternatePhone: Yup.string()
			.matches(phoneRegExp, 'Phone number is not valid')
			//.notOneOf([Yup.ref('phone')], 'alternative phone should be unique')
			.nullable(),

		pnrNo: Yup.string().max(255),
		airlineCode: Yup.string(2).min(2).max(3, 'maximum limit for Airline code is 2 '),
		// .required('This field is Required'),
		airlineLocator: Yup.string(),
		// .required('This field is Required'),
		//
		productType: Yup.array()
			.of(
				Yup.object().shape({
					bookingType: null,
					property: Yup.string().oneOf(['flight', 'car', 'hotel', 'insurance', 'addon', null], 'Invalid Product type Please Refresh page').required('Required'),
					propertyMarkup: Yup.number('invalid Markup'),
				})
			)
			.min(1, 'please Choose at-least one Product type'),

		//dropdown
		fareType: Yup.string().oneOf(['publish', 'private', 'fxl', 'dummy', null], 'Fare Type Value is diffrent ').nullable(),
		//.required('This field is Required'),
		bookingType: Yup.string().oneOf(['new', 'exchange', 'refund', 'void', 'addon', null], 'input should be one of below value').nullable(),
		//.required('This field is Required'),
		bookedOn: Yup.string().oneOf(['web', 'trippro', 'skybird', 'picasso', null], 'input should be one of below value').nullable(),
		//.required('This field is Required'),

		//currency
		mcoNo: Yup.number('input must consist if number').test(
			'number should be postive', // this is used internally by yup
			'value should be greater or Equal to 0', //validation message
			(value) => value == 0 || value > 0 || value !== ''
		),
		// .required('This field is Required'),
		totalInhouseCharge: Yup.number('input must consist if number').test(
			'number should be postive', // this is used internally by yup
			'value should be greater or Equal to 0', //validation message
			(value) => value == 0 || value > 0 || value !== ''
		),
		// .required('This field is Required'),
		grandTotal: Yup.number('input must consist if number').test(
			'number should be postive', // this is used internally by yup
			'value should be greater or Equal to 0', //validation message
			(value) => value == 0 || value > 0 || value !== ''
		),
		//.required('This field is Required'),

		//number of passenger
		adultCount: Yup.number('input must consist if number')
			.integer()
			.nullable()
			.max(9)
			.test(
				'number should be postive', // this is used internally by yup
				'value should be greater or Equal to 0', //validation message
				(value) => value == 0 || value > 0 || value !== ''
			)
			.required('required'),
		childCount: Yup.number('input must consist if number')
			.integer()
			.nullable()
			.max(9)
			.test(
				'number should be postive', // this is used internally by yup
				'value should be greater or Equal to 0', //validation message
				(value) => value == 0 || value > 0 || value !== ''
			)
			.required('required'),
		elderCount: Yup.number('input must consist if number')
			.integer()
			.nullable()
			.max(9)
			.test(
				'number should be postive', // this is used internally by yup
				'value should be greater or Equal to 0', //validation message
				(value) => value == 0 || value > 0 || value !== ''
			)
			.required('required'),

		childPrice: Yup.number('input must consist if number').when(['childCount'], (childCount, schema) => {
			return childCount > 0
				? schema
						.test(
							'number should be postive', // this is used internally by yup
							'value should be greater or Equal to 0', //validation message
							(value) => value == 0 || value > 0 || value !== ''
						)
						.required('required')
				: schema;
		}),
		adultPrice: Yup.number('input must consist if number').when(['adultCount'], (adultCount, schema) => {
			return adultCount > 0
				? schema
						.test(
							'number should be postive', // this is used internally by yup
							'value should be greater or Equal to 0', //validation message
							(value) => value == 0 || value > 0 || value !== ''
						)
						.required('required')
				: schema;
		}),
		elderPrice: Yup.number('input must consist if number').when(['elderCount'], (elderCount, schema) => {
			return elderCount > 0
				? schema
						.test(
							'number should be postive', // this is used internally by yup
							'value should be greater or Equal to 0', //validation message
							(value) => value == 0 || value > 0 || value !== ''
						)
						.required('required')
				: schema;
		}),

		//date
		departureDate: Yup.string().nullable(),
		returnDate: Yup.string().nullable(),

		//companyCard details
		isCompanyCCUsed: Yup.bool(),
		ccTimes: Yup.number('input must consist if number')
			.positive('value Should be Greater then 0')
			.integer()
			.when(['isCompanyCCUsed'], (isCompanyCCUsed, schema) => {
				return isCompanyCCUsed === true ? schema.required('required') : schema;
			}),
		ccAmount: Yup.number('input must consist if number')
			.positive('value Should be Greater then 0')
			.integer()
			.when(['isCompanyCCUsed'], (isCompanyCCUsed, schema) => {
				return isCompanyCCUsed === true ? schema.required('required') : schema;
			}),
		ccDigits: Yup.string('input must consist if number')
			.max(4, 'please enter only last 4 digits of card')
			.min(4, 'please enter only last 4 digits of card')
			.when(['isCompanyCCUsed'], (isCompanyCCUsed, schema) => {
				return isCompanyCCUsed === true ? schema.required('required') : schema;
			}),

		//Card Payment
		card: Yup.array().of(
			Yup.object().shape({
				cardHolderName: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
				cardHolderNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Phone is required'),

				cardNumber: Yup.string()
					.test(
						'test-number', // this is used internally by yup
						'Credit Card number is invalid', //validation message
						(value) => valid.number(value).isValid
					) // return true false based on validation
					.required('card number is required'),
				// .max(16, 'Must be 16 characters')
				// .min(15, 'Must be 16 characters')
				cvv: Yup.number()
					.test(
						'min 3 && max 4 digit required', // this is used internally by yup
						'atleat 3 and atmost 4 character should be there', //validation message
						(value) => {
							return value == null || value.toString().length == 3 || value.toString().length == 4;
						}
					)
					.nullable()
					.required('required'),
				expiryDate: Yup.date('please Enter valid Date').min(yesterday, 'Date cannot be in the past').nullable().required(' required').default(undefined),
				billingAddress: Yup.string().nullable().required('card number is required'),
			})
		),
		// .min(1, 'card is >= 1'),
		remarks: Yup.string(),
	});
	useEffect(() => {
		console.clear();
	});

	return (
		<>
			<Formik
				initialValues={{...INITIAL_FORM_STATE}}
				validationSchema={FORM_VALIDATION}
				onSubmit={(values) => {
					// console.log(values, inputList);
					axios
						.post(BASEURL + '/ticket/raise', {
							data: values,
							cards: inputList,
						})
						.then((res) => {
							//	console.log(res);
							navigate('/my-records');
							successToast('Conv. added Successfully');
						})
						.catch((e) => console.log(e));
				}}>
				{(props) => {
					const {errors, setFieldValue, touched, handleBlur, handleChange, values, submitCount, handleSubmit} = props;

					{
						/* console.log(errors); */
					}
					// console.log('props', props); // formik object --containg values, err, etc....
					//	console.log(errors);

					// handle input change
					const handleCardInput = (e, index) => {
						const {name, value} = e.target;
						const list = [...inputList];
						list[index][name] = value;
						setFieldValue('card', list);
						setInputList(list);
					};
					const handleDateInputChange = (index, value) => {
						const list = [...inputList];
						const name = 'expiryDate';
						list[index][name] = value;
						setInputList(list);
					};
					// handle click event of the Remove button
					const handleRemoveClick = (index) => {
						const list = [...inputList];
						list.splice(index, 1);
						setFieldValue('card', list);
						setInputList(list);
					};
					// handle click event of the Add button
					const handleAddClick = () => {
						setFieldValue('card', [
							...inputList,

							{
								cardHolderName: '',
								cardHolderNumber: '',
								cardNumber: '',
								expiryDate: null,
								cvv: '',
							},
						]);
						setInputList([
							...inputList,

							{
								cardHolderName: '',
								cardHolderNumber: '',
								cardNumber: '',
								expiryDate: null,
								cvv: '',
							},
						]);
					};

					return (
						<Form onSubmit={handleSubmit}>
							{/* Address Form */}
							<Box
								sx={{
									m: 1,
									p: 1,
									py: 3,
									bgcolor: 'background.paper',
									borderRadius: 1,
								}}>
								<AddNewRecordForm isView={isView} />
							</Box>
							{/* PAyment CArd */}
							<Box>
								{inputList.map((x, i) => {
									if (errors.card) {
										err = errors.card;
									}

									return (
										<Card key={i} sx={{p: 0, m: 0}}>
											<CardHeader sx={{py: '0 !important'}} title={'Card' + ' ' + (i + 1)} />
											<CardContent>
												<Grid container spacing={3}>
													{/* Card Holder Name field */}

													<Grid item xs={4} md={4}>
														<TextField
															name='cardHolderName'
															label='NAME ON CARD'
															fullWidth
															onChange={(e) => {
																handleCardInput(e, i);
															}}
															value={inputList[i].cardHolderName}
															error={Boolean(submitCount > 0 && err.length > 0 && err[i] !== (undefined && null) ? err[i]['cardHolderName'] : null)}
															helperText={submitCount > 0 && err.length > 0 && err[i] !== (undefined && null) ? err[i]['cardHolderName'] : null}
														/>
													</Grid>

													{/*  Card Holder Phone no. */}
													<Grid item xs={4} md={4}>
														<TextField
															type='number'
															name='cardHolderNumber'
															label='PHONE NO.'
															fullWidth
															onChange={(e) => handleCardInput(e, i)}
															value={inputList[i].cardHolderNumber}
															error={Boolean(submitCount > 0 && err.length > 0 && err[i] !== (undefined && null) ? err[i]['cardHolderNumber'] : null)}
															helperText={submitCount > 0 && err.length > 0 && err[i] !== (undefined && null) ? err[i]['cardHolderNumber'] : null}
															onBlur={handleBlur}
														/>
													</Grid>
													{/* CVV Field */}
													<Grid item xs={4} md={3}>
														<TextField
															type='number'
															name='cvv'
															label='CVV'
															fullWidth
															onChange={(e) => handleCardInput(e, i)}
															value={inputList[i].cvv}
															error={Boolean(submitCount > 0 && err.length > 0 && err[i] !== (undefined && null) ? err[i]['cvv'] : null)}
															helperText={submitCount > 0 && err.length > 0 && err[i] !== (undefined && null) ? err[i]['cvv'] : null}
														/>
													</Grid>

													{inputList.length !== 1 && (
														<Grid item xs={1} sm={1} md={1}>
															<IconButton onClick={() => handleRemoveClick(i)} color='error' sx={{mt: 1}}>
																<DeleteOutlineIcon />
															</IconButton>
														</Grid>
													)}

													{/* CardNumber Field */}
													<Grid item xs={4} md={4}>
														<TextField
															type='number'
															name='cardNumber'
															label='CARD NUMBER'
															fullWidth
															onChange={(e) => handleCardInput(e, i)}
															value={inputList[i].cardNumber}
															error={Boolean(submitCount > 0 && err.length > 0 && err[i] !== (undefined && null) ? err[i]['cardNumber'] : null)}
															helperText={submitCount > 0 && err.length > 0 && err[i] !== (undefined && null) ? err[i]['cardNumber'] : null}
														/>
													</Grid>

													{/* expiry date field */}
													<Grid item xs={4} md={4}>
														<LocalizationProvider fullWidth dateAdapter={AdapterDateFns}>
															<DatePicker
																fullWidth
																views={['year', 'month']}
																name='expiryDate'
																label='EXPIRY DATE'
																inputFormat='MM/yyyy'
																placeholder='MM/yyyy'
																minDate={new Date()}
																onChange={(newValue) => {
																	handleDateInputChange(
																		i,
																		new Date(newValue).toLocaleDateString('en-US', {
																			day: '2-digit',
																			month: '2-digit',
																			year: 'numeric',
																		})
																	);

																	// setExpiryDateValue(newValue);
																}}
																value={inputList[i].expiryDate}
																renderInput={(params) => (
																	<TextField
																		fullWidth
																		placeholder='MM/yyyy'
																		{...params}
																		error={Boolean(submitCount > 0 && err.length === Number(i + 1) ? true : false)}
																		helperText={submitCount > 0 && err.length === Number(i + 1) ? err[i].expiryDate : null}
																	/>
																)}
															/>
														</LocalizationProvider>
													</Grid>
													{/*  billing address Field */}
													<Grid item xs={6} md={4}>
														<TextField
															multiline
															rows={2}
															name='billingAddress'
															label='BILLING ADDRESS'
															fullWidth
															onChange={(e) => handleCardInput(e, i)}
															value={inputList[i].billingAddress}
															error={Boolean(submitCount > 0 && err.length > 0 && err[i] !== (undefined && null) ? err[i]['billingAddress'] : null)}
															helperText={submitCount > 0 && err.length > 0 && err[i] !== (undefined && null) ? err[i]['billingAddress'] : null}
														/>
													</Grid>

													{/*  add/Remove btn for multiple card */}

													{inputList.length < 4 && inputList.length - 1 === i && (
														<Box
															xs={12}
															md={2}
															sx={{
																display: 'flex',
																justifyContent: 'flex-end',
																width: '100%',
																my: 2,
															}}>
															<Button startIcon={<AddIcon fontSize='small' />} onClick={handleAddClick} sx={{mr: 1}}>
																Add One More Card
															</Button>
														</Box>
													)}
												</Grid>
											</CardContent>
										</Card>
									);
								})}

								<Card sx={{p: 0, m: 0}}>
									<CardHeader sx={{py: '0 !important'}} />

									<CardContent>
										<Grid container spacing={3}>
											{/*  company card  */}

											<Grid item xs={12} md={3}>
												<FormControlLabel
													control={
														<Checkbox
															checked={isCompanyCard}
															onChange={(e) => {
																setIsCompanyCard(!isCompanyCard);
																setFieldValue('isCompanyCCUsed', !isCompanyCard);
															}}
															name='companyCard'
															color='primary'
														/>
													}
													label='COMPANY CC USED ?'
												/>
											</Grid>

											{isCompanyCard &&
												items.map((item, i) => {
													const {name, label} = item;

													return (
														<Grid item xs={4} md={3} key={i}>
															<Textfield
																name={name}
																label={label}
																type='number'
																InputProps={
																	name == 'ccAmount'
																		? {
																				startAdornment: <InputAdornment position='start'>$</InputAdornment>,
																		  }
																		: null
																}
															/>
														</Grid>
													);
												})}
										</Grid>
									</CardContent>
								</Card>
							</Box>
							<Box xs={4} md={4}>
								<Button variant='contained' type='submit' sx={{mt: 3, ml: 1}}>
									submit
								</Button>
							</Box>
						</Form>
					);
				}}
			</Formik>
		</>
	);
};

export default AddNewRecord;
