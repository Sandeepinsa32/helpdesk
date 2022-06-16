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
				airportname: 'Chhatrapati Shivaji Airport',
				cityname: 'Mumbai',
				countryname: 'India',
				airportcode: 'BOM',
				latitude: '19.088699340',
				longitude: '72.867897030',
				timezone: 'Asia/Calcutta',
				timezoneshort: 'IST',
			},
			arr: {
				airportname: 'London Heathrow Airport',
				cityname: 'London',
				countryname: 'United Kingdom',
				airportcode: 'LHR',
				latitude: '51.470600000',
				longitude: '-0.461941000',
				timezone: 'Europe/London',
				timezoneshort: 'BST',
			},
			flt: {
				flightNo: '8020',
				iatacode: 'VS',
				name: 'Virgin Atlantic',
				operated_by: 'Virgin Atlantic',
				code_share: true,
				cabin: 'Economy',
				class: 'M',
				aircraft: 'Boeing 777-300ER ',
				departure: {
					string: '2023-01-15 02:35',
					day: 'Sun',
				},
				arrival: {
					string: '2023-01-15 07:00',
					day: 'Sun',
				},
				transit_time: {},
				duration: {
					minutes: '55',
					hours: '9',
				},
				distance: {
					miles: 4484,
					km: 7217,
				},
				co2: {
					co2: '5.60',
					co2_with_environmental_impact: '10.59',
				},
				'svg-logo-high-res': 'https://www.pnrconverter.com/images/airlines/vs.svg',
				'png-logo-low-res': 'https://www.pnrconverter.com/images/airlines/png/150/vs.png',
			},
		},
	]);
	const [newBookingFieldList, setNewBookingFieldList] = useState([
		{
			firstName: 'john',
			middleName: 'D',
			lastName: 'doe',
			ticket: '2.72136E+11',
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
						PUBLIC_APP_KEY: '6e0b98437220f87494a76c81543e941083aa6a4c85a2c87be5820372e87b82c9',
						PRIVATE_APP_KEY: 'pCPsHMMMZI2J2ZF4GAKB0v9XGxs0Yknxva1',
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
						<RenderSelectedEmail data={data} />
					</Box>
				</form>
			</Formik>
		</>
	);
};

export default Email;
