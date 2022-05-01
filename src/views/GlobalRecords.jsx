import React, {useState, useEffect} from 'react';

//api's
import {BASEURL} from '../utils/Utils';
import axios from 'axios';

//material UI
import {Box, Button, Card, Container, Modal, IconButton, Grid, CardContent, TextField, ThemeProvider, Pagination, Paper, InputAdornment, SvgIcon, Typography} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import {createTheme} from '@mui/material/styles';

//icon
import CloseIcon from '@mui/icons-material/Close';
import {Search as SearchIcon} from '../assets/icons/search';

export default function SearchRecord() {
	const [recordData, setRecordData] = useState([]);
	const [open, setOpen] = useState(false);
	const [viewData, setViewData] = useState(false);
	const [userData, setUserData] = useState({});
	const [page, setPage] = React.useState(1);
	const [search, setSearch] = useState('');
	const [searchKey, setSearchKey] = useState({
		bookingId: '',
		email: '',
		phoneNo: '',
	});

	//Handler's
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const handleChange = (event, value) => {
		setPage(value);
	};
	const loadTransactions = async (search) => {
		console.log(search);
		axios
			.get(BASEURL + '/ticket/all' + search)
			.then((response) => {
				console.log(response.data.data);
				setRecordData(response.data.data);
			})
			.catch((e) => console.log(e));
	};

	const searchHandler = () => {
		alert(JSON.stringify(searchKey));
	};
	const handleReset = () => {
		setSearchKey({
			bookingId: '',
			email: '',
			phoneNo: '',
		});
	};

	useEffect(() => {
		loadTransactions(search);
	}, []);

	// MUi Theme COlor Theme
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
					<Typography sx={{m: 1}} variant='h6'>
						All Transaction
					</Typography>

					{/* Start : Search Component */}

					<Box>
						<ThemeProvider theme={theme}>
							{/* Search COmponent */}
							<Box sx={{mt: 3}}>
								<Card>
									<CardContent>
										<Box fullWidth sx={{display: ''}}>
											<Grid container spacing={3}>
												<Grid item sm={2} md={3}>
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
														onChange={(e) => setSearchKey((prev) => ({...prev, bookingId: e.target.value}))}
														placeholder='Enter Booking Id'
														variant='outlined'
														value={searchKey.bookingId}
													/>
												</Grid>

												<Grid item sm={2} md={3}>
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
														onChange={(e) => setSearchKey((prev) => ({...prev, email: e.target.value}))}
														placeholder='Enter Email id'
														variant='outlined'
														value={searchKey.email}
													/>
												</Grid>
												<Grid item sm={2} md={3}>
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
														onChange={(e) => setSearchKey((prev) => ({...prev, phoneNo: e.target.value}))}
														placeholder='Enter Phone Number'
														variant='outlined'
														value={searchKey.phoneNo}
													/>
												</Grid>
												<Grid item sm={4} md={3} sx={{px: 2, mt: 0.5}}>
													<Button
														sx={{textTransform: 'capitalize', mx: 1}}
														size='small'
														disabled={searchKey == null || (searchKey.bookingId == '' && searchKey.email == '' && searchKey.phoneNo == '') ? true : false}
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

					{/*  End: Search Component */}

					<Box sx={{mt: 3}}>
						<TableContainer component={Paper}>
							<Table sx={{minWidth: 650}} aria-label='simple table'>
								<TableHead>
									<TableRow>
										{[
											'Email',
											'Agent Name',
											//	'Booking ID',
											'Phone',
											'Total G.P',
											'Airline',
											'	No.of PAX',
											'Fare Type',
											//'Dep Date', 'Return Date',
											'action',
										].map((th) => (
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
												<TableCell>{`${row.firstName} ${row.lastName}`}</TableCell>
												{/* <TableCell>{row._id.substring(0, 8)}...</TableCell> */}
												{/* <TableCell>{row.cards[0].card}</TableCell> */}
												<TableCell>{row.phone}</TableCell>
												<TableCell>{row.grandTotal}</TableCell>
												<TableCell>{row.airlineCode}</TableCell>
												<TableCell>{row.passengerCount}</TableCell>
												<TableCell>{row.fareType}</TableCell>
												{/* <TableCell>{row.departureDate.substring(0, 10)}</TableCell>
												<TableCell>{row.returnDate.substring(0, 10)}</TableCell> */}

												<TableCell>
													<Button
														variant='contained'
														size='small'
														onClick={() => {
															console.log(row);
															// setViewData(true);
															// setUserData(row);
															// handleOpen();
														}}>
														View
													</Button>
												</TableCell>
											</TableRow>
										))}
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
							<Pagination count={10} page={page} onChange={handleChange} />
						</div>
					</Box>
				</Container>
			</Box>
			<Modal open={open} onClose={handleClose} size='xs' aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
				<Box sx={style}>
					<IconButton onClick={handleClose} sx={{position: `absolute`, right: `10px`, top: `10px`}}>
						<CloseIcon />
					</IconButton>

					<Typography sx={{m: 1}} variant='body2'>
						{JSON.stringify(userData)}
					</Typography>
				</Box>
			</Modal>
		</>
	);
}

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
