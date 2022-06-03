import {useEffect, useState} from 'react';
import {Box, Button, Card, CardContent, CardHeader, IconButton, CircularProgress, Divider, Grid, TextField, Avatar, CardActions, Typography} from '@mui/material';
import axios from 'axios';
import {BASEURL, errorToast, successToast} from '../../utils/Utils';

import CloseIcon from '@mui/icons-material/Close';

export const AgentProfileModal = ({onClose}) => {
	const [profileDetails, setProfileDetails] = useState({});

	const [isLoading, setIsLoading] = useState(false);

	const [passwordInfo, setPasswordInfo] = useState({
		oldPassword: '',
		newPassword: '',
		confirmPassword: '',
	});
	const handleChange = (event) => {
		setPasswordInfo({
			...passwordInfo,
			[event.target.name]: event.target.value,
		});
	};

	const loadProfile = async () => {
		setIsLoading(true);
		axios
			.get(BASEURL + `/agent/profile`)
			.then((response) => {
				setProfileDetails(response.data.data);
				setTimeout(() => {
					setIsLoading(false);
				}, 500);
			})
			.catch((e) => {
				console.log(e);
				setIsLoading(false);
				errorToast(e.response.data.message);
			});
	};

	const handleChangePassword = async () => {
		setIsLoading(true);
		axios
			.put(BASEURL + `/agent/update`, {
				newPassword: passwordInfo.newPassword,
				oldPassword: passwordInfo.oldPassword,
			})
			.then((response) => {
				// console.log(response);
				// console.log(response.data);
				setIsLoading(false);
				successToast('Password Updated Successfully');
			})
			.catch((e) => {
				console.log(e);
				setIsLoading(false);
				errorToast(e.response.data.message);
			});
	};

	useEffect(() => {
		loadProfile();
	}, []);

	return (
		<form autoComplete='off' noValidate>
			<Card
				sx={{
					boxShadow: 'none',
				}}>
				<CardHeader
					title='User Profile'
					sx={{py: 0}}
					action={
						<IconButton onClick={onClose} sx={{position: `absolute`, right: `10px`, top: `10px`}}>
							<CloseIcon />
						</IconButton>
					}
				/>
				<Divider />
				<CardContent>
					{isLoading ? (
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
							<Box>
								<div
									style={{
										display: 'flex',
										justifyContent: 'center',
									}}>
									<CircularProgress />
								</div>
							</Box>
						</Box>
					) : (
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
								{`${profileDetails?.firstName} ${profileDetails?.lastName}`}
							</Typography>
							<Typography color='textSecondary' variant='body2'>
								{` ${profileDetails?.email}`}
							</Typography>
							<Typography color='textSecondary' variant='body2'>
								{`Emp Code :  ${profileDetails?.employeeCode}`}
							</Typography>
							<Typography color='textSecondary' variant='body2'>
								{`Emp alias :  ${profileDetails?.employeeAlias}`}
							</Typography>
						</Box>
					)}
				</CardContent>
				<Divider />

				<CardContent>
					<Grid container spacing={3}>
						<Grid item md={4} xs={6}>
							<TextField fullWidth label='Old Password' name='oldPassword' type='password' required variant='outlined' onChange={handleChange} value={passwordInfo.oldPassword} />
						</Grid>
						<Grid item md={4} xs={6}>
							<TextField fullWidth label='New Password' name='newPassword' type='password' required variant='outlined' onChange={handleChange} value={passwordInfo.newPassword} />
						</Grid>
						<Grid item md={4} xs={6}>
							<TextField
								fullWidth
								label='Confirm Password'
								name='confirmPassword'
								type='password'
								required
								variant='outlined'
								onChange={handleChange}
								value={passwordInfo.confirmPassword}
							/>
						</Grid>
					</Grid>
				</CardContent>
				<Divider />
				<CardActions
					sx={{
						display: 'flex',
						justifyContent: 'flex-end',
					}}>
					<Button
						color='primary'
						variant='contained'
						onClick={handleChangePassword}
						disabled={!passwordInfo.newPassword || !passwordInfo.oldPassword || !passwordInfo.confirmPassword || passwordInfo.newPassword !== passwordInfo.confirmPassword}>
						Update Password
					</Button>
				</CardActions>
			</Card>
		</form>
	);
};
