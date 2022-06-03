import React, {useState, useEffect} from 'react';
import {Typography, Paper, ListItem, ListItemButton, ListItemText, ListItemIcon, CircularProgress, List, Card, CardHeader, CardContent, Divider} from '@mui/material';
import axios from 'axios';
import {BASEURL} from '../../utils/Utils';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import DoneAllSharpIcon from '@mui/icons-material/DoneAllSharp';

const ViewLog = ({id}) => {
	id = id._id;
	console.log(id);

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

	return (
		<Card>
			<Divider />
			<CardContent>
				{isLoading ? (
					<CircularProgress size={30} />
				) : (
					<List>
						{ticketLogs?.length > 0 ? (
							ticketLogs.map((log, i) => {
								return (
									<ListItem disablePadding key={i}>
										<ListItemButton>
											<ListItemIcon>
												<DoneAllSharpIcon />
											</ListItemIcon>

											<ListItemText
												primary={`${log.agent.firstName} ${log.agent.lastName} (${log.agent.employeeCode})`}
												secondary={
													<>
														{/* <Typography sx={{display: 'inline'}} component='span' variant='body2' color='text.primary'>
															{log.agent.firstName} {log.agent.lastName} ({log.agent.employeeCode})
														</Typography> */}
														{`${log.action} `}
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
		</Card>
	);
};

export default ViewLog;
