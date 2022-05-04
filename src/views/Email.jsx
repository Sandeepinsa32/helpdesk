import React, {useState} from 'react';
import {Avatar, Box, Card, CardContent, Grid, TextField, IconButton, Modal, Button, Paper, FormControl, Select, InputLabel, MenuItem} from '@mui/material';
import Email1 from './components/email1';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import {createTheme} from '@mui/material/styles';

// mui ICon
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const Email = () => {
	const [selectedEmailTemplate, setSelectedEmailTemplate] = useState(1);
	const [inputList, setInputList] = useState([{firstName: '', middleName: '', lastName: '', ticket: '', confirmation: '', price: ''}]);
	const [totalAmt, setTotalAmt] = useState(0);
	const [previewModal, setPreviewModal] = useState(false);

	const handleEmailTemplateChange = (e) => {
		setSelectedEmailTemplate(e.target.value);
		console.log(selectedEmailTemplate);
	};

	const handleInputChange = (e, index) => {
		const {name, value} = e.target;
		const list = [...inputList];
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
		setInputList([...inputList, {firstName: '', middleName: '', lastName: '', ticket: '', confirmation: '', price: ''}]);
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
		console.log('inputList', newArr);
		console.log('totalAmt', totalAmt);
	};
	const handlePreviewClose = () => {
		setPreviewModal(false);
	};

	return (
		<>
			<Box sx={{width: 1, height: 1}}>
				<Paper elevation={3}>
					<Grid container spacing={1} sx={{m: 0, p: 1}}>
						{/*  Email template  */}
						<Grid item md={3}>
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
									<MenuItem value='1'>New Booking Confirmation </MenuItem>
									<MenuItem value='2'>Exchange</MenuItem>
									<MenuItem value='3'>Refund</MenuItem>
									<MenuItem value='4'>Void</MenuItem>
									<MenuItem value='5'>Add On </MenuItem>
								</Select>
							</FormControl>
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
						<Grid item xs={12} md={1} sx={{mr: 1}}>
							<Button onClick={() => setPreviewModal(true)} variant='contained'>
								Preview
							</Button>
						</Grid>
						<Grid item xs={12} md={1} sx={{mr: 1}}>
							<Button onClick={handleAddClick} variant='contained'>
								Submit
							</Button>
						</Grid>

						{inputList.length < 9 && (
							<Grid item xs={12} md={2}>
								<Button startIcon={<AddIcon fontSize='small' />} onClick={handleAddClick} sx={{mr: 1}} variant='outlined'>
									Add new
								</Button>
							</Grid>
						)}
					</Grid>

					<Box sx={{mt: 3}}>
						<TableContainer component={Paper}>
							<Table sx={{minWidth: 650}} aria-label='simple table'>
								<TableHead>
									<TableRow>
										{['First Name', 'Middle Name', 'last Name', 'Ticket', 'Confirmation', 'Price'].map((th) => (
											<TableCell key={th}>{th}</TableCell>
										))}
									</TableRow>
								</TableHead>
								<TableBody>
									{inputList.map((x, i) => {
										return (
											<TableRow
												key={i}
												sx={{
													'&:last-child td, &:last-child th': {border: 0},
												}}>
												<TableCell>
													<TextField
														required
														name='firstName'
														label='First Name'
														fullWidth
														autoComplete='firstName'
														onChange={(e) => {
															handleInputChange(e, i);
														}}
														value={inputList[i].name}
													/>
												</TableCell>
												<TableCell>
													<TextField
														required
														name='middleName'
														label='Middle Name'
														fullWidth
														autoComplete='middleName'
														onChange={(e) => {
															handleInputChange(e, i);
														}}
														value={inputList[i].name}
													/>
												</TableCell>
												<TableCell>
													<TextField
														required
														name='lastName'
														label='Last Name'
														fullWidth
														autoComplete='lastName'
														onChange={(e) => {
															handleInputChange(e, i);
														}}
														value={inputList[i].name}
													/>
												</TableCell>
												<TableCell>
													<TextField
														required
														name='ticket'
														label='Ticket'
														fullWidth
														autoComplete='ticket'
														onChange={(e) => {
															handleInputChange(e, i);
														}}
														value={inputList[i].name}
													/>
												</TableCell>
												<TableCell>
													<TextField
														required
														name='confirmation'
														label='Confirmation'
														fullWidth
														autoComplete='confirmation'
														onChange={(e) => {
															handleInputChange(e, i);
														}}
														value={inputList[i].name}
													/>
												</TableCell>
												<TableCell>
													<TextField
														required
														name='price'
														label='Price'
														fullWidth
														autoComplete='price'
														onChange={(e) => {
															handleInputChange(e, i);
														}}
														value={inputList[i].name}
													/>
												</TableCell>
												{inputList.length !== 1 && (
													<Grid container>
														<Grid item xs={12} md={2}>
															<Button
																startIcon={<DeleteOutlineIcon color='error' fontSize='small' />}
																onClick={() => handleRemoveClick(i)}
																sx={{mr: 1, mt: '1.8rem'}}></Button>
														</Grid>
													</Grid>
												)}
											</TableRow>
										);
									})}
								</TableBody>
							</Table>
						</TableContainer>
					</Box>
				</Paper>
			</Box>

			<Modal open={previewModal} onClose={handlePreviewClose} size='xs' aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
				<Box sx={style}>
					<IconButton onClick={handlePreviewClose} sx={{position: `absolute`, right: `10px`, top: `10px`}}>
						<CloseIcon />
					</IconButton>
					<Paper elevation={3} sx={{height: 1}}>
						<Email1 selectedEmailTemplate={selectedEmailTemplate} name={inputList} TotalAmount={totalAmt} />
					</Paper>
				</Box>
			</Modal>
		</>
	);
};

export default Email;

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	minWidth: '70vw',
	maxWidth: '90vw',
	minHeight: '60vh',
	maxHeight: '90vh',
	// overflowX: ' auto',
	bgcolor: 'background.paper',
	// border: '2px solid #000',
	boxShadow: 24,
	borderRadius: '1rem',
	p: 4,
};
