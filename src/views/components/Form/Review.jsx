import React from 'react';
import {Typography, List, ListItem, ListItemText, Grid} from '@mui/material';

const products = [
	{
		name: 'John doe',
		desc: '8427175003',
	},
	{
		name: 'Airline Code',
		desc: 'PNR No.',
	},
	{
		name: 'Booking Type',
		desc: 'Number of Passenger',
	},
];

const addresses = ['1 MUI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
	{name: 'Card type', detail: 'Visa'},
	{name: 'Card holder', detail: 'Mr John Smith'},
	{name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234'},
	{name: 'Expiry date', detail: '04/2024'},
];

export default function Review(props) {
	return (
		<React.Fragment>
			<Typography variant='h6' gutterBottom>
				Preview
			</Typography>

			{/*  product Price details */}

			<List disablePadding>
				{console.log(props.formik.values)}
				{/* {.map((product) => (
					<>
						<ListItem key={product.firstname} sx={{py: 1, px: 0}}>
							<ListItemText
								primary={product.firstname}
								// secondary={product.desc}
							/>
							<Typography variant='body2'>{product.lastname}</Typography>
						</ListItem>
						<ListItem key={product.email} sx={{py: 1, px: 0}}>
							<ListItemText
								primary={product.email}
								// secondary={product.desc}
							/>
							<Typography variant='body2'>{product.email}</Typography>
						</ListItem>
					</>
				))} */}
			</List>

			<Grid container spacing={2}>
				{/* <Grid item xs={12} sm={6}>
					<Typography variant='h6' gutterBottom sx={{mt: 2}}>
						Shipping
					</Typography>
					<Typography gutterBottom>John Smith</Typography>
					<Typography gutterBottom>{addresses.join(', ')}</Typography>
				</Grid> */}

				<Grid item container direction='column' xs={12} sm={6}>
					<Typography variant='h6' gutterBottom sx={{mt: 2}}>
						Payment details
					</Typography>
					<Grid container>
						{payments.map((payment) => (
							<React.Fragment key={payment.name}>
								<Grid item xs={6}>
									<Typography gutterBottom>{payment.name}</Typography>
								</Grid>
								<Grid item xs={6}>
									<Typography gutterBottom>{payment.detail}</Typography>
								</Grid>
							</React.Fragment>
						))}
					</Grid>
				</Grid>
			</Grid>
		</React.Fragment>
	);
}
