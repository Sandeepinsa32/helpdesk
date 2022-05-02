import React, {useState} from 'react';
import {Avatar, Box, Card, CardContent, Grid, Typography, Button, Paper, Item, Container, CardMedia, CardActions, FormControl, Select, InputLabel, MenuItem} from '@mui/material';
import Email1 from './components/email1';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const Email = () => {
	const cards = [1, 2, 3, 4, 5, 6];
	const [selectedEmailTemplate, setSelectedEmailTemplate] = useState();

	const handleEmailTemplateChange = (e) => {
		setSelectedEmailTemplate(e.target.value);
		console.log(selectedEmailTemplate);
		alert(selectedEmailTemplate);
	};
	return (
		<>
			<Box sx={{height: '100vh', overflow: 'scroll'}}>
				<>
					<Card sx={{height: '100%'}}>
						<CardContent>
							<Box
								sx={{
									display: 'flex',
									flexWrap: 'nowrap',
									p: 1,
									m: 1,
									bgcolor: 'background.paper',
									width: 1,
									height: 1,
									borderRadius: 1,
								}}>
								<Box sx={{width: '50%'}}>
									<Grid container spacing={3} sx={{justifyContent: 'space-between'}}>
										<Grid item xs={12} sm={6}>
											<FormControl required fullWidth>
												<InputLabel id='Email-template-Dropdown-label'>Email Template</InputLabel>
												<Select
													labelId='Email-template-Dropdown-label	'
													id='Email-template-Dropdown'
													value={selectedEmailTemplate}
													onChange={handleEmailTemplateChange}
													fullWidth
													name='emailTemplate'
													label='Email Template'>
													<MenuItem value='1'>1</MenuItem>
													<MenuItem value='2'>2</MenuItem>
													<MenuItem value='3'>3</MenuItem>
													<MenuItem value='4'>4</MenuItem>
													<MenuItem value='5'>5</MenuItem>
												</Select>
											</FormControl>
										</Grid>
									</Grid>
								</Box>
								<Box sx={{width: '50%'}}>
									<Paper elevation={3} sx={{height: 1}}>
										<Email1 name='john' />
									</Paper>
								</Box>
							</Box>
						</CardContent>
					</Card>
				</>
			</Box>
		</>
	);
};

export default Email;
