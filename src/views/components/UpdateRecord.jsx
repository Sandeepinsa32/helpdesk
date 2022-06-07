import React, {useState, useEffect} from 'react';
import UpdateRecordForm from './AddTicketForm/UpdateRecordForm';
import valid from 'card-validator';
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

// mui
import {
	Grid,
	Box,
	Alert,
	Typography,
	Button,
	TextField,
	InputAdornment,
	Card,
	CircularProgress,
	CardHeader,
	CardContent,
	IconButton,
	FormControlLabel,
	Checkbox,
	ListItem,
	ListItemButton,
	ListItemText,
	ListItemIcon,
	List,
	Divider,
} from '@mui/material';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {BASEURL, errorToast} from '../../utils/Utils';
import Textfield from './FormField/Textfield';
// mui Icon
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const UpdateRecord = ({data, onClose}) => {
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
		remarks,
		// notes,
		comments,
		_id,
	} = data;

	const phoneRegExp = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;
	const [alreadyPresentCard, setAlreadyPresentCard] = useState([]);
	const [inputList, setInputList] = useState([]);
	const [isCompanyCard, setIsCompanyCard] = useState(isCompanyCCUsed);
	const [isPaymentVisible, setIsPaymentVisible] = useState(false);
	const [isDisable, setIsDisable] = useState(false);
	const [isDisableUpdatebtn, setIsDisableUpdatebtn] = useState(true);

	const [isLoading, setIsLoading] = useState(false);

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

	useEffect(() => {
		new Date() - new Date(createdAt) < 60000 * 60 * 48 ? setIsDisable(false) : setIsDisable(true);
	}, [0]);

	var err = [];

	function formateDate(date) {
		let today = new Date(date);
		let dd = String(today.getDate()).padStart(2, '0');
		let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
		let yyyy = today.getFullYear();
		var hh = today.getHours();
		var MM = today.getMinutes();
		// var ss = today.getSeconds(); // seconds

		today = mm + '/' + dd + '/' + yyyy + ' ' + hh + ':' + MM;
		return today;
	}

	const addUpdateLog = async (ticketId) => {
		axios
			.post(BASEURL + '/log/updated', {
				ticket: ticketId,
			})
			.then((response) => {
				console.log(response.data);
			})
			.catch((e) => {
				console.log(e);
				setIsLoading(false);
			});
	};
	const INITIAL_FORM_STATE = {
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

		totalInhouseCharge: totalInhouseCharge ? totalInhouseCharge : '',
		adultCount: adultCount ? adultCount : '',
		childCount: childCount ? childCount : '',
		elderCount: elderCount ? elderCount : '',
		grandTotal: grandTotal ? grandTotal : '',
		childPrice: childPrice ? childPrice : '',
		adultPrice: adultPrice ? adultPrice : '',
		elderPrice: elderPrice ? elderPrice : '',
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
		//update
		remarks: remarks ? remarks : '',
	};
	const FORM_VALIDATION = Yup.object({
		firstName: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
		lastName: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
		email: Yup.string().email('Invalid email address').required('Required'),
		phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Phone is required'),

		alternateEmail: Yup.string()
			.email('Invalid email address')
			.nullable()
			.notOneOf([Yup.ref('email')], 'alternative Email should be unique'),
		alternatePhone: Yup.string()
			.notOneOf([Yup.ref('phone')], 'alternative phone should be unique')
			.nullable()
			.matches(phoneRegExp, 'Phone number is not valid'),

		pnrNo: Yup.string().max(255),
		airlineCode: Yup.string(2).min(2).max(3, 'maximum limit for Aieline code is 2 '),
		airlineLocator: Yup.string(),
		//
		productType: Yup.array(),

		//dropdown
		fareType: Yup.string().oneOf(['publish', 'private', 'fxl', 'dummy'], 'Fare Type Value is diffrent '),
		bookingType: Yup.string().oneOf(['new', 'exchange', 'refund', 'void', 'addon'], 'input should be one of below value'),
		bookedOn: Yup.string().oneOf(['web', 'trippro', 'skybird', 'picasso'], 'input should be one of below value'),

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
				expiryDate: Yup.string().required('This field is required').nullable(),
			})
		),
		remarks: Yup.string().required('This field is required'),
	});
	const CheckViewUpdate = (createdAt) => {
		if (new Date() - new Date(createdAt) < 60000 * 60 * 48 || localStorage.getItem('role') == 'admin') {
			return true;
		}
	};
	return (
		<>
			<Formik
				initialValues={{...INITIAL_FORM_STATE}}
				validationSchema={FORM_VALIDATION}
				onSubmit={(values) => {
					console.log('formik submitted');
					const {alternateEmail, alternatePhone, pnrNo, airlineLocator, remarks} = values;

					axios
						.put(BASEURL + `/ticket/${data._id}`, {
							data: {alternateEmail, alternatePhone, pnrNo, airlineLocator, remarks},
							cards: inputList,
						})
						.then((res) => {
							console.log(res.data);

							addUpdateLog(data._id);
							onClose();
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
							<Box
								sx={{
									m: 0,
									p: 0,
									bgcolor: 'background.paper',
									borderRadius: 1,
								}}>
								<UpdateRecordForm />
							</Box>
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
													setFieldValue('isCompanyCCUsed', !isCompanyCard);
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
													type='number'
													label={label}
													fullWidth
													disabled={true}
													error={touched[name] && errors[name]}
													helperText={touched[name] && errors[name]}
													onBlur={handleBlur}
													onChange={handleChange}
													value={values[name]}
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
							{alreadyPresentCard &&
								alreadyPresentCard.map((x, i) => {
									console.log('alreadyPresentCard', alreadyPresentCard);
									return (
										<>
											{isPaymentVisible && (
												<Card key={i} sx={{p: 0, m: 0}}>
													<CardHeader sx={{py: '0 !important'}} title={'Customer Card' + ' ' + (i + 1)} />
													<CardContent>
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
													</CardContent>
												</Card>
											)}
										</>
									);
								})}
							{inputList &&
								inputList.map((x, i) => {
									// const isEmpty = Object.values(x).every((obj) => obj === null || obj === '');
									if (errors.card) {
										err = errors.card;
									}

									return (
										<Card key={i} sx={{p: 0, m: 0}}>
											<CardHeader sx={{py: '0 !important'}} title={'New Card' + ' ' + (i + 1)} />
											<CardContent>
												<Grid container spacing={3}>
													{/* Card Holder Name field */}

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
															disabled={isDisable}
															onChange={(e) => handleCardInput(e, i)}
															value={inputList[i].cardHolderNumber}
															error={Boolean(submitCount > 0 && err.length > 0 && err[i] !== (undefined && null) ? err[i]['cardHolderName'] : null)}
															helperText={submitCount > 0 && err.length > 0 && err[i] !== (undefined && null) ? err[i]['cardHolderName'] : null}
														/>
													</Grid>

													{/* CardNumber Field */}
													<Grid item xs={4} md={3}>
														<TextField
															type='number'
															name='cardNumber'
															label='CARD NUMBER'
															fullWidth
															disabled={isDisable}
															autoComplete='cc-number'
															onChange={(e) => handleCardInput(e, i)}
															value={inputList[i].cardNumber}
															error={Boolean(submitCount > 0 && err.length > 0 && err[i] !== (undefined && null) ? err[i]['cardHolderName'] : null)}
															helperText={submitCount > 0 && err.length > 0 && err[i] !== (undefined && null) ? err[i]['cardHolderName'] : null}
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
															error={Boolean(submitCount > 0 && err.length > 0 && err[i] !== (undefined && null) ? err[i]['cardHolderName'] : null)}
															helperText={submitCount > 0 && err.length > 0 && err[i] !== (undefined && null) ? err[i]['cardHolderName'] : null}
														/>
													</Grid>
													{/* expiry date field */}
													<Grid item xs={4} md={2}>
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
																		error={Boolean(submitCount > 0 && err.length > 0 && err[i] !== (undefined && null) ? err[i]['cardHolderName'] : null)}
																		helperText={submitCount > 0 && err.length > 0 && err[i] !== (undefined && null) ? err[i]['cardHolderName'] : null}
																	/>
																)}
															/>
														</LocalizationProvider>
													</Grid>

													{inputList.length !== 0 && (
														<Grid item xs={1} sm={1} md={1}>
															<IconButton onClick={() => handleRemoveClick(i)} color='error' sx={{mt: 1}}>
																<DeleteOutlineIcon />
															</IconButton>
														</Grid>
													)}
												</Grid>
											</CardContent>
										</Card>
									);
								})}
							{CheckViewUpdate && (
								<Box sx={{py: 1, my: 1, display: 'flex ', justifyContent: 'flex-end'}}>
									{inputList.length < 2 && (
										<Button startIcon={<AddIcon fontSize='small' />} onClick={handleAddClick} sx={{mx: 1}}>
											Add One More Card
										</Button>
									)}
									{!isPaymentVisible && (
										<Button
											sx={{mx: 1}}
											variant='contained'
											onClick={() => {
												cardLog(_id);
												fetchCards(_id);
											}}>
											Show card
										</Button>
									)}

									<Button variant='contained' type='submit' sx={{mx: 1}} disabled={isDisableUpdatebtn}>
										Update
									</Button>
								</Box>
							)}
							<Divider />
							<Card>
								<CardHeader title='Remarks' />
								<Divider />
								<CardContent>
									<List>
										{comments?.length > 0 ? (
											comments.map((log, i) => {
												return (
													<ListItem disablePadding key={i}>
														<ListItemButton>
															<ListItemIcon>
																<ForumOutlinedIcon />
															</ListItemIcon>

															<ListItemText
																primary={`${log.agent.firstName} ${log.agent.lastName}`}
																secondary={
																	<>
																		<Typography sx={{display: 'inline'}} component='span' variant='body2' color='text.primary'>
																			{log.remark}
																		</Typography>
																		<span style={{float: 'right', width: 'fit-content	'}}>{formateDate(log.timestamp)}</span>
																	</>
																}
															/>
														</ListItemButton>
													</ListItem>
												);
											})
										) : (
											<Typography variant='h6'>No Logs found!!</Typography>
										)}
									</List>
								</CardContent>
							</Card>
						</Form>
					);
				}}
			</Formik>
		</>
	);
};

export default UpdateRecord;
