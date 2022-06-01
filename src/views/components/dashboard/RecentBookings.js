import {useNavigate} from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {Box, Button, Card, CardHeader, Table, TableBody, TableCell, TableHead, Paper, TableContainer, CircularProgress, TableRow} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import {useEffect, useState} from 'react';
import {BASEURL} from '../../../utils/Utils';
import axios from 'axios';

export const RecentBookings = () => {
	const navigate = useNavigate();
	const [recordData, setRecordData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const loadTransactions = async () => {
		setIsLoading(true);
		axios
			.get(BASEURL + '/ticket/my')
			.then((response) => {
				// console.log(response.data);
				setRecordData(response.data.data.tickets);
				setTimeout(() => {
					setIsLoading(false);
				}, 500);
			})
			.catch((e) => {
				console.log(e);
				setIsLoading(false);
			});
	};

	useEffect(() => {
		loadTransactions();
	}, []);

	function formateDate(date) {
		let today = new Date(date);
		let dd = String(today.getDate()).padStart(2, '0');
		let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
		let yyyy = today.getFullYear();

		today = mm + '/' + dd + '/' + yyyy;
		return today;
	}

	return (
		<Card>
			<CardHeader title='Recent Bookings' />
			<PerfectScrollbar>
				<Box sx={{minWidth: 800}}>
					<Table sx={{minWidth: 650}} aria-label='simple table'>
						<TableHead>
							<TableRow>
								{['Email', 'Name', 'Booking ID', 'Phone', 'Dep. Date', 'Return Date'].map((th) => (
									<TableCell key={th}>{th}</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{isLoading ? (
								<TableRow>
									<TableCell colSpan={10}>
										<div
											style={{
												display: 'flex',
												justifyContent: 'center',
											}}>
											<CircularProgress />
										</div>
									</TableCell>
								</TableRow>
							) : recordData?.length > 0 ? (
								recordData.map((row, index) => (
									<TableRow
										key={index}
										sx={{
											'&:last-child td, &:last-child th': {border: 0},
										}}>
										<TableCell>{row.email}</TableCell>
										<TableCell>{`${row.firstName} ${row.lastName}`}</TableCell>
										<TableCell>{row.bookingId}</TableCell>
										<TableCell>{row.phone}</TableCell>

										<TableCell>{formateDate(row.departureDate)}</TableCell>
										<TableCell>{formateDate(row.returnDate)}</TableCell>
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell colSpan={10}>
										<div
											style={{
												display: 'flex',
												justifyContent: 'center',
											}}>
											<h2>No data found</h2>
										</div>
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</Box>
			</PerfectScrollbar>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'flex-end',
					p: 2,
				}}>
				<Button color='primary' endIcon={<ArrowRightIcon fontSize='small' />} size='small' variant='text' onClick={() => navigate('/my-records')}>
					View all
				</Button>
			</Box>
		</Card>
	);
};
