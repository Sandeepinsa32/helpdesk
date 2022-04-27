import React, {useState} from 'react';
import {useFormik} from 'formik';

import * as Yup from 'yup';

import {Grid, Typography, TextField, FormControlLabel, Checkbox, Button} from '@mui/material';

export default function AddressForm(props) {
	const phoneRegExp = `^[1-9]+$`;

	const formik = useFormik({
		initialValues: {
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
			cardHolderName: 'xax',
			expiry: '',
			ccv: '',
			comments: '',
			notes: '',
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
			cardHolderName: Yup.string().max(255).required('card Holder name is required'),
			expiry: '',
			ccv: '',
			comments: '',
			notes: '',
		}),
		onSubmit: (values) => {
			const n = props.next;
		},
	});

	return (
		<>
			<Typography variant='h6' gutterBottom>
				Basic Detail
			</Typography>
			<form onSubmit={formik.handleSubmit}>
				<Grid container spacing={3}>
					<Grid item xs={12} sm={6}>
						<TextField
							fullWidth
							label='First Name'
							name='firstname'
							error={Boolean(formik.touched.firstname && formik.errors.firstname)}
							helperText={formik.touched.firstname && formik.errors.firstname}
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
							value={formik.values.firstName}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
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
					<Grid item xs={12} sm={6}>
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
					<Grid item xs={12} sm={6}>
						<TextField
							nrequired
							id='mco'
							name='mco'
							label='MCO No.'
							fullWidth
							error={Boolean(formik.touched.mco && formik.errors.mco)}
							helperText={formik.touched.mco && formik.errors.mco}
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
							value={formik.values.mco}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
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
					<Grid item xs={12} sm={6}>
						<TextField
							nrequired
							id='bookingType'
							name='bookingType'
							label='Booking Type'
							fullWidth
							error={Boolean(formik.touched.bookingType && formik.errors.bookingType)}
							helperText={formik.touched.bookingType && formik.errors.bookingType}
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
							value={formik.values.bookingType}
						/>
					</Grid>

					<Grid item xs={12} sm={6}>
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
					<Grid item xs={12} sm={6}>
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

					<Grid item xs={12} sm={12}>
						<Button variant='contained' type='submit' sx={{mt: 3, ml: 1}}>
							Next
						</Button>
					</Grid>
				</Grid>
			</form>
		</>
	);
}
