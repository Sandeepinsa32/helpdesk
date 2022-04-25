import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import {createTheme, ThemeProvider} from '@mui/material/styles';

// external files
import AddressForm from './components/Form/AddressForm';
import PaymentForm from './components/Form/PaymentForm';
import Review from './components/Form/Review';

const steps = ['Personal Detail ', 'Payment', 'Review'];

function getStepContent(step) {
	switch (step) {
		case 0:
			return <AddressForm />;
		case 1:
			return <PaymentForm />;
		case 2:
			return <Review />;
		default:
			throw new Error('Unknown step');
	}
}

const theme = createTheme();

export default function Checkout() {
	const [activeStep, setActiveStep] = React.useState(0);

	const handleNext = () => {
		setActiveStep(activeStep + 1);
	};

	const handleBack = () => {
		setActiveStep(activeStep - 1);
	};

	return (
		<ThemeProvider theme={theme}>
			{/* <CssBaseline /> */}

			<Container component='main' maxWidth='md' sx={{mb: 4}}>
				<Paper variant='outlined' sx={{my: {xs: 3, md: 6}, p: {xs: 2, md: 3}}}>
					<Typography component='h1' variant='h4' align='center'>
						Add details
					</Typography>
					<Stepper activeStep={activeStep} sx={{pt: 3, pb: 5}}>
						{steps.map((label) => (
							<Step key={label}>
								<StepLabel>{label}</StepLabel>
							</Step>
						))}
					</Stepper>

					<React.Fragment>
						{activeStep === steps.length ? (
							<>
								<Typography variant='h5' gutterBottom>
									{' '}
									Thank you for your Time .{' '}
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

									<Button variant='contained' onClick={handleNext} sx={{mt: 3, ml: 1}}>
										{activeStep === steps.length - 1 ? 'Confirm' : 'Next'}
									</Button>
								</Box>
							</>
						)}
					</React.Fragment>
				</Paper>
			</Container>
		</ThemeProvider>
	);
}
