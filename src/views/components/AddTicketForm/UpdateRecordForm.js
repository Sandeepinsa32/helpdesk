import React, {useState, useEffect} from 'react';

import {useFormikContext} from 'formik';
import {Grid, TextField, FormControlLabel, InputAdornment, Box, Checkbox, InputLabel, MenuItem, FormControl, Select} from '@mui/material';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';

//material-icon
import BoyIcon from '@mui/icons-material/Boy';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import ElderlyIcon from '@mui/icons-material/Elderly';

// custom Formik field
import Textfield from '../FormField/Textfield';

export default function UpdateRecordForm() {
	const {values, handleChange, setFieldValue, touched, handleBlur, errors} = useFormikContext();

	//date
	const [depDate, setDepDate] = useState(values.departureDate);
	const [returnDate, setReturnDate] = useState(values.returnDate);
	const [initialProductType, setInitialProductType] = useState(values.productType);
	const [isView, setIsView] = useState(true);
	useEffect(() => {
		setIsView(true);
	});

	const [checkObj, setCheckObj] = useState({});
	const [checkboxType, setCheckboxType] = useState({
		flight: false,
		hotel: false,
		car: false,
		insurance: false,
		addon: false,
	});

	const checkbox = [
		{
			name: 'flight',
			label: 'FLIGHT',
			markup: 'flightMarkup',
			markupLabel: 'FLIGHT MARKUP',
		},
		{
			name: 'hotel',
			label: 'HOTEL',
			markup: 'hotelMarkup',
			markupLabel: 'HOTEL MARKUP',
		},
		{
			name: 'car',
			label: 'CAR',
			markup: 'carMarkup',
			markupLabel: 'CarMarkup',
		},
		{
			name: 'insurance',
			label: 'INSURANCE',
			markup: 'insuranceMarkup',
			markupLabel: 'INSURANCE MARKUP',
		},
		{
			name: 'addon',
			label: 'ADD-ON',
			markup: 'addonMarkup',
			markupLabel: 'ADDON MARKUP',
		},
		{
			name: null,
			label: 'TOTAL',
			markup: 'TotalMarkup',
			markupLabel: 'TOTAL MARKUP',
		},
	];

	const isCheckedHandler = (name) => {
		var isChecked = false;
		for (let i = 0; i < values.productType.length; i++) {
			const product = values.productType[i];
			if (name === product.property) {
				isChecked = true;
				return {
					isChecked,
					product,
				};
				break;
			}
		}
		return {isChecked};
	};

	let Amount = [];
	const calculateTotalMarkup = () => {
		var total = 0;
		for (var i in Amount) {
			total += Number(Amount[i]);
		}

		return total;
	};

	return (
		<Grid container spacing={3} key={1}>
			{/*  checkbox label  Fields */}
			<Grid item xs={12} sm={12} md={12} sx={{p: `16px !important`, pt: `0px !important`}}>
				<FormControl sx={{m: 1, p: 1}} fullWidth disabled={isView} error={Boolean(touched.productType && errors.productType)} helperText={touched.productType && errors.productType}>
					<InputLabel variant='outlined'>Product Type :</InputLabel>
				</FormControl>
				<Box sx={displayFlexRowStyle} style={{marginTop: '10px ', marginLeft: '18px'}}>
					{checkbox.map((data, i) => {
						const {name, label, markup, markupLabel} = data;

						var productData = isCheckedHandler(data.name);
						productData.isChecked && Amount.push(productData.product.propertyMarkup);
						return (
							<>
								<Box sx={displayColStyle} style={{paddingTop: '8px !important'}} key={i}>
									<FormControlLabel
										disabled={isView}
										control={
											name !== null ? (
												<Checkbox
													checked={productData.isChecked}
													disabled={isView}
													onChange={(e) => {
														let object = {
															property: name,
															propertyMarkup: '',
														};
														let checkboxData = {...checkboxType};
														checkboxData[name] = !checkboxType[name];

														setFieldValue('checkboxValue', {
															...checkboxData,
														});
														setCheckboxType({...checkboxData});

														const productExists = initialProductType.reduce((acc, prop) => prop.property == object.property, false);

														if (productExists) {
															var remainingValues = initialProductType.filter((y) => y.property !== object.property);
															setInitialProductType([...remainingValues]);
														} else {
															setInitialProductType([...initialProductType, object]);
														}
														// console.log(initialProductType);
														setFieldValue('productType', initialProductType);
													}}
													name={name}
													color='primary'
												/>
											) : (
												<Checkbox disabled={true} checked={false} name='TOTAL' color='secondry' />
											)
										}
										label={label}></FormControlLabel>

									{name !== null ? (
										productData.isChecked && (
											<TextField
												name={markup}
												label={markupLabel}
												type='number'
												fullWidth
												disabled={isView}
												InputProps={{
													startAdornment: <InputAdornment position='start'>$</InputAdornment>,
												}}
												error={touched.markup && errors.markup}
												helperText={touched.markup && errors.markup}
												onBlur={handleBlur}
												value={productData.product.propertyMarkup}
												// value={isCheckedPropertyHaveMarkup(name)}
												onChange={(e) => {
													setFieldValue(markup, e.target.value);
													const index = initialProductType.findIndex((obj) => obj.property === name);
													let data = [...initialProductType];
													data[index]['propertyMarkup'] = e.target.value;

													setInitialProductType(data);
													setFieldValue('productType', initialProductType);
													calculateTotalMarkup();
												}}
											/>
										)
									) : (
										<TextField
											name={markup}
											type='number'
											label={markupLabel}
											fullWidth
											disabled={true}
											InputProps={{
												startAdornment: <InputAdornment position='start'>$</InputAdornment>,
											}}
											error={touched.markup && errors.markup}
											helperText={touched.markup && errors.markup}
											onBlur={handleBlur}
											value={calculateTotalMarkup()}
										/>
									)}
								</Box>
							</>
						);
					})}
				</Box>
			</Grid>
			{/* firstname Fields */}
			<Grid item xs={4} md={3} sm={4}>
				<TextField
					fullWidth
					disabled={true}
					label='FIRST NAME'
					name='firstName'
					error={Boolean(touched.firstName && errors.firstName)}
					helperText={touched.firstName && errors.firstName}
					onBlur={handleBlur}
					onChange={handleChange}
					value={values.firstName}
				/>
			</Grid>
			{/* lastname Fields */}
			<Grid item xs={4} md={3} sm={4}>
				<TextField
					id='lastName'
					name='lastName'
					label='LAST NAME'
					fullWidth
					disabled={true}
					error={Boolean(touched.lastName && errors.lastName)}
					helperText={touched.lastName && errors.lastName}
					onBlur={handleBlur}
					onChange={handleChange}
					value={values.lastName}
				/>
			</Grid>
			{/*  EMail Fields */}
			<Grid item xs={4} md={3} sm={4}>
				<TextField
					id='email'
					name='email'
					label='EMAIL'
					fullWidth
					disabled={true}
					error={Boolean(touched.email && errors.email)}
					helperText={touched.email && errors.email}
					onBlur={handleBlur}
					onChange={handleChange}
					value={values.email}
				/>
			</Grid>
			{/*  Phone Fields */}
			<Grid item xs={4} md={3} sm={4}>
				<TextField
					id='phone'
					name='phone'
					label='PHONE'
					type='number'
					fullWidth
					disabled={true}
					error={Boolean(touched.phone && errors.phone)}
					helperText={touched.phone && errors.phone}
					onBlur={handleBlur}
					onChange={handleChange}
					value={values.phone}
				/>
			</Grid>
			{/* alternateEmail EMail Fields */}
			<Grid item xs={4} md={3} sm={4}>
				<TextField
					name='alternateEmail'
					label='ALTERNATIVE EMAIL'
					fullWidth
					// disabled={isView}
					error={Boolean(touched.alternateEmail && errors.alternateEmail)}
					helperText={touched.alternateEmail && errors.alternateEmail}
					onBlur={handleBlur}
					onChange={handleChange}
					value={values.alternateEmail}
				/>
			</Grid>
			{/* alternatePhone  Fields */}
			<Grid item xs={4} md={3} sm={4}>
				<TextField
					type='number'
					name='alternatePhone'
					label='ALTERNATIVE PHONE'
					fullWidth
					// disabled={isView}
					error={touched.alternatePhone && errors.alternatePhone}
					helperText={touched.alternatePhone && errors.alternatePhone}
					onBlur={handleBlur}
					onChange={handleChange}
					value={values.alternatePhone}
				/>
			</Grid>
			{/* kidsCount Fields */}
			<Grid item xs={3} md={2} sm={4}>
				<Box sx={displayFlexRowStyle}>
					<Box sx={displayColStyle}>
						<TextField
							error={Boolean(touched.childCount && errors.childCount)}
							fullWidth
							disabled={true}
							helperText={touched.childCount && errors.childCount}
							label='CHILDS'
							name='childCount'
							value={values.childCount}
							onBlur={handleBlur}
							onChange={handleChange}
							type='number'
							InputProps={{
								startAdornment: (
									<InputAdornment position='start'>
										<ChildCareIcon />
									</InputAdornment>
								),
							}}
						/>
						{values.childCount > 0 ? (
							<TextField
								type='number'
								sx={{mt: 2}}
								name='childPrice'
								label='PRICE PER CHILD'
								fullWidth
								disabled={true}
								InputProps={{
									startAdornment: <InputAdornment position='start'>$</InputAdornment>,
								}}
								error={Boolean(touched.childPrice && errors.childPrice)}
								helperText={touched.childPrice && errors.childPrice}
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.childPrice}
							/>
						) : null}
					</Box>
				</Box>
			</Grid>
			{/* adult Count Fields */}
			<Grid item xs={3} md={2} sm={4}>
				<Box sx={displayFlexRowStyle}>
					<Box sx={displayColStyle}>
						<TextField
							error={Boolean(touched.adultCount && errors.adultCount)}
							fullWidth
							disabled={true}
							helperText={touched.adultCount && errors.adultCount}
							label='ADULTS'
							name='adultCount'
							onBlur={handleBlur}
							onChange={handleChange}
							type='number'
							InputProps={{
								startAdornment: (
									<InputAdornment position='start'>
										<BoyIcon />
									</InputAdornment>
								),
							}}
							value={values.adultCount}
						/>
						{values.adultCount > 0 ? (
							<TextField
								type='number'
								sx={{mt: 2}}
								name='adultPrice'
								label='PRICE PER ADULT'
								fullWidth
								disabled={true}
								InputProps={{
									startAdornment: <InputAdornment position='start'>$</InputAdornment>,
								}}
								error={Boolean(touched.adultPrice && errors.adultPrice)}
								helperText={touched.adultPrice && errors.adultPrice}
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.adultPrice}
							/>
						) : null}
					</Box>
				</Box>
			</Grid>
			{/* elder Count Fields */}
			<Grid item xs={3} md={2} sm={4}>
				<Box sx={displayFlexRowStyle}>
					<Box sx={displayColStyle}>
						<TextField
							error={Boolean(touched.elderCount && errors.elderCount)}
							fullWidth
							disabled={true}
							helperText={touched.elderCount && errors.elderCount}
							label='INFANT'
							name='elderCount'
							onBlur={handleBlur}
							onChange={handleChange}
							type='number'
							InputProps={{
								startAdornment: (
									<InputAdornment position='start'>
										<ElderlyIcon />
									</InputAdornment>
								),
							}}
							value={values.elderCount}
						/>
						{values.elderCount > 0 ? (
							<TextField
								type='number'
								sx={{mt: 2}}
								name='elderPrice'
								label='PRICE PER INFANT'
								fullWidth
								disabled={true}
								InputProps={{
									startAdornment: <InputAdornment position='start'>$</InputAdornment>,
								}}
								error={Boolean(touched.elderPrice && errors.elderPrice)}
								helperText={touched.elderPrice && errors.elderPrice}
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.elderPrice}
							/>
						) : null}
					</Box>
				</Box>
			</Grid>
			{/* PNR no. Fields */}
			<Grid item xs={9} md={6} sm={9}>
				<TextField
					id='pnrNo'
					name='pnrNo'
					label='PNR NO.'
					fullWidth
					// disabled={isView}
					error={Boolean(touched.pnrNo && errors.pnrNo)}
					helperText={(touched.pnrNo && errors.pnrNo) || 'optional'}
					onBlur={handleBlur}
					onChange={handleChange}
					value={values.pnrNo}
				/>
			</Grid>
			{/* Airline code */}
			<Grid item xs={3} md={3} sm={3}>
				<TextField
					id='airlineCode'
					name='airlineLocator'
					label='AIRLINE Locator '
					fullWidth
					// disabled={isView}
					error={Boolean(touched.airlineLocator && errors.airlineLocator)}
					helperText={touched.airlineLocator && errors.airlineLocator}
					onBlur={handleBlur}
					onChange={(e) => {
						const value = e.target.value || '';
						setFieldValue('airlineLocator', value.toUpperCase());
					}}
					value={values.airlineLocator}
				/>
			</Grid>
			{/* booking type -------Dropdown Fields */}
			<Grid item xs={3} md={3} sm={3}>
				<FormControl fullWidth disabled={isView}>
					<InputLabel id='Bokking-type-Dropdown-label'>BOOKING TYPE</InputLabel>
					<Select
						labelId='Bokking-type-Dropdown-label	'
						id='Bokking-type-Dropdown'
						// value={bookingType}
						// onChange={handleBookingChange}
						fullWidth
						disabled={true}
						name='bookingType'
						label='BOOKING TYPE'
						error={Boolean(touched.bookingType && errors.bookingType)}
						// helperText={touched.bookingType && errors.bookingType}
						onBlur={handleBlur}
						onChange={handleChange}
						value={values.bookingType}>
						<MenuItem value='new'>New</MenuItem>
						<MenuItem value='exchange'>Exchange</MenuItem>
						<MenuItem value='refund'>Refund</MenuItem>
						<MenuItem value='void'>Void</MenuItem>
						<MenuItem value='addon'>Add-On</MenuItem>
					</Select>
				</FormControl>
			</Grid>
			{/* Fare type Fields */}
			<Grid item xs={3} md={3} sm={3}>
				<FormControl fullWidth disabled={isView}>
					<InputLabel id='Fare-Type-Dropdown-label'>FARE TYPE</InputLabel>
					<Select
						labelId='Fare-Type-Dropdown-label'
						id='Fare-Type-Dropdown'
						fullWidth
						disabled={true}
						name='fareType'
						label='FARE TYPE'
						error={Boolean(touched.fareType && errors.fareType)}
						// helperText={touched.fareType && errors.fareType}
						onBlur={handleBlur}
						onChange={handleChange}
						value={values.fareType}>
						<MenuItem value='publish'>Publish</MenuItem>
						<MenuItem value='private'>Private</MenuItem>
						<MenuItem value='fxl'>FXL</MenuItem>
						<MenuItem value='dummy'>Dummy</MenuItem>
					</Select>
				</FormControl>
			</Grid>
			{/* Booked On Fields */}
			<Grid item xs={3} md={3} sm={3}>
				<FormControl fullWidth disabled={isView}>
					<InputLabel id='Booked-on-Dropdown-label'>BOOKED ON </InputLabel>
					<Select
						labelId='Booked-on-Dropdown-label'
						id='Booked-on-Dropdown'
						fullWidth
						disabled={true}
						name='bookedOn'
						label='BOOKED ON'
						onBlur={handleBlur}
						onChange={handleChange}
						value={values.bookedOn}
						error={Boolean(touched.bookedOn && errors.bookedOn)}
						// helperText={touched.bookedOn && errors.bookedOn}
					>
						<MenuItem value='web'>Web</MenuItem>
						<MenuItem value='trippro'>TripPro</MenuItem>
						<MenuItem value='skybird'>SkyBird</MenuItem>
						<MenuItem value='picasso'>Picasso</MenuItem>
					</Select>
				</FormControl>
			</Grid>
			{/* Airline code Fields */}
			<Grid item xs={3} md={3} sm={3}>
				<TextField
					id='airlineCode'
					name='airlineCode'
					label='AIRLINE CODE '
					fullWidth
					disabled={isView}
					error={Boolean(touched.airlineCode && errors.airlineCode)}
					helperText={Boolean(touched.airlineCode && errors.airlineCode) ? touched.airlineCode && errors.airlineCode : `Use Abbrivated Form`}
					onBlur={handleBlur}
					onChange={handleChange}
					value={values.airlineCode}
				/>
			</Grid>
			{/* Grand Total Fields */}
			<Grid item xs={3} md={2} sm={3}>
				<TextField
					type='number'
					id='grandTotal'
					name='grandTotal'
					label='GRAND TOTAL'
					fullWidth
					disabled={true}
					InputProps={{
						startAdornment: <InputAdornment position='start'>$</InputAdornment>,
					}}
					error={Boolean(touched.grandTotal && errors.grandTotal)}
					helperText={touched.grandTotal && errors.grandTotal}
					onBlur={handleBlur}
					onChange={handleChange}
					value={values.grandTotal}
				/>
			</Grid>
			{/* Total In-House Charge Fields */}
			<Grid item xs={3} md={2} sm={3}>
				<TextField
					type='number'
					id='totalInhouseChargetotalInhouseCharge'
					name='totalInhouseCharge'
					label='TOTAL INHOUSE CHARGE'
					InputProps={{
						startAdornment: <InputAdornment position='start'>$</InputAdornment>,
					}}
					fullWidth
					disabled={true}
					error={Boolean(touched.totalInhouseCharge && errors.totalInhouseCharge)}
					helperText={touched.totalInhouseCharge && errors.totalInhouseCharge}
					onBlur={handleBlur}
					onChange={handleChange}
					value={values.totalInhouseCharge}
				/>
			</Grid>
			{/* MCO amount Fields */}
			<Grid item xs={3} md={2} sm={3}>
				<TextField
					type='number'
					id='mcoNo'
					name='mcoNo'
					label='MCO'
					fullWidth
					disabled={true}
					InputProps={{
						startAdornment: <InputAdornment position='start'>$</InputAdornment>,
					}}
					error={Boolean(touched.mcoNo && errors.mcoNo)}
					helperText={touched.mcoNo && errors.mcoNo}
					onBlur={handleBlur}
					onChange={handleChange}
					value={values.mcoNo}
				/>
			</Grid>
			{/* DepartureDate Fields */}
			<Grid item xs={3} md={3} sm={3}>
				<LocalizationProvider dateAdapter={AdapterDateFns}>
					<DatePicker
						inputFormat='MM/dd/yyyy'
						name='departureDate'
						label='DEPARTURE DATE'
						disabled={true}
						minDate={new Date()}
						maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 2))}
						onChange={(newValue) => {
							setDepDate(newValue);

							setFieldValue(
								'departureDate',
								new Date(newValue).toLocaleDateString('en-US', {
									day: '2-digit',
									month: '2-digit',
									year: 'numeric',
								})
							);
						}}
						error={Boolean(touched.departureDate && errors.departureDate)}
						helperText={touched.departureDate && errors.departureDate}
						value={depDate}
						renderInput={(params) => (
							<TextField disabled={isView} {...params} error={Boolean(touched.departureDate && errors.departureDate)} helperText={touched.departureDate && errors.departureDate} />
						)}
					/>
				</LocalizationProvider>
			</Grid>
			{/* ReturnDate Fields */}
			<Grid item xs={3} md={3} sm={3}>
				<LocalizationProvider dateAdapter={AdapterDateFns}>
					<DatePicker
						name='returnDate'
						inputFormat='MM/dd/yyyy'
						label='RETURN DATE'
						disabled={!depDate || true}
						minDate={depDate}
						maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 2))}
						value={returnDate}
						onChange={(newValue) => {
							setReturnDate(newValue);
							setFieldValue(
								'returnDate',
								new Date(newValue).toLocaleDateString('en-US', {
									day: '2-digit',
									month: '2-digit',
									year: 'numeric',
								})
							);
						}}
						error={Boolean(touched.returnDate && errors.returnDate)}
						helperText={touched.returnDate && errors.returnDate}
						renderInput={(params) => (
							<TextField {...params} disabled={isView} helperText={touched.returnDate && errors.returnDate} error={Boolean(touched.returnDate && errors.returnDate)} />
						)}
					/>
				</LocalizationProvider>
			</Grid>
		</Grid>
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
