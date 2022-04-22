import React, {useState} from 'react';

// components
import {ListResult} from './components/member/list-result';
import {ListToolbar} from './components/member/list-toolbar';

//@material-ui
import {Box, Container, Button, Card, CardContent, TextField, Modal, InputAdornment, SvgIcon, Typography, CardHeader, Divider, Grid, IconButton} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

export const Member = () => {
	const [values, setValues] = useState({
		firstName: 'John',
		lastName: 'Doe',
		email: 'John@helpdesk.com',
		phone: '0123456789',
		role: 'manager',
		country: 'USA',
	});

	const handleChange = (event) => {
		setValues({
			...values,
			[event.target.name]: event.target.value,
		});
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
							<Button startIcon={<VisibilityIcon fontSize='small' />} sx={{mr: 1}}>
								View
							</Button>
							<Button startIcon={<UpgradeIcon fontSize='small' />} sx={{mr: 1}}>
								Update
							</Button>
							<Button startIcon={<DeleteOutlineIcon fontSize='small' />} sx={{mr: 1}}>
								Delete
							</Button>
							<Button startIcon={<FilterAltIcon fontSize='small' />} sx={{mr: 1}}>
								Filter
							</Button>

							<Button color='primary' onClick={handleOpen} variant='contained'>
								Add New Agent
							</Button>
						</Box>
					</Box>

					{/*  External Component */}
					{/* <ListToolbar title='Sales Agent' btn='show' btnTitle='add new customer' /> */}
					<Box sx={{mt: 3}}>
						<ListResult rowFields={Row} ResultData={ResultData} />
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
							<CardHeader subheader='you can only add Sales-agent' title='Add New Agent ' style={{textTransform: 'uppercase'}} />
							{/* <Divider /> */}
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
									{/* phone no */}

									{/* <Grid item md={6} xs={12}>
										<TextField fullWidth label='Phone Number' name='phone' onChange={handleChange} type='number' value={values.phone} variant='outlined' />
									</Grid> */}

									<Grid item md={6} xs={12}>
										<TextField fullWidth label='Emp ID' name='empId' onChange={handleChange} type='string' variant='outlined' />
									</Grid>

									<Grid item md={6} xs={12}>
										<TextField fullWidth label='alias' name='alias' required variant='outlined' />
									</Grid>

									<Grid item md={6} xs={12}>
										<TextField fullWidth label='Password' name='Password' required variant='outlined' />
									</Grid>

									{/* <Grid item md={6} xs={12}>
										<TextField fullWidth label='Country' name='country' onChange={handleChange} required value={values.country} variant='outlined' />
									</Grid> */}

									{/* <Grid item md={6} xs={12}>
										<TextField
											fullWidth
											label='Select Role'
											name='role'
											onChange={handleChange}
											required
											select
											SelectProps={{native: true}}
											value={values.state}
											variant='outlined'>
											{role.map((option) => (
												<option key={option.value} value={option.value}>
													{option.label}
												</option>
											))}
										</TextField>
									</Grid> */}
									<Grid item md={6} xs={12}>
										<Button color='primary' variant='contained' sx={{right: '2rem', position: 'absolute'}}>
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
	[20651, ' Doe', 'JohnDoe@dev.co', 'JODO', 1555016400000],
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
export default Member;
