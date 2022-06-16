import React, {useState, useEffect} from 'react';
import {Avatar, Box, Card, CardContent, Grid, InputAdornment, TextField, IconButton, Modal, Button, Paper, FormControl, Select, InputLabel, MenuItem} from '@mui/material';
import RenderSelectedEmail from './components/RenderSelectedEmail';
import axios from 'axios';

import RenderEmailField from './components/RenderEmailField';

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

const Email = ({Ticketid, userData, onClose}) => {
	console.log(userData);

	const [selectedEmailTemplate, setSelectedEmailTemplate] = useState('newBooking');
	const [pnrValue, setPnrValue] = useState('1 VS8020 M 15JAN 2 BOMLHR HK1 2 235A 700A 77W E0 R');
	const [pnrData, setPnrData] = useState([
		{
			dep: {
				airportname: 'Chhatrapati Shivaji Airport',
				cityname: 'Mumbai',
				countryname: 'India',
				airportcode: 'BOM',
				latitude: '19.088699340',
				longitude: '72.867897030',
				timezone: 'Asia/Calcutta',
				timezoneshort: 'IST',
			},
			arr: {
				airportname: 'London Heathrow Airport',
				cityname: 'London',
				countryname: 'United Kingdom',
				airportcode: 'LHR',
				latitude: '51.470600000',
				longitude: '-0.461941000',
				timezone: 'Europe/London',
				timezoneshort: 'BST',
			},
			flt: {
				flightNo: '8020',
				iatacode: 'VS',
				name: 'Virgin Atlantic',
				operated_by: 'Virgin Atlantic',
				code_share: true,
				cabin: 'Economy',
				class: 'M',
				aircraft: 'Boeing 777-300ER ',
				departure: {
					string: '2023-01-15 02:35',
					day: 'Sun',
				},
				arrival: {
					string: '2023-01-15 07:00',
					day: 'Sun',
				},
				transit_time: {},
				duration: {
					minutes: '55',
					hours: '9',
				},
				distance: {
					miles: 4484,
					km: 7217,
				},
				co2: {
					co2: '5.60',
					co2_with_environmental_impact: '10.59',
				},
				'svg-logo-high-res': 'https://www.pnrconverter.com/images/airlines/vs.svg',
				'png-logo-low-res': 'https://www.pnrconverter.com/images/airlines/png/150/vs.png',
			},
		},
	]);

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

	const handleEmailTemplateChange = (e) => setSelectedEmailTemplate(e.target.value);

	// const handleConfirm = (inputList) => {
	// 	// calculateTotalAmount();
	// 	// let newArr = clean(inputList);

	// 	console.log(Ticketid);

	// 	console.log(pnrValue);
	// 	console.log('selectedEmailTemplate', selectedEmailTemplate, 'inputList ->', inputList, 'newArr - >');
	// };

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
				console.log(response.data.flightData.flights);
				setPnrData(response.data.flightData.flights);
			})
			.catch((e) => {
				console.log(e.response.data.message);
			});
	};

	const data = {selectedEmailTemplate, Ticketid, pnrData, onClose, inputList1, setInputList1, inputList2, setInputList2, inputList3, setInputList3, inputList4, setInputList4};

	function renderEmail() {
		switch (selectedEmailTemplate) {
			case 'newBooking':
				return <RenderSelectedEmail selectedEmailTemplate={selectedEmailTemplate} pnrData={pnrData} Tabledata={inputList1} recordData={userData} Ticketid={Ticketid} onClose={onClose} />;
			case 'exchange':
				return <RenderSelectedEmail selectedEmailTemplate={selectedEmailTemplate} pnrData={pnrData} Tabledata={inputList2} recordData={userData} Ticketid={Ticketid} onClose={onClose} />;
			case 'refund':
				return <RenderSelectedEmail selectedEmailTemplate={selectedEmailTemplate} pnrData={pnrData} Tabledata={inputList3} recordData={userData} Ticketid={Ticketid} onClose={onClose} />;
			case 'futureCredit':
				return <RenderSelectedEmail selectedEmailTemplate={selectedEmailTemplate} pnrData={pnrData} Tabledata={inputList4} recordData={userData} Ticketid={Ticketid} onClose={onClose} />;

			default:
				// throw new Error("Unknown step");
				return <RenderSelectedEmail selectedEmailTemplate={selectedEmailTemplate} pnrData={pnrData} Tabledata={[]} recordData={userData} onClose={onClose} />;
		}
	}

	return (
		<>
			<Box sx={{width: 1, height: 1}}>
				<>
					<Grid container spacing={1} sx={{m: 0, p: 1}}>
						{/*  Email template  */}
						<Grid item md={3} sx={{pr: 1}}>
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
									<MenuItem value='newBooking'>New Booking Confirmation </MenuItem>
									<MenuItem value='exchange'>Exchange</MenuItem>
									<MenuItem value='refund'>Refund</MenuItem>
									<MenuItem value='futureCredit'>Future Credit</MenuItem>
									{/* <MenuItem value='5'>Add On </MenuItem> */}
								</Select>
							</FormControl>
						</Grid>
						<Grid item md={3} sx={{pr: 1}}>
							<TextField required name='email' size='small' label='Email' fullWidth={true} value={userData.email} />
						</Grid>

						<Grid item md={6} sx={{pr: 1}}>
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
						<Grid item xs={6} md={2} sx={{pr: 1}}>
							<Button onClick={handlePnrConverter} variant='contained'>
								Convert
							</Button>
						</Grid>
					</Grid>
					<Box sx={{mt: 2, p: 1}}>
						<RenderEmailField data={data} />
					</Box>
				</>
			</Box>

			<Box sx={{m: 3}}>Genrated Email Preview : {renderEmail()}</Box>
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
