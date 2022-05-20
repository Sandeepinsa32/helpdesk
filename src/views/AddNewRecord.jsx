import React, {useState, useEffect} from 'react';
import AddNewRecordForm from './components/AddTicketForm/AddNewRecordForm';
import {useFormik, Formik} from 'formik';
import valid from 'card-validator';
import * as Yup from 'yup';
import axios from 'axios';
import {Grid, Box, Alert, Typography, Button, TextField, FormControlLabel, Checkbox} from '@mui/material';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {BASEURL, successToast} from '../utils/Utils';
import {useNavigate} from 'react-router-dom';
// mui Icon
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const AddNewRecord = ({isView, data}) => {
	const navigate = useNavigate();

	const [inputList, setInputList] = useState([
		{
			cardHolderName: 'john',
			cardHolderNumber: '9876543210',
			cardNumber: '4263982640269299',
			expiryDate: null,
			cvv: '123',
		},
	]);
	const [isCompanyCard, setIsCompanyCard] = useState(false);

	// formik validation object
	const formik = useFormik({
		initialValues: {
			firstName: '',
			lastName: '',
			email: '',
			phone: '',
			//
			alternateEmail: '',
			alternatePhone: '',
			//
			pnrNo: '',
			airlineCode: '',
			airlineLocator: '',
			//
			bookingType: '',
			bookedOn: '',
			fareType: '',
			//
			productType: [],

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
		},
		validationSchema: Yup.object({
			//basic
			firstName: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
			lastName: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
			email: Yup.string().email('Invalid email address').required('Required'),
			phone: Yup.number('input must consist if number').positive('input must consist if positive number').integer().required('phone is required'),

			alternateEmail: Yup.string().email('Invalid email address'),
			alternatePhone: Yup.number('input must consist if number').positive('input must consist if positive number').integer(),

			pnrNo: Yup.string().max(255),
			airlineCode: Yup.string(2).min(2).max(3, 'maximum limit for Aieline code is 2 ').required('airlineCode is required'),
			airlineLocator: Yup.string(),
			//
			productType: Yup.array().required('Required'),

			//dropdown
			fareType: Yup.string().oneOf(['publish', 'private', 'fxl', 'dummy'], 'Fare Type Value is diffrent ').required('Required'),
			bookingType: Yup.string().oneOf(['new', 'exchange', 'refund', 'addon'], 'input should be one of below value').required('Required'),
			bookedOn: Yup.string().oneOf(['web', 'trippro', 'skybird', 'picasso'], 'input should be one of below value').required('This field is  required'),

			//currency
			mcoNo: Yup.number('input must consist if number').positive('input must consist if positive number').integer().required('This Field is required'),
			totalInhouseCharge: Yup.number('input must consist if number').positive('input must consist if positive number').integer().required('This field is  Required'),
			grandTotal: Yup.number('input must consist if number').positive('input must consist if positive number').integer().required('This field is  Required'),

			//number of passenger
			adultCount: Yup.number('input must consist if number').integer().required('This field is  Required'),
			childCount: Yup.number('input must consist if number').integer().required('This field is  Required'),
			elderCount: Yup.number('input must consist if number').integer().required('This field is  Required'),

			childPrice: Yup.number('input must consist if number')
				.positive('input must consist if positive number')
				.integer()
				.when(['childCount'], (childCount, schema) => {
					return childCount > 0 ? schema.required('this field required ') : schema;
				}),
			adultPrice: Yup.number('input must consist if number')
				.positive('input must consist if positive number')
				.integer()
				.when(['adultCount'], (adultCount, schema) => {
					return adultCount > 0 ? schema.required('this field required ') : schema;
				}),
			elderPrice: Yup.number('input must consist if number')
				.positive('input must consist if positive number')
				.integer()
				.when(['elderCount'], (elderCount, schema) => {
					return elderCount > 0 ? schema.required('this field required ') : schema;
				}),

			//date
			departureDate: Yup.string().required('This field is required').nullable(),
			returnDate: Yup.string().required('please enter  DepartureDate value first ,This field is required').nullable(),

			//companyCard details
			isCompanyCCUsed: Yup.bool(),
			ccTimes: Yup.number('input must consist if number')
				.positive('input must consist if positive number')
				.integer()
				.when(['isCompanyCCUsed'], (isCompanyCCUsed, schema) => {
					return isCompanyCCUsed === true ? schema.required('this field required ') : schema;
				}),
			ccAmount: Yup.number('input must consist if number')
				.positive('input must consist if positive number')
				.integer()
				.when(['isCompanyCCUsed'], (isCompanyCCUsed, schema) => {
					return isCompanyCCUsed === true ? schema.required('this field required ') : schema;
				}),
			ccDigits: Yup.number('input must consist if number')
				.min(4, 'please enter only last 4 digits of card')
				.positive('input must consist if positive number')
				.when(['isCompanyCCUsed'], (isCompanyCCUsed, schema) => {
					return isCompanyCCUsed === true ? schema.required('this field required ') : schema;
				}),

			//Card Payment
			card: Yup.array()
				.of(
					Yup.object().shape({
						cardHolderName: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
						cardHolderNumber: Yup.number('input must consist of number').positive('input must consist of positive number').integer().required('Phone is required'),

						cardNumber: Yup.string()
							.test(
								'test-number', // this is used internally by yup
								'Credit Card number is invalid', //validation message
								(value) => valid.number(value).isValid
							) // return true false based on validation
							.required()
							.max(16, 'Must be 16 characters')
							.min(16, 'Must be 16 characters'),
						cvv: Yup.number()
							.positive('input must consist of positive number')
							.integer()
							.test('len', 'Max 4 numbers', (val) => val.toString().length >= 3 && val.toString().length <= 4),
						expiryDate: Yup.string().required('This field is required').nullable(),
					})
				)
				.min(1, 'card is >= 1'),
		}),
		onSubmit: () => {
			console.log(formik.values, inputList);
			console.log(formik.values.productType);
			axios
				.post(BASEURL + '/ticket/raise', {
					data: formik.values,
					cards: inputList,
				})
				.then((res) => {
					console.log(res);
					navigate('/my-records');
					successToast('Conv. added Successfully');
				})
				.catch((e) => console.log(e));
		},
	});

	// handle input change
	const handleCardInput = (e, index) => {
		const {name, value} = e.target;
		const list = [...inputList];
		list[index][name] = value;
		formik.setFieldValue('card', list);
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
		formik.setFieldValue('card', list);
		setInputList(list);
	};

	// handle click event of the Add button
	const handleAddClick = () => {
		formik.setFieldValue('card', [
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

	return (
		<>
			<Formik>
				<form onSubmit={formik.handleSubmit}>
					{/* Address Form */}
					<Box
						sx={{
							m: 1,
							p: 1,
							py: 3,
							bgcolor: 'background.paper',
							borderRadius: 1,
						}}>
						<AddNewRecordForm formik={formik} isView={isView} />
					</Box>
					{/*  card Payment */}
					<Box sx={{m: 1}}>
						<Typography variant='h6' gutterBottom sx={{my: 4}}>
							Payment method :
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
							return (
								<Grid key={i} container spacing={3}>
									{/* Card Holder Name field */}
									<Grid item xs={4} md={2}>
										<TextField
											// required
											name='cardHolderName'
											label='NAME ON CARD'
											fullWidth
											autoComplete='cc-name'
											onChange={(e) => {
												handleCardInput(e, i);
											}}
											value={inputList[i].cardHolderName}
											// error={Boolean(formik.errors.card !== (undefined && null) ? (formik.errors.card ? formik.errors.card[i].cardHolderName ? formik.errors.card[i].cardHolderName : null) : null)}
											// helperText={formik.errors.card !== (undefined && null) ? (formik.errors.card[i].cardHolderName ? formik.errors.card[i].cardHolderName : null) : null}
										/>
									</Grid>

									{/*  Card Holder Phone no. */}
									<Grid item xs={4} md={3}>
										<TextField
											// required
											name='cardHolderNumber'
											label='PHONE NO.'
											fullWidth
											onChange={(e) => handleCardInput(e, i)}
											value={inputList[i].cardHolderNumber}
											// error={Boolean(formik.errors.card !== undefined ? (formik.errors.card[i].cardHolderNumber ? formik.errors.card[i].cardHolderNumber : null) : null)}
											// helperText={formik.errors.card !== undefined ? (formik.errors.card[i].cardHolderNumber ? formik.errors.card[i].cardHolderNumber : null) : null}
											onBlur={formik.handleBlur}
										/>
									</Grid>
									{/* CardNumber Field */}
									<Grid item xs={4} md={3}>
										<TextField
											// required
											name='cardNumber'
											label='CARD NUMBER'
											fullWidth
											autoComplete='cc-number'
											onChange={(e) => handleCardInput(e, i)}
											value={inputList[i].cardNumber}
											// error={Boolean(formik.errors.card !== undefined ? (formik.errors.card[i].cardNumber ? formik.errors.card[i].cardNumber : null) : null)}
											// helperText={formik.errors.card !== undefined ? (formik.errors.card[i].cardNumber ? formik.errors.card[i].cardNumber : null) : null}
										/>
									</Grid>
									{/* CVV Field */}
									<Grid item xs={4} md={2}>
										<TextField
											// required
											name='cvv'
											label='CVV'
											fullWidth
											autoComplete='cc-csc'
											onChange={(e) => handleCardInput(e, i)}
											value={inputList[i].cvv}
											// error={Boolean(formik.errors.card !== undefined ? (formik.errors.card[i].cvv ? formik.errors.card[i].cvv : null) : null)}
											// helperText={formik.errors.card !== undefined ? (formik.errors.card[i].cvv ? formik.errors.card[i].cvv : null) : null}
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
												// spiryDate : null) : null)}
												// helperText={formik.errors.card !== undefined ? (formik.errors.card[i].expiryDate ? formik.errors.card[i].expiryDate : null) : null}
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
												renderInput={(params) => <TextField placeholder='MM/yyyy' {...params} />}
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
												formik.setFieldValue('isCompanyCCUsed', !isCompanyCard);
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

									console.log('print ->', formik.touched, formik.errors[name]);
									return (
										<Grid item xs={4} md={3} key={i}>
											<TextField
												name={name}
												label={label}
												fullWidth
												error={formik.touched[name] && formik.errors[name]}
												helperText={formik.touched[name] && formik.errors[name]}
												onBlur={formik.handleBlur}
												onChange={formik.handleChange}
												value={formik.values.name}
											/>
										</Grid>
									);
								})}
						</Grid>
					</Box>
					{/* Formik alert one  */}
					<Box xs={8} md={10}>
						{Object.keys(formik.errors).length !== 0 && formik.errors && (
							<Alert variant='outlined' severity='error'>
								{JSON.stringify(formik.errors)}
							</Alert>
						)}
					</Box>
					<Box xs={4} md={4}>
						<Button variant='contained' type='submit' sx={{mt: 3, ml: 1}}>
							submit
						</Button>
					</Box>
				</form>
			</Formik>
		</>
	);
};

export default AddNewRecord;
