import {useState} from 'react';
import {Box, Button, Card, CardContent, CardHeader, Divider, Grid, TextField, Avatar, CardActions, Typography} from '@mui/material';

export const AgentProfileModal = () => {
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
		console.log(password, e.target.value);
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
				<CardHeader subheader='The information cannot be edited' title='Profile' sx={{py: 0}} />
				<Divider />
				<CardContent>
					<Box
						sx={{
							alignItems: 'center',
							display: 'flex',
							flexDirection: 'column',
						}}>
						<Avatar
							src={'/static/images/avatars/avatar_6.png'}
							sx={{
								height: 64,
								mb: 2,
								width: 64,
							}}
						/>
						<Typography color='textPrimary' variant='h5'>
							{`${values.firstName} ${values.lastName}`}
						</Typography>
						<Typography color='textSecondary' variant='body2'>
							{` ${values.email}`}
						</Typography>
						<Typography color='textSecondary' variant='body2'>
							{`Emp Code :  ${values.employeeCode}`}
						</Typography>
						<Typography color='textSecondary' variant='body2'>
							{`Emp alias :  ${values.employeeAlias}`}
						</Typography>
					</Box>
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
