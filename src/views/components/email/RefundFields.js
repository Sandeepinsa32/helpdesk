import React, {useState} from 'react';
import {Avatar, Box, Card, CardContent, Grid, InputAdornment, TextField, IconButton, Modal, Button, Paper, FormControl, Select, InputLabel, MenuItem} from '@mui/material';
import RenderSelectedEmail from '../RenderSelectedEmail';
import axios from 'axios';
import qs from 'qs';

import {BASEURL, createQueryString, errorToast, successToast} from '../../../utils/Utils';
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
import {lightGreen} from '@mui/material/colors';

const Refund = ({inputList, setInputList, data}) => {
	const {selectedCurrency} = data;
	const [totalAmt, setTotalAmt] = useState(0);

	const calculateTotalAmount = () => {
		let Amount = [];
		inputList.map((x, i) => {
			Amount.push(inputList[i].price);
		});

		var total = 0;
		for (var i in Amount) {
			total += Number(Amount[i]);
		}
		setTotalAmt(total);
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
		setInputList([
			...inputList,
			{
				firstName: '',
				middleName: '',
				lastName: '',
				refund: '',
			},
		]);
		// setInputList([...inputList, {firstName: 'john', middleName: 'D', lastName: 'doe', ticket: '2.72136E+11', confirmation: 'KFQHMW', price: '200'}]);
		// calculateTotalAmount();
	};

	return (
		<>
			<Box>
				<TableContainer component={Paper}>
					<Table sx={{minWidth: 650}} aria-label='simple table'>
						<TableHead>
							<TableRow>
								{['First Name', 'Middle Name', 'last Name', 'refund', 'Action'].map((th) => (
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
												size='small'
												name='firstName'
												label='First Name'
												fullWidth
												autoComplete='firstName'
												onChange={(e) => {
													handleInputChange(e, i);
												}}
												value={inputList[i].firstName}
											/>
										</TableCell>
										<TableCell>
											<TextField
												required
												size='small'
												name='middleName'
												label='Middle Name'
												fullWidth
												autoComplete='middleName'
												onChange={(e) => {
													handleInputChange(e, i);
												}}
												value={inputList[i].middleName}
											/>
										</TableCell>
										<TableCell>
											<TextField
												required
												name='lastName'
												label='Last Name'
												size='small'
												fullWidth
												autoComplete='lastName'
												onChange={(e) => {
													handleInputChange(e, i);
												}}
												value={inputList[i].lastName}
											/>
										</TableCell>
										<TableCell>
											<TextField
												required
												name='refund'
												label='Refund'
												fullWidth
												size='small'
												onChange={(e) => {
													handleInputChange(e, i);
												}}
												value={inputList[i].ticket}
											/>
										</TableCell>

										{inputList.length !== 1 && (
											<Grid container>
												<Grid item xs={6} md={2}>
													<Button startIcon={<DeleteOutlineIcon color='error' fontSize='small' />} onClick={() => handleRemoveClick(i)} sx={{mr: 1, mt: '1.8rem'}}></Button>
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
			<Grid container spacing={1} sx={{m: 0, p: 1}}>
				{inputList.length < 9 && (
					<Grid item xs={6} md={12} sx={{pr: 1}}>
						<Button startIcon={<AddIcon fontSize='small' />} fullWidth={true} onClick={handleAddClick} sx={{mr: 1, pr: 1}} variant='outlined'>
							Add new
						</Button>
					</Grid>
				)}
				{/* Total Amount */}
				<Grid item xs={6} md={12} sx={{pr: 1, my: 3}}>
					<TextField
						disabled
						size='small'
						required
						name='totalAmount'
						label='TOTAL VALUE'
						fullWidth={true}
						onChange={(e) => {
							setTotalAmt(e.target.value);
						}}
						value={totalAmt}
					/>
				</Grid>
			</Grid>
		</>
	);
};

export default Refund;

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	minWidth: '45vw',
	maxWidth: '60vw',
	minHeight: '60vh',
	maxHeight: '90vh',
	overflowX: ' auto',
	bgcolor: 'background.paper',
	// border: '2px solid #000',
	boxShadow: 24,
	borderRadius: '1rem',
	p: 4,
};