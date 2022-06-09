import React, {useState, useEffect} from 'react';
import {BASEURL, createQueryString, errorToast, successToast} from '../utils/Utils';
import axios from 'axios';
import * as Yup from 'yup';
import {Formik, Form} from 'formik';

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
	Divider,
	Typography,
	CardHeader,
	Grid,
	IconButton,
	Pagination,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	InputLabel,
	MenuItem,
	Select,
	FormControl,
	CardActions,
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import {createTheme} from '@mui/material/styles';

//  local icon
import {Search as SearchIcon} from '../assets/icons/search';
//formik custom field
import Textfield from './components/FormField/Textfield';

export const AddUser = () => {
	const [agentsList, setAgentsList] = useState([]);

	const [page, setPage] = useState(1);
	const [size, setSize] = useState(10);
	const [isLoading, setIsLoading] = useState(false);
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [selectedRecord, setSelectedRecord] = useState({});
	const [previousData, setPreviousData] = useState([]);
	const [totalRecords, setTotalRecords] = useState(-1);
	const [isDisable, setIsDisable] = useState(true);

	//modalState
	const [openAddNewModal, setOpenAddNewModal] = useState(false);
	const [openUpdatePass, setOpenUpdatePass] = useState(false);

	//  reset btn in search component
	const handleReset = () => {
		setEmail('');
		setPage(1);
		setAgentsList(previousData.agents);
		setTotalRecords(previousData.total);
	};
	// search handler in serach component
	const searchHandle = () => {
		setPage(1);
		loadAgents(createQueryString({email, phone, page}));
	};

	//  searching : agent
	const loadAgents = async (search) => {
		setIsLoading(true);
		axios
			.get(BASEURL + `/agent/all${search}`)
			.then((response) => {
				setAgentsList(response.data.data.agents);
				setTotalRecords(response.data.data.total);

				if (search === '?page=1') setPreviousData(response.data.data);
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

	//  pagination handler
	const handlePageChange = (event, value) => {
		setPage(value);
	};

	//  load page onchange pagination
	useEffect(() => {
		loadAgents(createQueryString({email, phone, page}));
	}, [page]);

	const INITIAL_FORM_STATE_ADD_NEW = {
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		employeeCode: '',
		employeeAlias: '',
		status: 'active',
	};

	const INITIAL_FORM_STATE_UPDATE = {
		...selectedRecord,
		confirmPassword: '',
		status: 'active',
		oldEmail: selectedRecord.email,
		oldEmployeeAlias: selectedRecord.employeeAlias,
		oldStatus: selectedRecord.status,
	};

	const FORM_VALIDATION_ADD_NEW = Yup.object({
		firstName: Yup.string().max(15, 'Must be 15 characters or less').required('First Name is Required'),
		lastName: Yup.string().max(15, 'Must be 15 characters or less').required('Last Name is Required'),
		email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
		password: Yup.string().max(255).required('Password is required'),
		employeeCode: Yup.string().max(10).required('Emp Code is required'),
		employeeAlias: Yup.string().max(10).required('Emp Alias is required'),
		status: Yup.string().oneOf(['active', 'inactive', null]),
	});
	const FORM_VALIDATION_UPDATE = Yup.object({
		firstName: Yup.string().max(15, 'Must be 15 characters or less').required('First Name is Required'),
		lastName: Yup.string().max(15, 'Must be 15 characters or less').required('Last Name is Required'),
		email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
		password: Yup.string().max(255),
		employeeCode: Yup.string().max(10).required('Emp Code is required'),
		employeeAlias: Yup.string().max(10).required('Emp Alias is required'),
		confirmPassword: Yup.string()
			.max(255)
			.when(['password'], (password, schema) => {
				return password ? schema.required('Confirm Password is required').oneOf([Yup.ref('password'), null], 'Passwords must match') : schema;
			}),
		status: Yup.string().oneOf(['active', 'inactive', null]),
		oldEmail: Yup.string(),
		oldEmployeeAlias: Yup.string(),
		oldStatus: Yup.string(),
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
							<Button color='primary' onClick={() => setOpenAddNewModal(true)} variant='contained'>
								Add New Agent
							</Button>
						</Box>
					</Box>

					{/* Start : search bar Component */}
					<Box>
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
					</Box>

					{/* End : search bar Component */}

					<Box sx={{mt: 3}}>
						<TableContainer component={Paper}>
							<Table sx={{minWidth: 650}} aria-label='simple table'>
								<TableHead>
									<TableRow>
										{['EmpCode', 'Name', 'Email', 'Alias', 'Registration Date', 'Role', 'Actions'].map((th) => (
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
												<TableCell>{row.role}</TableCell>

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
						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
								margin: '20px auto',
								width: '100%',
							}}>
							<Pagination count={totalRecords != -1 && Math.ceil(totalRecords / size)} page={page} onChange={handlePageChange} />
						</div>
					</Box>
				</Container>
			</Box>

			{/*  update Agent Modal */}
			<Modal open={openUpdatePass} onClose={() => setOpenUpdatePass(false)} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
				<Box sx={style}>
					<Formik
						initialValues={{...INITIAL_FORM_STATE_UPDATE}}
						validationSchema={FORM_VALIDATION_UPDATE}
						onSubmit={(values) => {
							const {email, oldEmail, employeeAlias, oldEmployeeAlias, password, status, oldStatus, _id} = values;

							var updateValues = {agentId: _id};

							if (password !== undefined && password !== null) updateValues.password = password;
							if (email !== oldEmail) updateValues.email = email;
							if (employeeAlias !== oldEmployeeAlias) updateValues.employeeAlias = employeeAlias;
							if (status !== oldStatus) updateValues.status = status;

							console.log('update record', updateValues);

							axios
								.put(BASEURL + '/agent/reset', updateValues)
								.then((response) => {
									console.log(response);
									successToast('Details Updated successfully');
									setOpenUpdatePass(false);
								})
								.catch((e) => {
									// console.log(e);
									errorToast(e.response.data.message);
								});
						}}>
						{(props) => {
							const {errors, setFieldValue, touched, handleBlur, handleChange, values, submitCount, handleSubmit} = props;

							// console.log('props', props); // formik object --containg values, err, etc....
							//console.log('update err', errors);
							return (
								<Form onSubmit={handleSubmit}>
									<Card
										sx={{
											boxShadow: 'none',
										}}>
										<CardHeader
											title='Update Password '
											sx={{py: 0}}
											action={
												<IconButton
													onClick={() => setOpenUpdatePass(false)}
													sx={{
														position: `absolute`,
														right: `10px`,
														top: `10px`,
													}}>
													<CloseIcon />
												</IconButton>
											}
										/>
										<Divider />
										<CardContent>
											<Grid container spacing={3}>
												<Grid item md={6} xs={6}>
													<Textfield label='First name' name='firstName' disabled={isDisable} />
												</Grid>
												<Grid item md={6} xs={6}>
													<Textfield label='Last name' name='lastName' disabled={isDisable} />
												</Grid>

												<Grid item md={6} xs={6}>
													<Textfield label='Emp ID' name='employeeCode' disabled={isDisable} />
												</Grid>

												<Grid item md={6} xs={6}>
													<Textfield label='Emp Alias' name='employeeAlias' />
												</Grid>
												<Grid item md={6} xs={6}>
													<Textfield label='Email Address' name='email' />
												</Grid>
												<Grid item md={6} xs={6}>
													<Textfield label='Password' type='password' name='password' />
												</Grid>
												<Grid item md={6} xs={6}>
													<Textfield label='Confirm Password' type='password' name='confirmPassword' />
												</Grid>
												<Grid item xs={12} sm={6} md={6}>
													<FormControl fullWidth>
														<InputLabel id='status-label'>STATUS</InputLabel>
														<Select
															labelId='status-label'
															fullWidth
															defaultValue='active'
															name='status'
															label='STATUS'
															error={Boolean(touched.status && errors.status)}
															value={values.status}
															onChange={handleChange}>
															<MenuItem value='active'>ACTIVE</MenuItem>
															<MenuItem value='inactive'>IN-ACTIVE</MenuItem>
														</Select>
													</FormControl>
												</Grid>
											</Grid>
										</CardContent>
										<Divider />
										<CardActions sx={{display: 'flex', justifyContent: 'flex-end'}}>
											<Button
												color='primary'
												variant='contained'
												type='submit'
												disabled={values.employeeAlias == selectedRecord.employeeAlias && values.email == selectedRecord.email && values.status == selectedRecord.status}>
												Update
											</Button>
										</CardActions>
									</Card>
								</Form>
							);
						}}
					</Formik>
				</Box>
			</Modal>

			{/*  add new record Modal */}
			<Modal open={openAddNewModal} onClose={() => setOpenAddNewModal(false)} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
				<Box sx={style} style={{padding: '16px 8px'}}>
					<Formik
						initialValues={{...INITIAL_FORM_STATE_ADD_NEW}}
						validationSchema={FORM_VALIDATION_ADD_NEW}
						onSubmit={(values) => {
							axios
								.post(BASEURL + '/agent', values)
								.then((response) => {
									successToast('Agent added successfully');
									setAgentsList((prev) => [response.data.data, ...prev]);
									setOpenAddNewModal(false);
								})
								.catch((e) => {
									errorToast(e.response.data.message);
								});
						}}>
						{(props) => {
							const {errors, setFieldValue, touched, handleBlur, handleChange, values, submitCount, handleSubmit} = props;

							// console.log('props', props); // formik object --containg values, err, etc....
							console.log(errors);
							return (
								<Form onSubmit={handleSubmit}>
									<Card
										sx={{
											boxShadow: 'none',
										}}>
										<CardHeader
											title='Add New Agent '
											sx={{py: 0}}
											action={
												<IconButton
													onClick={() => setOpenAddNewModal(false)}
													sx={{
														position: `absolute`,
														right: `10px`,
														top: `10px`,
													}}>
													<CloseIcon />
												</IconButton>
											}
										/>
										<Divider />

										<CardContent>
											<Grid container spacing={3}>
												<Grid item md={6} xs={6}>
													<Textfield label='First name' name='firstName' />
												</Grid>
												<Grid item md={6} xs={6}>
													<Textfield label='Last name' name='lastName' />
												</Grid>
												<Grid item md={6} xs={6}>
													<Textfield label='Email Address' name='email' />
												</Grid>

												<Grid item md={6} xs={6}>
													<Textfield label='Emp ID' name='employeeCode' />
												</Grid>

												<Grid item md={6} xs={6}>
													<Textfield label='alias' name='employeeAlias' />
												</Grid>

												<Grid item md={6} xs={6}>
													<Textfield label='Password' name='password' type='password' />
												</Grid>
												<Grid item xs={12} sm={6} md={6}>
													<FormControl fullWidth>
														<InputLabel id='status-label'>STATUS</InputLabel>
														<Select
															labelId='status-label'
															fullWidth
															defaultValue='active'
															name='status'
															label='STATUS'
															error={Boolean(touched.status && errors.status)}
															value={values.status}
															onChange={handleChange}>
															<MenuItem value='active'>ACTIVE</MenuItem>
															<MenuItem value='inactive'>IN-ACTIVE</MenuItem>
														</Select>
													</FormControl>
												</Grid>
											</Grid>
										</CardContent>
										<Divider />
										<CardActions sx={{display: 'flex', justifyContent: 'flex-end'}}>
											<Button color='primary' variant='contained' type='submit'>
												Save details
											</Button>
										</CardActions>
									</Card>
								</Form>
							);
						}}
					</Formik>
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
	boxShadow: 24,
	borderRadius: '1rem',
	padding: '24px 8px',
};

export default AddUser;
