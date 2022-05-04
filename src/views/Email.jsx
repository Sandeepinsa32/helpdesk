import React, {useState} from 'react';
import {Avatar, Box, Card, CardContent, Grid, TextField, Button, Paper, FormControl, Select, InputLabel, MenuItem} from '@mui/material';
import Email1 from './components/email1';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';

// mui ICon
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const Email = () => {
	const cards = [1, 2, 3, 4, 5, 6];
	const [selectedEmailTemplate, setSelectedEmailTemplate] = useState(1);
	const [selectedInputCount, setSelectedInputCount] = useState(1);
	const [inputList, setInputList] = useState([{name: ''}]);

	const [bookingDateValue, setBookingDateValue] = useState(currentDate());
	const [totalAmt, setTotalAmt] = useState(0);
	const [name, setName] = useState('');

	const handleEmailTemplateChange = (e) => {
		setSelectedEmailTemplate(e.target.value);
		console.log(selectedEmailTemplate);
	};
	const handleInputCountChange = (e) => {
		setSelectedInputCount(e.target.value);
		console.log(selectedInputCount);

		setInputList([...inputList, {name: ''}]);
	};
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

	// handle click event of the Remove button
	const handleRemoveClick = (index) => {
		var list = [...inputList];
		list.splice(index, 1);
		setInputList(list);
	};

	// handle click event of the Add button
	const handleAddClick = () => {
		setInputList([...inputList, {name: ''}]);
	};
	function clean(obj) {
		obj.map((x, i) => {
			for (var propName in x) {
				console.log();
				if (obj[i][propName] === null || obj[i][propName] === undefined || obj[i][propName] === '') {
					delete obj[i][propName];
				}
			}
		});

		return obj;
	}

	const handleConfirm = () => {
		let newArr = clean(inputList);
		newArr = newArr.filter((value) => Object.keys(value).length !== 0);

		console.log('selectedEmailTemplate', selectedEmailTemplate);
		console.log('selectedInputCount', selectedInputCount);
		console.log('inputList', newArr);
		console.log('bookingDateValue', bookingDateValue);
		console.log('totalAmt', totalAmt);
	};

	function currentDate() {
		let today = new Date();
		let dd = String(today.getDate()).padStart(2, '0');
		let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
		let yyyy = today.getFullYear();

		today = mm + '/' + dd + '/' + yyyy;
		return today;
	}
	return (
		<>
			<Box>
				<>
					<Box
						sx={{
							display: 'flex',
							flexWrap: 'nowrap',
							p: 0,
							m: 0,
							width: 1,
							height: 1,
							borderRadius: 1,
						}}>
						<Box sx={{width: '59%'}}>
							{/* <form autoComplete='off' noValidate onSubmit={}> */}
							<Paper elevation={3} sx={{height: 1}}>
								<Grid container spacing={1} sx={{m: 0, p: 1}}>
									{/*  Email template  */}
									<Grid item md={4}>
										<FormControl required fullWidth>
											<InputLabel id='Email-template-Dropdown-label'>Email Template</InputLabel>
											<Select
												labelId='Email-template-Dropdown-label	'
												id='Email-template-Dropdown'
												value={selectedEmailTemplate}
												onChange={handleEmailTemplateChange}
												fullWidth
												name='emailTemplate'
												label='Email Template'>
												<MenuItem value='1'>1</MenuItem>
												<MenuItem value='2'>2</MenuItem>
												<MenuItem value='3'>3</MenuItem>
												<MenuItem value='4'>4</MenuItem>
												<MenuItem value='5'>5</MenuItem>
											</Select>
										</FormControl>
									</Grid>

									{/*  Date Picker */}
									<Grid item xs={12} md={4} sx={{mb: 2}}>
										<LocalizationProvider fullWidth dateAdapter={AdapterDateFns}>
											<DatePicker
												fullWidth
												name='expiryDate'
												label='Expiry date'
												inputFormat='dd/MM/yyyy'
												minDate={currentDate}
												onChange={(newValue) => {
													setBookingDateValue(
														new Date(newValue).toLocaleDateString('en-US', {
															day: '2-digit',
															month: '2-digit',
															year: 'numeric',
														})
													);
													console.log(
														new Date(newValue).toLocaleDateString('en-US', {
															day: '2-digit',
															month: '2-digit',
															year: 'numeric',
														})
													);
												}}
												value={bookingDateValue}
												renderInput={(params) => <TextField {...params} />}
											/>
										</LocalizationProvider>
									</Grid>

									{/* Total Amount */}
									<Grid item xs={12} md={3} sx={{pr: 1}}>
										<TextField
											required
											name='totalAmount'
											label='totalAmount'
											fullWidth
											onChange={(e) => {
												setTotalAmt(e.target.value);
											}}
											value={totalAmt}
										/>
									</Grid>

									{inputList.map((x, i) => {
										return (
											<Grid container md={6} spacing={2} sx={{my: 1}} key={i}>
												<Grid item xs={12} md={8}>
													<TextField
														required
														name='name'
														label='Name'
														fullWidth
														autoComplete='name'
														onChange={(e) => {
															handleInputChange(e, i);
														}}
														value={inputList[i].name}
													/>
												</Grid>

												{inputList.length !== 1 && (
													<>
														<Grid item xs={12} md={2}>
															<Button startIcon={<RemoveIcon fontSize='small' />} onClick={() => handleRemoveClick(i)} sx={{mr: 1, textTransform: 'capitalize'}}>
																Remove
															</Button>
														</Grid>
													</>
												)}
											</Grid>
										);
									})}
								</Grid>
								<Grid container>
									<Grid item xs={12} md={7}></Grid>

									{inputList.length < 9 && (
										<Grid item xs={12} md={2} sx={{margin: '8px'}}>
											<Button startIcon={<AddIcon fontSize='small' />} onClick={handleAddClick} sx={{mr: 1}} fullWidth={true} variant='outlined'>
												Add new
											</Button>
										</Grid>
									)}
									<Grid item xs={12} md={2} sx={{margin: '8px'}}>
										<Button sx={{mr: 1}} type='submit' fullWidth={true} onClick={handleConfirm} variant='contained'>
											confirm
										</Button>
									</Grid>
								</Grid>
							</Paper>
							{/* </form> */}
						</Box>

						<Box sx={{width: '1%'}}></Box>
						<Box sx={{width: '40%'}}>
							<Paper elevation={3} sx={{height: 1}}>
								<Email1 selectedEmailTemplate={selectedEmailTemplate} name={inputList} bookingDate={bookingDateValue} TotalAmount={totalAmt} noOfPas={selectedInputCount} />
							</Paper>
						</Box>
					</Box>
					{/* </CardContent>
					</Card> */}
				</>
			</Box>
		</>
	);
};

export default Email;
