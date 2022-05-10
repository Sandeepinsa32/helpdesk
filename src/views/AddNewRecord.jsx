import React, {useState, useEffect} from 'react';
import AddNewRecordForm from './components/AddTicketForm/AddNewRecordForm';
// import AddNewPaymentForm from './components/AddTicketForm/AddNewPaymentForm';
import {useFormik, Formik} from 'formik';
import * as Yup from 'yup';

import {Grid, Box, Alert, Typography, Button, TextField, FormControlLabel, Checkbox} from '@mui/material';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';

// mui Icon
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const AddNewRecord = ({isView, data}) => {
	console.log(data);
	const {
		firstName,
		lastName,
		email,
		phone,
		altEmail,
		altPhone,
		pnrNo,
		fareType,
		mcoNo,
		airlineCode,
		bookingType,
		bookedOn,
		pricePerPerson,
		productType,
		comments,
		notes,
		totalInhouseCharge,
		departureDateValue,
		returnDateValue,
		totalPassengerCount,
		adultCount,
		kidCount,
		elderCount,
		grandTotal,
		flightMarkup,
		hotelMarkup,
		carMarkup,
		insuranceMarkup,
		addonMarkup,
		kidPrice,
		adultPrice,
		elderPrice,
		ccUsedCount,
		ccAmountUsed,
		ccLastDigit,
	} = data;

	const [inputList, setInputList] = useState([{cardName: 'john', cardHolderPhn: '9876543210', cardNumber: '0858-8585-8585', expiryDate: null, cvv: '022'}]);
	const [isCompanyCard, setIsCompanyCard] = useState(false);
	const [companyCardUsed, setCompanyCardUsed] = useState(false);
	const [companyAmountUsed, setCompanyAmountUsed] = useState(false);

	// formik validation object
	const formik = useFormik({
		initialValues: {
			firstName: firstName ? firstName : 'john',
			lastName: lastName ? lastName : 'doe',
			email: email ? email : 'john@doe.com',
			phone: phone ? phone : '9874561230',
			altEmail: altEmail ? altEmail : 'jane@doe.com',
			altPhone: altPhone ? altPhone : '0321456987',
			pnrNo: pnrNo ? pnrNo : '1 ss2 5d5d d5jcjhbdc cncajnhc cscs',
			fareType: fareType ? fareType : 'publish',
			mcoNo: mcoNo ? mcoNo : '55',
			airlineCode: airlineCode ? airlineCode : 'DL',
			bookingType: bookingType ? bookingType : 'new',
			bookedOn: bookedOn ? bookedOn : 'trippro',
			pricePerPerson: pricePerPerson ? pricePerPerson : '5',
			productType: productType ? productType : '',
			comments: comments ? comments : '',
			notes: notes ? notes : '',
			totalInhouseCharge: totalInhouseCharge ? totalInhouseCharge : '20',

			totalPassengerCount: totalPassengerCount ? totalPassengerCount : '5',
			adultCount: adultCount ? adultCount : '2',
			kidCount: kidCount ? kidCount : '2',
			elderCount: elderCount ? elderCount : '0',
			grandTotal: grandTotal ? grandTotal : '100',
			kidPrice: kidPrice ? kidPrice : '',
			adultPrice: adultPrice ? adultPrice : '',
			elderPrice: elderPrice ? elderPrice : '',

			//markup
			flightMarkup: flightMarkup ? flightMarkup : '5',
			hotelMarkup: hotelMarkup ? hotelMarkup : '',
			carMarkup: carMarkup ? carMarkup : '',
			insuranceMarkup: insuranceMarkup ? insuranceMarkup : '',
			addonMarkup: addonMarkup ? addonMarkup : '',
			//date
			departureDateValue: departureDateValue ? departureDateValue : '',
			returnDateValue: returnDateValue ? returnDateValue : '',
			//companyCard details
			ccUsedCount: ccUsedCount ? ccUsedCount : '',
			ccAmountUsed: ccAmountUsed ? ccAmountUsed : '',
			ccLastDigit: ccLastDigit ? ccLastDigit : '',
		},
		validationSchema: Yup.object({
			//basic
			firstName: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
			lastName: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
			email: Yup.string().email('Invalid email address').required('Required'),
			phone: Yup.number('input must consist if number').positive('input must consist if positive number').integer().required('phone is required'),
			altEmail: Yup.string().email('Invalid email address').required('Required'),
			altPhone: Yup.number('input must consist if number').positive('input must consist if positive number').integer().required('phone is required'),

			pnrNo: Yup.string().max(255),
			mcoNo: Yup.number('input must consist if number').positive('input must consist if positive number').integer().required('This Field is required'),
			airlineCode: Yup.string(2).min(2).max(3, 'maximum limit for Aieline code is 2 ').required('airlineCode is required'),
			productType: Yup.array().of(Yup.string()).required('Required'),
			totalPassengerCount: Yup.number('input must consist if number').max(9).positive('input must consist if positive number').integer().required('This field is  Required'),

			//dropdown

			fareType: Yup.string().oneOf(['publish', 'private', 'fxl', 'dummy'], 'Fare Type Value is diffrent ').required('Required'),
			bookingType: Yup.string().oneOf(['new', 'exchange', 'refund', 'addon'], 'input should be one of below value').required('Required'),
			bookedOn: Yup.string().oneOf(['web', 'trippro', 'skybird', 'picasso'], 'input should be one of below value').required('This field is  required'),
			//currency
			pricePerPerson: Yup.number('input must consist if number').positive('input must consist if positive number').integer().required('This field is  Required'),
			totalInhouseCharge: Yup.number('input must consist if number').positive('input must consist if positive number').integer().required('This field is  Required'),
			grandTotal: Yup.number('input must consist if number').positive('input must consist if positive number').integer().required('This field is  Required'),

			//number of passenger
			adultCount: Yup.number('input must consist if number').integer().required('This field is  Required'),
			kidCount: Yup.number('input must consist if number').integer().required('This field is  Required'),
			elderCount: Yup.number('input must consist if number').integer().required('This field is  Required'),

			kidPrice: Yup.number('input must consist if number')
				.positive('input must consist if positive number')
				.integer()
				.when(['kidCount'], (kidCount, schema) => {
					return kidCount > 0 ? schema.required('this field required ') : schema;
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

			//markup
			flightMarkup: Yup.number('input must consist if number').positive('input must consist if positive number').integer(),
			hotelMarkup: Yup.number('input must consist if number').positive('input must consist if positive number').integer(),
			carMarkup: Yup.number('input must consist if number').positive('input must consist if positive number').integer(),
			insuranceMarkup: Yup.number('input must consist if number').positive('input must consist if positive number').integer(),
			addonMarkup: Yup.number('input must consist if number').positive('input must consist if positive number').integer(),

			comments: Yup.string().max(255),
			notes: '',

			//date
			departureDateValue: Yup.string().required('This field is required').nullable(),
			returnDateValue: Yup.string().required('This field is required').nullable(),
			//companyCard details
			ccUsedCount: Yup.number('input must consist if number').positive('input must consist if positive number').integer(),
			ccAmountUsed: Yup.number('input must consist if number').positive('input must consist if positive number').integer(),
			ccLastDigit: Yup.number('input must consist if number').min(4, 'please enter only last 4 digits of card').positive('input must consist if positive number'),
		}),
		onSubmit: (values) => {
			alert('value logged in console');
			console.log(formik.values);
			console.log(inputList);
		},
	});

	// handle input change
	const handleCardInput = (e, index) => {
		const {name, value} = e.target;
		const list = [...inputList];
		list[index][name] = value;
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
		setInputList(list);
	};

	// handle click event of the Add button
	const handleAddClick = () => {
		setInputList([...inputList, {cardName: '', cardHolderPhn: '', cardNumber: '', expiryDate: null, cvv: ''}]);
	};
	return (
		<>
			<Formik>
				<form onSubmit={formik.handleSubmit}>
					<AddNewRecordForm formik={formik} isView={isView} />
					<Box sx={{m: 1}}>
						<Typography variant='h6' gutterBottom sx={{my: 4}}>
							Payment method :
						</Typography>
					</Box>
					{/* <AddNewPaymentForm setInputList={setInputList} inputList={inputList} /> */}

					{inputList.map((x, i) => {
						return (
							<Grid key={i} container spacing={3}>
								{/* Card Holder NAme field */}
								<Grid item xs={12} md={2}>
									<TextField
										required
										name='cardName'
										label='Name on card'
										fullWidth
										autoComplete='cc-name'
										onChange={(e) => {
											handleCardInput(e, i);
										}}
										value={inputList[i].cardName}
									/>
								</Grid>
								{/*  Card Holder Phone no. */}
								<Grid item xs={12} md={3}>
									<TextField required name='cardHolderPhn' label='Phone no.' fullWidth onChange={(e) => handleCardInput(e, i)} value={inputList[i].cardNumber} />
								</Grid>
								{/* CardNumber Field */}
								<Grid item xs={12} md={3}>
									<TextField
										required
										name='cardNumber'
										label='Card number'
										fullWidth
										autoComplete='cc-number'
										onChange={(e) => handleCardInput(e, i)}
										value={inputList[i].cardNumber}
									/>
								</Grid>
								{/* CVV Field */}
								<Grid item xs={12} md={2}>
									<TextField required name='cvv' label='CVV' fullWidth autoComplete='cc-csc' onChange={(e) => handleCardInput(e, i)} value={inputList[i].cvv} />
								</Grid>
								{/* expiry date field */}
								<Grid item xs={12} md={2}>
									<LocalizationProvider fullWidth dateAdapter={AdapterDateFns}>
										<DatePicker
											fullWidth
											name='expiryDate'
											label='Expiry date'
											inputFormat='dd/MM/yyyy'
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
											renderInput={(params) => <TextField {...params} />}
										/>
									</LocalizationProvider>
								</Grid>
								{/*  add/Remove btn for multiple card */}
								<Box xs={12} md={2} sx={{display: 'flex', justifyContent: 'flex-end', width: '100%'}}>
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
										}}
										name='companyCard'
										color='primary'
									/>
								}
								label='Company CC used ?'
							/>
						</Grid>
						{isCompanyCard && (
							<>
								<Grid item xs={12} md={3}>
									<TextField
										required
										name='ccUsedCount'
										label='CC used How many times? '
										fullWidth
										error={Boolean(formik.touched.ccUsedCount && formik.errors.ccUsedCount)}
										helperText={formik.touched.ccUsedCount && formik.errors.ccUsedCount}
										onBlur={formik.handleBlur}
										onChange={formik.handleChange}
										value={formik.values.ccUsedCount}
									/>
								</Grid>
								<Grid item xs={12} md={3}>
									<TextField
										required
										name='ccAmountUsed'
										label=' Company CC Used Amount'
										fullWidth
										error={Boolean(formik.touched.ccUsedCount && formik.errors.ccAmountUsed)}
										helperText={formik.touched.ccUsedCount && formik.errors.ccAmountUsed}
										onBlur={formik.handleBlur}
										onChange={formik.handleChange}
										value={formik.values.ccAmountUsed}
									/>
								</Grid>
								<Grid item xs={12} md={3}>
									<TextField
										required
										name='ccLastDigit'
										label='Last 4 Digits of of Company CC '
										fullWidth
										error={Boolean(formik.touched.ccLastDigit && formik.errors.ccLastDigit)}
										helperText={formik.touched.ccLastDigit && formik.errors.ccLastDigit}
										onBlur={formik.handleBlur}
										onChange={formik.handleChange}
										value={formik.values.ccLastDigit}
									/>
								</Grid>
							</>
						)}
					</Grid>
					{/* Formik alert one  */}
					<Box xs={8} md={10}>
						{formik.errors && formik.errors !== null && (
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
