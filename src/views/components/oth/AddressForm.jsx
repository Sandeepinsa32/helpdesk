import React, {useState, useEffect} from 'react';
import {useFormik, Formik} from 'formik';
import * as Yup from 'yup';

import {Grid, Typography, TextField, FormControlLabel, InputAdornment, Box, Alert, FormHelperText, Checkbox, InputLabel, MenuItem, FormLabel, FormControl, Select, Button} from '@mui/material';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';

import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {FormatLineSpacing} from '@mui/icons-material';

//material-icon
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import BoyIcon from '@mui/icons-material/Boy';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import ElderlyIcon from '@mui/icons-material/Elderly';

export default function AddressForm({
	setUserInfo,
	isView,
	handleSubmit,
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
	departureDate,
	returnDate,
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
}) {
	const [ProductType, setProductType] = useState([]);

	const [flightChecked, setFlightChecked] = useState(false);
	const [carChecked, setCarChecked] = useState(false);
	const [hotelChecked, setHotelChecked] = useState(false);
	const [insuranceChecked, setInsuranceChecked] = useState(false);
	const [addonChecked, setAddonChecked] = useState(false);
	//date
	const [departureDateValue, setDepartureDateValue] = useState(new Date());
	const [returnDateValue, setReturnDateValue] = useState(new Date());

	// console.log(firstName, isView);
	const formik = useFormik({
		initialValues: {
			firstName: firstName ? firstName : 'john',
			lastName: lastName ? lastName : 'doe',
			email: email ? email : 'john@doe.com',
			phone: phone ? phone : '9874561230',
			altEmail: altEmail ? altEmail : 'jane@doe.com',
			altPhone: altPhone ? altPhone : '0321456987',
			pnrNo: pnrNo ? pnrNo : '1 ss2 5d5d d5jcjhbdc cncajnhc cscs',
			fareType: fareType ? fareType : '',
			mcoNo: mcoNo ? mcoNo : '55',
			airlineCode: airlineCode ? airlineCode : 'DL',
			bookingType: bookingType ? bookingType : 'new',
			bookedOn: bookedOn ? bookedOn : 'trippro',
			pricePerPerson: pricePerPerson ? pricePerPerson : '5',
			productType: productType ? productType : '',
			comments: comments ? comments : '',
			notes: notes ? notes : '',
			totalInhouseCharge: totalInhouseCharge ? totalInhouseCharge : '20',
			departureDate: departureDate ? departureDate : '',
			returnDate: returnDate ? returnDate : '',
			totalPassengerCount: totalPassengerCount ? totalPassengerCount : '5',
			adultCount: adultCount ? adultCount : '2',
			kidCount: kidCount ? kidCount : '2',
			elderCount: elderCount ? elderCount : '1',
			grandTotal: grandTotal ? grandTotal : '100',
			//markup
			flightMarkup: flightMarkup ? flightMarkup : '5',
			hotelMarkup: hotelMarkup ? hotelMarkup : '',
			carMarkup: carMarkup ? carMarkup : '',
			insuranceMarkup: insuranceMarkup ? insuranceMarkup : '',
			addonMarkup: addonMarkup ? addonMarkup : '',
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
			productType: Yup.array().required('Required'),
			totalPassengerCount: Yup.number('input must consist if number').max(9).positive('input must consist if positive number').integer().required('This field is  Required'),
			//dropdown

			fareType: Yup.string().oneOf(['publish', 'private', 'fxl', 'dummy'], 'Fare Type Value is diffrent ').required('Required'),
			bookingType: Yup.string().oneOf(['new', 'exchange', 'refund', 'addon'], 'input should be one of below value').required('Required'),
			bookedOn: Yup.string().oneOf(['web', 'trippro', 'skybird', 'picasso'], 'input should be one of below value').required('This field is  required'),
			//currency
			pricePerPerson: Yup.number('input must consist if number').positive('input must consist if positive number').integer().required('This field is  Required'),
			totalInhouseCharge: Yup.number('input must consist if number').positive('input must consist if positive number').integer().required('This field is  Required'),
			grandTotal: Yup.number('input must consist if number').positive('input must consist if positive number').integer().required('This field is  Required'),
			//markup
			flightMarkup: Yup.number('input must consist if number').positive('input must consist if positive number').integer(),
			hotelMarkup: Yup.number('input must consist if number').positive('input must consist if positive number').integer(),
			carMarkup: Yup.number('input must consist if number').positive('input must consist if positive number').integer(),
			insuranceMarkup: Yup.number('input must consist if number').positive('input must consist if positive number').integer(),
			addonMarkup: Yup.number('input must consist if number').positive('input must consist if positive number').integer(),

			comments: Yup.string().max(255),
			notes: '',

			//date
			departureDateValue: '',
			returnDateValue: '',
		}),
		onSubmit: (values) => {
			setUserInfo(formik.values);
			handleSubmit();
		},
	});

	// const handleChange = (event) => {
	// 	// setProductType([...productType, event.target.name]);

	// 	let newArray = [...ProductType, event.target.name];
	// 	if (ProductType.includes(event.target.name)) {
	// 		newArray = newArray.filter((x) => x !== event.target.name);
	// 	}
	// 	setProductType(newArray);
	// 	formik.setFieldValue('productType', ProductType);
	// };
	return (
		<>
			<Typography variant='h6' gutterBottom>
				Basic Detail
			</Typography>
			<Formik>
				<form onSubmit={formik.handleSubmit}>
					<Grid container spacing={3}>
						<Grid item xs={12} md={2}>
							{/* <Typography sx={{mt: 1}}>Product Type : </Typography> */}
						</Grid>

						{/*  checkbox label  */}
						<Grid item xs={12} md={12} sx={{p: `8px !important`, pt: `0px !important`}}>
							<FormControl sx={{m: 1}} fullWidth error={Boolean(formik.touched.productType && formik.errors.productType)}>
								<InputLabel variant='outlined'>Product Type :</InputLabel>
							</FormControl>
							<Box
								sx={{
									display: 'flex',
									flexDirection: 'row',
									p: 1,
									// m: 1,
									bgcolor: 'background.paper',
									borderRadius: 1,
								}}>
								<Box
									sx={{
										display: 'flex',
										alignItems: 'flex-start',
										flexDirection: 'column',
										p: 1,
										// m: 1,
										bgcolor: 'background.paper',
										borderRadius: 1,
									}}>
									<FormControlLabel
										control={
											<Checkbox
												checked={flightChecked}
												onChange={(e) => {
													setFlightChecked(!flightChecked);
													handleChange(e);
												}}
												name='flight'
												color='primary'
											/>
										}
										label='Flight'
									/>
									{flightChecked ? (
										<TextField
											name='flightMarkup'
											label='Flight Markup'
											fullWidth
											InputProps={{
												startAdornment: <InputAdornment position='start'>$</InputAdornment>,
											}}

											// error={Boolean(formik.touched.pricePerPerson && formik.errors.pricePerPerson)}
											// helperText={formik.touched.pricePerPerson && formik.errors.pricePerPerson}
											// onBlur={formik.handleBlur}
											// onChange={formik.handleChange}
											// value={formik.values.pricePerPerson}
										/>
									) : null}
								</Box>
								<Box
									sx={{
										display: 'flex',
										alignItems: 'flex-start',
										flexDirection: 'column',
										p: 1,
										// m: 1,
										bgcolor: 'background.paper',
										borderRadius: 1,
									}}>
									<FormControlLabel
										control={
											<Checkbox
												checked={hotelChecked}
												onChange={(e) => {
													setHotelChecked(!hotelChecked);
													handleChange(e);
												}}
												name='hotel'
												color='primary'
											/>
										}
										label='Hotel'
									/>
									{hotelChecked ? (
										<TextField
											name='hotelMarkup'
											label='Hotel Markup'
											fullWidth
											InputProps={{
												startAdornment: <InputAdornment position='start'>$</InputAdornment>,
											}}
											// error={Boolean(formik.touched.pricePerPerson && formik.errors.pricePerPerson)}
											// helperText={formik.touched.pricePerPerson && formik.errors.pricePerPerson}
											// onBlur={formik.handleBlur}
											// onChange={formik.handleChange}
											// value={formik.values.pricePerPerson}
										/>
									) : null}
								</Box>
								<Box
									sx={{
										display: 'flex',
										alignItems: 'flex-start',
										flexDirection: 'column',
										p: 1,
										// m: 1,
										bgcolor: 'background.paper',
										borderRadius: 1,
									}}>
									<FormControlLabel
										control={
											<Checkbox
												checked={carChecked}
												onChange={(e) => {
													setCarChecked(!carChecked);
													handleChange(e);
												}}
												name='car'
												color='primary'
											/>
										}
										label='Car'
									/>
									{carChecked ? (
										<TextField
											name='carMarkup'
											label='Car Markup'
											fullWidth
											InputProps={{
												startAdornment: <InputAdornment position='start'>$</InputAdornment>,
											}}
											// error={Boolean(formik.touched.pricePerPerson && formik.errors.pricePerPerson)}
											// helperText={formik.touched.pricePerPerson && formik.errors.pricePerPerson}
											// onBlur={formik.handleBlur}
											// onChange={formik.handleChange}
											// value={formik.values.pricePerPerson}
										/>
									) : null}
								</Box>

								<Box
									sx={{
										display: 'flex',
										alignItems: 'flex-start',
										flexDirection: 'column',
										p: 1,
										// m: 1,
										bgcolor: 'background.paper',
										borderRadius: 1,
									}}>
									<FormControlLabel
										control={
											<Checkbox
												checked={insuranceChecked}
												onChange={(e) => {
													setInsuranceChecked(!insuranceChecked);
													handleChange(e);
												}}
												name='insurance'
												color='primary'
											/>
										}
										label='Insurance'
									/>
									{insuranceChecked ? (
										<TextField
											name='insuranceMarkup'
											label='Insurance Markup'
											fullWidth
											InputProps={{
												startAdornment: <InputAdornment position='start'>$</InputAdornment>,
											}}
											// error={Boolean(formik.touched.pricePerPerson && formik.errors.pricePerPerson)}
											// helperText={formik.touched.pricePerPerson && formik.errors.pricePerPerson}
											// onBlur={formik.handleBlur}
											// onChange={formik.handleChange}
											// value={formik.values.pricePerPerson}
										/>
									) : null}
								</Box>

								<Box
									sx={{
										display: 'flex',
										alignItems: 'flex-start',
										flexDirection: 'column',
										p: 1,
										// m: 1,
										bgcolor: 'background.paper',
										borderRadius: 1,
									}}>
									<FormControlLabel
										control={
											<Checkbox
												checked={addonChecked}
												onChange={(e) => {
													setAddonChecked(!addonChecked);
													handleChange(e);
												}}
												name='addon'
												color='primary'
											/>
										}
										label='Add-On'
									/>
									{addonChecked ? (
										<TextField
											name='addonMarkup'
											label='Add-On Markup'
											fullWidth
											InputProps={{
												startAdornment: <InputAdornment position='start'>$</InputAdornment>,
											}}
											// error={Boolean(formik.touched.pricePerPerson && formik.errors.pricePerPerson)}
											// helperText={formik.touched.pricePerPerson && formik.errors.pricePerPerson}
											// onBlur={formik.handleBlur}
											// onChange={formik.handleChange}
											// value={formik.values.pricePerPerson}
										/>
									) : null}
								</Box>
							</Box>
						</Grid>
						{/*  checkbox label  */}
						<Grid item xs={12} md={4}>
							<TextField
								fullWidth
								label='First Name'
								name='firstName'
								error={Boolean(formik.touched.firstName && formik.errors.firstName)}
								helperText={formik.touched.firstName && formik.errors.firstName}
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
								value={formik.values.firstName}
							/>
						</Grid>
						<Grid item xs={12} md={4}>
							<TextField
								id='lastName'
								name='lastName'
								label='Last Name'
								fullWidth
								error={Boolean(formik.touched.lastName && formik.errors.lastName)}
								helperText={formik.touched.lastName && formik.errors.lastName}
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
								value={formik.values.lastName}
							/>
						</Grid>
						<Grid item xs={12} md={4}>
							<TextField
								id='email'
								name='email'
								label='email'
								fullWidth
								error={Boolean(formik.touched.email && formik.errors.email)}
								helperText={formik.touched.email && formik.errors.email}
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
								value={formik.values.email}
							/>
						</Grid>

						<Grid item xs={12} md={4}>
							<TextField
								id='phone'
								name='phone'
								label='phone'
								fullWidth
								error={Boolean(formik.touched.phone && formik.errors.phone)}
								helperText={formik.touched.phone && formik.errors.phone}
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
								value={formik.values.phone}
							/>
						</Grid>

						{/*  */}
						<Grid item xs={12} md={4}>
							<TextField
								name='altEmail'
								label='Alternative email'
								fullWidth
								error={Boolean(formik.touched.email && formik.errors.email)}
								helperText={formik.touched.email && formik.errors.email}
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
								value={formik.values.email}
							/>
						</Grid>

						<Grid item xs={12} md={4}>
							<TextField
								name='altPhone'
								label='Alternative Phone'
								fullWidth
								error={Boolean(formik.touched.phone && formik.errors.phone)}
								helperText={formik.touched.phone && formik.errors.phone}
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
								value={formik.values.phone}
							/>
						</Grid>

						{/*
			adultCount: '',
			elderCount: '',
 */}

						<Grid item xs={12} md={2}>
							<TextField
								error={Boolean(formik.touched.totalPassengerCount && formik.errors.totalPassengerCount)}
								fullWidth
								helperText={formik.touched.totalPassengerCount && formik.errors.totalPassengerCount}
								label='Total Number  of Passenger'
								name='totalPassengerCount'
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
								type='number'
								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>
											<FamilyRestroomIcon />
										</InputAdornment>
									),
								}}
								value={formik.values.totalPassengerCount}
							/>
						</Grid>
						<Grid item xs={12} md={2}>
							<TextField
								error={Boolean(formik.touched.kidCount && formik.errors.kidCount)}
								fullWidth
								helperText={formik.touched.kidCount && formik.errors.kidCount}
								label='Child Count'
								name='kidCount'
								value={formik.values.kidCount}
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
								type='number'
								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>
											<ChildCareIcon />
										</InputAdornment>
									),
								}}
							/>
						</Grid>
						<Grid item xs={12} md={2}>
							<TextField
								error={Boolean(formik.touched.adultCount && formik.errors.adultCount)}
								fullWidth
								helperText={formik.touched.adultCount && formik.errors.adultCount}
								label='Total Number  of Passenger'
								name='totalPassengerCount'
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
								type='number'
								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>
											<BoyIcon />
										</InputAdornment>
									),
								}}
								value={formik.values.adultCount}
							/>
						</Grid>
						<Grid item xs={12} md={2}>
							<TextField
								error={Boolean(formik.touched.elderCount && formik.errors.elderCount)}
								fullWidth
								helperText={formik.touched.elderCount && formik.errors.elderCount}
								label='Total Number  of Passenger'
								name='totalPassengerCount'
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
								type='number'
								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>
											<ElderlyIcon />
										</InputAdornment>
									),
								}}
								value={formik.values.elderCount}
							/>
							elderCount
						</Grid>

						<Grid item xs={12} md={4}>
							<TextField
								id='pnrNo'
								name='pnrNo'
								label='PNR No.'
								fullWidth
								error={Boolean(formik.touched.pnrNo && formik.errors.pnrNo)}
								helperText={formik.touched.pnrNo && formik.errors.pnrNo}
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
								value={formik.values.pnrNo}
							/>
						</Grid>
						<Grid item xs={12} md={4}>
							<FormControl fullWidth>
								<InputLabel id='Bokking-type-Dropdown-label'>Booking Type</InputLabel>
								<Select
									labelId='Bokking-type-Dropdown-label	'
									id='Bokking-type-Dropdown'
									// value={bookingType}
									// onChange={handleBookingChange}
									fullWidth
									name='bookingType'
									label='Booking Type'
									error={Boolean(formik.touched.bookingType && formik.errors.bookingType)}
									helperText={formik.touched.bookingType && formik.errors.bookingType}
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									value={formik.values.bookingType}>
									<MenuItem value='new'>New</MenuItem>
									<MenuItem value='exchange'>Exchange</MenuItem>
									<MenuItem value='refund'>Refund</MenuItem>
									<MenuItem value='Void'>Void</MenuItem>
									<MenuItem value='Add-On'>Add-On</MenuItem>
								</Select>
							</FormControl>
						</Grid>

						<Grid item xs={12} md={4}>
							<FormControl fullWidth>
								<InputLabel id='Fare-Type-Dropdown-label'>Fare Type</InputLabel>
								<Select
									labelId='Fare-Type-Dropdown-label'
									id='Fare-Type-Dropdown'
									fullWidth
									name='fareType'
									label='Fare Type'
									error={Boolean(formik.touched.fareType && formik.errors.fareType)}
									helperText={formik.touched.fareType && formik.errors.fareType}
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									value={formik.values.fareType}>
									<MenuItem value='publish'>publish</MenuItem>
									<MenuItem value='private'>Private</MenuItem>
									<MenuItem value='fxl'>FXL</MenuItem>
									<MenuItem value='dummy'>Dummy</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={12} md={4}>
							<FormControl fullWidth>
								<InputLabel id='Booked-on-Dropdown-label'>Booked on </InputLabel>
								<Select
									labelId='Booked-on-Dropdown-label'
									id='Booked-on-Dropdown'
									fullWidth
									name='bookedOn'
									label='Booked On'
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									value={formik.values.bookedOn}
									error={Boolean(formik.touched.bookedOn && formik.errors.bookedOn)}
									helperText={formik.touched.bookedOn && formik.errors.bookedOn}>
									<MenuItem value='web'>Web</MenuItem>
									<MenuItem value='trippro'>trippro</MenuItem>
									<MenuItem value='skybird'>skybird</MenuItem>
									<MenuItem value='picasso'>Picasso</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={12} md={4}>
							<TextField
								id='mcoNo'
								name='mcoNo'
								label='MCO'
								fullWidth
								InputProps={{
									startAdornment: <InputAdornment position='start'>$</InputAdornment>,
								}}
								error={Boolean(formik.touched.mcoNo && formik.errors.mcoNo)}
								helperText={formik.touched.mcoNo && formik.errors.mcoNo}
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
								value={formik.values.mcoNo}
							/>
						</Grid>
						<Grid item xs={12} md={4}>
							<TextField
								id='airlineCode'
								name='airlineCode'
								label='Airline Code *'
								fullWidth
								error={Boolean(formik.touched.airlineCode && formik.errors.airlineCode)}
								helperText={Boolean(formik.touched.airlineCode && formik.errors.airlineCode) ? formik.touched.airlineCode && formik.errors.airlineCode : `Use Abbrivated Form`}
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
								value={formik.values.airlineCode}
							/>
						</Grid>

						<Grid item xs={12} md={4}>
							<TextField
								id='pricePerPerson'
								name='pricePerPerson'
								label='Price Per Person'
								InputProps={{
									startAdornment: <InputAdornment position='start'>$</InputAdornment>,
								}}
								fullWidth
								error={Boolean(formik.touched.pricePerPerson && formik.errors.pricePerPerson)}
								helperText={formik.touched.pricePerPerson && formik.errors.pricePerPerson}
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
								value={formik.values.pricePerPerson}
							/>
						</Grid>
						<Grid item xs={12} md={4}>
							<TextField
								id='grandTotal'
								name='grandTotal'
								label='Grand Total'
								fullWidth
								InputProps={{
									startAdornment: <InputAdornment position='start'>$</InputAdornment>,
								}}
								error={Boolean(formik.touched.grandTotal && formik.errors.grandTotal)}
								helperText={formik.touched.grandTotal && formik.errors.grandTotal}
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
								value={formik.values.grandTotal}
							/>
						</Grid>
						{/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

						<Grid item xs={12} md={4}>
							<TextField
								id='totalInhouseChargetotalInhouseCharge'
								name='totalInhouseCharge'
								label='Total Inhouse Charge'
								InputProps={{
									startAdornment: <InputAdornment position='start'>$</InputAdornment>,
								}}
								fullWidth
								error={Boolean(formik.touched.totalInhouseCharge && formik.errors.totalInhouseCharge)}
								helperText={formik.touched.totalInhouseCharge && formik.errors.totalInhouseCharge}
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
								value={formik.values.totalInhouseCharge}
							/>
						</Grid>
						<Grid item xs={12} md={4}>
							<LocalizationProvider dateAdapter={AdapterDateFns}>
								<DatePicker
									inputFormat='dd/MM/yyyy'
									name='departureDate'
									label='Departure Date'
									onChange={(newValue) => {
										setDepartureDateValue(newValue);

										formik.setFieldValue(
											'departureDate',
											new Date(newValue).toLocaleDateString('en-US', {
												day: '2-digit',
												month: '2-digit',
												year: 'numeric',
											})
										);
									}}
									error={Boolean(formik.touched.departureDate && formik.errors.departureDate)}
									helperText={formik.touched.departureDate && formik.errors.departureDate}
									value={formik.values.departureDateValue}
									renderInput={(params) => <TextField {...params} />}
								/>
							</LocalizationProvider>
						</Grid>
						<Grid item xs={12} md={4}>
							<LocalizationProvider dateAdapter={AdapterDateFns}>
								<DatePicker
									name='returnDate'
									inputFormat='dd/MM/yyyy'
									label='Return Date'
									value={formik.values.returnDateValue}
									onChange={(newValue) => {
										setReturnDateValue(newValue);
										formik.setFieldValue(
											'returnDate',
											new Date(newValue).toLocaleDateString('en-US', {
												day: '2-digit',
												month: '2-digit',
												year: 'numeric',
											})
										);
									}}
									error={Boolean(formik.touched.returnDate && formik.errors.returnDate)}
									helperText={formik.touched.returnDate && formik.errors.returnDate}
									renderInput={(params) => <TextField {...params} />}
								/>
							</LocalizationProvider>
						</Grid>

						{/* EMpty one  */}
						<Grid item xs={12} md={8}></Grid>

						<Grid item xs={8} md={10}>
							{' '}
							{formik.errors && formik.errors !== null ? (
								<Alert variant='outlined' severity='error'>
									{JSON.stringify(formik.errors)}
								</Alert>
							) : null}
						</Grid>
						<Grid item xs={4} md={2}>
							<Button variant='contained' type='submit' sx={{mt: 3, ml: 1}}>
								submit
							</Button>
						</Grid>
					</Grid>
				</form>
			</Formik>
		</>
	);
}
