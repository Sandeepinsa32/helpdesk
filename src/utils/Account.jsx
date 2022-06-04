import {Box, Container, Grid, Typography} from '@mui/material';

import {AgentProfileModal} from '../views/components/AgentProfileModal';

export const Account = () => (
	<>
		<Box
			component='main'
			sx={{
				flexGrow: 1,
				pb: 6,
				pt: 2,
			}}>
			<Container maxWidth='lg'>
				<Typography sx={{mb: 3}} variant='h4'>
					Account
				</Typography>
				<Grid container spacing={3}>
					<Grid item lg={8} md={6} xs={6}>
						<AgentProfileModal />
					</Grid>
				</Grid>
			</Container>
		</Box>
	</>
);
