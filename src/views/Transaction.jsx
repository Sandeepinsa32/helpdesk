import React, {useState} from 'react';
// import {Result} from './components/transaction/transResult';
import {Search} from './components/transaction/transSearch';
import Checkout from './components/Checkout';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Paper, ThemeProvider} from '@mui/material';

//@material-ui
import {Box, Button, Card, Container, CardContent, TextField, Modal, InputAdornment, SvgIcon, Typography, CardHeader, Divider, Grid, IconButton} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

export const Transaction = () => {
	const [recordData, setRecordData] = useState([
		{
			firstname: 'John',
			lastname: 'doe',
			phone: '5655656565',
			email: 'dsnsnn@gmgmg.cmo',

			passengerCount: '2',
			pnr: 'xssc',
			mco: '5',
			airlineCode: 'ss55',

			totalCharge: '55',
			pricePerPax: '5',

			productType: 'flight',
			bookingType: 'new',
			fareType: 'private',
			bookedon: 'trippro',
			departureDateValue: '22/04/2022',
			returnDateValue: '28/04/2022',
			bookingId: '22222222222',
		},
		{
			firstname: 'John',
			lastname: 'doe',
			phone: '5655656565',
			email: 'dsnsnn@gmgmg.cmo',

			passengerCount: '2',
			pnr: 'xssc',
			mco: '5',
			airlineCode: 'ss55',

			totalCharge: '55',
			pricePerPax: '5',

			productType: 'flight',
			bookingType: 'new',
			fareType: 'private',
			bookedon: 'trippro',
			departureDateValue: '22/04/2022',
			returnDateValue: '28/04/2022',
			bookingId: '22222222222',
		},
	]);
	const [open, setOpen] = useState(false);
	const [viewData, setViewData] = useState(false);
	const [userData, setUserData] = useState({});
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

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
			<Box
				component='main'
				sx={{
					flexGrow: 1,
					pb: 4,
					pt: 2,
				}}>
				<Container maxWidth={false}>
					<Box
						sx={{
							alignItems: 'center',
							display: 'flex',
							justifyContent: 'space-between',
							flexWrap: 'wrap',
							m: -1,
						}}>
						<Typography sx={{m: 1}} variant='h6'>
							My Records
						</Typography>
						<Typography sx={{m: 1}} variant='body2'>
							{currentDate()}
						</Typography>

						<Box sx={{m: 1}}>
							{/* <Button startIcon={<FilterAltIcon fontSize='small' />} sx={{mr: 1}}>
								Filter
							</Button> */}
							<Button
								color='primary'
								onClick={() => {
									setViewData(false);
									handleOpen();
								}}
								variant='contained'>
								Add New Record
							</Button>
						</Box>
					</Box>

					{/*  Search  Component */}
					<Search />

					<Box sx={{mt: 3}}>
						<TableContainer component={Paper}>
							<Table sx={{minWidth: 650}} aria-label='simple table'>
								<TableHead>
									<TableRow>
										{['Email', 'Agent Name', 'Booking ID', 'CCH Name', 'Phone', 'Total G.P', 'Airline', '	No.of PAX', 'Fare Type', 'Dep Date', 'Return Date', 'action'].map((th) => (
											<TableCell key={th}>{th}</TableCell>
										))}
									</TableRow>
								</TableHead>
								<TableBody>
									{recordData?.length &&
										recordData.map((row, index) => (
											<TableRow
												key={index}
												sx={{
													'&:last-child td, &:last-child th': {border: 0},
												}}>
												<TableCell>{row.email}</TableCell>
												<TableCell>{`${row.firstname} ${row.lastname}`}</TableCell>
												<TableCell>{row.bookingId}</TableCell>
												<TableCell>{row.firstname}</TableCell>
												<TableCell>{row.phone}</TableCell>
												<TableCell>{row.totalCharge}</TableCell>
												<TableCell>{row.airlineCode}</TableCell>
												<TableCell>{row.passengerCount}</TableCell>
												<TableCell>{row.fareType}</TableCell>
												<TableCell>{row.departureDateValue}</TableCell>
												<TableCell>{row.returnDateValue}</TableCell>

												<TableCell>
													<Button
														variant='contained'
														size='small'
														onClick={() => {
															console.log(row);
															setViewData(true);
															setUserData(row);
															handleOpen();
														}}>
														View
													</Button>
												</TableCell>
											</TableRow>
										))}
								</TableBody>
							</Table>
						</TableContainer>
					</Box>
				</Container>
			</Box>

			{/* Add new Record MOdal*/}
			<Modal open={open} onClose={handleClose} size='xs' aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
				<Box sx={style}>
					<IconButton onClick={handleClose} sx={{position: `absolute`, right: `10px`, top: `10px`}}>
						<CloseIcon />
					</IconButton>
					{viewData ? <Checkout isView={true} data={userData} /> : <Checkout isView={false} />}
				</Box>
			</Modal>
		</>
	);
};

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	minWidth: '70vw',
	minHeight: '60vh',
	maxHeight: '90vh',
	overflowX: ' auto',
	bgcolor: 'background.paper',
	// border: '2px solid #000',
	boxShadow: 24,
	borderRadius: '1rem',
	p: 4,
};
