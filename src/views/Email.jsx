import React, {useEffect, useState} from 'react';
import {Box, Grid, TextField, Button, InputAdornment, CircularProgress, FormControl, Select, InputLabel, MenuItem} from '@mui/material';
import RenderSelectedEmail from './components/RenderSelectedEmail';
import axios from 'axios';
import {useFormik, Formik} from 'formik';
import * as Yup from 'yup';
import RenderEmailField from './components/RenderEmailField';
import Textfield from './components/FormField/Textfield';

import {BASEURL, createQueryString, errorToast, successToast} from '../utils/Utils';

const Email = ({Ticketid, userData, onClose}) => {
	const [selectedEmailTemplate, setSelectedEmailTemplate] = useState('newBooking');
	const [selectedCurrency, setSelectedCurrency] = useState('$');
	const [pnrValue, setPnrValue] = useState('1 VS8020 M 15JAN 2 BOMLHR HK1 2 235A 700A 77W E0 R');
	const [pnrData, setPnrData] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const [newBookingFieldList, setNewBookingFieldList] = useState([
		{
			firstName: '',
			middleName: '',
			lastName: '',
			ticket: '',
			dob: '',
			confirmation: '',
			price: '',
		},
	]);
	const [exchangeFieldList, setExchangeFieldList] = useState([
		{
			firstName: '',
			middleName: '',
			lastName: '',
			dob: '',
			confirmation: '',
			price: '',
		},
	]);
	const [refundFieldList, setRefundFieldList] = useState([
		{
			fullname: '',
			airline: '',
			refund: '',
			validTill: '',
			feeIssued: '',
		},
	]);
	const [futureCreditFieldList, setFutureCreditFieldList] = useState([
		{
			fullname: '',
			airline: '',
			credit: '',
			validTill: '',
			feeIssued: '',
		},
	]);
	const [petFieldList, setPetFieldList] = useState([
		{
			pet: '',
			cabin: '',
			weight: '',
			age: '',
			price: '',
		},
	]);
	const [seatFieldList, setSeatFieldList] = useState([
		{
			fullname: '',
			airline: '',
			credit: '',
			price: '',
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
				// console.log(response.data.flightData.flights);
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
			// console.log(formik.values);
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
		selectedCurrency,
		petFieldList,
		setPetFieldList,
		seatFieldList,
		setSeatFieldList,
	};

	return (
		<>
			<Formik>
				{isLoading ? (
					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							height: '75vh',
						}}>
						<CircularProgress />
					</div>
				) : (
					<form onSubmit={formik.handleSubmit}>
						<Grid container spacing={1} sx={{m: 0, p: 1}}>
							{/*  Email template  */}
							<Grid item md={3} sx={{pr: 1}}>
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
										{/* <MenuItem value='pet'>Pet Email</MenuItem>
										<MenuItem value='seat'>Seat Email</MenuItem> */}
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

							<Grid item md={2} sx={{pr: 1}}>
								<FormControl required fullWidth>
									<InputLabel id='currency-type-Dropdown'>Currency</InputLabel>
									<Select
										size='small'
										labelId='currency-type-Dropdown'
										value={selectedCurrency}
										onChange={(e) => {
											setSelectedCurrency(e.target.value);
										}}
										fullWidth
										name='currency'
										label='Currency'>
										<MenuItem value='$'> USD $</MenuItem>
										<MenuItem value='£'>GBP £</MenuItem>
										<MenuItem value='€'>EUR €</MenuItem>
									</Select>
								</FormControl>
							</Grid>
							<Grid item md={1} xs={6}>
								<Button onClick={handlePnrConverter} variant='contained'>
									Convert
								</Button>
							</Grid>
							<Grid item md={3} sx={{mt: 2}}>
								<Textfield
									name='name'
									label='Card Holder Name '
									value={formik.values.name}
									error={Boolean(formik.touched.name && formik.errors.name)}
									helperText={formik.touched.name && formik.errors.name}
									onBlur={formik.handleBlur}
									// onChange={formik.handleChange}
									onChange={(e) => {
										const value = e.target.value || '';
										formik.setFieldValue('name', value.toUpperCase());
									}}
								/>
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
									name='ccLastDigit'
									label='Card Last Digit'
									value={formik.values.ccLastDigit}
									error={Boolean(formik.touched.ccLastDigit && formik.errors.ccLastDigit)}
									helperText={formik.touched.ccLastDigit && formik.errors.ccLastDigit}
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
										startAdornment: <InputAdornment position='start'>{selectedCurrency}</InputAdornment>,
									}}
									onChange={formik.handleChange}
								/>
							</Grid>
						</Grid>
						<Box sx={{p: 1}}>
							<RenderEmailField data={data} />
						</Box>

						{/* <Box sx={{m: 1}}>Genrated Email Preview : {renderEmail()}</Box> */}
						<Box sx={{m: 1}}>
							<RenderSelectedEmail values={formik.values} data={data} setLoader={setIsLoading} />
						</Box>
					</form>
				)}
			</Formik>
		</>
	);
};

export default Email;
