import React from 'react';
import {Avatar, Box, Card, CardContent, Grid, Typography, Button, Container, CardMedia, CardActions} from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import MoneyIcon from '@mui/icons-material/Money';

const Email = () => {
	const cards = [1, 2, 3, 4, 5, 6];
	return (
		<>
			<Box sx={{height: '100vh', overflow: 'scroll'}}>
				<>
					{/* <Card sx={{height: '100%'}}>
				<CardContent>
					<Grid container spacing={3} sx={{justifyContent: 'space-between'}}>
						<Grid item>
							<Typography color='textSecondary' gutterBottom variant='overline'>
								BUDGET
							</Typography>
							<Typography color='textPrimary' variant='h4'>
								$24k
							</Typography>
						</Grid>
						<Grid item>
							<Avatar
								sx={{
									backgroundColor: 'error.main',
									height: 56,
									width: 56,
								}}>
								<MoneyIcon />
							</Avatar>
						</Grid>
					</Grid>
					<Box
						sx={{
							pt: 2,
							display: 'flex',
							alignItems: 'center',
						}}>
						<ArrowDownwardIcon color='error' />
						<Typography
							color='error'
							sx={{
								mr: 1,
							}}
							variant='body2'>
							12%
						</Typography>
						<Typography color='textSecondary' variant='caption'>
							Since last month
						</Typography>
					</Box>
				</CardContent>
			</Card> */}
				</>

				<Container maxWidth='false'>
					{/* End hero unit */}
					<Grid container fullWidth spacing={1}>
						{cards.map((card) => (
							<Grid item key={card} xs={12} sm={6} md={2}>
								<Card sx={{height: '100%', display: 'flex', flexDirection: 'column'}}>
									<CardMedia
										component='img'
										sx={
											{
												// 16:9
												// pt: '56.25%',
											}
										}
										image='https://source.unsplash.com/random'
										alt='random'
									/>
									<CardContent sx={{flexGrow: 1}}>
										<Typography gutterBottom variant='h5' component='h2'>
											Heading
										</Typography>
										<Typography>This is a media card. You can use this section to describe the content.</Typography>
									</CardContent>
									<CardActions>
										<Button size='small'>View</Button>
										<Button size='small'>Edit</Button>
									</CardActions>
								</Card>
							</Grid>
						))}
					</Grid>
				</Container>
			</Box>
		</>
	);
};

export default Email;
