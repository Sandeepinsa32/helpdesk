import React, {useState, useEffect} from 'react';
import {Typography, Paper, ListItem, ListItemButton, Box, ListItemText, ListItemIcon, CircularProgress, List, Card, CardHeader, CardContent, Divider, CardActions, Button} from '@mui/material';

function AuthDetail({Ticketid, TicketData, onClose}) {
	const [isLoading, setIsLoading] = useState(false);
	return (
		<>
			<CardContent>
				{isLoading ? (
					<Box sx={{display: 'flex', minHeight: '70vh', justifyContent: 'center', alignItems: 'center'}}>
						<CircularProgress size={30} />
					</Box>
				) : (
					<List>{'sa' === 'sa' ? <Box>data goes here</Box> : <Typography variant='h6'>No Logs found!!</Typography>}</List>
				)}
			</CardContent>
			<CardActions>
				<Button sx={{textTransform: 'capitalize'}} variant='contained' onClick={() => console.log('clicked')}>
					Download Pdf
				</Button>
			</CardActions>
		</>
	);
}

export default AuthDetail;
