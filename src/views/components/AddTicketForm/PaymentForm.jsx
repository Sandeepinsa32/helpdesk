import React, {useState} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {Typography, Link, Paper, Grid, TextField, Button} from '@mui/material';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';

import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';

// mui ICon
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function PaymentForm({setCardInfo, handleBack, handleSubmit}) {
	const [inputList, setInputList] = useState([{cardName: '', cardHolderPhn: '', cardNumber: '', expiryDate: null, cvv: ''}]);
	const [expiryDateValue, setExpiryDateValue] = useState(null);

	// handle input change
	const handleInputChange = (e, index) => {
		const {name, value} = e.target;
		const list = [...inputList];
		list[index][name] = value;
		setInputList(list);
	};
	const handleDateInputChange = (index, value) => {
		const list = [...inputList];
		const name = 'expiryDate';
		list[index][name] = value;
		setInputList(list);
	};

	// handle input change
	// const handleSubmit = () => {};

	// handle click event of the Remove button
	const handleRemoveClick = (index) => {
		const list = [...inputList];
		list.splice(index, 1);
		setInputList(list);
	};

	// handle click event of the Add button
	const handleAddClick = () => {
		setInputList([...inputList, {cardName: '', cardHolderPhn: '', cardNumber: '', expiryDate: null, cvv: ''}]);
	};

	return (
		<>
			<Typography variant='h6' gutterBottom>
				Payment method
			</Typography>
			<Grid container spacing={3}>
				{inputList.map((x, i) => {
					return (
						<Paper
							elevation={3}
							style={{
								padding: 12,
								margin: 18,
								marginLeft: '21px',
								marginBorder: '0px',
							}}>
							<Grid container spacing={3}>
								<Grid item xs={12} md={4}>
									<TextField
										required
										name='cardName'
										label='Name on card'
										fullWidth
										autoComplete='cc-name'
										onChange={(e) => {
											handleInputChange(e, i);
										}}
										value={inputList[i].cardName}
									/>
								</Grid>
								<Grid item xs={12} md={4}>
									<TextField required name='cardHolderPhn' label='Phone no.' fullWidth onChange={(e) => handleInputChange(e, i)} value={inputList[i].cardNumber} />
								</Grid>
								<Grid item xs={12} md={4}>
									<TextField
										required
										name='cardNumber'
										label='Card number'
										fullWidth
										autoComplete='cc-number'
										onChange={(e) => handleInputChange(e, i)}
										value={inputList[i].cardNumber}
									/>
								</Grid>
								<Grid item xs={12} md={3}>
									<TextField required name='cvv' label='CVV' fullWidth autoComplete='cc-csc' onChange={(e) => handleInputChange(e, i)} value={inputList[i].cvv} />
								</Grid>
								<Grid item xs={12} md={4}>
									<LocalizationProvider fullWidth dateAdapter={AdapterDateFns}>
										<DatePicker
											fullWidth
											name='expiryDate'
											label='Expiry date'
											inputFormat='dd/MM/yyyy'
											onChange={(newValue) => {
												handleDateInputChange(
													i,
													new Date(newValue).toLocaleDateString('en-US', {
														day: '2-digit',
														month: '2-digit',
														year: 'numeric',
													})
												);

												// setExpiryDateValue(newValue);
											}}
											value={inputList[i].expiryDate}
											renderInput={(params) => <TextField {...params} />}
										/>
									</LocalizationProvider>
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
										<Grid item xs={12} md={6}>
											<Button startIcon={<AddIcon fontSize='small' />} onClick={handleAddClick} sx={{mr: 1}}>
												Add One More Card
											</Button>
										</Grid>
									</>
								)}
							</Grid>
						</Paper>
					);
				})}
				<Grid item xs={8} sm={9}></Grid>
				<Grid item xs={4} sm={1}>
					<Button
						onClick={() => {
							handleBack();
						}}
						sx={{mt: 3}}>
						Back
					</Button>
				</Grid>
				<Grid item xs={4} sm={2}>
					<Button
						variant='contained'
						type='submit'
						onClick={() => {
							console.log(inputList);

							setCardInfo(inputList);
							handleSubmit();
						}}
						sx={{mt: 3, ml: 1}}>
						submit
					</Button>
				</Grid>
			</Grid>
			{console.log(JSON.stringify(inputList))}
		</>
	);
}
