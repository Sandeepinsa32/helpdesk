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

export default function AddressForm({formik, isView}) {
	//for product type & CHECKBOX
	const [productType, setProductType] = useState([]);
	const [flightChecked, setFlightChecked] = useState(false);
	const [carChecked, setCarChecked] = useState(false);
	const [hotelChecked, setHotelChecked] = useState(false);
	const [insuranceChecked, setInsuranceChecked] = useState(false);
	const [addonChecked, setAddonChecked] = useState(false);
	//date
	const [depDate, setDepDate] = useState(formik.values.departureDateValue);
	const [returnDate, setReturnDate] = useState(formik.values.returnDateValue);

	//  for Product Selected Checkbox ---> array
	const handleProductTypeChange = (event) => {
		// setProductType([...productType, event.target.name]);

		let newArray = [...productType, event.target.name];
		if (productType.includes(event.target.name)) {
			newArray = newArray.filter((x) => {
				return x !== event.target.name;
			});
		}
		console.log('newArray', newArray);
		setProductType(newArray);
		formik.setFieldValue('productType', productType);
	};
	return (
		<>
			<Grid container spacing={3} sx={{}}>
				{/*  checkbox label  Fields */}
				<Grid item xs={12} md={12} sx={{p: `16px !important`, pt: `0px !important`}}>
					<FormControl sx={{m: 1, p: 1}} fullWidth disabled={isView} error={Boolean(formik.touched.productType && formik.errors.productType)}>
						<InputLabel variant='outlined'>Product Type :</InputLabel>
					</FormControl>
					<Box sx={displayFlexRowStyle} style={{marginTop: '10px ', justifyContent: 'space-evenly'}}>
						<Box sx={displayColStyle} style={{paddingTop: '8px !important'}}>
							<FormControlLabel
								control={
									<Checkbox
										checked={flightChecked}
										onChange={(e) => {
											setFlightChecked(!flightChecked);
											handleProductTypeChange(e);
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
									disabled={isView}
									InputProps={{
										startAdornment: <InputAdornment position='start'>$</InputAdornment>,
									}}
									error={Boolean(formik.touched.flightMarkup && formik.errors.flightMarkup)}
									helperText={formik.touched.flightMarkup && formik.errors.flightMarkup}
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									value={formik.values.flightMarkup}
								/>
							) : null}
						</Box>
						<Box sx={displayColStyle}>
							<FormControlLabel
								control={
									<Checkbox
										checked={hotelChecked}
										onChange={(e) => {
											setHotelChecked(!hotelChecked);
											handleProductTypeChange(e);
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
									disabled={isView}
									InputProps={{
										startAdornment: <InputAdornment position='start'>$</InputAdornment>,
									}}
									error={Boolean(formik.touched.hotelMarkup && formik.errors.hotelMarkup)}
									helperText={formik.touched.hotelMarkup && formik.errors.hotelMarkup}
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									value={formik.values.hotelMarkup}
								/>
							) : null}
						</Box>
						<Box sx={displayColStyle}>
							<FormControlLabel
								control={
									<Checkbox
										checked={carChecked}
										onChange={(e) => {
											setCarChecked(!carChecked);
											handleProductTypeChange(e);
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
									disabled={isView}
									InputProps={{
										startAdornment: <InputAdornment position='start'>$</InputAdornment>,
									}}
									error={Boolean(formik.touched.carMarkup && formik.errors.carMarkup)}
									helperText={formik.touched.carMarkup && formik.errors.carMarkup}
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									value={formik.values.carMarkup}
								/>
							) : null}
						</Box>

						<Box sx={displayColStyle}>
							<FormControlLabel
								control={
									<Checkbox
										checked={insuranceChecked}
										onChange={(e) => {
											setInsuranceChecked(!insuranceChecked);
											handleProductTypeChange(e);
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
									disabled={isView}
									InputProps={{
										startAdornment: <InputAdornment position='start'>$</InputAdornment>,
									}}
									error={Boolean(formik.touched.insuranceMarkup && formik.errors.insuranceMarkup)}
									helperText={formik.touched.insuranceMarkup && formik.errors.insuranceMarkup}
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									value={formik.values.insuranceMarkup}
								/>
							) : null}
						</Box>

						<Box sx={displayColStyle}>
							<FormControlLabel
								control={
									<Checkbox
										checked={addonChecked}
										onChange={(e) => {
											setAddonChecked(!addonChecked);
											handleProductTypeChange(e);
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
									disabled={isView}
									InputProps={{
										startAdornment: <InputAdornment position='start'>$</InputAdornment>,
									}}
									error={Boolean(formik.touched.addonMarkup && formik.errors.addonMarkup)}
									helperText={formik.touched.addonMarkup && formik.errors.addonMarkup}
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									value={formik.values.addonMarkup}
								/>
							) : null}
						</Box>
					</Box>
				</Grid>
				{/* firstname Fields */}
				<Grid item xs={12} md={2}>
					<TextField
						fullWidth
						disabled={isView}
						label='First Name'
						name='firstName'
						error={Boolean(formik.touched.firstName && formik.errors.firstName)}
						helperText={formik.touched.firstName && formik.errors.firstName}
						onBlur={formik.handleBlur}
						onChange={formik.handleChange}
						value={formik.values.firstName}
					/>
				</Grid>
				{/* lastname Fields */}
				<Grid item xs={12} md={2}>
					<TextField
						id='lastName'
						name='lastName'
						label='Last Name'
						fullWidth
						disabled={isView}
						error={Boolean(formik.touched.lastName && formik.errors.lastName)}
						helperText={formik.touched.lastName && formik.errors.lastName}
						onBlur={formik.handleBlur}
						onChange={formik.handleChange}
						value={formik.values.lastName}
					/>
				</Grid>
				{/*  EMail Fields */}
				<Grid item xs={12} md={2}>
					<TextField
						id='email'
						name='email'
						label='email'
						fullWidth
						disabled={isView}
						error={Boolean(formik.touched.email && formik.errors.email)}
						helperText={formik.touched.email && formik.errors.email}
						onBlur={formik.handleBlur}
						onChange={formik.handleChange}
						value={formik.values.email}
					/>
				</Grid>
				{/*  Phone Fields */}
				<Grid item xs={12} md={2}>
					<TextField
						id='phone'
						name='phone'
						label='phone'
						fullWidth
						disabled={isView}
						error={Boolean(formik.touched.phone && formik.errors.phone)}
						helperText={formik.touched.phone && formik.errors.phone}
						onBlur={formik.handleBlur}
						onChange={formik.handleChange}
						value={formik.values.phone}
					/>
				</Grid>
				{/* alt EMail Fields */}
				<Grid item xs={12} md={2}>
					<TextField
						name='altEmail'
						label='Alternative email'
						fullWidth
						disabled={isView}
						error={Boolean(formik.touched.altEmail && formik.errors.altEmail)}
						helperText={formik.touched.altEmail && formik.errors.altEmail}
						onBlur={formik.handleBlur}
						onChange={formik.handleChange}
						value={formik.values.altEmail}
					/>
				</Grid>
				{/* alt Phone Fields */}
				<Grid item xs={12} md={2}>
					<TextField
						name='altPhone'
						label='Alternative Phone'
						fullWidth
						disabled={isView}
						error={Boolean(formik.touched.altPhone && formik.errors.altPhone)}
						helperText={formik.touched.altPhone && formik.errors.altPhone}
						onBlur={formik.handleBlur}
						onChange={formik.handleChange}
						value={formik.values.altPhone}
					/>
				</Grid>
				{/* kidsCount Fields */}
				<Grid item xs={12} md={2}>
					<Box sx={displayFlexRowStyle}>
						<Box sx={displayColStyle}>
							<TextField
								error={Boolean(formik.touched.kidCount && formik.errors.kidCount)}
								fullWidth
								disabled={isView}
								helperText={formik.touched.kidCount && formik.errors.kidCount}
								label='Childs'
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
							{formik.values.kidCount > 0 ? (
								<TextField
									sx={{mt: 2}}
									name='kidPrice'
									label='Price Per Person'
									fullWidth
									disabled={isView}
									InputProps={{
										startAdornment: <InputAdornment position='start'>$</InputAdornment>,
									}}
									error={Boolean(formik.touched.kidPrice && formik.errors.kidPrice)}
									helperText={formik.touched.kidPrice && formik.errors.kidPrice}
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									value={formik.values.kidPrice}
								/>
							) : null}
						</Box>
					</Box>
				</Grid>
				{/* adult Count Fields */}
				<Grid item xs={12} md={2}>
					<Box sx={displayFlexRowStyle}>
						<Box sx={displayColStyle}>
							<TextField
								error={Boolean(formik.touched.adultCount && formik.errors.adultCount)}
								fullWidth
								disabled={isView}
								helperText={formik.touched.adultCount && formik.errors.adultCount}
								label='Adults'
								name='adultCount'
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
							{formik.values.adultCount > 0 ? (
								<TextField
									sx={{mt: 2}}
									name='adultPrice'
									label='Price Per Person'
									fullWidth
									disabled={isView}
									InputProps={{
										startAdornment: <InputAdornment position='start'>$</InputAdornment>,
									}}
									error={Boolean(formik.touched.adultPrice && formik.errors.adultPrice)}
									helperText={formik.touched.adultPrice && formik.errors.adultPrice}
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									value={formik.values.adultPrice}
								/>
							) : null}
						</Box>
					</Box>
				</Grid>
				{/* elder Count Fields */}
				<Grid item xs={12} md={2}>
					<Box sx={displayFlexRowStyle}>
						<Box sx={displayColStyle}>
							<TextField
								error={Boolean(formik.touched.elderCount && formik.errors.elderCount)}
								fullWidth
								disabled={isView}
								helperText={formik.touched.elderCount && formik.errors.elderCount}
								label='Elder'
								name='elderCount'
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
							{formik.values.elderCount > 0 ? (
								<TextField
									sx={{mt: 2}}
									name='elderPrice'
									label='Price Per Person'
									fullWidth
									disabled={isView}
									InputProps={{
										startAdornment: <InputAdornment position='start'>$</InputAdornment>,
									}}
									error={Boolean(formik.touched.elderPrice && formik.errors.elderPrice)}
									helperText={formik.touched.elderPrice && formik.errors.elderPrice}
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									value={formik.values.elderPrice}
								/>
							) : null}
						</Box>
					</Box>
				</Grid>
				{/* PNR no. Fields */}
				<Grid item xs={12} md={6}>
					<TextField
						id='pnrNo'
						name='pnrNo'
						label='PNR No.'
						fullWidth
						disabled={isView}
						error={Boolean(formik.touched.pnrNo && formik.errors.pnrNo)}
						helperText={(formik.touched.pnrNo && formik.errors.pnrNo) || 'optional'}
						onBlur={formik.handleBlur}
						onChange={formik.handleChange}
						value={formik.values.pnrNo}
					/>
				</Grid>
				{/* booking type -------Dropdown Fields */}
				<Grid item xs={12} md={3}>
					<FormControl fullWidth disabled={isView}>
						<InputLabel id='Bokking-type-Dropdown-label'>Booking Type</InputLabel>
						<Select
							labelId='Bokking-type-Dropdown-label	'
							id='Bokking-type-Dropdown'
							// value={bookingType}
							// onChange={handleBookingChange}
							fullWidth
							disabled={isView}
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
				{/* Fare type Fields */}
				<Grid item xs={12} md={3}>
					<FormControl fullWidth disabled={isView}>
						<InputLabel id='Fare-Type-Dropdown-label'>Fare Type</InputLabel>
						<Select
							labelId='Fare-Type-Dropdown-label'
							id='Fare-Type-Dropdown'
							fullWidth
							disabled={isView}
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
				{/* Booked On Fields */}
				<Grid item xs={12} md={3}>
					<FormControl fullWidth disabled={isView}>
						<InputLabel id='Booked-on-Dropdown-label'>Booked on </InputLabel>
						<Select
							labelId='Booked-on-Dropdown-label'
							id='Booked-on-Dropdown'
							fullWidth
							disabled={isView}
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
				{/* Airline code Fields */}
				<Grid item xs={12} md={3}>
					<TextField
						id='airlineCode'
						name='airlineCode'
						label='Airline Code *'
						fullWidth
						disabled={isView}
						error={Boolean(formik.touched.airlineCode && formik.errors.airlineCode)}
						helperText={Boolean(formik.touched.airlineCode && formik.errors.airlineCode) ? formik.touched.airlineCode && formik.errors.airlineCode : `Use Abbrivated Form`}
						onBlur={formik.handleBlur}
						onChange={formik.handleChange}
						value={formik.values.airlineCode}
					/>
				</Grid>
				{/* Grand Total Fields */}
				<Grid item xs={12} md={2}>
					<TextField
						id='grandTotal'
						name='grandTotal'
						label='Grand Total'
						fullWidth
						disabled={isView}
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
				{/* Total In-House Charge Fields */}
				<Grid item xs={12} md={2}>
					<TextField
						id='totalInhouseChargetotalInhouseCharge'
						name='totalInhouseCharge'
						label='Total Inhouse Charge'
						InputProps={{
							startAdornment: <InputAdornment position='start'>$</InputAdornment>,
						}}
						fullWidth
						disabled={isView}
						error={Boolean(formik.touched.totalInhouseCharge && formik.errors.totalInhouseCharge)}
						helperText={formik.touched.totalInhouseCharge && formik.errors.totalInhouseCharge}
						onBlur={formik.handleBlur}
						onChange={formik.handleChange}
						value={formik.values.totalInhouseCharge}
					/>
				</Grid>
				{/* MCO amount Fields */}
				<Grid item xs={12} md={2}>
					<TextField
						id='mcoNo'
						name='mcoNo'
						label='MCO'
						fullWidth
						disabled={isView}
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
				{/* DepartureDate Fields */}
				<Grid item xs={12} md={3}>
					<LocalizationProvider dateAdapter={AdapterDateFns}>
						<DatePicker
							inputFormat='MM/dd/yyyy'
							name='departureDateValue'
							label='Departure Date'
							onChange={(newValue) => {
								setDepDate(newValue);

								formik.setFieldValue(
									'departureDateValue',
									new Date(newValue).toLocaleDateString('en-US', {
										day: '2-digit',
										month: '2-digit',
										year: 'numeric',
									})
								);
							}}
							error={Boolean(formik.touched.departureDate && formik.errors.departureDate)}
							helperText={formik.touched.departureDate && formik.errors.departureDate}
							value={depDate}
							renderInput={(params) => <TextField {...params} />}
						/>
					</LocalizationProvider>
				</Grid>
				{/* ReturnDate Fields */}
				<Grid item xs={12} md={3}>
					<LocalizationProvider dateAdapter={AdapterDateFns}>
						<DatePicker
							name='returnDateValue'
							inputFormat='MM/dd/yyyy'
							label='Return Date'
							value={returnDate}
							onChange={(newValue) => {
								setReturnDate(newValue);
								formik.setFieldValue(
									'returnDateValue',
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
			</Grid>
		</>
	);
}

const displayColStyle = {
	display: 'flex',
	alignItems: 'flex-start',
	flexDirection: 'column',
	p: 1,
	paddingTop: '0px !important',
	paddingLeft: '0px !important',

	// bgcolor: 'background.paper',
	borderRadius: 1,
};
const displayFlexRowStyle = {
	display: 'flex',
	flexDirection: 'row',
	p: 1,
	paddingTop: '0px !important',
	paddingLeft: '0px !important',
	// bgcolor: 'background.paper',
	borderRadius: 1,
};
