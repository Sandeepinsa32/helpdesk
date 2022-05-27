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

export default function AddressForm({formik, isView}) {
	// de-str new formik object
	const {values, handleChange, errors, touched, setFieldValue} = useFormikContext();

	//date
	const [depDate, setDepDate] = useState(values.departureDate);
	const [returnDate, setReturnDate] = useState(values.returnDate);
	const [initialProductType, setInitialProductType] = useState([]);
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
			markupLabel: 'FlightMarkup',
		},
		{
			name: 'hotel',
			label: 'HOTEL',
			markup: 'hotelMarkup',
			markupLabel: 'HotelMarkup',
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
			markupLabel: 'AddonMarkup',
		},
		{
			name: null,
			label: 'TOTAL',
			markup: 'TotalMarkup',
			markupLabel: 'TOTAL MARKUP',
		},
	];

	const calculateTotalMarkup = () => {
		let Amount = [];
		initialProductType.map((x, i) => {
			Amount.push(initialProductType[i].propertyMarkup);
		});

		var total = 0;
		for (var i in Amount) {
			total += Number(Amount[i]);
		}

		setFieldValue('totalMarkup', total);
	};

	useEffect(() => {
		setFieldValue('productType', initialProductType);
	}, [initialProductType]);

	return (
		<Grid container spacing={3} key={1}>
			{/*  checkbox label  Fields */}
			<Grid item xs={12} sm={12} md={12} sx={{p: `16px !important`, pt: `0px !important`}}>
				<FormControl sx={{m: 1, p: 1}} fullWidth error={Boolean(touched.productType && errors.productType)} helperText={touched.productType && errors.productType}>
					<InputLabel variant='outlined'>Product Type :</InputLabel>
				</FormControl>
				<Box sx={displayFlexRowStyle} style={{marginTop: '10px ', marginLeft: '18px'}}>
					{checkbox.map((data, i) => {
						const {name, label, markup, markupLabel} = data;

						return (
							<Box sx={displayColStyle} style={{paddingTop: '8px !important'}} key={i}>
								<FormControlLabel
									control={
										name !== null ? (
											<Checkbox
												checked={checkboxType.name}
												onChange={(e) => {
													let object = {
														property: name,
														propertyMarkup: '',
													};
													let checkboxData = {...checkboxType};
													checkboxData[name] = !checkboxType[name];

													setCheckboxType({...checkboxData});

													const productExists = initialProductType.reduce((acc, prop) => prop.property == object.property, false);

													if (productExists) {
														var remainingValues = initialProductType.filter((y) => y.property !== object.property);
														setInitialProductType([...remainingValues]);
													} else {
														setInitialProductType([...initialProductType, object]);
													}
												}}
												name={name}
												color='primary'
											/>
										) : (
											<Checkbox checked={false} name='TOTAL' color='secondry' />
										)
									}
									label={label}></FormControlLabel>

								{name !== null
									? checkboxType[name] && (
											<TextField
												name={markup}
												type='number'
												label={markupLabel}
												fullWidth
												InputProps={{
													startAdornment: <InputAdornment position='start'>$</InputAdornment>,
												}}
												error={touched.markup && errors.markup}
												helperText={touched.markup && errors.markup}
												onChange={(e) => {
													const index = initialProductType.findIndex((obj) => obj.property === name);
													let data = [...initialProductType];
													data[index]['propertyMarkup'] = e.target.value;

													setInitialProductType(data);
													calculateTotalMarkup();
												}}
											/>
									  )
									: (checkboxType['flight'] || checkboxType.hotel || checkboxType.car || checkboxType.insurance || checkboxType.addon) && (
											<TextField
												name={markup}
												label={markupLabel}
												type='number'
												fullWidth
												disabled={true}
												InputProps={{
													startAdornment: <InputAdornment position='start'>$</InputAdornment>,
												}}
												error={touched.markup && errors.markup}
												helperText={touched.markup && errors.markup}
												onChange={(e) => {
													const index = initialProductType.findIndex((obj) => obj.property === name);
													let data = [...initialProductType];
													data[index]['propertyMarkup'] = e.target.value;
													setInitialProductType(data);
												}}
												value={values.totalMarkup}
											/>
									  )}
							</Box>
						);
					})}
				</Box>
			</Grid>

			{/* firstname Fields */}
			<Grid item xs={4} md={3} sm={4}>
				<Textfield name='firstName' label='FIRST NAME' />
			</Grid>
			{/* lastname Fields */}
			<Grid item xs={4} md={3} sm={4}>
				<Textfield name='lastName' label='LAST NAME' />
			</Grid>
			{/*  EMail Fields */}
			<Grid item xs={4} md={3} sm={4}>
				<Textfield name='email' label='EMAIL' />
			</Grid>
			{/*  Phone Fields */}
			<Grid item xs={4} md={3} sm={4}>
				<Textfield name='phone' label='PHONE' />
			</Grid>
			{/* alternateEmail EMail Fields */}
			<Grid item xs={4} md={3} sm={4}>
				<Textfield name='alternateEmail' label='ALTERNATIVE EMAIL' />
			</Grid>
			{/* alternatePhone  Fields */}
			<Grid item xs={4} md={3} sm={4}>
				<Textfield name='alternatePhone' label='ALTERNATIVE PHONE' />
			</Grid>
			{/* kidsCount Fields */}
			<Grid item xs={4} md={3} sm={4}>
				<Box sx={displayFlexRowStyle}>
					<Box sx={displayColStyle}>
						<Textfield
							name='childCount'
							label='CHILDS'
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
			<Grid item xs={4} md={3} sm={4}>
				<Box sx={displayFlexRowStyle}>
					<Box sx={displayColStyle}>
						<Textfield
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
			<Grid item xs={4} md={3} sm={4}>
				<Box sx={displayFlexRowStyle}>
					<Box sx={displayColStyle}>
						<Textfield
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
							value={values.elderCount}
						/>
						{values.elderCount > 0 ? (
							<Textfield
								sx={{mt: 2}}
								name='elderPrice'
								label='PRICE PER INFANT'
								fullWidth
								InputProps={{
									startAdornment: <InputAdornment position='start'>$</InputAdornment>,
								}}
								value={values.elderPrice}
							/>
						) : null}
					</Box>
				</Box>
			</Grid>
			{/* PNR no. Fields */}
			<Grid item xs={9} md={6} sm={9}>
				<Textfield
					name='pnrNo'
					label='PNR NO.'
					onChange={(e) => {
						const value = e.target.value || '';
						setFieldValue('pnrNo', value.toUpperCase());
					}}
				/>
				{/* <TextField
					id='pnrNo'
					name='pnrNo'
					label='PNR NO.'
					fullWidth
					error={Boolean(touched.pnrNo && errors.pnrNo)}
					helperText={(touched.pnrNo && errors.pnrNo) || 'optional'}
					value={values.pnrNo}
					onChange={(e) => {
						const value = e.target.value || '';
						setFieldValue('pnrNo', value.toUpperCase());
					}}
				/> */}
			</Grid>
			{/* Airline code */}
			<Grid item xs={3} sm={3} md={3}>
				<Textfield
					name='airlineLocator'
					label='AIRLINE Locator '
					onChange={(e) => {
						const value = e.target.value || '';
						setFieldValue('airlineLocator', value.toUpperCase());
					}}
				/>
			</Grid>
			{/* booking type -------Dropdown Fields */}
			<Grid item xs={3} sm={3} md={3}>
				<FormControl fullWidth>
					<InputLabel id='Bokking-type-Dropdown-label'>BOOKING TYPE</InputLabel>
					<Select
						labelId='Bokking-type-Dropdown-label	'
						id='Bokking-type-Dropdown'
						fullWidth
						name='bookingType'
						label='BOOKING TYPE'
						error={Boolean(touched.bookingType && errors.bookingType)}
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
			<Grid item xs={3} sm={3} md={3}>
				<FormControl fullWidth>
					<InputLabel id='Fare-Type-Dropdown-label'>FARE TYPE</InputLabel>
					<Select
						labelId='Fare-Type-Dropdown-label'
						id='Fare-Type-Dropdown'
						fullWidth
						name='fareType'
						label='FARE TYPE'
						error={Boolean(touched.fareType && errors.fareType)}
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
			<Grid item xs={3} sm={3} md={3}>
				<FormControl fullWidth>
					<InputLabel id='Booked-on-Dropdown-label'>BOOKED ON </InputLabel>
					<Select
						labelId='Booked-on-Dropdown-label'
						id='Booked-on-Dropdown'
						fullWidth
						name='bookedOn'
						label='BOOKED ON'
						onChange={handleChange}
						value={values.bookedOn}
						error={Boolean(touched.bookedOn && errors.bookedOn)}>
						<MenuItem value='web'>Web</MenuItem>
						<MenuItem value='trippro'>TripPro</MenuItem>
						<MenuItem value='skybird'>SkyBird</MenuItem>
						<MenuItem value='picasso'>Picasso</MenuItem>
					</Select>
				</FormControl>
			</Grid>

			{/* Airline code Fields */}
			<Grid item xs={3} sm={3} md={3}>
				<Textfield name='airlineCode' label='AIRLINE ' />
			</Grid>

			{/* Grand Total Fields */}
			<Grid item xs={3} sm={3} md={2}>
				<Textfield
					name='grandTotal'
					label='GRAND TOTAL'
					InputProps={{
						startAdornment: <InputAdornment position='start'>$</InputAdornment>,
					}}
				/>
			</Grid>
			{/* Total In-House Charge Fields */}
			<Grid item xs={3} sm={3} md={2}>
				<Textfield
					name='totalInhouseCharge'
					label='TOTAL INHOUSE CHARGE'
					InputProps={{
						startAdornment: <InputAdornment position='start'>$</InputAdornment>,
					}}
				/>
			</Grid>
			{/* MCO amount Fields */}
			<Grid item xs={3} sm={3} md={2}>
				<Textfield
					name='mcoNo'
					label='MCO'
					InputProps={{
						startAdornment: <InputAdornment position='start'>$</InputAdornment>,
					}}
				/>
			</Grid>
			{/* DepartureDate Fields */}
			<Grid item xs={3} sm={3} md={3}>
				<LocalizationProvider dateAdapter={AdapterDateFns}>
					<DatePicker
						inputFormat='MM/dd/yyyy'
						name='departureDate'
						label='DEPARTURE DATE'
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
						renderInput={(params) => <TextField {...params} error={Boolean(touched.departureDate && errors.departureDate)} helperText={touched.departureDate && errors.departureDate} />}
					/>
				</LocalizationProvider>
			</Grid>
			{/* ReturnDate Fields */}
			<Grid item xs={3} sm={3} md={3}>
				<LocalizationProvider dateAdapter={AdapterDateFns}>
					<DatePicker
						name='returnDate'
						inputFormat='MM/dd/yyyy'
						label='RETURN DATE'
						disabled={!depDate}
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
						renderInput={(params) => <TextField {...params} helperText={touched.returnDate && errors.returnDate} error={Boolean(touched.returnDate && errors.returnDate)} />}
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
