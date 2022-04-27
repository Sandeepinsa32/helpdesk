import React, {useState, useRef} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';

//@ material-UI
import {Box, Container, Paper, Stepper, Step, StepLabel, Button, Typography} from '@mui/material';
import {createTheme, ThemeProvider} from '@mui/material/styles';

// external components
import AddressForm from './Form/AddressForm';
import PaymentForm from './Form/PaymentForm';
import Review from './Form/Review';

// ===============================//================================//=======================//======================//==========================

const steps = ['Personal Detail ', 'Payment', 'Review'];

const theme = createTheme();

export default function Checkout() {
	const [activeStep, setActiveStep] = useState(0);

	// const myRef = useRef();
	const handleNext = () => {
		formik.handleSubmit();
		setActiveStep(activeStep + 1);
	};

	const handleBack = () => {
		setActiveStep(activeStep - 1);
	};

	function getStepContent(step) {
		switch (step) {
			case 0:
				return <AddressForm formik={formik} />;
			case 1:
				return <PaymentForm formik={formik} inputList={inputList} handleInputChange={handleInputChange} handleRemoveClick={handleRemoveClick} handleAddClick={handleAddClick} />;
			case 2:
				return <Review formik={formik} />;
			default:
				throw new Error('Unknown step');
		}
	}

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

			cardName: 'Test user',
			cardNumber: '555222000222555',
			expiryDate: '02/2022',
			cvv: '0348',
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
			cardName: Yup.string().max(255).required('CardHolder name is required'),
			cardNumber: Yup.number(18).required().positive().integer().required('Card Number is required'),
			expiryDate: '',
			cvv: Yup.number(4).required().positive().integer().required('pricePerPax is required'),
			comments: '',
			notes: '',
		}),
		onSubmit: (values) => {
			alert('done');
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
	return (
		<ThemeProvider theme={theme}>
			<Container component='main' maxWidth='md' sx={{mb: 4}}>
				<Paper variant='outlined' sx={{my: {xs: 3, md: 6}, p: {xs: 2, md: 3}}}>
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
						<form onSubmit={formik.handleSubmit}>
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
						</form>
					</>
				</Paper>
			</Container>
		</ThemeProvider>
	);
}
