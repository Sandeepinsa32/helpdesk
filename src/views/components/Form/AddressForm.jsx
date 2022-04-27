import React, {useState} from 'react';

import {Grid, Typography, TextField, FormControlLabel, Checkbox, Button} from '@mui/material';

export default function AddressForm(props) {
	return (
		<>
			<Typography variant='h6' gutterBottom>
				Basic Detail
			</Typography>

			<Grid container spacing={3}>
				<Grid item xs={12} sm={6}>
					<TextField
						fullWidth
						label='First Name'
						name='firstname'
						error={Boolean(props.formik.touched.firstname && props.formik.errors.firstname)}
						helperText={props.formik.touched.firstname && props.formik.errors.firstname}
						onBlur={props.formik.handleBlur}
						onChange={props.formik.handleChange}
						value={props.formik.values.firstName}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						id='lastname'
						name='lastname'
						label='Last Name'
						fullWidth
						error={Boolean(props.formik.touched.lastname && props.formik.errors.lastname)}
						helperText={props.formik.touched.lastname && props.formik.errors.lastname}
						onBlur={props.formik.handleBlur}
						onChange={props.formik.handleChange}
						value={props.formik.values.lastname}
					/>
				</Grid>
				<Grid item xs={12} sm={4}>
					<TextField
						error={Boolean(props.formik.touched.passengerCount && props.formik.errors.passengerCount)}
						fullWidth
						helperText={props.formik.touched.passengerCount && props.formik.errors.passengerCount}
						label='Number of Passenger *'
						name='passengerCount'
						onBlur={props.formik.handleBlur}
						onChange={props.formik.handleChange}
						type='number'
						value={props.formik.values.passengerCount}
					/>
				</Grid>

				<Grid item xs={12} sm={4}>
					<TextField
						nrequired
						id='phone'
						name='phone'
						label='phone'
						fullWidth
						error={Boolean(props.formik.touched.phone && props.formik.errors.phone)}
						helperText={props.formik.touched.phone && props.formik.errors.phone}
						onBlur={props.formik.handleBlur}
						onChange={props.formik.handleChange}
						value={props.formik.values.phone}
					/>
				</Grid>
				<Grid item xs={12} sm={4}>
					<TextField
						nrequired
						id='email'
						name='email'
						label='email'
						fullWidth
						error={Boolean(props.formik.touched.email && props.formik.errors.email)}
						helperText={props.formik.touched.email && props.formik.errors.email}
						onBlur={props.formik.handleBlur}
						onChange={props.formik.handleChange}
						value={props.formik.values.email}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						nrequired
						id='pnr'
						name='pnr'
						label='PNR No.'
						fullWidth
						error={Boolean(props.formik.touched.pnr && props.formik.errors.pnr)}
						helperText={props.formik.touched.pnr && props.formik.errors.pnr}
						onBlur={props.formik.handleBlur}
						onChange={props.formik.handleChange}
						value={props.formik.values.pnr}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						nrequired
						id='mco'
						name='mco'
						label='MCO No.'
						fullWidth
						error={Boolean(props.formik.touched.mco && props.formik.errors.mco)}
						helperText={props.formik.touched.mco && props.formik.errors.mco}
						onBlur={props.formik.handleBlur}
						onChange={props.formik.handleChange}
						value={props.formik.values.mco}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						id='airlineCode'
						name='airlineCode'
						label='Airline Code *'
						fullWidth
						error={Boolean(props.formik.touched.airlineCode && props.formik.errors.airlineCode)}
						helperText={props.formik.touched.airlineCode && props.formik.errors.airlineCode}
						onBlur={props.formik.handleBlur}
						onChange={props.formik.handleChange}
						value={props.formik.values.airlineCode}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						nrequired
						id='bookingType'
						name='bookingType'
						label='Booking Type'
						fullWidth
						error={Boolean(props.formik.touched.bookingType && props.formik.errors.bookingType)}
						helperText={props.formik.touched.bookingType && props.formik.errors.bookingType}
						onBlur={props.formik.handleBlur}
						onChange={props.formik.handleChange}
						value={props.formik.values.bookingType}
					/>
				</Grid>

				<Grid item xs={12} sm={6}>
					<TextField
						nrequired
						id='pricePerPerson'
						name='pricePerPerson'
						label='Price Per Person'
						fullWidth
						error={Boolean(props.formik.touched.pricePerPerson && props.formik.errors.pricePerPerson)}
						helperText={props.formik.touched.pricePerPerson && props.formik.errors.pricePerPerson}
						onBlur={props.formik.handleBlur}
						onChange={props.formik.handleChange}
						value={props.formik.values.pricePerPerson}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						id='totalCharge'
						name='totalCharge'
						label='Grand Total'
						fullWidth
						error={Boolean(props.formik.touched.totalCharge && props.formik.errors.totalCharge)}
						helperText={props.formik.touched.totalCharge && props.formik.errors.totalCharge}
						onBlur={props.formik.handleBlur}
						onChange={props.formik.handleChange}
						value={props.formik.values.totalCharge}
					/>
				</Grid>

				{/* <Grid item xs={12} sm={12}>
						<Button variant='contained' type='submit' sx={{mt: 3, ml: 1}}>
							Next
						</Button>
					</Grid> */}
			</Grid>
		</>
	);
}
