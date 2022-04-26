import React from 'react';
import {useFormik} from 'formik';

import * as Yup from 'yup';

import {Grid, Typography, TextField, FormControlLabel, Checkbox} from '@mui/material';

export default function AddressForm() {
	const phoneRegExp = `^[1-9]+$`;

	const formik = useFormik({
		initialValues: {
			passengerCount: '',
			pnr: '',
			mco: '',
			airlineCode: '',
			productType: '',
			bookingType: '',
			totalCharge: '',
			pricePerPax: '',
			phone: '',
			email: '',
			cardHolderName: '',
			expiry: '',
			ccv: '',
			comments: '',
			notes: '',
		},
		validationSchema: Yup.object({
			passengerCount: Yup.string().matches(phoneRegExp, 'Must be a valid passengerCount').required('passengerCount is required'),
			password: Yup.string().max(255).required('Password is required'),
			pnr: '',
			mco: '',
			airlineCode: '',
			productType: '',
			bookingType: '',
			totalCharge: '',
			pricePerPax: '',
			phone: '',
			email: '',
			cardHolderName: '',
			expiry: '',
			ccv: '',
			comments: '',
			notes: '',
		}),
	});

	return (
		<React.Fragment>
			<Typography variant='h6' gutterBottom>
				Basic Detail
			</Typography>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={6}>
					<TextField
						error={Boolean(formik.touched.firstname && formik.errors.firstname)}
						fullWidth
						helperText={formik.touched.firstname && formik.errors.firstname}
						label='First Name *'
						name='firstname'
						onBlur={formik.handleBlur}
						onChange={formik.handleChange}
						value={formik.values.firstname}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField required id='lastname' name='lastname' label='Last Name' fullWidth />
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
					<TextField required id='phone' name='phone' label='phone' fullWidth />
				</Grid>
				<Grid item xs={12} sm={4}>
					<TextField required id='email' name='eamil' label='email' fullWidth />
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField required id='pnr' name='pnr' label='PNR No.' fullWidth />
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField required id='mco' name='mco' label='MCO No.' fullWidth />
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField id='airlineCode' name='airlineCode' label='Airline Code *' fullWidth />
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField required id='	' name='bookingType' label='Booking Type' fullWidth />
				</Grid>

				<Grid item xs={12} sm={6}>
					<TextField required id='pricePerPerson' name='pricePerPerson' label='Price Per Person' fullWidth />
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField id='totalCharge' name='totalCharge' label='Grand Total' fullWidth />
				</Grid>

				{/* <Grid item xs={12} sm={12}>
					<FormControlLabel control={<Checkbox color='secondary' name='saveAddress' value='yes' />} label='Use this address for payment details' />
				</Grid> */}
			</Grid>
		</React.Fragment>
	);
}
