import React, {useState} from 'react';
import {Result} from './components/transaction/transResult';
import {Search} from './components/transaction/transSearch';
import Checkout from './components/Checkout';

import {useFormik} from 'formik';

import * as Yup from 'yup';
//@material-ui
// mui ICon
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {Paper, Stepper, Step, StepLabel, Link} from '@mui/material';

import {Box, Button, Card, Container, CardContent, TextField, Modal, InputAdornment, SvgIcon, Typography, CardHeader, Divider, Grid, IconButton} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

export const Transaction = () => {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	function currentDate() {
		let today = new Date();
		let dd = String(today.getDate()).padStart(2, '0');
		let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
		let yyyy = today.getFullYear();

		today = mm + '/' + dd + '/' + yyyy;
		return today;
	}
	// ==================================================================================

	const phoneRegExp = `^[1-9]+$`;

	const formik = useFormik({
		initialValues: {
			passengerCount: '2',
			pnr: 'xssc',
			mco: '5',
			airlineCode: 'ss55',
			productType: '',
			bookingType: '',
			totalCharge: '55',
			pricePerPax: '5',
			phone: '5655656565',
			email: 'dsnsnn@gmgmg.cmo',
			cardHolderName: 'xax',
			expiry: '',
			ccv: '',
			comments: '',
			notes: '',
		},
		validationSchema: Yup.object({
			firstname: Yup.string().max(255).required('First name is required'),
			lastname: Yup.string().max(255).required('Last name is required'),
			passengerCount: Yup.string().matches(phoneRegExp, 'Must be a valid passengerCount').required('passengerCount is nrequired'),
			password: Yup.string().max(255).required('Password is required'),
			pnr: Yup.string().max(255).required('pnr is required'),
			mco: Yup.number().required().positive().integer().required('mco is required'),
			airlineCode: Yup.string().max(255).required('airlineCode is required'),
			productType: '',
			bookingType: '',
			totalCharge: Yup.number().required().positive().integer().required('totalCharge is required'),
			pricePerPax: Yup.number().required().positive().integer().required('pricePerPax is required'),
			phone: Yup.number().required().positive().integer().required('phone is required'),
			email: Yup.string().email('Invalid email address').required('Required'),
			cardHolderName: Yup.string().max(255).required('card Holder name is required'),
			expiry: '',
			ccv: '',
			comments: '',
			notes: '',
		}),
		onSubmit: (values) => {
			console.log(values);
		},
	});

	const [inputList, setInputList] = useState([{cardName: '', cardNumber: '', expiryDate: '', cvv: ''}]);

	// handle input change
	const handleInputChange = (e, index) => {
		const {name, value} = e.target;
		const list = [...inputList];
		list[index][name] = value;
		setInputList(list);
	};

	// handle click event of the Remove button
	const handleRemoveClick = (index) => {
		const list = [...inputList];
		list.splice(index, 1);
		setInputList(list);
	};

	// handle click event of the Add button
	const handleAddClick = () => {
		setInputList([...inputList, {cardName: '', cardNumber: '', expiryDate: '', cvv: ''}]);
	};

	// stepper code
	const [activeStep, setActiveStep] = useState(0);
	const steps = ['Personal Detail ', 'Payment', 'Review'];

	const handleNext = () => {
		setActiveStep(activeStep + 1);
	};

	const handleBack = () => {
		setActiveStep(activeStep - 1);
	};

	// ==================================================================================

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
							{currentDate()}
						</Typography>
						<Box sx={{m: 1}}>
							<Button startIcon={<FilterAltIcon fontSize='small' />} sx={{mr: 1}}>
								Filter
							</Button>
							<Button color='primary' onClick={handleOpen} variant='contained'>
								Add New Record
							</Button>
						</Box>
					</Box>

					{/*  Search  Component */}
					<Search />

					<Box sx={{mt: 3}}>
						<Result rowFields={Row} ResultData={ResultData} />
					</Box>
				</Container>
			</Box>

			{/* Add new Record MOdal*/}
			<Modal open={open} onClose={handleClose} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
				<Box sx={style}>
					<IconButton onClick={handleClose} sx={{position: `absolute`, right: `10px`, top: `10px`}}>
						<CloseIcon />
					</IconButton>

					{/*  stepper design */}

					<Typography component='h1' variant='h4' align='center'>
						Add New Transaction Record
					</Typography>
					<Stepper activeStep={activeStep} sx={{pt: 3, pb: 5}}>
						{steps.map((label) => (
							<Step key={label}>
								<StepLabel>{label}</StepLabel>
							</Step>
						))}
					</Stepper>

					<>
						{activeStep === steps.length ? (
							<>
								<Typography variant='h5' gutterBottom>
									Thank you for your Time .
								</Typography>
								<Typography variant='subtitle1'>Your Record number is John-001000.</Typography>
							</>
						) : (
							<>
								<Box sx={{}}>{getStepContent(activeStep)}</Box>

								<Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
									{activeStep !== 0 && (
										<Button onClick={handleBack} sx={{mt: 3, ml: 1}}>
											Back
										</Button>
									)}

									<Button variant='contained' type='submit' onClick={handleNext} sx={{mt: 3, ml: 1}}>
										{activeStep === steps.length - 1 ? 'Confirm' : 'Next'}
									</Button>
								</Box>
							</>
						)}
					</>
					{/* Address Form  */}
					<form onSubmit={formik.handleSubmit}>
						<Grid container spacing={3}>
							<Grid item xs={12} sm={6}>
								<TextField
									fullWidth
									label='First Name'
									name='firstname'
									error={Boolean(formik.touched.firstname && formik.errors.firstname)}
									helperText={formik.touched.firstname && formik.errors.firstname}
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									value={formik.values.firstName}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									id='lastname'
									name='lastname'
									label='Last Name'
									fullWidth
									error={Boolean(formik.touched.lastname && formik.errors.lastname)}
									helperText={formik.touched.lastname && formik.errors.lastname}
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									value={formik.values.lastname}
								/>
							</Grid>
							<Grid item xs={12} sm={4}>
								<TextField
									error={Boolean(formik.touched.passengerCount && formik.errors.passengerCount)}
									fullWidth
									helperText={formik.touched.passengerCount && formik.errors.passengerCount}
									label='Number of Passenger *'
									name='passengerCount'
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									type='number'
									value={formik.values.passengerCount}
								/>
							</Grid>

							<Grid item xs={12} sm={4}>
								<TextField
									nrequired
									id='phone'
									name='phone'
									label='phone'
									fullWidth
									error={Boolean(formik.touched.phone && formik.errors.phone)}
									helperText={formik.touched.phone && formik.errors.phone}
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									value={formik.values.phone}
								/>
							</Grid>
							<Grid item xs={12} sm={4}>
								<TextField
									nrequired
									id='email'
									name='email'
									label='email'
									fullWidth
									error={Boolean(formik.touched.email && formik.errors.email)}
									helperText={formik.touched.email && formik.errors.email}
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									value={formik.values.email}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									nrequired
									id='pnr'
									name='pnr'
									label='PNR No.'
									fullWidth
									error={Boolean(formik.touched.pnr && formik.errors.pnr)}
									helperText={formik.touched.pnr && formik.errors.pnr}
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									value={formik.values.pnr}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									nrequired
									id='mco'
									name='mco'
									label='MCO No.'
									fullWidth
									error={Boolean(formik.touched.mco && formik.errors.mco)}
									helperText={formik.touched.mco && formik.errors.mco}
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									value={formik.values.mco}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									id='airlineCode'
									name='airlineCode'
									label='Airline Code *'
									fullWidth
									error={Boolean(formik.touched.airlineCode && formik.errors.airlineCode)}
									helperText={formik.touched.airlineCode && formik.errors.airlineCode}
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									value={formik.values.airlineCode}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									nrequired
									id='bookingType'
									name='bookingType'
									label='Booking Type'
									fullWidth
									error={Boolean(formik.touched.bookingType && formik.errors.bookingType)}
									helperText={formik.touched.bookingType && formik.errors.bookingType}
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									value={formik.values.bookingType}
								/>
							</Grid>

							<Grid item xs={12} sm={6}>
								<TextField
									nrequired
									id='pricePerPerson'
									name='pricePerPerson'
									label='Price Per Person'
									fullWidth
									error={Boolean(formik.touched.pricePerPerson && formik.errors.pricePerPerson)}
									helperText={formik.touched.pricePerPerson && formik.errors.pricePerPerson}
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									value={formik.values.pricePerPerson}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									id='totalCharge'
									name='totalCharge'
									label='Grand Total'
									fullWidth
									error={Boolean(formik.touched.totalCharge && formik.errors.totalCharge)}
									helperText={formik.touched.totalCharge && formik.errors.totalCharge}
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									value={formik.values.totalCharge}
								/>
							</Grid>

							<Grid item xs={12} sm={12}>
								<Button variant='contained' type='submit' sx={{mt: 3, ml: 1}}>
									Next
								</Button>
							</Grid>
							{inputList.map((x, i) => {
								return (
									<>
										<Grid item xs={12} md={6}>
											<TextField required name='cardName' label='Name on card' fullWidth autoComplete='cc-name' variant='standard' onChange={(e) => handleInputChange(e, i)} />
										</Grid>
										<Grid item xs={12} md={6}>
											<TextField required name='cardNumber' label='Card number' fullWidth autoComplete='cc-number' variant='standard' onChange={(e) => handleInputChange(e, i)} />
										</Grid>
										<Grid item xs={12} md={6}>
											<TextField required name='expiryDate' label='Expiry date' fullWidth autoComplete='cc-exp' variant='standard' onChange={(e) => handleInputChange(e, i)} />
										</Grid>
										<Grid item xs={12} md={6}>
											<TextField
												required
												name='cvv'
												label='CVV'
												helperText='Last three digits on signature strip'
												fullWidth
												autoComplete='cc-csc'
												variant='standard'
												onChange={(e) => handleInputChange(e, i)}
											/>
										</Grid>

										{inputList.length !== 1 && (
											<>
												<Grid item xs={12} md={10}></Grid>

												<Grid item xs={12} md={2}>
													<Button startIcon={<RemoveIcon fontSize='small' />} onClick={() => handleRemoveClick(i)} sx={{mr: 1}}>
														Remove
													</Button>
												</Grid>
											</>
										)}
										{inputList.length - 1 === i && (
											<>
												<Grid item xs={12} md={8}></Grid>
												<Grid item xs={12} md={4}>
													<Button startIcon={<AddIcon fontSize='small' />} onClick={handleAddClick} sx={{mr: 1}}>
														Add One More Card
													</Button>
												</Grid>
											</>
										)}
									</>
								);
							})}
							<div style={{marginTop: 20}}>{JSON.stringify(inputList)}</div>
						</Grid>
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
	minWidth: '40vw',
	minHeight: '50vh',
	bgcolor: 'background.paper',
	// border: '2px solid #000',
	boxShadow: 24,
	borderRadius: '1rem',
	p: 4,
};

const Row = [
	'Email',
	// 'Date',
	'Agent Name',
	'Booking ID',
	'CCH Name',
	'Phone',
	'Total G.P',
	'Airline	No.of PAX',
	'Fare Type',
	'Dep Date',
	'Return Date',
];

const ResultData = [
	// [20655, 'john Doe', 'JohnDoe@dev.co', 'JODO', 1555016400000],
	[
		'JaneDoe@Customer.co',
		// '22/04/2022',
		'john Doe',
		1555016400000,
		'jane Doe',
		1555016400000,
		550,
		9,
		'private',
		'22/04/2022',
		'22/04/2022',
	],
];
