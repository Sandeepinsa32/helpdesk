import React, {useState} from 'react';
import {Typography, Link, Grid, TextField, Button} from '@mui/material';

// mui ICon
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function PaymentForm() {
	const [inputList, setInputList] = useState([{cardName: '', cardNumber: '', expiryDate: '', cvv: ''}]);

	// handle input change
	const handleInputChange = (e, index) => {
		const {name, value} = e.target;
		const list = [...inputList];
		list[index][name] = value;
		setInputList(list);
	};

	// handle click event of the Remove button
	const handleRemoveClick = (index) => {
		const list = [...inputList];
		list.splice(index, 1);
		setInputList(list);
	};

	// handle click event of the Add button
	const handleAddClick = () => {
		setInputList([...inputList, {cardName: '', cardNumber: '', expiryDate: '', cvv: ''}]);
	};

	return (
		<>
			<Typography variant='h6' gutterBottom>
				Payment method
			</Typography>

			{inputList.map((x, i) => {
				return (
					<Grid container spacing={3}>
						<Grid item xs={12} md={6}>
							<TextField required name='cardName' label='Name on card' fullWidth autoComplete='cc-name' variant='standard' onChange={(e) => handleInputChange(e, i)} />
						</Grid>
						<Grid item xs={12} md={6}>
							<TextField required name='cardNumber' label='Card number' fullWidth autoComplete='cc-number' variant='standard' onChange={(e) => handleInputChange(e, i)} />
						</Grid>
						<Grid item xs={12} md={6}>
							<TextField required name='expiryDate' label='Expiry date' fullWidth autoComplete='cc-exp' variant='standard' onChange={(e) => handleInputChange(e, i)} />
						</Grid>
						<Grid item xs={12} md={6}>
							<TextField
								required
								name='cvv'
								label='CVV'
								helperText='Last three digits on signature strip'
								fullWidth
								autoComplete='cc-csc'
								variant='standard'
								onChange={(e) => handleInputChange(e, i)}
							/>
						</Grid>

						{inputList.length !== 1 && (
							<>
								<Grid item xs={12} md={10}></Grid>

								<Grid item xs={12} md={2}>
									<Button startIcon={<RemoveIcon fontSize='small' />} onClick={() => handleRemoveClick(i)} sx={{mr: 1}}>
										Remove
									</Button>
								</Grid>
							</>
						)}
						{inputList.length - 1 === i && (
							<>
								<Grid item xs={12} md={8}></Grid>
								<Grid item xs={12} md={4}>
									<Button startIcon={<AddIcon fontSize='small' />} onClick={handleAddClick} sx={{mr: 1}}>
										Add One More Card
									</Button>
								</Grid>
							</>
						)}
					</Grid>
				);
			})}
			<div style={{marginTop: 20}}>{JSON.stringify(inputList)}</div>
		</>
	);
}

function AddNew() {
	return (
		<Typography variant='body2' color='text.secondary' align='center'>
			{'Copyright © '}
			<Link color='inherit' href='https://mui.com/'>
				Your Website
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}
