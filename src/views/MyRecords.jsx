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
import {Box, Button, Card, Container, CardContent, TextField, CircularProgress, Modal, Divider, InputAdornment, SvgIcon, Typography, Grid, IconButton, Tooltip, CardHeader} from '@mui/material';
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
	const [page, setPage] = useState(1);
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
				setIsLoading(false);
				errorToast(e.response.data.message);
			});
	};

	useEffect(() => {}, [0]);
	useEffect(() => {
		loadTransactions(createQueryString({email, bookingid, phone, page}));
	}, [page]);

	const CheckViewUpdate = (createdAt) => {
		if (new Date() - new Date(createdAt) < 60000 * 60 * 48) {
			return true;
		}
	};
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
											<Grid
												item
												xs={3}
												md={3}
												sx={{
													px: `0 !important`,
													mt: 0.5,
												}}>
												<Button sx={{textTransform: 'capitalize', mx: 1}} size='small' disabled={!(email || phone || bookingid)} variant='contained' onClick={searchHandler}>
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
					</Box>
					{/* End: Search  Component */}

					<Box sx={{mt: 3}}>
						<TableContainer component={Paper}>
							<Table sx={{minWidth: 650}} aria-label='simple table'>
								<TableHead>
									<TableRow>
										{['Email', 'Name', 'Booking ID', 'Phone', 'Dep. Date', 'Return Date', 'Payment Status', 'Action'].map((th) => (
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
												<TableCell sx={{padding: ` 16px 0 16px 8px !important`}}>{row?.email.length > 12 ? row?.email.substring(0, 12) + `...` : row?.email}</TableCell>
												<TableCell sx={{padding: ` 16px 0 16px 8px !important`}}>{`${row?.firstName.toUpperCase()} ${row?.lastName.toUpperCase()}`}</TableCell>
												<TableCell sx={{padding: ` 16px 0 16px 8px !important`}}>{row?.bookingId}</TableCell>

												<TableCell sx={{padding: ` 16px 0 16px 8px !important`}}>{row?.phone}</TableCell>

												<TableCell sx={{padding: ` 16px 0 16px 8px !important`}}>{formateDate(row?.departureDate)}</TableCell>
												<TableCell sx={{padding: ` 16px 0 16px 8px !important`}}>{formateDate(row?.returnDate)}</TableCell>
												<TableCell sx={{padding: ` 16px 0 16px 8px !important`}}>{row?.paymentStatus.toUpperCase()}</TableCell>

												<TableCell sx={{p: 0}}>
													{/* Update*/}
													<Tooltip title={CheckViewUpdate(row.createdAt) ? 'Edit' : 'View'}>
														<IconButton
															aria-label='update'
															onClick={() => {
																setViewData(true);
																setSelectedTicket(row);
																handleOpen();
																addLog(row._id);
															}}>
															{CheckViewUpdate(row.createdAt) ? <EditIcon /> : <VisibilityIcon />}
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
				<Box sx={BoxModalStyle}>
					<Card sx={{p: 0, m: 0}}>
						<CardHeader
							sx={{py: '0 !important'}}
							title='Logs:'
							action={
								<IconButton onClick={handleLogClose} sx={{position: `absolute`, right: `10px`, top: `10px`}}>
									<CloseIcon />
								</IconButton>
							}
						/>
						<Divider />

						<CardContent sx={{minHeight: '80vh', maxHeight: '85vh', overflowX: ' auto'}}>
							<ViewLog data={[Array(10)]} id={selectedTicket} />
						</CardContent>
					</Card>
				</Box>
			</Modal>

			{/* Open update Record modal */}
			<Modal open={open} onClose={handleClose} size='xs' aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
				<Box sx={BoxModalStyle}>
					<Card sx={{p: 0, m: 0}}>
						<CardHeader
							sx={{py: '0 !important'}}
							title='UPDATE RECORD :'
							action={
								<IconButton onClick={handleClose} sx={{position: `absolute`, right: `10px`, top: `10px`}}>
									<CloseIcon />
								</IconButton>
							}
						/>
						<Divider />

						<CardContent sx={{minHeight: '80vh', maxHeight: '85vh', overflowX: ' auto'}}>
							<UpdateRecord data={selectedTicket} />
						</CardContent>
					</Card>
				</Box>
			</Modal>

			{/* Open EMail Modal */}
			<Modal open={openEmail} onClose={handleEmailClose} size='xs' aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
				<Box sx={BoxModalStyle} style={{overflowX: ' auto', padding: 4}}>
					<IconButton onClick={handleEmailClose} sx={{position: `absolute`, right: `10px`, top: `10px`}}>
						<CloseIcon />
					</IconButton>
					<Email Ticketid={viewEmail} id={selectedTicket} onClose={handleEmailClose} />
				</Box>
			</Modal>

			{/* Open Charge Modal */}
			<Modal open={chargeModelOpen} onClose={() => setChargeModelOpen(false)} size='xs' aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
				<Box sx={BoxModalStyle}>
					<IconButton onClick={() => setChargeModelOpen(false)} sx={{position: `absolute`, right: `10px`, top: `10px`}}>
						<CloseIcon />
					</IconButton>
					<RequestCharge
						data={selectedTicket}
						onClose={() => {
							setChargeModelOpen(false);
						}}
					/>
				</Box>
			</Modal>

			{/* Open airline Modal */}
			<Modal open={airlineModelOpen} onClose={() => setAirlineModelOpen(false)} size='xs' aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
				<Box sx={BoxModalStyle}>
					<IconButton onClick={() => setAirlineModelOpen(false)} sx={{position: `absolute`, right: `10px`, top: `10px`}}>
						<CloseIcon />
					</IconButton>
					<AirlineConfirmation Ticketid={viewEmail} id={selectedTicket} onClose={() => setAirlineModelOpen(false)} />
				</Box>
			</Modal>
		</>
	);
};

const BoxModalStyle = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	minWidth: '70vw',
	width: 'auto',
	height: 'auto',
	maxWidth: '80vw',
	maxHeight: '90vh !important',
	bgcolor: 'background.paper',
	boxShadow: 24,
	borderRadius: '1rem',
	pt: 2,
};
