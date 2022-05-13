import React, {useState, useEffect} from 'react';
import {Avatar, Box, Card, CardContent, Grid, InputAdornment, TextField, IconButton, Modal, Button, Paper, FormControl, Select, InputLabel, MenuItem} from '@mui/material';
import Email1 from './components/email1';
import axios from 'axios';
import qs from 'qs';

import NewBooking from './components/email/NewBooking';
import Exchange from './components/email/Exchange';
import FutureCredit from './components/email/FutureCredit';
import Refund from './components/email/Refund';

import {BASEURL, createQueryString, errorToast, successToast} from '../utils/Utils';
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

const Email = ({Ticketid, id, onClose}) => {
	// console.log(id);
	const [selectedEmailTemplate, setSelectedEmailTemplate] = useState(1);
	const [pnrValue, setPnrValue] = useState('1 VS8020 M 15JAN 2 BOMLHR HK1 2 235A 700A 77W E0 R');
	const [pnrData, setPnrData] = useState([]);
	const [inputList1, setInputList1] = useState([
		{
			firstName: 'john',
			middleName: 'D',
			lastName: 'doe',
			ticket: '2.72136E+11',
			confirmation: 'KFQHMW',
			price: '200',
		},
	]);
	const [inputList2, setInputList2] = useState([
		{
			firstName: 'john',
			middleName: 'D',
			lastName: 'doe',
			ticket: '2.72136E+11',
			price: '200',
		},
	]);
	const [inputList3, setInputList3] = useState([
		{
			firstName: 'john',
			middleName: 'D',
			lastName: 'doe',
			refund: '2',
		},
	]);
	const [inputList4, setInputList4] = useState([
		{
			firstName: 'john',
			middleName: 'D',
			lastName: 'doe',
			confirmation: '2.72136',
		},
	]);

	const handleEmailTemplateChange = (e) => setSelectedEmailTemplate(Number(e.target.value));

	const handleConfirm = (inputList) => {
		calculateTotalAmount();
		let newArr = clean(inputList);
		console.log(Ticketid);
		newArr = newArr.filter((value) => Object.keys(value).length !== 0);
		console.log(pnrValue);
		console.log('selectedEmailTemplate', selectedEmailTemplate, 'inputList ->', inputList, 'newArr - >', newArr);
	};

	const handleSendEmail = async () => {
		axios
			.post(BASEURL + '/ticket/email', {
				data: inputList,
				ticketId: Ticketid,
			})
			.then((res) => {
				console.log(res);
				onClose();
			})
			.catch((e) => console.log(e));
	};

	const handlePnrConverter = async (e) => {
		e.preventDefault();
		axios
			.post(
				`https://api.pnrconverter.com/api`,
				{
					pnr: pnrValue,
				},
				{
					headers: {
						ContentType: 'application/x-www-form-urlencoded',
						PUBLIC_APP_KEY: '6e0b98437220f87494a76c81543e941083aa6a4c85a2c87be5820372e87b82c9',
						PRIVATE_APP_KEY: 'pCPsHMMMZI2J2ZF4GAKB0v9XGxs0Yknxva1',
					},
				}
			)
			.then((response) => {
				setPnrData(response.data.flightData.flights);
			})
			.catch((e) => {
				console.log(e.response.data.message);
			});
	};

	function renderFields() {
		switch (selectedEmailTemplate) {
			case 1:
				return <NewBooking inputList1={inputList1} setInputList1={setInputList1} />;
			case 2:
				return <Exchange inputList2={inputList2} setInputList2={setInputList2} />;
			case 3:
				return <Refund inputList3={inputList3} setInputList3={setInputList3} />;
			case 4:
				return <FutureCredit inputList4={inputList4} setInputList4={setInputList4} />;

			default:
				// throw new Error("Unknown step");
				return <NewBooking />;
		}
	}
	function renderEmail() {
		switch (selectedEmailTemplate) {
			case 1:
				return <Email1 selectedEmailTemplate={selectedEmailTemplate} pnrData={pnrData} Tabledata={inputList1} recordData={id} />;
			case 2:
				return <Email1 selectedEmailTemplate={selectedEmailTemplate} pnrData={pnrData} Tabledata={inputList2} recordData={id} />;
			case 3:
				return <Email1 selectedEmailTemplate={selectedEmailTemplate} pnrData={pnrData} Tabledata={inputList3} recordData={id} />;
			case 4:
				return <Email1 selectedEmailTemplate={selectedEmailTemplate} pnrData={pnrData} Tabledata={inputList4} recordData={id} />;

			default:
				// throw new Error("Unknown step");
				return <Email1 selectedEmailTemplate={selectedEmailTemplate} pnrData={pnrData} Tabledata={[]} recordData={id} />;
		}
	}

	return (
		<>
			<Box sx={{width: 1, height: 1}}>
				<>
					<Grid container spacing={1} sx={{m: 0, p: 1}}>
						{/*  Email template  */}
						<Grid item md={6} sx={{pr: 1}}>
							<FormControl required fullWidth>
								<InputLabel id='Email-template-Dropdown-label'>Email Template</InputLabel>
								<Select
									size='small'
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
									<MenuItem value='4'>Future Credit</MenuItem>
									{/* <MenuItem value='5'>Add On </MenuItem> */}
								</Select>
							</FormControl>
						</Grid>
						<Grid item md={6} sx={{pr: 1}}>
							<TextField required name='ticketId' size='small' label='Booking ID' fullWidth={true} value={Ticketid} disabled={true} />
						</Grid>

						<Grid item md={10} sx={{pr: 1, my: 2}}>
							<TextField
								id='outlined-multiline-flexible'
								multiline
								maxRows={4}
								name='PnrConverter'
								label='PnrConverter'
								size='small'
								fullWidth={true}
								onChange={(e) => {
									setPnrValue(e.target.value);
								}}
								value={pnrValue}
							/>
						</Grid>
						<Grid item xs={6} md={2} sx={{pr: 1, my: 2}}>
							<Button onClick={handlePnrConverter} variant='contained'>
								Convert
							</Button>
						</Grid>
						<Box sx={{mt: 2, p: 1}}>{renderFields()}</Box>
					</Grid>

					<Grid container spacing={1} sx={{m: 0, p: 1}}>
						<Grid item xs={6} md={10}></Grid>

						<Grid item xs={6} md={2} sx={{mb: 3}}>
							<Button
								// onClick={handleSendEmail}
								variant='contained'>
								Submit
							</Button>
						</Grid>
					</Grid>
				</>
			</Box>

			<Box sx={{m: 3}}></Box>
			<Paper elevation={1}>
				<Email1 selectedEmailTemplate={selectedEmailTemplate} pnrData={pnrData} Tabledata={inputList1} TotalAmount={[]} />
			</Paper>
		</>
	);
};

export default Email;

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
