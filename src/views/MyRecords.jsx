import React, {useState, useEffect} from 'react';
import Checkout from './components/CheckoutStepper';

import {BASEURL, createQueryString, successToast, errorToast} from '../utils/Utils';
import axios from 'axios';

//@material-ui
import {Box, Button, Card, Container, CardContent, TextField, CircularProgress, Modal, InputAdornment, SvgIcon, Typography, CardHeader, Divider, Grid, IconButton} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Paper, ThemeProvider} from '@mui/material';
import {createTheme} from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';

//  local icon
import {Search as SearchIcon} from '../assets/icons/search';
import CloseIcon from '@mui/icons-material/Close';

export const Transaction = () => {
	const [myRecords, setMyRecords] = useState([]);
	const [open, setOpen] = useState(false);
	const [viewData, setViewData] = useState(false);
	const [userData, setUserData] = useState({});
	const [searchId, setSearchId] = useState('');
	const [searchEmail, setSearchEmail] = useState('');
	const [searchAgentCode, SearchAgentCode] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [totalRecords, setTotalRecords] = useState(-1);
	const [size, setSize] = useState(5);
	const [bookingid, setBookingid] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [oldTotalRecords, setOldTotalRecords] = useState(-1);
	const [allRecords, setAllRecords] = useState([]);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const [page, setPage] = React.useState(1);

	function searchHandler() {
		setPage(1);
		loadTransactions(createQueryString({email, bookingid, phone, page}));
	}
	const handleReset = () => {
		setPhone('');
		setEmail('');
		setBookingid('');
		setMyRecords(allRecords);
		setTotalRecords(oldTotalRecords);
	};
	const handleChange = (event, value) => {
		setPage(value);
	};
	const loadTransactions = async (search) => {
		console.log(search);
		setIsLoading(true);
		axios
			.get(BASEURL + '/ticket/all' + search)
			.then((response) => {
				console.log(response.data);
				if (search === '?page=1') {
					setOldTotalRecords(response.data.data.totalDocuments);

					setAllRecords(response.data.data.tickets);
				}

				setMyRecords(response.data.data.tickets);
				setTotalRecords(response.data.data.totalDocuments);
				setTimeout(() => {
					setIsLoading(false);
				}, 500);
			})
			.catch((e) => {
				console.log(e);
				setIsLoading(false);
				errorToast(e.response.data.message);
			});
	};

	useEffect(() => {
		loadTransactions(createQueryString({email, bookingid, phone, page}));
	}, [page]);

	function currentDate() {
		let today = new Date();
		let dd = String(today.getDate()).padStart(2, '0');
		let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
		let yyyy = today.getFullYear();

		today = mm + '/' + dd + '/' + yyyy;
		return today;
	}
	const theme = createTheme({
		palette: {
			neutral: {
				main: '#64748B',
				contrastText: '#fff',
			},
		},
	});
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
						{/* <Typography sx={{ m: 1 }} variant="body2"> */}
						{/* {currentDate()} */}
						{/* </Typography> */}

						<Box sx={{m: 1}}>
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

					<Box>
						<ThemeProvider theme={theme}>
							{/* Search COmponent */}
							<Box sx={{mt: 3}}>
								<Card>
									<CardContent>
										<Box fullWidth sx={{display: ''}}>
											<Grid container spacing={3}>
												<Grid item xs={12} md={3}>
													<TextField
														size='small'
														sx={{width: `19vw`, height: `2rem`}}
														InputProps={{
															startAdornment: (
																<InputAdornment position='start'>
																	<SvgIcon color='action' fontSize='small'>
																		<SearchIcon />
																	</SvgIcon>
																</InputAdornment>
															),
														}}
														onChange={(e) => setBookingid(e.target.value)}
														placeholder='Enter Booking Id'
														variant='outlined'
														value={bookingid}
													/>
												</Grid>

												<Grid item xs={12} md={3}>
													<TextField
														size='small'
														sx={{width: `19vw`, height: `2rem`}}
														InputProps={{
															startAdornment: (
																<InputAdornment position='start'>
																	<SvgIcon color='action' fontSize='small'>
																		<SearchIcon />
																	</SvgIcon>
																</InputAdornment>
															),
														}}
														onChange={(e) => setEmail(e.target.value)}
														placeholder='Enter Email id'
														variant='outlined'
														value={email}
													/>
												</Grid>
												<Grid item xs={12} md={3}>
													<TextField
														size='small'
														sx={{width: `19vw`, height: `2rem`}}
														InputProps={{
															startAdornment: (
																<InputAdornment position='start'>
																	<SvgIcon color='action' fontSize='small'>
																		<SearchIcon />
																	</SvgIcon>
																</InputAdornment>
															),
														}}
														onChange={(e) => setPhone(e.target.value)}
														placeholder='Enter Phone Number'
														variant='outlined'
														value={phone}
													/>
												</Grid>
												<Grid item xs={12} md={3} sx={{px: 2, mt: 0.5}}>
													<Button
														sx={{textTransform: 'capitalize', mx: 1}}
														size='small'
														disabled={!(email || phone || bookingid)}
														variant='contained'
														onClick={searchHandler}>
														Search
													</Button>
													<Button sx={{textTransform: 'capitalize', mx: 1}} size='small' variant='contained' color='neutral' onClick={handleReset}>
														Reset
													</Button>
												</Grid>
											</Grid>
										</Box>
									</CardContent>
								</Card>
							</Box>
						</ThemeProvider>
					</Box>
					{/* End: Search  Component */}

					<Box sx={{mt: 3}}>
						<TableContainer component={Paper}>
							<Table sx={{minWidth: 650}} aria-label='simple table'>
								<TableHead>
									<TableRow>
										{[
											'Email',
											'Agent Name',
											'Booking ID',
											//   "CCH Name",
											'Phone',
											'Total G.P',
											'Airline',
											'	No.of PAX',
											'Fare Type',
											'Dep Date',
											'Return Date',
											'action',
										].map((th) => (
											<TableCell key={th}>{th}</TableCell>
										))}
									</TableRow>
								</TableHead>
								<TableBody>
									{isLoading ? (
										<TableRow>
											<TableCell colSpan={10}>
												<div
													style={{
														display: 'flex',
														justifyContent: 'center',
													}}>
													<CircularProgress />
												</div>
											</TableCell>
										</TableRow>
									) : myRecords?.length > 0 ? (
										myRecords.map((row, index) => (
											<TableRow key={index} sx={index % 2 == 0 ? {borderLeft: '8px solid #E0021B'} : {borderLeft: '8px solid #76DF29'}}>
												<TableCell>{row.email}</TableCell>
												<TableCell>{`${row.firstName} ${row.lastName}`}</TableCell>
												<TableCell>{row._id.substring(0, 8)}...</TableCell>
												{/* <TableCell>{row.cards[0].card}</TableCell> */}
												<TableCell>{row.phone}</TableCell>
												<TableCell>{row.grandTotal}</TableCell>
												<TableCell>{row.airlineCode}</TableCell>
												<TableCell>{row.passengerCount}</TableCell>
												<TableCell>{row.fareType}</TableCell>
												<TableCell>{row.departureDate.substring(0, 10)}</TableCell>
												<TableCell>{row.returnDate.substring(0, 10)}</TableCell>

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
										))
									) : (
										<TableRow>
											<TableCell colSpan={10}>
												<div
													style={{
														display: 'flex',
														justifyContent: 'center',
													}}>
													<h2>No data found</h2>
												</div>
											</TableCell>
										</TableRow>
									)}
								</TableBody>
							</Table>
						</TableContainer>
						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
								margin: '20px auto',
								width: '100%',
							}}>
							<Pagination count={totalRecords != -1 && Math.ceil(totalRecords / size)} page={page} onChange={handleChange} />{' '}
						</div>
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
