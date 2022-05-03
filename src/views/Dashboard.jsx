import React, {useEffect, useState} from 'react';

import {Box, Container, Grid} from '@mui/material';
import {TicketStat} from './components/dashboard/TicketStat';
import {RecentBookings} from './components/dashboard/RecentBookings';

import axios from 'axios';
import {BASEURL, successToast, errorToast} from '../utils/Utils';
function Dashboard() {
	const [todayStats, setTodayStats] = useState(-1);
	const [weeklyStats, setWeeklyStats] = useState(-1);
	const [monthlyStats, setMonthlyStats] = useState(-1);

	const loadAgentStats = async (interval) => {
		axios
			.get(BASEURL + `/ticket/stats/${interval}`)
			.then((response) => {
				console.log(interval, response.data.data);
				interval === 'today' ? setTodayStats(response.data.data.tickets) : interval === 'weekly' ? setWeeklyStats(response.data.data.tickets) : setMonthlyStats(response.data.data.tickets);
			})
			.catch((e) => {
				console.log(e);
				errorToast(e.response.data.message);
			});
	};

	useEffect(() => {
		loadAgentStats('today');
		loadAgentStats('weekly');
		loadAgentStats('monthly');
	}, []);

	return (
		<>
			<Box
				component='main'
				sx={{
					flexGrow: 1,
					py: 8,
				}}>
				<Container maxWidth={false}>
					<Grid container spacing={3}>
						<Grid item lg={3} sm={6} xl={3} xs={12}>
							<TicketStat tickets={todayStats} interval={'24 Hrs'} />
						</Grid>
						<Grid item lg={3} sm={6} xl={3} xs={12}>
							<TicketStat tickets={weeklyStats} interval={'7 Days'} />
						</Grid>{' '}
						<Grid item lg={3} sm={6} xl={3} xs={12}>
							<TicketStat tickets={monthlyStats} interval={'30 Days'} />
						</Grid>
						<Grid item lg={12} md={12} xl={12} xs={12}>
							<RecentBookings />
						</Grid>
					</Grid>
				</Container>
			</Box>
		</>
	);
}

export default Dashboard;
