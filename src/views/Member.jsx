import React from 'react';
import {Box, Container} from '@mui/material';
import {ListResult} from './components/member/list-result';
import {ListToolbar} from './components/member/list-toolbar';

export const Member = () => (
	<>
		<Box
			component='main'
			sx={{
				flexGrow: 1,
				pb: 4,
				pt: 2,
			}}>
			<Container maxWidth={false}>
				<ListToolbar />
				<Box sx={{mt: 3}}>
					<ListResult />
				</Box>
			</Container>
		</Box>
	</>
);

export default Member;
