import React from 'react';
import {Typography, List, ListItem, CardContent, Box, Avatar, ListItemText, Grid} from '@mui/material';

export default function Review({userInfo, cardInfo}) {
	const payments = [
		{name: 'Card type', detail: 'Visa'},
		{name: 'Card holder', detail: 'Mr John Smith'},
		{name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234'},
		{name: 'Expiry date', detail: '04/2024'},
	];
	return (
		<>
			<Typography variant='h6' gutterBottom>
				Record summary
			</Typography>

			<CardContent>
				<Box
					sx={{
						alignItems: 'center',
						display: 'flex',
						flexDirection: 'column',
					}}>
					<Avatar
						src={'/static/images/avatars/avatar_6.png'}
						sx={{
							height: 64,
							mb: 2,
							width: 64,
						}}
					/>
					<Typography color='textPrimary' variant='h5'>
						{`${userInfo.firstname} ${userInfo.lastname}`}
					</Typography>
					<Typography color='textSecondary' variant='body2'>
						{` ${userInfo.email}`}
					</Typography>
					<Typography color='textSecondary' variant='body2'>
						{`Phone  :  ${userInfo.phone}`}
					</Typography>
					<Typography color='textSecondary' variant='body2'>
						{`Emp alias :  ${userInfo.employeeAlias}`}
					</Typography>
				</Box>
			</CardContent>

			<Grid container spacing={2}>
				<Grid item xs={12} sm={6}>
					<Typography variant='h6' gutterBottom sx={{mt: 2}}>
						Shipping
					</Typography>
					<Typography gutterBottom>John Smith</Typography>
					<Typography gutterBottom>{('addresses.join(', ')')}</Typography>
				</Grid>
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
		</>
	);
}
