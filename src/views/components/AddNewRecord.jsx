import React, {useState, useEffect} from 'react';
import AddNewRecordForm from './AddTicketForm/AddNewRecordForm';
import {Formik, Form} from 'formik';
import valid from 'card-validator';
import * as Yup from 'yup';
import axios from 'axios';

//mui
import {Grid, Box, Typography, Button, TextField, InputAdornment, FormControlLabel, FormLabel, FormControl, Checkbox} from '@mui/material';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {BASEURL, successToast} from '../../utils/Utils';
import {useNavigate} from 'react-router-dom';
// mui Icon
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

// custom Formik field
import Textfield from './FormField/Textfield';

const AddNewRecord = ({isView, data}) => {
	const navigate = useNavigate();

	const phoneRegExp = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;

	const [inputList, setInputList] = useState([
		{
			cardHolderName: '',
			cardHolderNumber: '',
			cardNumber: '',
			expiryDate: null,
			cvv: '',
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
		bookingType: '',
		bookedOn: 'web',
		fareType: '',
		//
		productType: '',

		//
		mcoNo: '',
		totalInhouseCharge: '',
		adultCount: '',
		childCount: '',
		elderCount: '',
		grandTotal: '',
		childPrice: '',
		adultPrice: '',
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
			.notOneOf([Yup.ref('email')], 'alternative Email should be unique')
			.nullable(),

		alternatePhone: Yup.string()
			.matches(phoneRegExp, 'Phone number is not valid')
			.notOneOf([Yup.ref('phone')], 'alternative phone should be unique')
			.nullable(),

		pnrNo: Yup.string().max(255),
		airlineCode: Yup.string(2).min(2).max(3, 'maximum limit for Aieline code is 2 '),
		airlineLocator: Yup.string(),
		//
		productType: Yup.array().required('Phone is required'),

		//dropdown
		fareType: Yup.string().oneOf(['publish', 'private', 'fxl', 'dummy'], 'Fare Type Value is diffrent '),
		bookingType: Yup.string().oneOf(['new', 'exchange', 'refund', 'void', 'addon'], 'input should be one of below value'),
		bookedOn: Yup.string().oneOf(['web', 'trippro', 'skybird', 'picasso'], 'input should be one of below value'),

		//currency
		mcoNo: Yup.number('input must consist if number').test(
			'number should be postive', // this is used internally by yup
			'value should be greater or Equal to 0', //validation message
			(value) => value == 0 || value > 0 || value !== ''
		),
		totalInhouseCharge: Yup.number('input must consist if number').test(
			'number should be postive', // this is used internally by yup
			'value should be greater or Equal to 0', //validation message
			(value) => value == 0 || value > 0 || value !== ''
		),
		grandTotal: Yup.number('input must consist if number').test(
			'number should be postive', // this is used internally by yup
			'value should be greater or Equal to 0', //validation message
			(value) => value == 0 || value > 0 || value !== ''
		),

		//number of passenger
		adultCount: Yup.number('input must consist if number')
			.integer()
			.nullable()
			.max(9)
			.test(
				'number should be postive', // this is used internally by yup
				'value should be greater or Equal to 0', //validation message
				(value) => value == 0 || value > 0 || value !== ''
			),
		childCount: Yup.number('input must consist if number')
			.integer()
			.nullable()
			.max(9)
			.test(
				'number should be postive', // this is used internally by yup
				'value should be greater or Equal to 0', //validation message
				(value) => value == 0 || value > 0 || value !== ''
			),
		elderCount: Yup.number('input must consist if number')
			.integer()
			.nullable()
			.max(9)
			.test(
				'number should be postive', // this is used internally by yup
				'value should be greater or Equal to 0', //validation message
				(value) => value == 0 || value > 0 || value !== ''
			),

		childPrice: Yup.number('input must consist if number').when(['childCount'], (childCount, schema) => {
			return childCount > 0
				? schema.test(
						'number should be postive', // this is used internally by yup
						'value should be greater or Equal to 0', //validation message
						(value) => value == 0 || value > 0 || value !== ''
				  )
				: schema;
		}),
		adultPrice: Yup.number('input must consist if number').when(['adultCount'], (adultCount, schema) => {
			return adultCount > 0
				? schema.test(
						'number should be postive', // this is used internally by yup
						'value should be greater or Equal to 0', //validation message
						(value) => value == 0 || value > 0 || value !== ''
				  )
				: schema;
		}),
		elderPrice: Yup.number('input must consist if number').when(['elderCount'], (elderCount, schema) => {
			return elderCount > 0
				? schema.test(
						'number should be postive', // this is used internally by yup
						'value should be greater or Equal to 0', //validation message
						(value) => value == 0 || value > 0 || value !== ''
				  )
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
				return isCompanyCCUsed === true ? schema : schema;
			}),
		ccAmount: Yup.number('input must consist if number')
			.positive('value Should be Greater then 0')
			.integer()
			.when(['isCompanyCCUsed'], (isCompanyCCUsed, schema) => {
				return isCompanyCCUsed === true ? schema : schema;
			}),
		ccDigits: Yup.string('input must consist if number')
			.max(4, 'please enter only last 4 digits of card')
			.min(4, 'please enter only last 4 digits of card')
			.when(['isCompanyCCUsed'], (isCompanyCCUsed, schema) => {
				return isCompanyCCUsed === true ? schema : schema;
			}),

		//Card Payment
		card: Yup.array()
			.of(
				Yup.object().shape({
					cardHolderName: Yup.string().max(15, 'Must be 15 characters or less'),
					cardHolderNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Phone is required'),

					cardNumber: Yup.string()
						// 	.test(
						// 		'test-number', // this is used internally by yup
						// 		'Credit Card number is invalid', //validation message
						// 		(value) => valid.number(value).isValid
						// )
						// return true false based on validation
						.required()
						.max(16, 'Must be 16 characters')
						.min(16, 'Must be 16 characters'),
					cvv: Yup.number().test(
						'min 3 && max 4 digit required', // this is used internally by yup
						'atleat 3 and atmost 4 character should be there', //validation message
						(value) => value == 0 || value > 0
					),
					expiryDate: Yup.string().nullable(),
				})
			)
			.min(1, 'card is >= 1'),
		remarks: Yup.string().required('This field is required'),
	});

	return (
		<>
			<Formik
				initialValues={{...INITIAL_FORM_STATE}}
				validationSchema={FORM_VALIDATION}
				onSubmit={(values) => {
					console.log(values, inputList);
					axios
						.post(BASEURL + '/ticket/raise', {
							data: values,
							cards: inputList,
						})
						.then((res) => {
							console.log(res);
							navigate('/my-records');
							successToast('Conv. added Successfully');
						})
						.catch((e) => console.log(e));
				}}>
				{(props) => {
					const {errors, setFieldValue, touched, handleBlur, handleChange, values, submitCount, handleSubmit} = props;

					// console.log('props', props); // formik object --containg values, err, etc....
					console.log(errors);

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
							{/*  card Payment */}
							<Box sx={{m: 1}}>
								<Typography variant='h6' gutterBottom sx={{my: 4}}>
									Customer Card Detail:
								</Typography>
							</Box>
							{/* CC card  */}
							<Box
								sx={{
									m: 1,
									p: 2,
									py: 3,
									bgcolor: 'background.paper',
									borderRadius: 1,
								}}>
								{inputList.map((x, i) => {
									if (errors.card) {
										err = errors.card;
									}

									return (
										<Grid key={i} container spacing={3}>
											{/* Card Holder Name field */}
											<Grid item xs={4} md={1}>
												<FormControl sx={{pt: 2, ml: -2}}>
													<FormLabel id='demo-row-radio-buttons-group-label'>Card {i + 1}</FormLabel>
												</FormControl>
											</Grid>
											<Grid item xs={4} md={2}>
												<TextField
													name='cardHolderName'
													label='NAME ON CARD'
													fullWidth
													autoComplete='cc-name'
													onChange={(e) => {
														handleCardInput(e, i);
													}}
													value={inputList[i].cardHolderName}
													error={Boolean(submitCount > 0 && err.length > 0 && err[i] !== (undefined && null) ? err[i]['cardHolderName'] : null)}
													helperText={submitCount > 0 && err.length > 0 && err[i] !== (undefined && null) ? err[i]['cardHolderName'] : null}
												/>
											</Grid>

											{/*  Card Holder Phone no. */}
											<Grid item xs={4} md={2}>
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
											{/* CardNumber Field */}
											<Grid item xs={4} md={3}>
												<TextField
													type='number'
													name='cardNumber'
													label='CARD NUMBER'
													fullWidth
													autoComplete='cc-number'
													onChange={(e) => handleCardInput(e, i)}
													value={inputList[i].cardNumber}
													error={Boolean(submitCount > 0 && err.length > 0 && err[i] !== (undefined && null) ? err[i]['cardNumber'] : null)}
													helperText={submitCount > 0 && err.length > 0 && err[i] !== (undefined && null) ? err[i]['cardNumber'] : null}
												/>
											</Grid>
											{/* CVV Field */}
											<Grid item xs={4} md={2}>
												<TextField
													type='number'
													name='cvv'
													label='CVV'
													fullWidth
													autoComplete='cc-csc'
													onChange={(e) => handleCardInput(e, i)}
													value={inputList[i].cvv}
													error={Boolean(submitCount > 0 && err.length > 0 && err[i] !== (undefined && null) ? err[i]['cvv'] : null)}
													helperText={submitCount > 0 && err.length > 0 && err[i] !== (undefined && null) ? err[i]['cvv'] : null}
												/>
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
																placeholder='MM/yyyy'
																{...params}
																error={Boolean(submitCount > 0 && err.length === Number(i + 1) ? true : false)}
																helperText={submitCount > 0 && err.length === Number(i + 1) ? err[i].expiryDate : null}
															/>
														)}
													/>
												</LocalizationProvider>
											</Grid>
											{/*  add/Remove btn for multiple card */}
											<Box
												xs={12}
												md={2}
												sx={{
													display: 'flex',
													justifyContent: 'flex-end',
													width: '100%',
													my: 2,
												}}>
												{inputList.length !== 1 && (
													<Button startIcon={<RemoveIcon fontSize='small' />} onClick={() => handleRemoveClick(i)} sx={{mr: 1}}>
														Remove
													</Button>
												)}
												{inputList.length < 4 && inputList.length - 1 === i && (
													<Button startIcon={<AddIcon fontSize='small' />} onClick={handleAddClick} sx={{mr: 1}}>
														Add One More Card
													</Button>
												)}
											</Box>
										</Grid>
									);
								})}

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

// console.log('4263982640269299');
