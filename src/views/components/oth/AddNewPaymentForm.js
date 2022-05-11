import React, {useState} from 'react';
import {Typography, Link, Box, Paper, Grid, TextField, Button, FormControlLabel, Checkbox} from '@mui/material';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';

import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';

// mui ICon
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function PaymentForm({setInputList, inputList}) {
	// const [inputList, setInputList] = useState([{cardName: '', cardHolderPhn: '', cardNumber: '', expiryDate: null, cvv: ''}]);
	const [isCompanyCard, setIsCompanyCard] = useState(false);

	// handle input change
	const handleCardInput = (e, index) => {
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
			{inputList.map((x, i) => {
				return (
					<Grid key={i} container spacing={3}>
						{/* Card Holder NAme field */}
						<Grid item xs={4} md={2}>
							<TextField
								required
								name='cardName'
								label='Name on card'
								fullWidth
								autoComplete='cc-name'
								onChange={(e) => {
									handleCardInput(e, i);
								}}
								value={inputList[i].cardName}
							/>
						</Grid>
						{/*  Card Holder Phone no. */}
						<Grid item xs={4} md={3}>
							<TextField required name='cardHolderPhn' label='Phone no.' fullWidth onChange={(e) => handleCardInput(e, i)} value={inputList[i].cardNumber} />
						</Grid>
						{/* CardNumber Field */}
						<Grid item xs={4} md={3}>
							<TextField required name='cardNumber' label='Card number' fullWidth autoComplete='cc-number' onChange={(e) => handleCardInput(e, i)} value={inputList[i].cardNumber} />
						</Grid>
						{/* CVV Field */}
						<Grid item xs={4} md={2}>
							<TextField required name='cvv' label='CVV' fullWidth autoComplete='cc-csc' onChange={(e) => handleCardInput(e, i)} value={inputList[i].cvv} />
						</Grid>
						{/* expiry date field */}
						<Grid item xs={4} md={2}>
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
						{/*  add/Remove btn for multiple card */}
						<Box xs={4} md={2} sx={{display: 'flex', justifyContent: 'flex-end', width: '100%'}}>
							{inputList.length !== 1 && (
								<Button startIcon={<RemoveIcon fontSize='small' />} onClick={() => handleRemoveClick(i)} sx={{mr: 1}}>
									Remove
								</Button>
							)}
							{inputList.length < 4 && inputList.length - 1 === i && (
								<Button startIcon={<AddIcon fontSize='small' />} onClick={handleAddClick} sx={{mr: 1}}>
									Add One More Card
								</Button>
							)}
						</Box>

						{/*  company card  */}

						<Grid item xs={4} md={3}>
							<FormControlLabel
								control={
									<Checkbox
										checked={isCompanyCard}
										onChange={(e) => {
											setIsCompanyCard(!isCompanyCard);
										}}
										name='companyCard'
										color='primary'
									/>
								}
								label='Company CC used ?'
							/>
						</Grid>
						{isCompanyCard && (
							<>
								<Grid item xs={4} md={3}>
									<TextField
										required
										name='ccUsedCount'
										label='CC used How many times? '
										fullWidth

										// onChange={(e) => {
										// 	handleCardInput(e, i);
										// }}
										// value={inputList[i].cardName}
									/>
								</Grid>
								<Grid item xs={4} md={3}>
									<TextField
										required
										name='ccAmountUsed'
										label=' Company CC Used Amount'
										fullWidth

										// onChange={(e) => {
										// 	handleCardInput(e, i);
										// }}
										// value={inputList[i].cardName}
									/>
								</Grid>
								<Grid item xs={4} md={3}>
									<TextField
										required
										name='ccLastDigit'
										label='Last 4 Digits of of Company CC '
										fullWidth

										// onChange={(e) => {
										// 	handleCardInput(e, i);
										// }}
										// value={inputList[i].cardName}
									/>
								</Grid>
							</>
						)}
					</Grid>
				);
			})}
		</>
	);
}
