import React, {useState, useEffect} from 'react';
import UpdateRecordForm from './components/AddTicketForm/UpdateRecordForm';
import valid from 'card-validator';
// import AddNewPaymentForm from './components/AddTicketForm/AddNewPaymentForm';
import {useFormik, Formik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {Grid, Box, Alert, Typography, Button, TextField, FormControlLabel, Checkbox} from '@mui/material';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {BASEURL, errorToast} from '../utils/Utils';
// mui Icon
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const UpdateRecord = ({data}) => {
	const {
		firstName,
		lastName,
		email,
		phone,

		alternateEmail,
		alternatePhone,

		pnrNo,
		mcoNo,
		airlineCode,
		airlineLocator,

		bookingType,
		bookedOn,
		productType,
		fareType,

		departureDate,
		returnDate,

		adultCount,
		childCount,
		elderCount,
		childPrice,
		adultPrice,
		elderPrice,

		grandTotal,
		totalInhouseCharge,

		ccTimes,
		ccAmount,
		ccDigits,
		isCompanyCCUsed,

		cards,
		createdAt,
		// notes,
		_id,
	} = data;

	// console.log(data);

	// console.log(cards);
	const [alreadyPresentCard, setAlreadyPresentCard] = useState([]);
	const [inputList, setInputList] = useState([
		// {
		// 	cardHolderName: '',
		// 	cardHolderNumber: '',
		// 	cardNumber: '',
		// 	expiryDate: null,
		// 	cvv: '',
		// },
	]);
	const [isCompanyCard, setIsCompanyCard] = useState(isCompanyCCUsed);
	const [isPaymentVisible, setIsPaymentVisible] = useState(false);
	const [isDisable, setIsDisable] = useState(true);
	const [isDisableUpdatebtn, setIsDisableUpdatebtn] = useState(false);

	// formik validation object
	const formik = useFormik({
		initialValues: {
			firstName: firstName ? firstName : '',
			lastName: lastName ? lastName : '',
			email: email ? email : '',
			phone: phone ? phone : '',

			alternateEmail: alternateEmail ? alternateEmail : '',
			alternatePhone: alternatePhone ? alternatePhone : '',

			pnrNo: pnrNo ? pnrNo : '',
			mcoNo: mcoNo ? mcoNo : '',

			airlineCode: airlineCode ? airlineCode : '',
			airlineLocator: airlineLocator ? airlineLocator : '',

			fareType: fareType ? fareType : '',
			bookingType: bookingType ? bookingType : '',
			bookedOn: bookedOn ? bookedOn : '',
			productType: productType ? productType : '',

			totalInhouseCharge: totalInhouseCharge ? totalInhouseCharge : 0,
			adultCount: adultCount ? adultCount : 0,
			childCount: childCount ? childCount : 0,
			elderCount: elderCount ? elderCount : 0,
			grandTotal: grandTotal ? grandTotal : 0,
			childPrice: childPrice ? childPrice : 0,
			adultPrice: adultPrice ? adultPrice : 0,
			elderPrice: elderPrice ? elderPrice : 0,
			//date
			departureDate: departureDate ? departureDate : null,
			returnDate: returnDate ? returnDate : null,

			//companyCard details
			isCompanyCCUsed: isCompanyCCUsed ? isCompanyCCUsed : false,
			ccTimes: ccTimes ? ccTimes : '',
			ccAmount: ccAmount ? ccAmount : '',
			ccDigits: ccDigits ? ccDigits : '',

			//markup

			//paymentCard
			card: cards ? cards : inputList,
		},
		validationSchema: Yup.object({
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
			bookingType: Yup.string().oneOf(['new', 'exchange', 'refund', 'void', 'addon'], 'input should be one of below value').required('Required'),
			bookedOn: Yup.string().oneOf(['web', 'trippro', 'skybird', 'picasso'], 'input should be one of below value').required('This field is  required'),

			//currency
			mcoNo: Yup.number('input must consist if number').positive(' value Should be Greater then 0 ').integer().required('This Field is required'),
			totalInhouseCharge: Yup.number('input must consist if number').positive('value Should be Greater then 0').integer().required('This field is  Required'),
			grandTotal: Yup.number('input must consist if number').positive('value Should be Greater then 0').integer().required('This field is  Required'),

			//number of passenger
			adultCount: Yup.number('input must consist if number').integer().max(9).required('This field is  Required'),
			childCount: Yup.number('input must consist if number').integer().max(9).required('This field is  Required'),
			elderCount: Yup.number('input must consist if number').integer().max(9).required('This field is  Required'),

			childPrice: Yup.number('input must consist if number').when(['childCount'], (childCount, schema) => {
				return childCount > 0 ? schema.required('this field required ').positive('Price Should be Greater then 0 ').integer() : schema;
			}),
			adultPrice: Yup.number('input must consist if number').when(['adultCount'], (adultCount, schema) => {
				return adultCount > 0 ? schema.required('this field required ').positive('Price Should be Greater then 0').integer() : schema;
			}),
			elderPrice: Yup.number('input must consist if number').when(['elderCount'], (elderCount, schema) => {
				return elderCount > 0 ? schema.required('this field required ').positive('Price Should be Greater then 0').integer() : schema;
			}),

			//date
			departureDate: Yup.string().required('This field is required').nullable(),
			returnDate: Yup.string().required('please enter  DepartureDate value first ,This field is required').nullable(),

			//companyCard details
			isCompanyCCUsed: Yup.bool(),
			ccTimes: Yup.number('input must consist if number')
				.positive('value Should be Greater then 0')
				.integer()
				.when(['isCompanyCCUsed'], (isCompanyCCUsed, schema) => {
					return isCompanyCCUsed === true ? schema.required('this field required ') : schema;
				}),
			ccAmount: Yup.number('input must consist if number')
				.positive('value Should be Greater then 0')
				.integer()
				.when(['isCompanyCCUsed'], (isCompanyCCUsed, schema) => {
					return isCompanyCCUsed === true ? schema.required('this field required ') : schema;
				}),
			ccDigits: Yup.number('input must consist if number')
				.min(4, 'please enter only last 4 digits of card')
				.positive('value Should be Greater then 0')
				.when(['isCompanyCCUsed'], (isCompanyCCUsed, schema) => {
					return isCompanyCCUsed === true ? schema.required('this field required ') : schema;
				}),

			//Card Payment
			card: Yup.array().of(
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
					cvv: Yup.string().min(3, 'cvv must have atleast3  characters').max(4, 'cvv must have atleast 4 characters'),
					expiryDate: Yup.string().required('This field is required').nullable(),
				})
			),
		}),
		onSubmit: () => {
			console.log('formik submitted');
			const {alternateEmail, alternatePhone, pnrNo, airlineLocator} = formik.values;

			axios
				.put(BASEURL + `/ticket/${data._id}`, {
					data: {alternateEmail, alternatePhone, pnrNo, airlineLocator},
					cards: inputList,
				})
				.then((res) => console.log(res.data))
				.catch((e) => console.log(e));
		},
	});

	const fetchCards = async (id) => {
		axios
			.get(BASEURL + '/ticket/details/' + id)
			.then((response) => {
				console.log(response.data);

				setAlreadyPresentCard(response.data.data);
				setIsPaymentVisible(true);
			})
			.catch((e) => console.log(e));
	};

	const cardLog = async (ticketId) => {
		axios
			.post(BASEURL + '/log/details', {
				ticket: ticketId,
			})
			.then((response) => {
				console.log(response.data);
			})
			.catch((e) => {
				console.log(e);
			});
	};

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
			// {
			// 	cardHolderName: 'john',
			// 	cardHolderNumber: '9876543210',
			// 	cardNumber: '4263982640269299',
			// 	expiryDate: null,
			// 	cvv: '123',
			// },
			{
				cardHolderName: '',
				cardHolderNumber: '',
				cardNumber: '',
				expiryDate: null,
				cvv: '0',
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

	function msToTime(date) {
		const duration = new Date() - new Date(date);

		var milliseconds = Math.floor((duration % 1000) / 100),
			seconds = Math.floor((duration / 1000) % 60),
			minutes = Math.floor((duration / (1000 * 60)) % 60),
			hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

		hours = hours < 10 ? '0' + hours : hours;
		minutes = minutes < 10 ? '0' + minutes : minutes;
		seconds = seconds < 10 ? '0' + seconds : seconds;

		// let GenTime = hours + ':' + minutes + ':' + seconds + '.' + milliseconds;
		let GenTime = hours;
		console.log(GenTime);
		GenTime = GenTime >= 48 ? false : true;

		return Boolean(GenTime);
	}
	useEffect(() => {
		new Date() - new Date(createdAt) < 60000 * 60 * 48 ? setIsDisable(false) : setIsDisable(true);
	}, [0]);
	const showCardHandler = () => {
		// setIsPaymentVisible(true);
	};
	var err = [];
	useEffect(() => {
		console.log(formik.errors);
	});

	return (
		<>
			<Formik>
				<form onSubmit={formik.handleSubmit}>
					<Box
						sx={{
							m: 1,
							p: 1,
							py: 3,
							bgcolor: 'background.paper',
							borderRadius: 1,
						}}>
						<UpdateRecordForm formik={formik} disabled={isDisable} />
					</Box>
					<Box sx={{m: 1}}>
						<Typography variant='h6' gutterBottom sx={{my: 4}}>
							Payment method :
						</Typography>
					</Box>
					<Box
						sx={{
							m: 1,
							p: 2,
							py: 3,
							bgcolor: 'background.paper',
							borderRadius: 1,
						}}>
						{alreadyPresentCard &&
							alreadyPresentCard.map((x, i) => {
								console.log('alreadyPresentCard', alreadyPresentCard);
								return (
									<>
										{isPaymentVisible && (
											<Grid container spacing={3} key={i}>
												{/* Card Holder NAme field */}
												<Grid item xs={4} md={2}>
													<TextField name='cardHolderName' label='NAME ON CARD' fullWidth disabled={true} value={alreadyPresentCard[i].cardHolderName} />
												</Grid>
												{/*  Card Holder Phone no. */}
												<Grid item xs={4} md={2}>
													<TextField name='cardHolderNumber' label='PHONE NO.' fullWidth disabled={true} value={alreadyPresentCard[i].cardHolderNumber} />
												</Grid>
												{/* CardNumber Field */}
												<Grid item xs={4} md={3}>
													<TextField name='cardNumber' label='CARD NUMBER' fullWidth disabled={true} value={alreadyPresentCard[i].cardNumber} />
												</Grid>
												{/* CVV Field */}
												<Grid item xs={4} md={2}>
													<TextField name='cvv' label='CVV' fullWidth disabled={true} value={alreadyPresentCard[i].cvv} />
												</Grid>
												{/* expiry date field */}
												<Grid item xs={4} md={3}>
													<LocalizationProvider fullWidth disabled={isDisable} dateAdapter={AdapterDateFns}>
														<DatePicker
															fullWidth
															disabled={true}
															views={['year', 'month']}
															name='expiryDate'
															label='EXPIRY DATE'
															inputFormat='MM/yyyy'
															placeholder='MM/yyyy'
															value={alreadyPresentCard[i].expiryDate}
															renderInput={(params) => <TextField placeholder='MM/yyyy' {...params} />}
														/>
													</LocalizationProvider>
												</Grid>
												<Grid item xs={12} md={12}></Grid>
											</Grid>
										)}
									</>
								);
							})}

						{inputList &&
							inputList.map((x, i) => {
								// const isEmpty = Object.values(x).every((obj) => obj === null || obj === '');
								if (formik.errors.card) {
									err = formik.errors.card;
								}

								return (
									<Grid key={i} container spacing={3}>
										{/* Card Holder NAme field */}
										<Grid item xs={4} md={2}>
											<TextField
												name='cardHolderName'
												label='NAME ON CARD'
												fullWidth
												disabled={isDisable}
												autoComplete='cc-name'
												onChange={(e) => {
													handleCardInput(e, i);
												}}
												value={inputList[i].cardHolderName}
												error={Boolean(formik.submitCount > 0 && err.length > 0 && err[i] !== (undefined && null) ? err[i]['cardHolderName'] : null)}
												helperText={formik.submitCount > 0 && err.length > 0 && err[i] !== (undefined && null) ? err[i]['cardHolderName'] : null}
											/>
										</Grid>
										{/*  Card Holder Phone no. */}
										<Grid item xs={4} md={2}>
											<TextField
												name='cardHolderNumber'
												label='PHONE NO.'
												fullWidth
												disabled={isDisable}
												onChange={(e) => handleCardInput(e, i)}
												value={inputList[i].cardHolderNumber}
												error={Boolean(formik.submitCount > 0 && err.length > 0 && err[i] !== (undefined && null) ? err[i]['cardHolderName'] : null)}
												helperText={formik.submitCount > 0 && err.length > 0 && err[i] !== (undefined && null) ? err[i]['cardHolderName'] : null}
											/>
										</Grid>
										{/* CardNumber Field */}
										<Grid item xs={4} md={3}>
											<TextField
												name='cardNumber'
												label='CARD NUMBER'
												fullWidth
												disabled={isDisable}
												autoComplete='cc-number'
												onChange={(e) => handleCardInput(e, i)}
												value={inputList[i].cardNumber}
												error={Boolean(formik.submitCount > 0 && err.length > 0 && err[i] !== (undefined && null) ? err[i]['cardHolderName'] : null)}
												helperText={formik.submitCount > 0 && err.length > 0 && err[i] !== (undefined && null) ? err[i]['cardHolderName'] : null}
											/>
										</Grid>
										{/* CVV Field */}
										<Grid item xs={4} md={2}>
											<TextField
												name='cvv'
												label='CVV'
												type='number'
												fullWidth
												disabled={isDisable}
												autoComplete='cc-csc'
												onChange={(e) => handleCardInput(e, i)}
												value={inputList[i].cvv}
												error={Boolean(formik.submitCount > 0 && err.length > 0 && err[i] !== (undefined && null) ? err[i]['cardHolderName'] : null)}
												helperText={formik.submitCount > 0 && err.length > 0 && err[i] !== (undefined && null) ? err[i]['cardHolderName'] : null}
											/>
										</Grid>
										{/* expiry date field */}
										<Grid item xs={4} md={3}>
											<LocalizationProvider fullWidth disabled={isDisable} dateAdapter={AdapterDateFns}>
												<DatePicker
													fullWidth
													disabled={isDisable}
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
															error={Boolean(formik.submitCount > 0 && err.length > 0 && err[i] !== (undefined && null) ? err[i]['cardHolderName'] : null)}
															helperText={formik.submitCount > 0 && err.length > 0 && err[i] !== (undefined && null) ? err[i]['cardHolderName'] : null}
														/>
													)}
												/>
											</LocalizationProvider>
										</Grid>
										<Box
											xs={12}
											md={2}
											sx={{
												display: 'flex',
												justifyContent: 'flex-end',
												width: '100%',
											}}>
											<Button startIcon={<RemoveIcon fontSize='small' />} onClick={() => handleRemoveClick(i)} sx={{mr: 1}}>
												Remove
											</Button>
										</Box>
									</Grid>
								);
							})}
						{inputList.length < 4 && (
							<Grid container spacing={3} sx={{mt: 1}}>
								<Grid item xs={12} md={7}></Grid>
								<Grid item xs={12} md={2}>
									{!isPaymentVisible && (
										<Button
											variant='contained'
											onClick={() => {
												cardLog(_id);
												showCardHandler();
												fetchCards(_id);
											}}>
											Show card
										</Button>
									)}
								</Grid>
								<Grid item xs={12} md={3}>
									<Button startIcon={<AddIcon fontSize='small' />} onClick={handleAddClick} sx={{mr: 1}}>
										Add One More Card
									</Button>
								</Grid>
							</Grid>
						)}

						<Grid container spacing={3} sx={{mt: 1}}>
							{/*  company card  */}

							<Grid item xs={12} md={3}>
								<FormControlLabel
									control={
										<Checkbox
											checked={isCompanyCard}
											disabled={Boolean(isDisable)}
											onChange={(e) => {
												setIsCompanyCard(!isCompanyCard);
												formik.setFieldValue('isCompanyCCUsed', !isCompanyCard);
											}}
											name='companyCard'
											color='primary'
										/>
									}
									label='COMPANY CC USED ?'
									disabled={true}
								/>
							</Grid>

							{isCompanyCard &&
								items.map((item, i) => {
									const {name, label} = item;

									return (
										<Grid item xs={4} md={3} key={i}>
											<TextField
												name={name}
												label={label}
												fullWidth
												disabled={true}
												error={formik.touched[name] && formik.errors[name]}
												helperText={formik.touched[name] && formik.errors[name]}
												onBlur={formik.handleBlur}
												onChange={formik.handleChange}
												value={formik.values[name]}
											/>
										</Grid>
									);
								})}
						</Grid>
					</Box>

					<Grid container spacing={1}>
						<Grid item xs={8} md={10}></Grid>
						<Grid item xs={4} md={2}>
							<Button variant='contained' type='submit' sx={{mt: 3, ml: 1}} disabled={isDisableUpdatebtn}>
								Update
							</Button>
						</Grid>
					</Grid>
				</form>
			</Formik>
		</>
	);
};

export default UpdateRecord;
