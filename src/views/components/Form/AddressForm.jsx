import React, {useState} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';

import {Grid, Typography, TextField, FormControlLabel, Checkbox, MenuItem, InputLabel, FormControl, Select, Button} from '@mui/material';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';

export default function AddressForm({setUserInfo, handleSubmit}) {
	const [bookingType, setBookingType] = useState(null);
	const [productType, setProductType] = useState(null);
	const [fareType, setFareType] = useState(null);
	const [bookedOn, setBookedOn] = useState(null);
	//date
	const [value, setValue] = React.useState(null);

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
			firstname: 'John',
			lastname: 'doe',
			passengerCount: '2',
			pnr: 'xssc',
			mco: '5',
			airlineCode: 'ss55',
			productType: '',
			bookingType: '',
			totalCharge: '55',
			pricePerPax: '5',
			phone: '5655656565',
			email: 'dsnsnn@gmgmg.cmo',

			// cardName: 'Test user',
			// cardNumber: '555222000222555',
			// expiryDate: '02/2022',
			// cvv: '0348',
			// comments: '',
			// notes: '',
		},
		validationSchema: Yup.object({
			firstname: Yup.string().max(255).required('First name is required'),
			lastname: Yup.string().max(255).required('Last name is required'),
			passengerCount: Yup.string().matches(phoneRegExp, 'Must be a valid passengerCount').required('passengerCount is nrequired'),
			password: Yup.string().max(255).required('Password is required'),
			pnr: Yup.string().max(255).required('pnr is required'),
			mco: Yup.number().required().positive().integer().required('mco is required'),
			airlineCode: Yup.string().max(255).required('airlineCode is required'),
			productType: '',
			bookingType: '',
			totalCharge: Yup.number().required().positive().integer().required('totalCharge is required'),
			pricePerPax: Yup.number().required().positive().integer().required('pricePerPax is required'),
			phone: Yup.number().required().positive().integer().required('phone is required'),
			email: Yup.string().email('Invalid email address').required('Required'),
			// cardName: Yup.string().max(255).required('CardHolder name is required'),
			// cardNumber: Yup.number(18).required().positive().integer().required('Card Number is required'),
			// expiryDate: '',
			// cvv: Yup.number(4).required().positive().integer().required('pricePerPax is required'),
			// comments: '',
			// notes: '',
		}),
		onSubmit: (values) => {
			alert('done');
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
							name='firstname'
							error={Boolean(formik.touched.firstname && formik.errors.firstname)}
							helperText={formik.touched.firstname && formik.errors.firstname}
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
							value={formik.values.firstname}
						/>
					</Grid>
					<Grid item xs={12} sm={4}>
						<TextField
							id='lastname'
							name='lastname'
							label='Last Name'
							fullWidth
							error={Boolean(formik.touched.lastname && formik.errors.lastname)}
							helperText={formik.touched.lastname && formik.errors.lastname}
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
							value={formik.values.lastname}
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
							id='pnr'
							name='pnr'
							label='PNR No.'
							fullWidth
							error={Boolean(formik.touched.pnr && formik.errors.pnr)}
							helperText={formik.touched.pnr && formik.errors.pnr}
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
							value={formik.values.pnr}
						/>
					</Grid>
					<Grid item xs={12} sm={4}>
						<FormControl required fullWidth>
							<InputLabel id='Bokking-type-Dropdown-label'>Booking Type</InputLabel>
							<Select
								labelId='Bokking-type-Dropdown-label	'
								id='Bokking-type-Dropdown'
								value={bookingType}
								onChange={handleBookingChange}
								fullWidth
								name='bookingType'
								label='Booking Type'
								error={Boolean(formik.touched.bookingType && formik.errors.bookingType)}
								helperText={formik.touched.bookingType && formik.errors.bookingType}
								onBlur={formik.handleBlur}
								// onChange={formik.handleChange}
								// value={formik.values.bookingType}
							>
								<MenuItem value='new'>New</MenuItem>
								<MenuItem value='Exchange'>Exchange</MenuItem>
								<MenuItem value='Refund'>Refund</MenuItem>
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
								value={productType}
								onChange={handleProductChange}
								fullWidth
								name='productType'
								label='Product Type'
								error={Boolean(formik.touched.bookingType && formik.errors.bookingType)}
								helperText={formik.touched.bookingType && formik.errors.bookingType}
								onBlur={formik.handleBlur}
								// onChange={formik.handleChange}
								// value={formik.values.bookingType}
							>
								<MenuItem value='flight'>flight</MenuItem>
								<MenuItem value='Car'>Car</MenuItem>
								<MenuItem value='Insurance'>Insurance</MenuItem>
								<MenuItem value='Add-On'>Add-On</MenuItem>
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={12} sm={4}>
						<FormControl required fullWidth>
							<InputLabel id='Fare-Type-Dropdown-label'>Fare Type</InputLabel>
							<Select
								labelId='Fare-Type-Dropdown-label'
								id='Fare-Type-Dropdown'
								value={fareType}
								onChange={handleFareChange}
								fullWidth
								name='fareType'
								label='Fare Type'
								error={Boolean(formik.touched.bookingType && formik.errors.bookingType)}
								helperText={formik.touched.bookingType && formik.errors.bookingType}
								onBlur={formik.handleBlur}
								// onChange={formik.handleChange}
								// value={formik.values.bookingType}
							>
								<MenuItem value='publish'>publish</MenuItem>
								<MenuItem value='private'>Private</MenuItem>
								<MenuItem value='fxl'>FXL</MenuItem>
								<MenuItem value='dummy'>Dummy</MenuItem>
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={12} sm={4}>
						<FormControl required fullWidth>
							<InputLabel id='Booked-on-Dropdown-label'>Booked on </InputLabel>
							<Select
								labelId='Booked-on-Dropdown-label'
								id='Booked-on-Dropdown'
								value={bookedOn}
								onChange={handleBookedOn}
								fullWidth
								name='bookedOn'
								label='Booked On'
								error={Boolean(formik.touched.bookingType && formik.errors.bookingType)}
								helperText={formik.touched.bookingType && formik.errors.bookingType}
								onBlur={formik.handleBlur}
								// onChange={formik.handleChange}
								// value={formik.values.bookingType}
							>
								<MenuItem value='publish'>publish</MenuItem>
								<MenuItem value='private'>Private</MenuItem>
								<MenuItem value='fxl'>FXL</MenuItem>
								<MenuItem value='dummy'>Dummy</MenuItem>
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={12} sm={4}>
						<TextField
							nrequired
							id='mco'
							name='mco'
							label='MCO'
							fullWidth
							error={Boolean(formik.touched.mco && formik.errors.mco)}
							helperText={formik.touched.mco && formik.errors.mco}
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
							value={formik.values.mco}
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
							id='totalCharge'
							name='totalCharge'
							label='Grand Total'
							fullWidth
							error={Boolean(formik.touched.totalCharge && formik.errors.totalCharge)}
							helperText={formik.touched.totalCharge && formik.errors.totalCharge}
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
							value={formik.values.totalCharge}
						/>
					</Grid>
					{/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
					<Grid item xs={12} sm={4}>
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
					</Grid>
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
								label='Basic example'
								value={value}
								onChange={(newValue) => {
									setValue(newValue);
								}}
								renderInput={(params) => <TextField {...params} />}
							/>
						</LocalizationProvider>
						{/* <TextField
							id='totalCharge'
							name='totalCharge'
							label='Grand Total'
							fullWidth
							error={Boolean(formik.touched.totalCharge && formik.errors.totalCharge)}
							helperText={formik.touched.totalCharge && formik.errors.totalCharge}
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
							value={formik.values.totalCharge}
						/> */}
					</Grid>

					<Grid item xs={8} sm={10}></Grid>
					<Grid item xs={4} sm={2}>
						<Button
							variant='contained'
							type='submit'
							onClick={() => {
								console.log(formik.values);
								setUserInfo(formik.values);
								handleSubmit();
							}}
							sx={{mt: 3, ml: 1}}>
							submit
						</Button>
					</Grid>
				</Grid>
			</form>
		</>
	);
}
