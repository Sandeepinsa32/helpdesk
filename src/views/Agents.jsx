import React, {useState, useEffect} from 'react';
import {BASEURL, createQueryString, errorToast, successToast} from '../utils/Utils';
import axios from 'axios';

//@material-ui
import {
	Box,
	Container,
	Button,
	Card,
	CardContent,
	CircularProgress,
	Paper,
	TextField,
	Modal,
	InputAdornment,
	SvgIcon,
	Typography,
	CardHeader,
	// Divider,
	Grid,
	IconButton,
	ThemeProvider,
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
// import DeleteIcon from '@mui/icons-material/Delete';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import {createTheme} from '@mui/material/styles';
// import {minWidth} from '@mui/system';

//  local icon
import {Search as SearchIcon} from '../assets/icons/search';

const theme = createTheme({
	palette: {
		neutral: {
			main: '#64748B',
			contrastText: '#fff',
		},
	},
});
export const AddUser = () => {
	const [values, setValues] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		employeeCode: '',
		employeeAlias: '',
	});
	// const [searchKey, setSearchKey] = useState('');
	const [agentsList, setAgentsList] = useState([]);
	const [open, setOpen] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);
	const [page, setPage] = React.useState(1);

	const [isLoading, setIsLoading] = useState(false);
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [selectedRecord, setSelectedRecord] = useState({});
	const [openUpdatePass, setOpenUpdatePass] = useState(false);
	const [passwordInfo, setPasswordInfo] = useState({
		password: '',
		confirmPassword: '',
	});

	const handleReset = () => {
		setPhone('');
		setEmail('');
		// console.log(allRecords);
		setAgentsList(allRecords);
	};
	const searchHandle = () => {
		setPage(1);
		loadAgents(createQueryString({email, phone, page}));
	};
	const handlePassModal = () => {
		setOpenUpdatePass(false);
	};

	const handleChange = (event) => {
		setValues({
			...values,
			[event.target.name]: event.target.value,
		});
	};
	const handleChangePassupdate = (event) => {
		setPasswordInfo({
			...passwordInfo,
			[event.target.name]: event.target.value,
		});
	};
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const [allRecords, setAllRecords] = useState([]);

	const SaveDetail = async (e) => {
		e.preventDefault();

		axios
			.post(BASEURL + '/agent', values, {
				headers: {
					authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token')),
				},
			})
			.then((response) => {
				// console.log(response);
				successToast('Agent added successfully');
				setAgentsList((prev) => [response.data.data, ...prev]);
				handleClose();
			})
			.catch((e) => {
				// console.log(e);
				errorToast(e.response.data.message);
			});
	};
	const loadAgents = async (search) => {
		// console.log(search);
		setIsLoading(true);
		axios
			.get(BASEURL + `/agent/all${search}`, {
				headers: {
					authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token')),
				},
			})
			.then((response) => {
				setAgentsList(response.data.data);

				if (search === '?page=1') setAllRecords(response.data.data);
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
		loadAgents(createQueryString({email, phone, page}));
	}, []);

	return (
		<>
			<ThemeProvider theme={theme}>
				<Box
					component='main'
					sx={{
						flexGrow: 1,
						pb: 4,
						pt: 2,
					}}>
					<Container maxWidth={false} sx={{p: `0 !Important`}}>
						{/* External Btn  */}
						<Box
							sx={{
								alignItems: 'center',
								display: 'flex',
								justifyContent: 'space-between',
								flexWrap: 'wrap',
								m: -1,
							}}>
							<Typography sx={{m: 1}} variant='h6'>
								Agents details
							</Typography>

							<Box sx={{m: 1}}>
								<Button color='primary' onClick={handleOpen} variant='contained'>
									Add New Agent
								</Button>
							</Box>
						</Box>

						{/* Start : search bar Component */}
						<Box>
							<ThemeProvider theme={theme}>
								{/* Search COmponent */}
								<Box sx={{mt: 3}}>
									<Card>
										<CardContent>
											<Box fullWidth sx={{display: 'flex'}}>
												<Grid container spacing={3}>
													<Grid item xs={6} md={3}>
														<TextField
															size='small'
															sx={{width: `23vw`, height: `2rem`}}
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

													<Grid item xs={4} md={3}>
														<Box sx={{px: 2, mt: 0.5}}>
															<Button sx={{textTransform: 'capitalize', mx: 1}} size='small' variant='contained' onClick={searchHandle} disabled={!(email || phone)}>
																Search
															</Button>
															<Button sx={{textTransform: 'capitalize'}} size='small' variant='contained' color='neutral' onClick={handleReset}>
																Reset
															</Button>
														</Box>
													</Grid>
												</Grid>
											</Box>
										</CardContent>
									</Card>
								</Box>
							</ThemeProvider>
						</Box>

						{/* End : search bar Component */}

						<Box sx={{mt: 3}}>
							<TableContainer component={Paper}>
								<Table sx={{minWidth: 650}} aria-label='simple table'>
									<TableHead>
										<TableRow>
											{['EmpCode', 'Name', 'Email', 'Alias', 'Registration Date', 'Actions'].map((th) => (
												<TableCell key={th}>{th}</TableCell>
											))}
										</TableRow>
									</TableHead>
									<TableBody>
										{isLoading ? (
											<TableRow>
												<TableCell colSpan={5}>
													<div
														style={{
															display: 'flex',
															justifyContent: 'center',
														}}>
														<CircularProgress />
													</div>
												</TableCell>
											</TableRow>
										) : agentsList?.length > 0 ? (
											agentsList.map((row, index) => (
												<TableRow
													key={index}
													sx={{
														'&:last-child td, &:last-child th': {border: 0},
													}}>
													<TableCell>{row.employeeCode}</TableCell>
													<TableCell>
														{row.firstName} {row.lastName}
													</TableCell>
													<TableCell>{row.email}</TableCell>
													<TableCell>{row.employeeAlias}</TableCell>
													<TableCell>{row.createdAt?.substring(0, 10)}</TableCell>

													<TableCell>
														<Button
															variant='contained'
															size='small'
															onClick={() => {
																setSelectedRecord(row);
																setOpenUpdatePass(true);
															}}>
															Update
														</Button>
													</TableCell>
												</TableRow>
											))
										) : (
											<TableRow>
												<TableCell colSpan={5}>
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
					</Container>
				</Box>
			</ThemeProvider>

			<Modal open={openUpdatePass} onClose={handlePassModal} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
				<Box sx={style}>
					<IconButton onClick={handlePassModal} sx={{position: `absolute`, right: `10px`, top: `10px`}}>
						<CloseIcon />
					</IconButton>
					<form autoComplete='off' noValidate>
						<Card
							sx={{
								boxShadow: 'none',
							}}>
							<CardHeader subheader='you can only update Password' title='Update Password ' sx={{py: 0}} />

							<CardContent>
								<Grid container spacing={3}>
									<Grid item md={6} xs={6}>
										<TextField
											fullWidth
											disabled={true}
											helperText='Please specify the first name'
											label='First name'
											name='firstName'
											required
											value={selectedRecord.firstName}
											variant='outlined'
										/>
									</Grid>
									<Grid item md={6} xs={6}>
										<TextField fullWidth disabled={true} label='Last name' name='lastName' required value={selectedRecord.lastName} variant='outlined' />
									</Grid>
									<Grid item md={6} xs={6}>
										<TextField fullWidth disabled={true} label='Email Address' name='email' required value={selectedRecord.email} variant='outlined' />
									</Grid>

									<Grid item md={6} xs={6}>
										<TextField fullWidth disabled={true} label='Emp ID' name='employeeCode' value={selectedRecord.employeeCode} type='string' variant='outlined' />
									</Grid>

									<Grid item md={6} xs={6}>
										<TextField fullWidth disabled={true} label='alias' name='employeeAlias' required variant='outlined' value={selectedRecord.employeeAlias} />
									</Grid>

									<Grid item md={6} xs={6}>
										<TextField
											fullWidth
											label='Password'
											name='password'
											type='password'
											required
											variant='outlined'
											onChange={handleChangePassupdate}
											value={passwordInfo.password}
										/>
									</Grid>
									<Grid item md={6} xs={6}>
										<TextField
											fullWidth
											label='Confirm Password'
											onChange={handleChangePassupdate}
											name='confirmPassword'
											type='password'
											required
											variant='outlined'
											value={passwordInfo.confirmPassword}
										/>
									</Grid>

									<Grid item md={6} xs={6}>
										<Button
											color='primary'
											variant='contained'
											sx={{right: '2rem', position: 'absolute'}}
											disabled={passwordInfo.password == '' || passwordInfo.confirmPassword == '' || passwordInfo.password !== passwordInfo.confirmPassword}>
											Update
										</Button>
									</Grid>
								</Grid>
							</CardContent>
						</Card>
					</form>
				</Box>
			</Modal>
			<Modal open={open} onClose={handleClose} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
				<Box sx={style}>
					<IconButton onClick={handleClose} sx={{position: `absolute`, right: `10px`, top: `10px`}}>
						<CloseIcon />
					</IconButton>
					<form autoComplete='off' noValidate>
						<Card
							sx={{
								boxShadow: 'none',
							}}>
							<CardHeader subheader='you can only add Sales-agent' title='Add new Agent ' sx={{py: 0}} />

							<CardContent>
								<Grid container spacing={3}>
									<Grid item md={6} xs={6}>
										<TextField
											fullWidth
											helperText='Please specify the first name'
											label='First name'
											name='firstName'
											onChange={handleChange}
											required
											value={values.firstName}
											variant='outlined'
										/>
									</Grid>
									<Grid item md={6} xs={6}>
										<TextField fullWidth label='Last name' name='lastName' onChange={handleChange} required value={values.lastName} variant='outlined' />
									</Grid>
									<Grid item md={6} xs={6}>
										<TextField fullWidth label='Email Address' name='email' onChange={handleChange} required value={values.email} variant='outlined' />
									</Grid>

									<Grid item md={6} xs={6}>
										<TextField fullWidth label='Emp ID' name='employeeCode' onChange={handleChange} value={values.employeeCode} type='string' variant='outlined' />
									</Grid>

									<Grid item md={6} xs={6}>
										<TextField fullWidth label='alias' name='employeeAlias' required variant='outlined' onChange={handleChange} value={values.employeeAlias} />
									</Grid>

									<Grid item md={6} xs={6}>
										<TextField fullWidth label='Password' name='password' type='password' required variant='outlined' onChange={handleChange} value={values.password} />
									</Grid>

									<Grid item md={6} xs={6}>
										<Button color='primary' variant='contained' sx={{right: '2rem', position: 'absolute'}} onClick={SaveDetail}>
											Save details
										</Button>
									</Grid>
								</Grid>
							</CardContent>
						</Card>
					</form>
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
	width: 'auto',
	minWidth: '30vw',
	height: 'auto',
	bgcolor: 'background.paper',
	// border: '2px solid #000',
	boxShadow: 24,
	borderRadius: '1rem',
	padding: '24px 8px',
};

export default AddUser;
