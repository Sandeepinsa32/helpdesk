import React, {useState, useEffect} from 'react';

import {useNavigate} from 'react-router-dom';

import AddNewRecord from './components/AddNewRecord';
import UpdateRecord from './components/UpdateRecord';
import ViewLog from './components/ViewLog';
import RequestCharge from './components/modal/RequestCharge';
import AirlineConfirmation from './components/modal/AirlineConfirmation';

import {BASEURL, createQueryString, successToast, errorToast} from '../utils/Utils';
import axios from 'axios';

//@material-ui
import {
	Box,
	Button,
	Card,
	Container,
	CardContent,
	TextField,
	CircularProgress,
	Modal,
	InputAdornment,
	SvgIcon,
	Typography,
	Grid,
	IconButton,
	Tooltip,
	ListItem,
	ListItemButton,
	ListItemText,
	ListItemIcon,
	List,
} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Paper, ThemeProvider} from '@mui/material';
import {createTheme} from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';

import Email from './Email';

//  local icon
import {Search as SearchIcon} from '../assets/icons/search';
import CloseIcon from '@mui/icons-material/Close';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import EditIcon from '@mui/icons-material/Edit';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import PaymentIcon from '@mui/icons-material/Payment';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import VisibilityIcon from '@mui/icons-material/Visibility';

export const Transaction = () => {
	const [myRecords, setMyRecords] = useState([]);

	//modal state
	const [open, setOpen] = useState(false);
	const [openLog, setOpenLog] = useState(false);
	const [chargeModelOpen, setChargeModelOpen] = useState(false);
	const [airlineModelOpen, setAirlineModelOpen] = useState(false);

	const [openEmail, setOpenEmail] = useState(false);
	const [viewEmail, setViewEmail] = useState(false);

	const [viewData, setViewData] = useState(false);
	const [selectedTicket, setSelectedTicket] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [totalRecords, setTotalRecords] = useState(-1);
	const [size, setSize] = useState(5);
	const [bookingid, setBookingid] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [oldTotalRecords, setOldTotalRecords] = useState(-1);
	const [allRecords, setAllRecords] = useState([]);
	// const [isUpdate, setIsUpdate] = useState(true);
	// const [isUpdate, setIsUpdate] = useState(true);
	const [page, setPage] = React.useState(1);
	const handleOpen = () => setOpen(true);
	const handleClose = () => {
		setOpen(false);
	};
	const handleLogClose = () => {
		setOpenLog(false);
	};
	const handleEmailClose = () => {
		setOpenEmail(false);
	};
	const navigate = useNavigate();
	const goToAddNewRecord = () => {
		navigate('/add-new-record');
	};

	function formateDate(date) {
		let today = new Date(date);
		let dd = String(today.getDate()).padStart(2, '0');
		let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
		let yyyy = today.getFullYear();

		today = mm + '/' + dd + '/' + yyyy;
		return today;
	}
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

	const addLog = async (ticketId) => {
		axios
			.post(BASEURL + '/log/viewed', {
				ticket: ticketId,
			})
			.then((response) => {
				console.log(response.data);
			})
			.catch((e) => {
				console.log(e);
				setIsLoading(false);
				// errorToast(e.response.data.message);
			});
	};

	const loadTransactions = async (search) => {
		setIsLoading(true);
		axios
			.get(BASEURL + '/ticket/my' + search)
			.then((response) => {
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
				// console.log(e.response);
				// console.log(e.response.status);
				setIsLoading(false);
				errorToast(e.response.data.message);
			});
	};

	useEffect(() => {}, [0]);
	useEffect(() => {
		// console.log('useEffect');
		loadTransactions(createQueryString({email, bookingid, phone, page}));
	}, [page]);

	// function currentDate() {
	// 	let today = new Date();
	// 	let dd = String(today.getDate()).padStart(2, '0');
	// 	let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	// 	let yyyy = today.getFullYear();

	// 	today = mm + '/' + dd + '/' + yyyy;
	// 	return today;
	// }
	const theme = createTheme({
		palette: {
			neutral: {
				main: '#64748B',
				contrastText: '#fff',
			},
		},
	});
	function msToTime(date) {
		const duration = new Date() - new Date(date);

		var milliseconds = Math.floor((duration % 1000) / 100),
			seconds = Math.floor((duration / 1000) % 60),
			minutes = Math.floor((duration / (1000 * 60)) % 60),
			hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

		hours = hours < 10 ? '0' + hours : hours;
		minutes = minutes < 10 ? '0' + minutes : minutes;
		seconds = seconds < 10 ? '0' + seconds : seconds;

		// let GenTime = hours + ':' + minutes + ':' + seconds + '.' + milliseconds;
		let GenTime = hours;
		// console.log(GenTime);
		GenTime = GenTime >= 48 ? false : true;

		return Boolean(GenTime);
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
				<Container maxWidth={false} sx={{p: `0!important`}}>
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

						<Box sx={{m: 1}}>
							<Button color='primary' onClick={goToAddNewRecord} variant='contained'>
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
											<Grid container spacing={4} justifyContent='center'>
												<Grid item xs={3} md={3}>
													<TextField
														size='small'
														fullWidth
														sx={{height: `2rem`}}
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

												<Grid item xs={3} md={3}>
													<TextField
														fullWidth
														size='small'
														sx={{height: `2rem`}}
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
												<Grid item xs={3} md={3}>
													<TextField
														size='small'
														fullWidth
														sx={{height: `2rem`}}
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
												{/* <Grid item xs={0} md={0}></Grid> */}
												{/* btn --reset and serach  */}
												<Grid item xs={3} md={3} sx={{px: 2, mt: 0.5}}>
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
											'Cust. Name',
											'Booking ID',
											//   "CCH Name",
											'Phone',
											// 'Total G.P',
											//	'Airline',
											// '	No.of PAX',
											//'Fare Type',
											'Dep Date',
											'Return Date',
											'Action',
										].map((th) => (
											<TableCell sx={{p: 1}} key={th}>
												{th}
											</TableCell>
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
											<TableRow
												key={index}
												sx={
													row.status === 'generate'
														? {borderLeft: '4px solid #E0021B'}
														: row.status === 'sent'
														? {borderLeft: '4px solid #0DC5F4'}
														: row.status === 'authorized'
														? {borderLeft: '4px solid #76DF29'}
														: {}
												}>
												<TableCell sx={{padding: ` 16px 0 16px 8px !important`}}>{row?.email}</TableCell>
												<TableCell sx={{padding: ` 16px 0 16px 8px !important`}}>{`${row?.firstName.toUpperCase()} ${row?.lastName.toUpperCase()}`}</TableCell>
												<TableCell sx={{padding: ` 16px 0 16px 8px !important`}}>{row?.bookingId}</TableCell>

												<TableCell sx={{padding: ` 16px 0 16px 8px !important`}}>{row?.phone}</TableCell>

												{/* <TableCell sx={{padding: ` 16px 0 16px 8px !important`}}>{row?.grandTotal}</TableCell>
												<TableCell sx={{padding: ` 16px 0 16px 8px !important`}}>{row?.airlineCode}</TableCell>
												<TableCell sx={{padding: ` 16px 0 16px 8px !important`}}>{row?.passengerCount}</TableCell>
												<TableCell>{row?.fareType.toUpperCase()}</TableCell> */}

												<TableCell sx={{padding: ` 16px 0 16px 8px !important`}}>{formateDate(row?.departureDate)}</TableCell>
												<TableCell sx={{padding: ` 16px 0 16px 8px !important`}}>{formateDate(row?.returnDate)}</TableCell>

												<TableCell sx={{p: 0}}>
													{/* Update*/}
													<Tooltip title={new Date() - new Date(row.createdAt) < 60000 * 60 * 48 ? 'Edit' : 'View'}>
														<IconButton
															aria-label='update'
															onClick={() => {
																setViewData(true);
																setSelectedTicket(row);
																handleOpen();
																addLog(row._id);
															}}>
															{new Date() - new Date(row.createdAt) < 60000 * 60 * 48 ? <EditIcon /> : <VisibilityIcon />}
														</IconButton>
													</Tooltip>
													{/* email*/}
													<Tooltip title='Email to Customer '>
														<IconButton
															aria-label='sendEmail'
															onClick={(e) => {
																setViewEmail(row._id);
																setOpenEmail(true);
															}}>
															<ForwardToInboxIcon />
														</IconButton>
													</Tooltip>
													{/* logs*/}
													<Tooltip title='View Logs'>
														<IconButton
															aria-label='viewlogs'
															onClick={() => {
																setSelectedTicket(row);
																setOpenLog(true);
															}}>
															<ReceiptLongIcon />
														</IconButton>
													</Tooltip>
													{/* charge*/}
													<Tooltip title='Request to charges'>
														<IconButton
															aria-label='Charge'
															onClick={() => {
																setSelectedTicket(row);
																setChargeModelOpen(true);
															}}>
															<PaymentIcon />
														</IconButton>
													</Tooltip>
													{/* airline confirmation*/}
													<Tooltip title='Airline Confirmation'>
														<IconButton
															aria-label='airelineConfirmation'
															onClick={() => {
																setSelectedTicket(row);
																setAirlineModelOpen(true);
															}}>
															<SupportAgentIcon />
														</IconButton>
													</Tooltip>
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
							<Pagination count={totalRecords != -1 && Math.ceil(totalRecords / size)} page={page} onChange={handleChange} />
						</div>
					</Box>
				</Container>
			</Box>

			{/* open Logs*/}
			<Modal open={openLog} onClose={handleLogClose} size='xs' aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
				<Box sx={style} style={{padding: '32px 16px !important'}}>
					<IconButton onClick={handleLogClose} sx={{position: `absolute`, right: `10px`, top: `10px`}}>
						<CloseIcon />
					</IconButton>
					<ViewLog data={[Array(10)]} id={selectedTicket} />
				</Box>
			</Modal>

			{/* Open update Record modal */}
			<Modal open={open} onClose={handleClose} size='xs' aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
				<Box
					sx={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						minWidth: '90vw',
						minHeight: '80vh',
						maxHeight: '95vh',
						overflowX: ' auto',
						bgcolor: 'background.paper',
						// border: '2px solid #000',
						boxShadow: 24,
						borderRadius: '1rem',
						p: 4,
					}}>
					<IconButton onClick={handleClose} sx={{position: `absolute`, right: `10px`, top: `10px`}}>
						<CloseIcon />
					</IconButton>

					<UpdateRecord data={selectedTicket} />
				</Box>
			</Modal>

			{/* Open EMail Modal */}
			<Modal open={openEmail} onClose={handleEmailClose} size='xs' aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
				<Box
					sx={{
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
					}}>
					<IconButton onClick={handleEmailClose} sx={{position: `absolute`, right: `10px`, top: `10px`}}>
						<CloseIcon />
					</IconButton>
					<Email Ticketid={viewEmail} id={selectedTicket} onClose={handleEmailClose} />
				</Box>
			</Modal>

			{/* Open Charge Modal */}
			<Modal open={chargeModelOpen} onClose={() => setChargeModelOpen(false)} size='xs' aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
				<Box
					sx={{
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
					}}>
					<IconButton onClick={() => setChargeModelOpen(false)} sx={{position: `absolute`, right: `10px`, top: `10px`}}>
						<CloseIcon />
					</IconButton>
					{/* <Email Ticketid={viewEmail} id={selectedTicket} onClose={handleEmailClose} /> */}
					<RequestCharge />
				</Box>
			</Modal>

			{/* Open airline Modal */}
			<Modal open={airlineModelOpen} onClose={() => setAirlineModelOpen(false)} size='xs' aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
				<Box
					sx={{
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
					}}>
					<IconButton onClick={() => setAirlineModelOpen(false)} sx={{position: `absolute`, right: `10px`, top: `10px`}}>
						<CloseIcon />
					</IconButton>
					<AirlineConfirmation Ticketid={viewEmail} id={selectedTicket} onClose={() => setAirlineModelOpen(false)} />
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
