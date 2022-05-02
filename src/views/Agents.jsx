import React, {useState, useEffect} from 'react';
import {BASEURL, createQueryString} from '../utils/Utils';
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
	Divider,
	Grid,
	IconButton,
	ThemeProvider,
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import {createTheme} from '@mui/material/styles';
import {minWidth} from '@mui/system';

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
	const [searchKey, setSearchKey] = useState('');
	const [agentsList, setAgentsList] = useState([]);
	const [open, setOpen] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);
	const [page, setPage] = React.useState(1);

	const [isLoading, setIsLoading] = useState(false);
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');

	const handleReset = () => {
		setPhone('');
		setEmail('');
	};
	const searchHandle = () => {
		setPage(1);
		loadAgents(createQueryString({email, phone, page}));
	};

	const handleChange = (event) => {
		setValues({
			...values,
			[event.target.name]: event.target.value,
		});
	};
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const handleDeleteClose = () => setDeleteModal(false);

	const deleteHandler = () => setDeleteModal(true);
	const SaveDetail = async (e) => {
		e.preventDefault();

		axios
			.post(BASEURL + '/agent', values)
			.then((response) => {
				console.log(response);
				setAgentsList((prev) => [response.data.data, ...prev]);
				handleClose();
			})
			.catch((e) => console.log(e));
	};
	const loadAgents = async (search) => {
		console.log(search);
		setIsLoading(true);
		axios
			.get(BASEURL + '/agent/all')
			.then((response) => {
				console.log(response.data.data);
				setAgentsList(response.data.data);
				setTimeout(() => {
					setIsLoading(false);
				}, 500);
			})
			.catch((e) => {
				console.log(e);
				setIsLoading(false);
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
					<Container maxWidth={false}>
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
								Employees details
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
													<Grid item xs={12} md={3}>
														<Box sx={{px: 2, mt: 0.5}}>
															<Button sx={{textTransform: 'capitalize', mx: 2}} size='small' variant='contained' onClick={searchHandle} disabled={!(email || phone)}>
																Search
															</Button>
															<Button sx={{textTransform: 'capitalize', mx: 2}} size='small' variant='contained' color='neutral' onClick={handleReset}>
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
											{[
												'EmpCode',
												'Name',
												'Email',
												'Alias',
												'Registration Date',
												//'Actions'
											].map((th) => (
												<TableCell key={th}>{th}</TableCell>
											))}
										</TableRow>
									</TableHead>
									<TableBody>
										{isLoading ? (
											<TableRow>
												<TableCell></TableCell>
												<TableCell></TableCell>
												<TableCell>
													<div
														style={{
															marginLeft: '-3rem',
														}}>
														<CircularProgress />
													</div>
												</TableCell>
												<TableCell></TableCell>
												<TableCell></TableCell>
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

													{/* <TableCell>
														<IconButton aria-label='delete' color='error' onClick={deleteHandler}>
															<DeleteIcon />
														</IconButton>
													</TableCell> */}

													{/* <Button variant='contained' color='neutral' size='small' onClick={() => deleteAgent(row._id)}>
															Delete
														</Button> */}
												</TableRow>
											))
										) : (
											<TableRow>
												<TableCell></TableCell>
												<TableCell></TableCell>
												<TableCell>
													<div
														style={{
															marginLeft: '-3rem',
														}}>
														<h2>No data found</h2>
													</div>
												</TableCell>
												<TableCell></TableCell>
												<TableCell></TableCell>
											</TableRow>
										)}
									</TableBody>
								</Table>
							</TableContainer>
						</Box>
					</Container>
				</Box>
			</ThemeProvider>

			<Modal open={deleteModal} onClose={handleDeleteClose} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
				<Box sx={style}>
					<IconButton onClick={handleDeleteClose} sx={{position: `absolute`, right: `10px`, top: `10px`}}>
						<CloseIcon />
					</IconButton>
					<form autoComplete='off' noValidate>
						<Card
							sx={{
								boxShadow: 'none',
								padding: '0 !important',
							}}>
							<CardHeader sx={{padding: '0 !important'}} title='Want to Delete ? ' subheader='are u sure this action cannot be undo' />

							<CardContent>
								<Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
									<Button color='primary' variant='contained' sx={{mx: 2}} onClick={handleDeleteClose}>
										Yes
									</Button>
									<Button color='primary' variant='contained' onClick={handleDeleteClose}>
										No
									</Button>
								</Box>
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
									<Grid item md={6} xs={12}>
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
									<Grid item md={6} xs={12}>
										<TextField fullWidth label='Last name' name='lastName' onChange={handleChange} required value={values.lastName} variant='outlined' />
									</Grid>
									<Grid item md={6} xs={12}>
										<TextField fullWidth label='Email Address' name='email' onChange={handleChange} required value={values.email} variant='outlined' />
									</Grid>

									<Grid item md={6} xs={12}>
										<TextField fullWidth label='Emp ID' name='employeeCode' onChange={handleChange} value={values.employeeCode} type='string' variant='outlined' />
									</Grid>

									<Grid item md={6} xs={12}>
										<TextField fullWidth label='alias' name='employeeAlias' required variant='outlined' onChange={handleChange} value={values.employeeAlias} />
									</Grid>

									<Grid item md={6} xs={12}>
										<TextField fullWidth label='Password' name='password' type='password' required variant='outlined' onChange={handleChange} value={values.password} />
									</Grid>

									<Grid item md={6} xs={12}>
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
