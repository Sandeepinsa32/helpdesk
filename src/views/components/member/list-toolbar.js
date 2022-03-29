import {React, useState} from 'react';
import {Box, Button, Card, CardContent, TextField, Modal, InputAdornment, SvgIcon, Typography, CardHeader, Divider, Grid, IconButton} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

//  local icon
import {Search as SearchIcon} from '../../../assets/icons/search';
import {Upload as UploadIcon} from '../../../assets/icons/upload';
import {Download as DownloadIcon} from '../../../assets/icons/download';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '64vw',
	height: '78vh',
	bgcolor: 'background.paper',
	// border: '2px solid #000',
	boxShadow: 24,
	borderRadius: '1rem',
	p: 4,
};
export const ListToolbar = (props) => {
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
		<Box>
			<Box
				sx={{
					alignItems: 'center',
					display: 'flex',
					justifyContent: 'space-between',
					flexWrap: 'wrap',
					m: -1,
				}}>
				<Typography sx={{m: 1}} variant='h4'>
					{props.title}
				</Typography>
				<Box sx={{m: 1}}>
					{/* <Button startIcon={<UploadIcon fontSize='small' />} sx={{mr: 1}}>
									Import
								</Button>
								<Button startIcon={<DownloadIcon fontSize='small' />} sx={{mr: 1}}>
									Export
								</Button> 
					*/}
					{props.btn == 'show' ? (
						<Button color='primary' onClick={handleOpen} variant='contained'>
							Add Customers
						</Button>
					) : null}
				</Box>
			</Box>
			<Box sx={{mt: 3}}>
				<Card>
					<CardContent>
						<Box sx={{maxWidth: 500}}>
							<TextField
								fullWidth
								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>
											<SvgIcon color='action' fontSize='small'>
												<SearchIcon />
											</SvgIcon>
										</InputAdornment>
									),
								}}
								placeholder='Search customer'
								variant='outlined'
							/>
						</Box>
					</CardContent>
				</Card>
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
							<CardHeader subheader='you can only Set  Manager/Sales-agent  Role for new member ' title='Add New Member' />
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
									<Grid item md={6} xs={12}>
										<TextField fullWidth label='Phone Number' name='phone' onChange={handleChange} type='number' value={values.phone} variant='outlined' />
									</Grid>
									<Grid item md={6} xs={12}>
										<TextField fullWidth label='Country' name='country' onChange={handleChange} required value={values.country} variant='outlined' />
									</Grid>
									<Grid item md={6} xs={12}>
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
									</Grid>
								</Grid>
							</CardContent>
							{/* <Divider /> */}
							<Box
								sx={{
									display: 'flex',
									justifyContent: 'flex-end',
									p: 2,
								}}></Box>
						</Card>
						<Button color='primary' variant='contained' sx={{right: '2rem', position: 'absolute'}}>
							Save details
						</Button>
					</form>
				</Box>
			</Modal>
		</Box>
	);
};

const role = [
	{
		value: 'manager',
		label: 'Manager',
	},
	{
		value: 'saleagent',
		label: 'Sales Agent',
	},
];
