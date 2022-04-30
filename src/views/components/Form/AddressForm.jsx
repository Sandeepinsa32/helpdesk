import React, {useState} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';

import {Grid, Typography, TextField, FormControlLabel, Checkbox, MenuItem, InputLabel, FormControl, Select, Button} from '@mui/material';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';

export default function AddressForm({setUserInfo, handleSubmit}) {
	const [bookingType, setBookingType] = useState(null);
	const [productType, setProductType] = useState(null);
	const [fareType, setFareType] = useState(null);
	const [bookedOn, setBookedOn] = useState(null);
	//date
	// const [departureDateValue, setDepartureDateValue] = useState(null);
	// const [returnDateValue, setReturnDateValue] = useState(null);

	const handleBookingChange = (event) => {
		setBookingType(event.target.value);
	};
	const handleProductChange = (event) => {
		setProductType(event.target.value);
	};
	const handleFareChange = (event) => {
		setFareType(event.target.value);
	};
	const handleBookedOn = (event) => {
		setBookedOn(event.target.value);
	};
	const phoneRegExp = `^[1-9]+$`;

	const formik = useFormik({
		initialValues: {
			firstName: 'john',
			lastName: 'doe',
			email: 'hjohn@doe.com',
			phone: '842717555',
			pnrNo: 'asasas cdd dv dvdv sdv vdv',
			fareType: 'private',
			mcoNo: '25',
			airlineCode: '0225220',
			bookingType: 'new',
			bookedOn: 'trippro',
			pricePerPerson: '200',
			productType: 'flight',
			comments: '',
			notes: '',
			totalInhouseCharge: '',
			departureDate: '',
			returnDate: '',
			passengerCount: '',
			grandTotal: '',
		},
		validationSchema: Yup.object({
			firstName: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
			lastName: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
			email: Yup.string().email('Invalid email address').required('Required'),
			phone: Yup.number().required().positive().integer().required('phone is required'),
			pnrNo: Yup.string().max(255).required('pnr is required'),
			fareType: Yup.string().oneOf(['publish', 'private', 'fxl', 'dummy'], 'Fare  Type').required('Required'),
			mcoNo: Yup.number().required().positive().integer().required('mco is required'),
			airlineCode: Yup.string().max(255).required('airlineCode is required'),
			bookingType: Yup.string().oneOf(['new', 'exchange', 'refund', 'addon'], 'Product  Type').required('Required'),
			bookedon: '',
			pricePerPerson: '',
			productType: Yup.string().oneOf(['flight', 'car', 'insurance', 'addon'], 'Product  Type').required('Required'),
			comments: '',
			notes: '',
			totalInhouseCharge: Yup.number().required().positive().integer().required('totalCharge is required'),
			departureDateValue: '',
			returnDateValue: '',
			passengerCount: Yup.string().matches(phoneRegExp, 'Must be a valid passengerCount').required('passengerCount is nrequired'),
			grandTotal: '',
		}),
		onSubmit: (values) => {
			// console.log(formik.values);
			// setUserInfo(formik.values);
			// handleSubmit();
		},
	});
	return (
		<>
			<Typography variant='h6' gutterBottom>
				Basic Detail
			</Typography>
			<form onSubmit={formik.handleSubmit}>
				<Grid container spacing={3}>
					<Grid item xs={12} sm={4}>
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
					<Grid item xs={12} sm={4}>
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
					<Grid item xs={12} sm={4}>
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

					<Grid item xs={12} sm={4}>
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
					<Grid item xs={12} sm={4}>
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

					<Grid item xs={12} sm={4}>
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
					<Grid item xs={12} sm={4}>
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
					<Grid item xs={12} sm={4}>
						<FormControl required fullWidth>
							<InputLabel id='Product-Type-Dropdown-label'>Product Type</InputLabel>
							<Select
								labelId='Product-Type-Dropdown-label'
								id='Product-Type-Dropdown'
								// value={productType}
								// onChange={handleProductChange}
								fullWidth
								name='productType'
								label='Product Type'
								error={Boolean(formik.touched.productType && formik.errors.productType)}
								helperText={formik.touched.productType && formik.errors.productType}
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
								value={formik.values.productType}>
								<MenuItem value='flight'>flight</MenuItem>
								<MenuItem value='car'>Car</MenuItem>
								<MenuItem value='insurance'>Insurance</MenuItem>
								<MenuItem value='addon'>Add-On</MenuItem>
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={12} sm={4}>
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
					<Grid item xs={12} sm={4}>
						<FormControl required fullWidth error={Boolean(formik.touched.bookedOn && formik.errors.bookedOn)} helperText={formik.touched.bookedOn && formik.errors.bookedOn}>
							<InputLabel id='Booked-on-Dropdown-label'>Booked on </InputLabel>
							<Select
								labelId='Booked-on-Dropdown-label'
								id='Booked-on-Dropdown'
								// value={bookedOn}
								// onChange={handleBookedOn}
								fullWidth
								name='bookedOn'
								label='Booked On'
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
								value={formik.values.bookedOn}>
								<MenuItem value='web'>Web</MenuItem>
								<MenuItem value='trippro'>trippro</MenuItem>
								<MenuItem value='skybird'>skybird</MenuItem>
								<MenuItem value='picasso'>Picasso</MenuItem>
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={12} sm={4}>
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
					<Grid item xs={12} sm={4}>
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

					<Grid item xs={12} sm={4}>
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
					<Grid item xs={12} sm={4}>
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
					{/* <Grid item xs={12} sm={4}>
						<TextField
							id='totalSale'
							name='totalSale'
							label='Total Sale'
							fullWidth
							error={Boolean(formik.touched.totalSale && formik.errors.totalSale)}
							helperText={formik.touched.totalSale && formik.errors.totalSale}
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
							value={formik.values.totalSale}
						/>
					</Grid> */}
					<Grid item xs={12} sm={4}>
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
					<Grid item xs={12} sm={4}>
						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<DatePicker
								name='departureDate'
								label='Departure Date'
								// onChange={(newValue) => {
								// 	setDepartureDateValue(newValue);
								// }}
								value={formik.values.departureDate}
								onChange={formik.handleChange}
								renderInput={(params) => <TextField {...params} />}
							/>
						</LocalizationProvider>
					</Grid>
					<Grid item xs={12} sm={4}>
						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<DatePicker name='returnDate' label='Return Date' value={formik.values.returnDate} onChange={formik.handleChange} renderInput={(params) => <TextField {...params} />} />
						</LocalizationProvider>
					</Grid>

					<Grid item xs={8} sm={10}></Grid>
					<Grid item xs={4} sm={2}>
						<Button
							variant='contained'
							type='submit'
							sx={{mt: 3, ml: 1}}
							onClick={() => {
								console.log(formik.values);
								setUserInfo(formik.values);
								handleSubmit();
							}}>
							submit
						</Button>
					</Grid>
				</Grid>
			</form>
		</>
	);
}
