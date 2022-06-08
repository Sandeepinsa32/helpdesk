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

export default function UpdateRecordForm({isReadOnly}) {
	const {values, handleChange, setFieldValue, touched, handleBlur, errors} = useFormikContext();

	//date
	const [depDate, setDepDate] = useState(values.departureDate);
	const [returnDate, setReturnDate] = useState(values.returnDate);
	const [initialProductType, setInitialProductType] = useState(values.productType);
	const [isDisable, setIsDisable] = useState(true);
	const [isUpdateable, setIsUpdateable] = useState(!isReadOnly);

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

	console.log('isReadOnly', isReadOnly);
	return (
		<Grid container spacing={3} key={1}>
			{/*  checkbox label  Fields */}
			<Grid item xs={12} sm={12} md={12} sx={{p: `16px !important`, py: `0px !important`}}>
				<FormControl sx={{m: 1, p: 1}} fullWidth disabled={true} error={Boolean(touched.productType && errors.productType)} helperText={touched.productType && errors.productType}>
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
										disabled={isDisable}
										control={
											name !== null ? (
												<Checkbox
													checked={productData.isChecked}
													disabled={isDisable}
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
												disabled={isDisable}
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
				<Textfield disabled={isDisable} label='FIRST NAME' name='firstName' />
			</Grid>
			{/* lastname Fields */}
			<Grid item xs={4} md={3} sm={4}>
				<Textfield disabled={isDisable} name='lastName' label='LAST NAME' />
			</Grid>
			{/*  EMail Fields */}
			<Grid item xs={4} md={3} sm={4}>
				<Textfield disabled={isDisable} name='email' label='EMAIL' />
			</Grid>
			{/*  Phone Fields */}
			<Grid item xs={4} md={3} sm={4}>
				<Textfield disabled={isDisable} name='phone' label='PHONE' type='number' />
			</Grid>
			{/* alternateEmail EMail Fields */}
			<Grid item xs={4} md={3} sm={4}>
				<Textfield disabled={isUpdateable} name='alternateEmail' label='ALTERNATIVE EMAIL' fullWidth />
			</Grid>
			{/* alternatePhone  Fields */}
			<Grid item xs={4} md={3} sm={4}>
				<Textfield disabled={isUpdateable} type='number' name='alternatePhone' label='ALTERNATIVE PHONE' />
			</Grid>

			{/* PNR no. Fields */}
			<Grid item xs={9} md={6} sm={9}>
				<Textfield disabled={isUpdateable} name='pnrNo' label='PNR NO.' />
			</Grid>
			{/* Airline code */}
			<Grid item xs={3} md={3} sm={3}>
				<Textfield
					disabled={isUpdateable}
					name='airlineLocator'
					label='AIRLINE Locator '
					onChange={(e) => {
						const value = e.target.value || '';
						setFieldValue('airlineLocator', value.toUpperCase());
					}}
				/>
			</Grid>
			{/* booking type -------Dropdown Fields */}
			<Grid item xs={3} md={3} sm={3}>
				<FormControl fullWidth disabled={isDisable}>
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
				<FormControl fullWidth disabled={isDisable}>
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
				<FormControl fullWidth disabled={isDisable}>
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
				<Textfield disabled={isDisable} name='airlineCode' label='AIRLINE CODE ' />
			</Grid>
			{/* Grand Total Fields */}
			<Grid item xs={3} md={2} sm={3}>
				<Textfield
					disabled={isDisable}
					type='number'
					name='grandTotal'
					label='GRAND TOTAL'
					InputProps={{
						startAdornment: <InputAdornment position='start'>$</InputAdornment>,
					}}
				/>
			</Grid>
			{/* Total In-House Charge Fields */}
			<Grid item xs={3} md={2} sm={3}>
				<Textfield
					disabled={isDisable}
					type='number'
					name='totalInhouseCharge'
					label='TOTAL INHOUSE CHARGE'
					InputProps={{
						startAdornment: <InputAdornment position='start'>$</InputAdornment>,
					}}
				/>
			</Grid>
			{/* MCO amount Fields */}
			<Grid item xs={3} md={2} sm={3}>
				<Textfield
					disabled={isDisable}
					type='number'
					name='mcoNo'
					label='MCO'
					InputProps={{
						startAdornment: <InputAdornment position='start'>$</InputAdornment>,
					}}
				/>
			</Grid>
			{/* DepartureDate Fields */}
			<Grid item xs={3} md={3} sm={3}>
				<LocalizationProvider fullWidth dateAdapter={AdapterDateFns}>
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
							<TextField
								disabled={isDisable}
								{...params}
								fullWidth
								error={Boolean(touched.departureDate && errors.departureDate)}
								helperText={touched.departureDate && errors.departureDate}
							/>
						)}
					/>
				</LocalizationProvider>
			</Grid>
			{/* ReturnDate Fields */}
			<Grid item xs={3} md={3} sm={3}>
				<LocalizationProvider fullWidth dateAdapter={AdapterDateFns}>
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
							<TextField {...params} fullWidth disabled={isDisable} helperText={touched.returnDate && errors.returnDate} error={Boolean(touched.returnDate && errors.returnDate)} />
						)}
					/>
				</LocalizationProvider>
			</Grid>
			{/* kidsCount Fields */}
			<Grid item xs={3} md={2} sm={3}>
				<Box sx={displayFlexRowStyle}>
					<Box sx={displayColStyle}>
						<Textfield
							fullWidth
							disabled={isDisable}
							label='CHILDS'
							name='childCount'
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
							<Textfield
								fullWidth
								disabled={isDisable}
								type='number'
								sx={{mt: 2}}
								name='childPrice'
								label='PRICE PER CHILD'
								InputProps={{
									startAdornment: <InputAdornment position='start'>$</InputAdornment>,
								}}
							/>
						) : null}
					</Box>
				</Box>
			</Grid>
			{/* adult Count Fields */}
			<Grid item xs={3} md={2} sm={3}>
				<Box sx={displayFlexRowStyle}>
					<Box sx={displayColStyle}>
						<Textfield
							disabled={isDisable}
							label='ADULTS'
							name='adultCount'
							type='number'
							InputProps={{
								startAdornment: (
									<InputAdornment position='start'>
										<BoyIcon />
									</InputAdornment>
								),
							}}
						/>
						{values.adultCount > 0 ? (
							<Textfield
								disabled={isDisable}
								type='number'
								sx={{mt: 2}}
								name='adultPrice'
								label='PRICE PER ADULT'
								InputProps={{
									startAdornment: <InputAdornment position='start'>$</InputAdornment>,
								}}
							/>
						) : null}
					</Box>
				</Box>
			</Grid>
			{/* elder Count Fields */}
			<Grid item xs={3} md={2} sm={3}>
				<Box sx={displayFlexRowStyle}>
					<Box sx={displayColStyle}>
						<Textfield
							disabled={isDisable}
							label='INFANT'
							name='elderCount'
							type='number'
							InputProps={{
								startAdornment: (
									<InputAdornment position='start'>
										<ElderlyIcon />
									</InputAdornment>
								),
							}}
						/>
						{values.elderCount > 0 ? (
							<Textfield
								disabled={isDisable}
								type='number'
								sx={{mt: 2}}
								name='elderPrice'
								label='PRICE PER INFANT'
								InputProps={{
									startAdornment: <InputAdornment position='start'>$</InputAdornment>,
								}}
							/>
						) : null}
					</Box>
				</Box>
			</Grid>
			{/* Remarks Field */}
			<Grid item xs={3} md={3} sm={3}>
				<Textfield name='remarks' label='REMARKS' multiline rows={4} disabled={isUpdateable} />
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
