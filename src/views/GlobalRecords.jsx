import React, {useState, useEffect} from 'react';

//api's
import {BASEURL, createQueryString, successToast, errorToast} from '../utils/Utils';
import axios from 'axios';

//material UI
import {
	Box,
	Button,
	Card,
	Container,
	Modal,
	IconButton,
	Grid,
	CardContent,
	TextField,
	Pagination,
	Paper,
	InputAdornment,
	SvgIcon,
	CircularProgress,
	Typography,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Tooltip,
	CardHeader,
	Divider,
} from '@mui/material';

import UpdateRecord from './components/UpdateRecord';
import ViewLog from './components/ViewLog';
import Email from './Email';

//icon
import CloseIcon from '@mui/icons-material/Close';
import {Search as SearchIcon} from '../assets/icons/search';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import EditIcon from '@mui/icons-material/Edit';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function SearchRecord() {
	const [recordData, setRecordData] = useState([]);
	const [openUpdateRecord, setOpenUpdateRecord] = useState(false);
	const [viewData, setViewData] = useState(false);
	const [oldTotalRecords, setOldTotalRecords] = useState(-1);
	const [allRecords, setAllRecords] = useState([]);
	const [userData, setUserData] = useState({});
	const [page, setPage] = React.useState(1);
	const [totalRecords, setTotalRecords] = useState(-1);
	const [size, setSize] = useState(5);
	const [bookingid, setBookingid] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const [openEmailModal, setOpenEmailModal] = useState(false);
	const [viewEmail, setViewEmail] = useState(false);
	const [openLogModal, setOpenLogModal] = useState(false);
	//Handler's

	const handleChange = (event, value) => {
		setPage(value);
	};

	const loadTransactions = async (search) => {
		// console.log(search);
		setIsLoading(true);
		axios
			.get(BASEURL + '/ticket/all' + search)
			.then((response) => {
				// console.log(response.data);
				if (search === '?page=1') {
					setOldTotalRecords(response.data.data.totalDocuments);

					setAllRecords(response.data.data.tickets);
				}

				setRecordData(response.data.data.tickets);
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

	const addLog = async (ticketId) => {
		axios
			.post(BASEURL + '/log', {
				ticket: ticketId,
			})
			.then((response) => {
				console.log(response.data);
			})
			.catch((e) => {
				console.log(e);
				setIsLoading(false);
				errorToast(e.response.data.message);
			});
	};

	const searchHandler = () => {
		setPage(1);
		loadTransactions(createQueryString({email, bookingid, phone, page}));
	};
	function formateDate(date) {
		let today = new Date(date);
		let dd = String(today.getDate()).padStart(2, '0');
		let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
		let yyyy = today.getFullYear();

		today = mm + '/' + dd + '/' + yyyy;
		return today;
	}
	const handleReset = () => {
		setPhone('');
		setEmail('');
		setBookingid('');
		setRecordData(allRecords);
		setTotalRecords(oldTotalRecords);
	};

	useEffect(() => {
		axios.defaults.headers.common['Authorization'] = 'Bearer ' + JSON.parse(localStorage.getItem('token'));

		loadTransactions(createQueryString({email, bookingid, phone, page}));
	}, [page]);

	return (
		<>
			<Box
				component='main'
				sx={{
					flexGrow: 1,
					pb: 4,
					pt: 2,
				}}>
				<Container maxWidth={false} sx={{p: `0 !important`}}>
					<Typography sx={{m: 1}} variant='h6'>
						All Transaction
					</Typography>

					{/* Start : Search Component */}

					<Box>
						{/* Search COmponent */}
						<Box sx={{mt: 3}}>
							<Card>
								<CardContent>
									<Box fullWidth sx={{display: ''}}>
										<Grid container spacing={3}>
											<Grid item sm={4} xs={4} md={4} lg={3}>
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
													onChange={(e) => setBookingid(e.target.value)}
													placeholder='Enter Booking Id'
													variant='outlined'
													value={bookingid}
												/>
											</Grid>

											<Grid item sm={4} xs={4} md={4} lg={3}>
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
													onChange={(e) => setPhone(e.target.value)}
													placeholder='Enter Phone Number'
													variant='outlined'
													value={phone}
												/>
											</Grid>
											<Grid item sm={4} xs={4} md={4} lg={3} sx={{px: 2, mt: 0.5}}>
												<Button sx={{textTransform: 'capitalize', mx: 1}} size='small' disabled={!(email || phone || bookingid)} variant='contained' onClick={searchHandler}>
													Search
												</Button>
												<Button sx={{textTransform: 'capitalize'}} size='small' variant='contained' color='neutral' onClick={handleReset}>
													Reset
												</Button>
											</Grid>
										</Grid>
									</Box>
								</CardContent>
							</Card>
						</Box>
					</Box>
					<Box sx={{mt: 3}}>
						<TableContainer component={Paper}>
							<Table sx={{minWidth: 650}} aria-label='simple table'>
								<TableHead>
									<TableRow>
										{[
											//'Email',
											'Name',
											'Booking ID',
											'Phone',
											'Dep. Date',
											'Return Date',
											'Created Date',
											'Action',
										].map((th) => (
											<TableCell key={th}>{th}</TableCell>
										))}
									</TableRow>
								</TableHead>
								<TableBody>
									{isLoading ? (
										<TableRow>
											<TableCell colSpan={11}>
												<div
													style={{
														display: 'flex',
														justifyContent: 'center',
													}}>
													<CircularProgress />
												</div>
											</TableCell>
										</TableRow>
									) : recordData?.length > 0 ? (
										recordData.map((row, index) => (
											<TableRow
												key={index}
												sx={{
													'&:last-child td, &:last-child th': {border: 0},
												}}>
												{/* <TableCell>{false ? row?.email.substring(0, 12) + `...` : row?.email}</TableCell> */}
												<TableCell>{`${row?.firstName.toUpperCase()} ${row?.lastName.toUpperCase()}`}</TableCell>
												<TableCell>{row?.bookingId}</TableCell>

												<TableCell>{row?.phone}</TableCell>

												<TableCell>{formateDate(row?.departureDate)}</TableCell>
												<TableCell>{formateDate(row?.returnDate)}</TableCell>
												<TableCell>{formateDate(row?.createdAt)}</TableCell>

												<TableCell>
													{/* Update*/}
													<Tooltip title={new Date() - new Date(row.createdAt) < 60000 * 60 * 48 ? 'Edit' : 'View'}>
														<IconButton
															aria-label='update'
															onClick={() => {
																setViewData(true);
																setUserData(row);
																setOpenUpdateRecord(true);
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
																setOpenEmailModal(true);
															}}>
															<ForwardToInboxIcon />
														</IconButton>
													</Tooltip>

													{/* logs*/}
													<Tooltip title='View Logs'>
														<IconButton
															aria-label='viewlogs'
															onClick={() => {
																setUserData(row);

																setOpenLogModal(true);
															}}>
															<ReceiptLongIcon />
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
					</Box>
					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
							margin: '20px auto',
							width: '100%',
						}}>
						<Pagination count={totalRecords != -1 && Math.ceil(totalRecords / size)} page={page} onChange={handleChange} />
					</div>
				</Container>
			</Box>
			{/* open Logs*/}
			<Modal open={openLogModal} onClose={() => setOpenLogModal(false)} size='xs' aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
				<Box
					sx={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						minWidth: '70vw',
						minHeight: '60vh',
						maxHeight: '92vh',
						overflowX: ' auto',
						bgcolor: 'background.paper',
						boxShadow: 24,
						borderRadius: '1rem',
						pt: 2,
					}}
					style={{padding: '32px 16px !important'}}>
					<Card sx={{p: 0, m: 0}}>
						<CardHeader
							sx={{py: '0 !important'}}
							title='Logs :'
							action={
								<IconButton onClick={() => setOpenLogModal(false)} sx={{position: `absolute`, right: `10px`, top: `10px`}}>
									<CloseIcon />
								</IconButton>
							}
						/>
						<Divider />

						<CardContent sx={{minHeight: '80vh', maxHeight: '85vh', overflowX: ' auto'}}>
							<ViewLog data={[Array(10)]} id={userData} />
						</CardContent>
					</Card>
				</Box>
			</Modal>
			{/* update Record */}
			<Modal open={openUpdateRecord} onClose={() => setOpenUpdateRecord(false)} size='xs' aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
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
					<IconButton onClick={() => setOpenUpdateRecord(false)} sx={{position: `absolute`, right: `10px`, top: `10px`}}>
						<CloseIcon />
					</IconButton>

					<UpdateRecord data={userData} />
				</Box>
			</Modal>
			{/* Send Email */}
			<Modal open={openEmailModal} onClose={() => setOpenEmailModal(false)} size='xs' aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
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
					<IconButton onClick={() => setOpenEmailModal(false)} sx={{position: `absolute`, right: `10px`, top: `10px`}}>
						<CloseIcon />
					</IconButton>
					<Email Ticketid={viewEmail} id={userData} />
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
