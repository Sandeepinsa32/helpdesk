import React from 'react';
import {Box, Container} from '@mui/material';
import {ListResult} from './components/member/list-result';
import {ListToolbar} from './components/member/list-toolbar';

export default function SearchRecord() {
	return (
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
						<ListResult rowFields={Row} ResultData={ResultData} />
					</Box>
				</Container>
			</Box>
		</>
	);
}

const Row = ['Email', 'Date', 'Agent Name', 'Booking ID', 'CCH Name', 'Phone', 'Total G.P', 'Airline	No.of PAX', 'Fare Type', 'Dep Date', 'Return Date'];

const ResultData = [
	// [20655, 'john Doe', 'JohnDoe@dev.co', 'JODO', 1555016400000],
	['JaneDoe@Customer.co', '22/04/2022', 'john Doe', 1555016400000, 'jane Doe', 1555016400000, 550, 9, 'private', '22/04/2022', '22/04/2022'],
];
