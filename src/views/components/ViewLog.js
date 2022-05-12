import React, {useState, useEffect} from 'react';
import {Typography, Grid, IconButton, Paper, ListItem, ListItemButton, ListItemText, ListItemIcon, List} from '@mui/material';

//@material-Icon
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

const ViewLog = (props) => {
	const {data} = props;
	console.log(data);
	return (
		<>
			<Typography sx={{fontSize: `1rem`}} variant='Body2'>
				View Logs
			</Typography>
			<Paper>
				<List>
					{data.map((a, i) => {
						console.log(a);
						return (
							<ListItem disablePadding key={i}>
								<ListItemButton>
									<ListItemIcon>
										<ArrowRightAltIcon />
									</ListItemIcon>

									<ListItemText
										primary='John Recently Viewed This Record'
										secondary={
											<>
												<Typography sx={{display: 'inline'}} component='span' variant='body2' color='text.primary'>
													John Doe ( 20025)
												</Typography>
												{' — For Genrating E-mail '}
												<span style={{float: 'right', width: 'fit-content	'}}>11/05/2022 8:30 PM</span>
											</>
										}
									/>
								</ListItemButton>
							</ListItem>
						);
					})}
				</List>
			</Paper>
		</>
	);
};

export default ViewLog;
