import React, {useState, useRef} from 'react';

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
	const [userInfo, setUserInfo] = useState({});
	const [cardInfo, setCardInfo] = useState({});

	// const myRef = useRef();
	const handleNext = () => {
		setActiveStep(activeStep + 1);
		console.log(userInfo);
	};

	const handleBack = () => {
		setActiveStep(activeStep - 1);
	};

	function getStepContent(step) {
		switch (step) {
			case 0:
				return <AddressForm handleSubmit={handleNext} setUserInfo={setUserInfo} />;
			case 1:
				return <PaymentForm setCardInfo={setCardInfo} />;
			case 2:
				return <Review />;
			default:
				throw new Error('Unknown step');
		}
	}

	return (
		<ThemeProvider theme={theme}>
			<Container component='main' maxWidth='md' sx={{mb: 4, p: 0}}>
				<Typography component='h1' variant='h4' align='center'>
					Add New Transaction Record
				</Typography>
				<Stepper activeStep={activeStep} sx={{pt: 3, pb: 3}}>
					{steps.map((label) => (
						<Step key={label}>
							<StepLabel>{label}</StepLabel>
						</Step>
					))}
				</Stepper>

				<Box>
					<Paper variant='outlined' sx={{my: {xs: 2, md: 0}, p: {xs: 2, md: 3}, height: `60vh`, overflow: `scroll`}}>
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

									{activeStep === steps.length - 1 ? (
										<Button variant='contained' type='submit' onClick={handleNext} sx={{mt: 3, ml: 1}}>
											Confirm
										</Button>
									) : null}
								</Box>
							</>
						)}
					</Paper>
				</Box>
			</Container>
		</ThemeProvider>
	);
}
