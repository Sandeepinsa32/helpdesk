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

	const [selectedProductType, setSelectedProductType] = useState([]);
	const [initialProductType, setInitialProductType] = useState([]);
	const [checkboxType, setCheckboxType] = useState({
		flight: false,
		hotel: false,
		car: false,
		insurance: false,
		addon: false,
	});

	// const [flightChecked, setFlightChecked] = useState(false);
	// const [carChecked, setCarChecked] = useState(false);
	// const [hotelChecked, setHotelChecked] = useState(false);
	// const [insuranceChecked, setInsuranceChecked] = useState(false);
	// const [addonChecked, setAddonChecked] = useState(false);

	//date
	const [depDate, setDepDate] = useState(formik.values.departureDate);
	const [returnDate, setReturnDate] = useState(formik.values.returnDate);

	//  for Product Selected Checkbox ---> array
	const handleProductTypeChange = (e) => {
		setSelectedProductType([...selectedProductType, e.target.name]);

		let newArray = [...selectedProductType, e.target.name];
		if (selectedProductType.includes(e.target.name) && checkboxType[e.target.name] === true) {
			newArray = newArray.filter((x) => x !== e.target.name);
		} else if (selectedProductType.includes(e.target.name) && checkboxType[e.target.name] == false) {
			const index = newArray.indexOf(e.target.name);
			if (index > -1) {
				newArray.splice(index, 1);
			}
		}

		console.log('newArray', newArray);
		// setSelectedProductType(newArray);
		formik.setFieldValue('productType', selectedProductType);
	};

	useEffect(() => {
		console.log(initialProductType);
	});

	const checked = (propertyname) => initialProductType.reduce((obj) => obj.property == propertyname, false);
	return (
		<>
			<Grid container spacing={3} sx={{}}>
				{/*  checkbox label  Fields */}
				<Grid item xs={12} md={12} sx={{p: `16px !important`, pt: `0px !important`}}>
					<FormControl sx={{m: 1, p: 1}} fullWidth disabled={isView} error={Boolean(formik.touched.productType && formik.errors.productType)}>
						<InputLabel variant='outlined'>Product Type :</InputLabel>
					</FormControl>
					<Box sx={displayFlexRowStyle} style={{marginTop: '10px ', marginLeft: '18px'}}>
						{['flight', 'hotel', 'car', 'insurance', 'addon'].map((x, i) => {
							return (
								<>
									<Box sx={displayColStyle} style={{paddingTop: '8px !important'}} key={i}>
										<FormControlLabel
											control={
												<Checkbox
													checked={checkboxType.x}
													onChange={(e) => {
														let object = {
															property: x,
															propertyMarkup: '',
														};

														const productExists = initialProductType.reduce((acc, prop) => prop.property == object.property, false);

														if (productExists) {
															var remainingValues = initialProductType.filter((y) => y.property !== object.property);
															setInitialProductType([...remainingValues]);
														} else {
															setInitialProductType([...initialProductType, object]);
														}
													}}
													name={x + `Markup`}
													color='primary'
												/>
											}
											label={x}
										/>
										{checked && (
											<TextField
												name={x + `Markup`}
												label={x + `Markup`}
												fullWidth
												disabled={isView}
												InputProps={{
													startAdornment: <InputAdornment position='start'>$</InputAdornment>,
												}}
												// error={Boolean(formik.touched.x + `Markup` && formik.errors.x + `Markup`)}
												// helperText={formik.touched.x + `Markup` && formik.errors.x + `Markup`}
												// onBlur={formik.handleBlur}
												onChange={(e) => {
													const index = initialProductType.findIndex((obj) => obj.property === x);
													let data = [...initialProductType];
													data[index]['propertyMarkup'] = e.target.value;

													setInitialProductType(data);
												}}
												// value={formik.values.x + `Markup`}
											/>
										)}
									</Box>
								</>
							);
						})}
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
				{/* alternateEmail EMail Fields */}
				<Grid item xs={12} md={2}>
					<TextField
						name='alternateEmail'
						label='Alternative email'
						fullWidth
						disabled={isView}
						error={Boolean(formik.touched.alternateEmail && formik.errors.alternateEmail)}
						helperText={formik.touched.alternateEmail && formik.errors.alternateEmail}
						onBlur={formik.handleBlur}
						onChange={formik.handleChange}
						value={formik.values.alternateEmail}
					/>
				</Grid>
				{/* alternatePhone  Fields */}
				<Grid item xs={12} md={2}>
					<TextField
						name='alternatePhone'
						label='Alternative Phone'
						fullWidth
						disabled={isView}
						error={formik.touched.alternatePhone && formik.errors.alternatePhone}
						helperText={formik.touched.alternatePhone && formik.errors.alternatePhone}
						onBlur={formik.handleBlur}
						onChange={formik.handleChange}
						value={formik.values.alternatePhone}
					/>
				</Grid>
				{/* kidsCount Fields */}
				<Grid item xs={12} md={2}>
					<Box sx={displayFlexRowStyle}>
						<Box sx={displayColStyle}>
							<TextField
								error={Boolean(formik.touched.childCount && formik.errors.childCount)}
								fullWidth
								disabled={isView}
								helperText={formik.touched.childCount && formik.errors.childCount}
								label='Childs'
								name='childCount'
								value={formik.values.childCount}
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
							{formik.values.childCount > 0 ? (
								<TextField
									sx={{mt: 2}}
									name='childPrice'
									label='Price Per Person'
									fullWidth
									disabled={isView}
									InputProps={{
										startAdornment: <InputAdornment position='start'>$</InputAdornment>,
									}}
									error={Boolean(formik.touched.childPrice && formik.errors.childPrice)}
									helperText={formik.touched.childPrice && formik.errors.childPrice}
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									value={formik.values.childPrice}
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
							name='departureDate'
							label='Departure Date'
							onChange={(newValue) => {
								setDepDate(newValue);

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
							value={depDate}
							renderInput={(params) => <TextField {...params} />}
						/>
					</LocalizationProvider>
				</Grid>
				{/* ReturnDate Fields */}
				<Grid item xs={12} md={3}>
					<LocalizationProvider dateAdapter={AdapterDateFns}>
						<DatePicker
							name='returnDate'
							inputFormat='MM/dd/yyyy'
							label='Return Date'
							value={returnDate}
							onChange={(newValue) => {
								setReturnDate(newValue);
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
