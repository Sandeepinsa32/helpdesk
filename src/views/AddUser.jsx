import React, {useState} from 'react';

// components
import {Result} from './components/addUser/userResult';
import {Search} from './components/addUser/userSearch';

//@material-ui
import {Box, Container, Button, Card, CardContent, TextField, Modal, InputAdornment, SvgIcon, Typography, CardHeader, Divider, Grid, IconButton} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

export const AddUser = () => {
	const [values, setValues] = useState({
		firstName: 'John',
		lastName: 'Doe',
		email: 'John@helpdesk.com',
		password: 'pass@123',
		employeeCode: '20080',
		employeeAlias: 'johnDoe',
	});

	const handleChange = (event) => {
		setValues({
			...values,
			[event.target.name]: event.target.value,
		});
	};

	const SaveDetail = () => {
		alert(JSON.stringify(values));
		console.log(values);
	};

	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

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

					{/*  search bar Component */}
					<Search />

					<Box sx={{mt: 3}}>
						<Result rowFields={Row} ResultData={ResultData} />
					</Box>
				</Container>
			</Box>
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
							<CardHeader
								// subheader='you can only add Sales-agent'
								title='Add New Agent '
								sx={{textTransform: 'uppercase'}}
							/>

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
	height: 'auto',
	bgcolor: 'background.paper',
	// border: '2px solid #000',
	boxShadow: 24,
	borderRadius: '1rem',
	p: 4,
};
const Row = ['EmpCode', 'Name', 'Email', 'Alias', 'Registration date'];
const ResultData = [
	[20655, 'john Doe', 'JohnDoe@dev.co', 'JODO', 1555016400000],
	[20654, 'jane Doe', 'JohnDoe@dev.co', 'JODO', 1555016400000],
	[20653, 'Wazir ', 'JohnDoe@dev.co', 'JODO', 1555016400000],
	[20652, 'joe', 'JohnDoe@dev.co', 'JODO', 1555016400000],
	[20651, ' Doe', 'Jo', 'JO', 1555],
	[20650, 'sam Doe', 'JohnDoe@dev.co', 'JODO', 1555016400000],
	[20649, 'San Doe', 'JohnDoe@dev.co', 'JODO', 1555016400000],
	[20648, 'DDee Doe', 'JohnDoe@dev.co', 'JODO', 1555016400000],

	[20655, 'john Doe', 'JohnDoe@dev.co', 'JODO', 1555016400000],
	[20654, 'jane Doe', 'JohnDoe@dev.co', 'JODO', 1555016400000],
	[20653, 'Wazir ', 'JohnDoe@dev.co', 'JODO', 1555016400000],
	[20652, 'joe', 'JohnDoe@dev.co', 'JODO', 1555016400000],
	[20651, ' Doe', 'JohnDoe@dev.co', 'JODO', 1555016400000],
	[20650, 'sam Doe', 'JohnDoe@dev.co', 'JODO', 1555016400000],
	[20649, 'San Doe', 'JohnDoe@dev.co', 'JODO', 1555016400000],
	[20648, 'DDee Doe', 'JohnDoe@dev.co', 'JODO', 1555016400000],
	// {
	// 	id: 20655,
	// 	name: 'john Doe',
	// 	email: 'JohnDoe@dev.co',
	// 	alias: 'JODO',
	// 	createdAt: 1555016400000,
	// },
];
export default AddUser;
