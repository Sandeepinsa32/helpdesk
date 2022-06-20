import React, {useEffect, useState} from 'react';
import {Box, Grid, TextField, Button, InputAdornment, FormControl, Select, InputLabel, MenuItem} from '@mui/material';
import RenderSelectedEmail from './components/RenderSelectedEmail';
import axios from 'axios';
import {useFormik, Formik} from 'formik';
import * as Yup from 'yup';
import RenderEmailField from './components/RenderEmailField';
import Textfield from './components/FormField/Textfield';

import {BASEURL, createQueryString, errorToast, successToast} from '../utils/Utils';

const Email = ({Ticketid, userData, onClose}) => {
	const [selectedEmailTemplate, setSelectedEmailTemplate] = useState('newBooking');
	const [pnrValue, setPnrValue] = useState('1 VS8020 M 15JAN 2 BOMLHR HK1 2 235A 700A 77W E0 R');
	const [pnrData, setPnrData] = useState([
		{
			dep: {
				airportname: 'Wellington Intl Airport',
				cityname: 'Wellington',
				countryname: 'New Zealand',
				airportcode: 'WLG',
				latitude: '-41.327201840',
				longitude: '174.804992700',
				timezone: 'Pacific/Auckland',
				timezoneshort: 'NZST',
			},
			arr: {
				airportname: 'Auckland Airport',
				cityname: 'Auckland',
				countryname: 'New Zealand',
				airportcode: 'AKL',
				latitude: '-37.008098600',
				longitude: '174.792007400',
				timezone: 'Pacific/Auckland',
				timezoneshort: 'NZST',
			},
			flt: {
				flightNo: '456',
				iatacode: 'NZ',
				name: 'Air New Zealand',
				operated_by: 'Air New Zealand',
				code_share: false,
				cabin: 'Economy',
				class: 'H',
				aircraft: null,
				departure: {
					string: '2022-10-26 19:45',
					day: 'Wed',
				},
				arrival: {
					string: '2022-10-26 20:50',
					day: 'Wed',
				},
				transit_time: {
					minutes: 0,
					hours: 2,
					days: 0,
					months: 0,
				},
				duration: {
					minutes: '5',
					hours: '1',
				},
				distance: {
					miles: 298,
					km: 480,
				},
				co2: {
					co2: '0.42',
					co2_with_environmental_impact: '0.79',
				},
				'svg-logo-high-res': 'https://www.pnrconverter.com/images/airlines/nz.svg',
				'png-logo-low-res': 'https://www.pnrconverter.com/images/airlines/png/150/nz.png',
			},
		},
		{
			dep: {
				airportname: 'Auckland Airport',
				cityname: 'Auckland',
				countryname: 'New Zealand',
				airportcode: 'AKL',
				latitude: '-37.008098600',
				longitude: '174.792007400',
				timezone: 'Pacific/Auckland',
				timezoneshort: 'NZST',
			},
			arr: {
				airportname: 'Los Angeles Intl Airport',
				cityname: '',
				countryname: 'United States',
				airportcode: 'LAX',
				latitude: '33.942501070',
				longitude: '-118.407997100',
				timezone: 'America/Los_Angeles',
				timezoneshort: 'PDT',
			},
			flt: {
				flightNo: '2',
				iatacode: 'NZ',
				name: 'Air New Zealand',
				operated_by: 'Air New Zealand',
				code_share: false,
				cabin: 'Economy',
				class: 'W',
				aircraft: null,
				departure: {
					string: '2022-10-26 22:50',
					day: 'Wed',
				},
				arrival: {
					string: '2022-10-26 15:00',
					day: 'Wed',
				},
				transit_time: {
					minutes: 0,
					hours: 7,
					days: 0,
					months: 0,
				},
				duration: {
					minutes: '10',
					hours: '12',
				},
				distance: {
					miles: 7702,
					km: 12396,
				},
				co2: {
					co2: '9.62',
					co2_with_environmental_impact: '18.19',
				},
				'svg-logo-high-res': 'https://www.pnrconverter.com/images/airlines/nz.svg',
				'png-logo-low-res': 'https://www.pnrconverter.com/images/airlines/png/150/nz.png',
			},
		},
		{
			dep: {
				airportname: 'Los Angeles Intl Airport',
				cityname: '',
				countryname: 'United States',
				airportcode: 'LAX',
				latitude: '33.942501070',
				longitude: '-118.407997100',
				timezone: 'America/Los_Angeles',
				timezoneshort: 'PDT',
			},
			arr: {
				airportname: 'Tocumen Airport',
				cityname: 'Panama City',
				countryname: 'Panama',
				airportcode: 'PTY',
				latitude: '9.071359634',
				longitude: '-79.383499150',
				timezone: 'America/Panama',
				timezoneshort: 'EST',
			},
			flt: {
				flightNo: '362',
				iatacode: 'CM',
				name: 'Copa Air',
				operated_by: 'Copa Air',
				code_share: false,
				cabin: 'Economy',
				class: 'T',
				aircraft: null,
				departure: {
					string: '2022-10-26 22:00',
					day: 'Wed',
				},
				arrival: {
					string: '2022-10-27 06:37',
					day: 'Thu',
				},
				transit_time: {
					minutes: 52,
					hours: 5,
					days: 7,
					months: 0,
				},
				duration: {
					minutes: '37',
					hours: '6',
				},
				distance: {
					miles: 2984,
					km: 4803,
				},
				co2: {
					co2: '3.73',
					co2_with_environmental_impact: '7.05',
				},
				'svg-logo-high-res': 'https://www.pnrconverter.com/images/airlines/cm.svg',
				'png-logo-low-res': 'https://www.pnrconverter.com/images/airlines/png/150/cm.png',
			},
		},
		{
			dep: {
				airportname: 'Tocumen Airport',
				cityname: 'Panama City',
				countryname: 'Panama',
				airportcode: 'PTY',
				latitude: '9.071359634',
				longitude: '-79.383499150',
				timezone: 'America/Panama',
				timezoneshort: 'EST',
			},
			arr: {
				airportname: 'Los Angeles Intl Airport',
				cityname: '',
				countryname: 'United States',
				airportcode: 'LAX',
				latitude: '33.942501070',
				longitude: '-118.407997100',
				timezone: 'America/Los_Angeles',
				timezoneshort: 'PDT',
			},
			flt: {
				flightNo: '472',
				iatacode: 'CM',
				name: 'Copa Air',
				operated_by: 'Copa Air',
				code_share: false,
				cabin: 'Economy',
				class: 'T',
				aircraft: null,
				departure: {
					string: '2022-11-03 12:29',
					day: 'Thu',
				},
				arrival: {
					string: '2022-11-03 17:35',
					day: 'Thu',
				},
				transit_time: {
					minutes: 5,
					hours: 5,
					days: 0,
					months: 0,
				},
				duration: {
					minutes: '6',
					hours: '7',
				},
				distance: {
					miles: 2984,
					km: 4803,
				},
				co2: {
					co2: '3.73',
					co2_with_environmental_impact: '7.05',
				},
				'svg-logo-high-res': 'https://www.pnrconverter.com/images/airlines/cm.svg',
				'png-logo-low-res': 'https://www.pnrconverter.com/images/airlines/png/150/cm.png',
			},
		},
		{
			dep: {
				airportname: 'Los Angeles Intl Airport',
				cityname: '',
				countryname: 'United States',
				airportcode: 'LAX',
				latitude: '33.942501070',
				longitude: '-118.407997100',
				timezone: 'America/Los_Angeles',
				timezoneshort: 'PDT',
			},
			arr: {
				airportname: 'Auckland Airport',
				cityname: 'Auckland',
				countryname: 'New Zealand',
				airportcode: 'AKL',
				latitude: '-37.008098600',
				longitude: '174.792007400',
				timezone: 'Pacific/Auckland',
				timezoneshort: 'NZST',
			},
			flt: {
				flightNo: '5',
				iatacode: 'NZ',
				name: 'Air New Zealand',
				operated_by: 'Air New Zealand',
				code_share: false,
				cabin: 'Economy',
				class: 'W',
				aircraft: null,
				departure: {
					string: '2022-11-03 22:40',
					day: 'Thu',
				},
				arrival: {
					string: '2022-11-05 07:30',
					day: 'Sat',
				},
				transit_time: {
					minutes: 30,
					hours: 1,
					days: 0,
					months: 0,
				},
				duration: {
					minutes: '50',
					hours: '12',
				},
				distance: {
					miles: 7702,
					km: 12396,
				},
				co2: {
					co2: '9.62',
					co2_with_environmental_impact: '18.19',
				},
				'svg-logo-high-res': 'https://www.pnrconverter.com/images/airlines/nz.svg',
				'png-logo-low-res': 'https://www.pnrconverter.com/images/airlines/png/150/nz.png',
			},
		},
		{
			dep: {
				airportname: 'Auckland Airport',
				cityname: 'Auckland',
				countryname: 'New Zealand',
				airportcode: 'AKL',
				latitude: '-37.008098600',
				longitude: '174.792007400',
				timezone: 'Pacific/Auckland',
				timezoneshort: 'NZST',
			},
			arr: {
				airportname: 'Wellington Intl Airport',
				cityname: 'Wellington',
				countryname: 'New Zealand',
				airportcode: 'WLG',
				latitude: '-41.327201840',
				longitude: '174.804992700',
				timezone: 'Pacific/Auckland',
				timezoneshort: 'NZST',
			},
			flt: {
				flightNo: '413',
				iatacode: 'NZ',
				name: 'Air New Zealand',
				operated_by: 'Air New Zealand',
				code_share: false,
				cabin: 'Economy',
				class: 'H',
				aircraft: null,
				departure: {
					string: '2022-11-05 09:00',
					day: 'Sat',
				},
				arrival: {
					string: '2022-11-05 10:05',
					day: 'Sat',
				},
				transit_time: {},
				duration: {
					minutes: '5',
					hours: '1',
				},
				distance: {
					miles: 298,
					km: 480,
				},
				co2: {
					co2: '0.42',
					co2_with_environmental_impact: '0.79',
				},
				'svg-logo-high-res': 'https://www.pnrconverter.com/images/airlines/nz.svg',
				'png-logo-low-res': 'https://www.pnrconverter.com/images/airlines/png/150/nz.png',
			},
		},
	]);
	const [newBookingFieldList, setNewBookingFieldList] = useState([
		{
			firstName: 'john',
			middleName: 'D',
			lastName: 'doe',
			ticket: '2.72136E+11',
			dob: '',
			confirmation: 'KFQHMW',
			price: '200',
		},
	]);
	const [exchangeFieldList, setExchangeFieldList] = useState([
		{
			firstName: 'john',
			middleName: 'D',
			lastName: 'doe',
			ticket: '2.72136E+11',
			price: '200',
		},
	]);
	const [refundFieldList, setRefundFieldList] = useState([
		{
			firstName: 'john',
			middleName: 'D',
			lastName: 'doe',
			refund: '2',
		},
	]);
	const [futureCreditFieldList, setFutureCreditFieldList] = useState([
		{
			firstName: 'john',
			middleName: 'D',
			lastName: 'doe',
			confirmation: '2.72136',
		},
	]);

	const handleEmailTemplateChange = (e) => setSelectedEmailTemplate(e.target.value);

	const handlePnrConverter = async (e) => {
		e.preventDefault();
		axios
			.post(
				`https://api.pnrconverter.com/api`,
				{
					pnr: pnrValue,
				},
				{
					headers: {
						ContentType: 'application/x-www-form-urlencoded',
						PUBLIC_APP_KEY: 'c73d43e41af0b1489a5d4f011937a1b63060f2babd0e78ad8d3b952d3847c350',
						PRIVATE_APP_KEY: '6GkMehxBBgUEeMY72blU9hiymI5YEre2lYR',
					},
				}
			)
			.then((response) => {
				console.log(response.data.flightData.flights);
				setPnrData(response.data.flightData.flights);
			})
			.catch((e) => {
				console.log(e.response.data.message);
			});
	};
	const formik = useFormik({
		initialValues: {
			name: '',
			email: userData.email,
			ccLastDigit: '',
			totalAmount: '',
		},

		validationSchema: Yup.object({
			//basic
			name: Yup.string().max(15, 'Must be 15 characters or less'),
			email: Yup.string().email('Invalid email address'),
			ccLastDigit: Yup.string('input must consist if number').max(4, 'please enter only last 4 digits of card').min(4, 'please enter only last 4 digits of card'),
			totalAmount: Yup.number('input must consist if number'),
		}),
		onSubmit: () => {
			console.log(formik.values);
		},
	});
	const data = {
		selectedEmailTemplate,
		Ticketid,
		pnrData,
		onClose,
		newBookingFieldList,
		setNewBookingFieldList,
		exchangeFieldList,
		setExchangeFieldList,
		refundFieldList,
		setRefundFieldList,
		futureCreditFieldList,
		setFutureCreditFieldList,
		userData,
		formik,
	};

	return (
		<>
			<Formik>
				<form onSubmit={formik.handleSubmit}>
					<Grid container spacing={1} sx={{m: 0, p: 1}}>
						{/*  Email template  */}
						<Grid item md={4} sx={{pr: 1}}>
							<FormControl required fullWidth>
								<InputLabel id='Email-template-Dropdown-label'>Email Template</InputLabel>
								<Select
									size='small'
									labelId='Email-template-Dropdown-label	'
									id='Email-template-Dropdown'
									value={selectedEmailTemplate}
									onChange={handleEmailTemplateChange}
									fullWidth
									name='emailTemplate'
									label='Email Template'>
									<MenuItem value='newBooking'>New Booking Confirmation </MenuItem>
									<MenuItem value='exchange'>Exchange</MenuItem>
									<MenuItem value='refund'>Refund</MenuItem>
									<MenuItem value='futureCredit'>Future Credit</MenuItem>
									{/* <MenuItem value='5'>Add On </MenuItem> */}
								</Select>
							</FormControl>
						</Grid>
						<Grid item md={6} sx={{pr: 1}}>
							<TextField
								id='outlined-multiline-flexible'
								multiline
								maxRows={4}
								name='PnrConverter'
								label='PnrConverter'
								size='small'
								fullWidth={true}
								onChange={(e) => {
									setPnrValue(e.target.value);
								}}
								value={pnrValue}
							/>
						</Grid>

						<Grid item xs={6} md={2}>
							<Button onClick={handlePnrConverter} variant='contained'>
								Convert
							</Button>
						</Grid>

						<Grid item md={3} sx={{mt: 2}}>
							<Textfield
								name='email'
								label='Email'
								value={formik.values.email}
								error={Boolean(formik.touched.email && formik.errors.email)}
								helperText={formik.touched.email && formik.errors.email}
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
								// disabled={true}
							/>
						</Grid>
						<Grid item md={3} sx={{mt: 2}}>
							<Textfield
								name='totalAmount'
								label='Total Amount'
								value={formik.values.totalAmount}
								error={Boolean(formik.touched.totalAmount && formik.errors.totalAmount)}
								helperText={formik.touched.totalAmount && formik.errors.totalAmount}
								onBlur={formik.handleBlur}
								InputProps={{
									startAdornment: <InputAdornment position='start'>$</InputAdornment>,
								}}
								onChange={formik.handleChange}
							/>
						</Grid>
						<Grid item md={3} sx={{mt: 2}}>
							<Textfield
								name='name'
								label='Card Holder Name '
								value={formik.values.name}
								error={Boolean(formik.touched.name && formik.errors.name)}
								helperText={formik.touched.name && formik.errors.name}
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
							/>
						</Grid>
						<Grid item md={3} sx={{mt: 2}}>
							<Textfield
								name='cLastDigit'
								label='Card Last Digit'
								value={formik.values.cLastDigit}
								error={Boolean(formik.touched.cLastDigit && formik.errors.cLastDigit)}
								helperText={formik.touched.cLastDigit && formik.errors.cLastDigit}
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
							/>
						</Grid>
					</Grid>
					<Box sx={{p: 1}}>
						<RenderEmailField data={data} />
					</Box>

					{/* <Box sx={{m: 1}}>Genrated Email Preview : {renderEmail()}</Box> */}
					<Box sx={{m: 1}}>
						<RenderSelectedEmail values={formik.values} data={data} />
					</Box>
				</form>
			</Formik>
		</>
	);
};

export default Email;
