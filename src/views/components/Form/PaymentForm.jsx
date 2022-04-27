import React, {useState} from 'react';
import {Typography, Link, Grid, TextField, Button} from '@mui/material';

// mui ICon
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function PaymentForm(props) {
	return (
		<>
			<Typography variant='h6' gutterBottom>
				Payment method
			</Typography>

			{props.inputList.map((x, i) => {
				return (
					<Grid container spacing={3}>
						<Grid item xs={12} md={6}>
							<TextField
								required
								name='cardName'
								label='Name on card'
								fullWidth
								autoComplete='cc-name'
								variant='standard'
								// onChange={(e) => handleInputChange(e, i)}

								error={Boolean(props.formik.touched.cardName && props.formik.errors.cardName)}
								helperText={props.formik.touched.cardName && props.formik.errors.cardName}
								onBlur={props.formik.handleBlur}
								onChange={props.formik.handleChange}
								value={props.formik.values.cardName}
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<TextField
								required
								name='cardNumber'
								label='Card number'
								fullWidth
								autoComplete='cc-number'
								variant='standard'
								// onChange={(e) => handleInputChange(e, i)}
								error={Boolean(props.formik.touched.cardNumber && props.formik.errors.cardNumber)}
								helperText={props.formik.touched.cardNumber && props.formik.errors.cardNumber}
								onBlur={props.formik.handleBlur}
								onChange={props.formik.handleChange}
								value={props.formik.values.cardNumber}
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<TextField
								required
								name='expiryDate'
								label='Expiry date'
								fullWidth
								autoComplete='cc-exp'
								variant='standard'
								// onChange={(e) => handleInputChange(e, i)}
								error={Boolean(props.formik.touched.expiryDate && props.formik.errors.expiryDate)}
								helperText={props.formik.touched.expiryDate && props.formik.errors.expiryDate}
								onBlur={props.formik.handleBlur}
								onChange={props.formik.handleChange}
								value={props.formik.values.expiryDate}
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<TextField
								required
								name='cvv'
								label='CVV'
								fullWidth
								autoComplete='cc-csc'
								variant='standard'
								// onChange={(e) => handleInputChange(e, i)}
								error={Boolean(props.formik.touched.cvv && props.formik.errors.cvv)}
								helperText={'Last three digits on signature strip' || (props.formik.touched.cvv && props.formik.errors.cvv)}
								onBlur={props.formik.handleBlur}
								onChange={props.formik.handleChange}
								value={props.formik.values.cvv}
							/>
						</Grid>

						{props.inputList.length !== 1 && (
							<>
								<Grid item xs={12} md={10}></Grid>

								<Grid item xs={12} md={2}>
									<Button startIcon={<RemoveIcon fontSize='small' />} onClick={() => props.handleRemoveClick(i)} sx={{mr: 1}}>
										Remove
									</Button>
								</Grid>
							</>
						)}
						{props.inputList.length - 1 === i && (
							<>
								<Grid item xs={12} md={8}></Grid>
								<Grid item xs={12} md={4}>
									<Button startIcon={<AddIcon fontSize='small' />} onClick={props.handleAddClick} sx={{mr: 1}}>
										Add One More Card
									</Button>
								</Grid>
							</>
						)}
					</Grid>
				);
			})}
			<div style={{marginTop: 20}}>{JSON.stringify(props.inputList)}</div>
		</>
	);
}
