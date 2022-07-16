import React, {useState, useEffect} from 'react';
import {Typography, Paper, ListItem, ListItemButton, Box, ListItemText, ListItemIcon, CircularProgress, List, Card, CardHeader, CardContent, Divider} from '@mui/material';
import axios from 'axios';
import {BASEURL} from '../../utils/Utils';

// mui icon
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import DoneAllSharpIcon from '@mui/icons-material/DoneAllSharp';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CreditScoreOutlinedIcon from '@mui/icons-material/CreditScoreOutlined';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';

const ViewLog = ({id}) => {
	id = id._id;
	// console.log(id);

	const [isLoading, setIsLoading] = useState(true);
	const [ticketLogs, setTicketLogs] = useState([]);
	const handleLoadLogs = async (id) => {
		axios
			.get(BASEURL + '/log/' + id)
			.then((res) => {
				setTicketLogs(res.data.data);
				setIsLoading(false);
			})
			.catch((e) => {
				console.log(e);
				setIsLoading(false);
			});
	};

	useEffect(() => {
		handleLoadLogs(id);
	}, [id]);

	function formateDate(date) {
		let today = new Date(date);
		let dd = String(today.getDate()).padStart(2, '0');
		let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
		let yyyy = today.getFullYear();
		var hh = today.getHours();
		var MM = today.getMinutes();
		// var ss = today.getSeconds();

		today = mm + '/' + dd + '/' + yyyy + ' ' + hh + ':' + MM;
		return today;
	}

	function LogIcon(action) {
		switch (action) {
			case 'viewed':
				return <VisibilityIcon />;
			case 'viewed card details':
				return <CreditScoreOutlinedIcon />;
			case 'updated':
				return <ModeEditOutlinedIcon />;

			default:
				// throw new Error("Unknown step");
				return <VisibilityIcon />;
		}
	}
	function LogMessage(action) {
		switch (action) {
			case 'viewed':
				return `Viewed This Record `;
			case 'viewed card details':
				return 'Viewed Card Details of This Record';
			case 'updated':
				return 'Update Values  of This Record ';

			default:
				// throw new Error("Unknown step");
				return <VisibilityIcon />;
		}
	}
	return (
		<>
			{/* <Divider /> */}
			<CardContent>
				{isLoading ? (
					<Box sx={{display: 'flex', minHeight: '70vh', justifyContent: 'center', alignItems: 'center'}}>
						<CircularProgress size={30} />
					</Box>
				) : (
					<List>
						{ticketLogs?.length > 0 ? (
							ticketLogs.map((log, i) => {
								return (
									<ListItem disablePadding key={i}>
										<ListItemButton>
											<ListItemIcon>{LogIcon(log.action)}</ListItemIcon>

											<ListItemText
												primary={`${log.agent.firstName} ${log.agent.lastName} (${log.agent.employeeCode})`}
												secondary={
													<>
														{LogMessage(log.action)}

														<span style={{float: 'right', width: 'fit-content	'}}>
															{formateDate(log.createdAt)}
															{/* {log.createdAt.split('T')[0]} {log.createdAt.split('T')[1]} */}
														</span>
													</>
												}
											/>
										</ListItemButton>
									</ListItem>
								);
							})
						) : (
							<Typography variant='h6'>No Logs found!!</Typography>
						)}
					</List>
				)}
			</CardContent>
		</>
	);
};

export default ViewLog;
