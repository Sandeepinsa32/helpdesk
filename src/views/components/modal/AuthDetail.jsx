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
import BG from '../../../assets/PDFBG.png';
import Pdf from 'react-to-pdf';

const ref = React.createRef();

const options = {
	orientation: 'landscape',
	unit: 'in',
	format: [4, 2],
};
function AuthDetail({Ticketid, TicketData, onClose}) {
	const [isLoading, setIsLoading] = useState(false);

	// const pdfGenrater = () => {
	// 	var doc = new jsPDF('landscape', 'px', 'a4', 'false');
	// 	doc.html(document.querySelector('#Pdf-Wrapper-card'), {
	// 		callback: function (doc) {
	// 			doc.save();
	// 		},
	// 		x: 10,
	// 		y: 10,
	// 		width: 500,
	// 	});
	// };

	var EmailHeader = () => {
		return (
			<div
				style={{
					display: 'flex',
					padding: '10px',
					width: '90%',
					margin: 'auto',
					alignItems: 'center',
					justifyContent: 'space-between',
				}}>
				<div>
					<img style={{width: '200px'}} src='https://triphelpdesk.com/wp-content/uploads/2022/01/Logo.png' alt='' />
					<p style={{margin: '0'}}>164 20th Street, Suite 2B, Brooklyn, NY 11232, USA</p>
				</div>

				<div>
					<p style={{margin: '0'}}>+1 8662701413</p>
					<p style={{margin: '0'}}>info@TripHelpDesk.com</p>

					<p style={{margin: '0'}}> www.TripHelpDesk.com</p>
				</div>
			</div>
		);
	};

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
			{isLoading ? (
				<Box
					sx={{
						display: 'flex',
						minHeight: '70vh',
						justifyContent: 'center',
						alignItems: 'center',
					}}>
					<CircularProgress size={30} />
				</Box>
			) : (
				<Card
					ref={ref}
					id='Pdf-Wrapper-card'
					style={{
						backgroundImage: `linear-gradient(rgba(255,255,255,0.2), rgba(255,255,255,0.6)),url(${BG})`,
						backgroundPosition: 'bottom',
						backgroundSize: 'cover',
						minHeight: '500px',
					}}>
					<EmailHeader />
					<hr />
					<Box sx={{display: 'flex', flexDirection: 'row', px: 6}}>
						<CardContent sx={{width: '60%', margin: 'auto', padding: '4rem 0'}}>
							<Box
								style={{
									alignItems: 'center',
									display: 'flex',
									justifyContent: 'center',
								}}>
								<Typography variant='body1' color='text.secondary' display='inline'>
									Customer Name: &nbsp;
								</Typography>
								<Typography variant='subtitle1'> Mac Miller</Typography>
							</Box>
							<Box
								style={{
									alignItems: 'center',
									display: 'flex',
									justifyContent: 'center',
								}}>
								<Typography variant='body1' color='text.secondary' display='inline'>
									TimeStamp: &nbsp;
								</Typography>
								<Typography variant='subtitle1'>05 Jan 2022 - 12:33:52 PM</Typography>
							</Box>{' '}
							<Box
								style={{
									alignItems: 'center',
									display: 'flex',
									justifyContent: 'center',
								}}>
								<Typography variant='body1' color='text.secondary' display='inline'>
									Ticket Id: &nbsp;
								</Typography>
								<Typography variant='subtitle1'>THD45SD7</Typography>
							</Box>{' '}
							<Box
								style={{
									alignItems: 'center',
									display: 'flex',
									justifyContent: 'center',
								}}>
								<Typography variant='body1' color='text.secondary' display='inline'>
									Card Number: &nbsp;
								</Typography>
								<Typography variant='subtitle1'>XXXX4579</Typography>
							</Box>
							<Box
								style={{
									alignItems: 'center',
									display: 'flex',
									justifyContent: 'center',
								}}>
								<Typography variant='body1' color='text.secondary' display='inline'>
									IP Address: &nbsp;
								</Typography>
								<Typography variant='subtitle1'>120.10.25.20</Typography>
							</Box>
						</CardContent>
					</Box>
					<hr />

					<CardMedia sx={{my: 2}} children={<span dangerouslySetInnerHTML={{__html: EmailFooter}} />} />
				</Card>
			)}

			<CardActions>
				<Pdf
					targetRef={ref}
					filename='code-example.pdf'
					options={options}
					//x={ 0.5} y={0.5} scale={0.8}
				>
					{({toPdf}) => (
						<Button sx={{textTransform: 'capitalize'}} variant='contained' onClick={toPdf}>
							Download Pdf
						</Button>
					)}
				</Pdf>
			</CardActions>
		</>
	);
}

export default AuthDetail;

{
	/* <List>{'sa' === 'sa' ? <Box>data goes here</Box> : <Typography variant='h6'>No Logs found!!</Typography>}</List> */
}
