import {useState} from 'react';
import {Box, Button, Card, CardContent, CardHeader, Divider, Grid, TextField} from '@mui/material';

const states = [
	{
		value: 'PB',
		label: 'Punjab',
	},
	{
		value: 'new-york',
		label: 'New York',
	},
	{
		value: 'san-francisco',
		label: 'San Francisco',
	},
];

export const Detail = () => {
	const [values, setValues] = useState({
		firstName: 'John',
		lastName: 'Deo',
		email: 'John@deo.test',
		employeeCode: 'AGN-88',
		employeeAlias: 'JohnDoe',
	});
	const [password, setPassword] = useState({
		oldPassword: '',
		newPassword: '',
		confirmPassword: '',
	});
	const [updatePass, setUpdatePass] = useState(false);

	const handleChange = (event) => {
		setValues({
			...values,
			[event.target.name]: event.target.value,
		});
	};
	const matchPassword = (e) => {
		if (password.newPassword == e.target.value) {
			setUpdatePass(true);
			console.log('done');
		}
	};

	return (
		<form autoComplete='off' noValidate>
			<Card
				sx={{
					boxShadow: 'none',
				}}>
				<CardHeader subheader='The information cannot be edited' title='Profile' />
				<Divider />
				<CardContent>
					<Grid container spacing={3}>
						<Grid item md={4} xs={12}>
							<TextField
								fullWidth
								disabled={true}
								helperText='Please specify the first name'
								label='First name'
								name='firstName'
								onChange={handleChange}
								required
								value={values.firstName}
								variant='outlined'
							/>
						</Grid>
						<Grid item md={4} xs={12}>
							<TextField fullWidth disabled={true} label='Last name' name='lastName' onChange={handleChange} required value={values.lastName} variant='outlined' />
						</Grid>
						<Grid item md={4} xs={12}>
							<TextField fullWidth disabled={true} label='Email Address' name='email' onChange={handleChange} required value={values.email} variant='outlined' />
						</Grid>

						<Grid item md={4} xs={12}>
							<TextField fullWidth disabled={true} label='Emp ID' name='employeeCode' onChange={handleChange} value={values.employeeCode} type='string' variant='outlined' />
						</Grid>

						<Grid item md={4} xs={12}>
							<TextField fullWidth disabled={true} label='alias' name='employeeAlias' required variant='outlined' onChange={handleChange} value={values.employeeAlias} />
						</Grid>
					</Grid>
				</CardContent>
				<Divider />

				<CardContent>
					<Grid container spacing={3}>
						<Grid item md={4} xs={12}>
							<TextField fullWidth label='Old Password' name='oldPassword' type='password' required variant='outlined' onChange={handleChange} value={values.password} />
						</Grid>
						<Grid item md={4} xs={12}>
							<TextField fullWidth label='New Password' name='newPassword' type='password' required variant='outlined' onChange={handleChange} value={values.password} />
						</Grid>
						<Grid item md={4} xs={12}>
							<TextField
								fullWidth
								label='Confirm Password'
								name='confirmPassword'
								type='password'
								required
								variant='outlined'
								onChange={(e) => {
									matchPassword(e);
								}}
								value={values.password}
							/>
						</Grid>
					</Grid>
				</CardContent>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'flex-end',
						p: 2,
					}}>
					<Button color='primary' variant='contained' disabled={updatePass ? false : true}>
						Update Password
					</Button>
				</Box>
			</Card>
		</form>
	);
};
