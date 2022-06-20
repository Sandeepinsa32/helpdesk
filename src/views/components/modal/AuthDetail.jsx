import React, {useState, useEffect} from 'react';
import {
	Typography,
	Paper,
	ListItem,
	CardMedia,
	ListItemButton,
	Box,
	ListItemText,
	ListItemIcon,
	CircularProgress,
	List,
	Card,
	CardHeader,
	CardContent,
	Divider,
	CardActions,
	Button,
} from '@mui/material';

function AuthDetail({Ticketid, TicketData, onClose}) {
	const [isLoading, setIsLoading] = useState(false);

	var EmailHeader = ` <div style="
    background-color: #efefef  !important;
    margin: -7px;padding:14px;
">
       <img src="https://triphelpdesk.com/wp-content/uploads/2022/01/Logo.png" alt="" style="width: 200px; display: block; margin-bottom: 4px; margin: 0 auto;" width="200">
      <div style="text-align:center;">
        
      
         

        
        <a href="tel:8662701413" target="_blank" style="margin:4px 0 ;text-decoration:none;color: #0B4173;display:block">

           +1 8662701413
          </a>
          <a href="mailto:info@triphelpdesk.com" target="_blank" style="margin:4px 0 ;text-decoration:none;color: #0B4173;display:block">
        
           info@TripHelpDesk.com
          </a>
          <a href="https://triphelpdesk.com/" target="_blank" style="margin:4px 0 ;text-decoration:none;color: #0B4173;display:block">
    
           www.TripHelpDesk.com
          </a>
          <a href="#" target="_blank" style="margin:4px 0 ; padding: 0;text-decoration:none;color: #0B4173;display:block">
164 20th Street, Suite 2B, Brooklyn, NY
          11232, USA</a>
        </div>
      </div>`;
	var EmailFooter = `   <footer>
      <div style="text-align: center">
        <span style="font-size: 18px;font-weight: bold"><a href="" style="color: #0B4173;">TripHelpDesk</a>
        </span>
        <span style="font-size: 16px; font-weight: bold; color: #0B4173;">
          powered by Valalto</span>
      </div>
      <p style=" line-height:18px;text-align:center;  margin-bottom:0px; color: #0B4173;font-size: 14px;">
              &copy; Copyright 2022
              <a href="https://valalto.com/" style="line-height:18px;color: #0B4173;font-size: 14px; font-weight:bold;">
                Valalto Inc.</a>, All Rights Reserved.
            </p>
      </footer>`;
	return (
		<>
			<CardContent>
				{isLoading ? (
					<Box sx={{display: 'flex', minHeight: '70vh', justifyContent: 'center', alignItems: 'center'}}>
						<CircularProgress size={30} />
					</Box>
				) : (
					<Card>
						<CardMedia children={<span dangerouslySetInnerHTML={{__html: EmailHeader}} />} />
						<Box sx={{display: 'flex', flexDirection: 'row', px: 6}}>
							<CardContent sx={{width: '50%'}}>
								<Box>
									<Typography variant='body1' gutterBottom color='text.secondary' display='inline'>
										Name :{' '}
									</Typography>

									<Typography variant='subtitle1' display='inline'>
										Mac Miller
									</Typography>
								</Box>
								<Box>
									<Typography variant='body1' color='text.secondary' display='inline'>
										Name :{' '}
									</Typography>

									<Typography variant='subtitle1' display='inline'>
										Mac Miller
									</Typography>
								</Box>
								<Box>
									<Typography variant='body1' color='text.secondary' display='inline'>
										Name :{' '}
									</Typography>

									<Typography variant='subtitle1' display='inline'>
										Mac Miller
									</Typography>
								</Box>
								<Box>
									<Typography variant='body1' color='text.secondary' display='inline'>
										Name :{' '}
									</Typography>

									<Typography variant='subtitle1' display='inline'>
										Mac Miller
									</Typography>
								</Box>
							</CardContent>

							<CardContent>
								<Box>
									<Typography variant='body1' color='text.secondary' display='inline'>
										Name :{' '}
									</Typography>

									<Typography variant='subtitle1' display='inline'>
										Mac Miller
									</Typography>
								</Box>
								<Box>
									<Typography variant='body1' color='text.secondary' display='inline'>
										Name :{' '}
									</Typography>

									<Typography variant='subtitle1' display='inline'>
										Mac Miller
									</Typography>
								</Box>
								<Box>
									<Typography variant='body1' color='text.secondary' display='inline'>
										Name :{' '}
									</Typography>

									<Typography variant='subtitle1' display='inline'>
										Mac Miller
									</Typography>
								</Box>
								<Box>
									<Typography variant='body1' color='text.secondary' display='inline'>
										Name :{' '}
									</Typography>

									<Typography variant='subtitle1' display='inline'>
										Mac Miller
									</Typography>
								</Box>
							</CardContent>
						</Box>

						<CardMedia sx={{my: 2}} children={<span dangerouslySetInnerHTML={{__html: EmailFooter}} />} />
					</Card>
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

{
	/* <List>{'sa' === 'sa' ? <Box>data goes here</Box> : <Typography variant='h6'>No Logs found!!</Typography>}</List> */
}
