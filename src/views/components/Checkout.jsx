import React, {useState, useRef} from 'react';

//@ material-UI
import {Box, Container, Paper, Stepper, Step, StepLabel, Button, Link, Typography} from '@mui/material';
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

	const myRef = useRef();
	const handleNext = () => {
		setActiveStep(activeStep + 1);
	};

	const handleBack = () => {
		setActiveStep(activeStep - 1);
	};

	function getStepContent(step) {
		switch (step) {
			case 0:
				return <AddressForm ref={myRef} next={() => handleNext()} />;
			case 1:
				return <PaymentForm />;
			case 2:
				return <Review />;
			default:
				throw new Error('Unknown step');
		}
	}
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
				</Paper>
			</Container>
		</ThemeProvider>
	);
}
