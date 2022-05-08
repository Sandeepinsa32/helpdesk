import React, {useState, useEffect} from 'react';
import {useFormik, Formik} from 'formik';
import * as Yup from 'yup';

import {Grid, Typography, TextField, FormControlLabel, Box, Alert, FormHelperText, Checkbox, InputLabel, MenuItem, FormLabel, FormControl, Select, Button} from '@mui/material';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';

import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {FormatLineSpacing} from '@mui/icons-material';

export default function AddressForm({setUserInfo, handleSubmit}) {
	const [productType, setProductType] = useState([]);

	const [flightChecked, setFlightChecked] = useState(false);
	const [carChecked, setCarChecked] = useState(false);
	const [hotelChecked, setHotelChecked] = useState(false);
	const [insuranceChecked, setInsuranceChecked] = useState(false);
	const [addonChecked, setAddonChecked] = useState(false);
	//date
	const [departureDateValue, setDepartureDateValue] = useState(new Date());
	const [returnDateValue, setReturnDateValue] = useState(new Date());

	const formik = useFormik({
		initialValues: {
			firstName: 'john',
			lastName: 'doe',
			email: 'hjohn@doe.com',
			phone: '842717555',
			pnrNo: 'asasas cdd dv dvdv sdv vdv',
			fareType: 'private',
			mcoNo: '25',
			airlineCode: 'A.L',
			bookingType: 'new',
			bookedOn: 'trippro',
			pricePerPerson: '200',
			productType: '',
			comments: '',
			notes: '',
			totalInhouseCharge: '',
			departureDate: null,
			returnDate: null,
			passengerCount: '',
			grandTotal: '',
		},
		validationSchema: Yup.object({
			firstName: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
			lastName: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
			email: Yup.string().email('Invalid email address').required('Required'),
			phone: Yup.number().required().positive().integer().required('phone is required'),
			pnrNo: Yup.string().max(255).required('pnr is required'),
			fareType: Yup.string().oneOf(['publish', 'private', 'fxl', 'dummy'], 'Fare Type Value is diffrent ').required('Required'),
			mcoNo: Yup.number().required().positive().integer().required('This Field is required'),
			airlineCode: Yup.string(2).min(2).max(3, 'maximum limit for Aieline code is 2 ').required('airlineCode is required'),
			bookingType: Yup.string().oneOf(['new', 'exchange', 'refund', 'addon'], 'Product  Type').required('Required'),

			bookedOn: Yup.string().oneOf(['web', 'trippro', 'skybird', 'picasso'], 'Booked on platform should be one of below value').required('This field is  required'),
			pricePerPerson: Yup.number().required().positive().integer().required('This field is  Required'),
			productType: Yup.array().of(Yup.string()).required('Required'),
			comments: Yup.string().max(255),
			notes: '',
			totalInhouseCharge: Yup.number().required().positive().integer().required('This field is  Required'),
			departureDateValue: '',
			returnDateValue: '',
			passengerCount: Yup.number().max(9).required().positive().integer().required('This field is  Required'),
			grandTotal: Yup.number().required().positive().integer().required('This field is  Required'),
		}),
		onSubmit: (values) => {
			alert('formik submit');
			setUserInfo(formik.values);
			handleSubmit();
		},
	});

	const handleChange = (event) => {
		// setProductType([...productType, event.target.name]);

		let newArray = [...productType, event.target.name];
		if (productType.includes(event.target.name)) {
			newArray = newArray.filter((x) => x !== event.target.name);
		}
		setProductType(newArray);
		formik.setFieldValue('productType', productType);
	};
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
									{flightChecked ? <TextField name='' /> : null}
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
									{hotelChecked ? <TextField name='' /> : null}
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
									{carChecked ? <TextField name='' /> : null}
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
									{insuranceChecked ? <TextField name='' /> : null}
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
									{addonChecked ? <TextField name='' /> : null}
								</Box>
							</Box>
						</Grid>
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
								nrequired
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
								nrequired
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
						<Grid item xs={12} md={4}>
							<TextField
								error={Boolean(formik.touched.passengerCount && formik.errors.passengerCount)}
								fullWidth
								helperText={formik.touched.passengerCount && formik.errors.passengerCount}
								label='Number of Passenger *'
								name='passengerCount'
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
								type='number'
								value={formik.values.passengerCount}
							/>
						</Grid>

						<Grid item xs={12} md={4}>
							<TextField
								nrequired
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
							<FormControl required fullWidth>
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
							<FormControl required fullWidth>
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
								nrequired
								id='mcoNo'
								name='mcoNo'
								label='MCO'
								fullWidth
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
								helperText={formik.touched.airlineCode && formik.errors.airlineCode}
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
								value={formik.values.airlineCode}
							/>
						</Grid>

						<Grid item xs={12} md={4}>
							<TextField
								nrequired
								id='pricePerPerson'
								name='pricePerPerson'
								label='Price Per Person'
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
						<Grid item xs={12} md={8}>
							{formik.errors && formik.errors !== null ? (
								<Alert variant='outlined' severity='error'>
									{JSON.stringify(formik.errors)}
								</Alert>
							) : null}
						</Grid>

						<Grid item xs={8} md={10}></Grid>
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
