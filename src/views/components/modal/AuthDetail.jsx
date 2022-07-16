import React, {useState, useEffect, useRef} from 'react';
import {Typography, CardMedia, Box, CircularProgress, Card, CardContent, CardActions, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody} from '@mui/material';
import BG from '../../../assets/PDFBG.png';
import ReactToPrint from 'react-to-print';
import {array} from 'yup';
import axios from 'axios';
import {BASEURL, errorToast} from '../../../utils/Utils';

function AuthDetail({Ticketid, TicketData, onClose}) {
	const {authorizedIps, firstName, lastName, email, bookingId, comments} = TicketData;
	const componentRef = React.useRef();
	// console.log(TicketData, Ticketid);
	const [isLoading, setIsLoading] = useState(false);
	const [chargeRequests, setChargeRequests] = useState([]);

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

	//   comments.forEach(function (value) {
	//     const componentRef = React.useRef();
	//   });

	//    searching : agent
	const loadChargeRequests = async (bookingId) => {
		setIsLoading(true);
		axios
			.get(BASEURL + `/charge/requests/${bookingId}`)
			.then((response) => {
				// console.log(response.data.data);
				setChargeRequests(response.data.data);
				setIsLoading(false);
			})
			.catch((e) => {
				console.log(e);
				errorToast(e.response.data.message);
				setIsLoading(false);
			});
	};

	useEffect(() => {
		loadChargeRequests(bookingId);
	}, [bookingId]);

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
				<Box ref={componentRef}>
					{chargeRequests == null || chargeRequests.length == 0 ? (
						<Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
							<Typography variant='h4' gutterBottom component='div'>
								No Charge request found
							</Typography>
						</Box>
					) : (
						chargeRequests.map((request, index) => {
							const {cardNumber, amount} = request;
							{
								/* console.log(request); */
							}
							return (
								<Card sx={{marginBottom: '20px'}} key={index}>
									<Box
										style={{
											backgroundImage: `linear-gradient(rgba(255,255,255,0.2), rgba(255,255,255,0.6)),url(${BG})`,
											backgroundPosition: 'bottom',
											backgroundSize: 'cover',
											minHeight: '500px',
										}}>
										<EmailHeader />
										<hr />
										<Box sx={{display: 'flex', flexDirection: 'row', px: 6}}>
											<CardContent sx={{width: '90%', margin: 'auto', padding: '4rem 0'}} ref={componentRef}>
												<div
													style={{
														alignItems: 'center',
														display: 'flex',
														justifyContent: 'center',
													}}>
													<Typography variant='body1' color='text.secondary' display='inline'>
														Customer Name: &nbsp;
													</Typography>
													<Typography variant='subtitle1'>{`${firstName} ${lastName}`}</Typography>
												</div>
												<div
													style={{
														alignItems: 'center',
														display: 'flex',
														justifyContent: 'center',
													}}>
													<Typography variant='body1' color='text.secondary' display='inline'>
														Amount: &nbsp;
													</Typography>
													<Typography variant='subtitle1'>$ {amount}</Typography>
												</div>
												<div
													style={{
														alignItems: 'center',
														display: 'flex',
														justifyContent: 'center',
													}}>
													<Typography variant='body1' color='text.secondary' display='inline'>
														Email: &nbsp;
													</Typography>
													<Typography variant='subtitle1'>{email}</Typography>
												</div>{' '}
												<div
													style={{
														alignItems: 'center',
														display: 'flex',
														justifyContent: 'center',
													}}>
													<Typography variant='body1' color='text.secondary' display='inline'>
														Ticket Id: &nbsp;
													</Typography>
													<Typography variant='subtitle1'>{bookingId}</Typography>
												</div>{' '}
												<div
													style={{
														alignItems: 'center',
														display: 'flex',
														justifyContent: 'center',
													}}>
													<Typography variant='body1' color='text.secondary' display='inline'>
														Card Number: &nbsp;
													</Typography>
													<Typography variant='subtitle1'>{cardNumber}</Typography>
												</div>
												<div style={{marginTop: '10px'}}>
													<TableContainer
													//  component={Paper}
													>
														<Table aria-label='simple table' size='small'>
															<TableHead>
																<TableRow>
																	<TableCell align='left'>S.No</TableCell>
																	<TableCell align='left'>Email</TableCell>
																	<TableCell align='left'>IP Address</TableCell>
																	<TableCell align='left'>Timestamp</TableCell>
																</TableRow>
															</TableHead>
															<TableBody>
																{authorizedIps.map((data, index) => (
																	<TableRow key={data.name}>
																		<TableCell align='left'>{index + 1}</TableCell>
																		<TableCell align='left'>{data.email}</TableCell>
																		<TableCell align='left'>{data.ipAddress ? data.ipAddress : 'Response Awaited'}</TableCell>
																		<TableCell align='left'>{data.timestamp}</TableCell>
																	</TableRow>
																))}
															</TableBody>
														</Table>
													</TableContainer>
												</div>
											</CardContent>
										</Box>
										<hr />

										<CardMedia sx={{my: 2}} children={<span dangerouslySetInnerHTML={{__html: EmailFooter}} />} />
									</Box>
								</Card>
							);
						})
					)}
					{chargeRequests !== null && chargeRequests.length !== 0 && (
						<CardActions sx={{display: 'flex', justifyContent: 'end', padding: '20px  '}}>
							<ReactToPrint
								pageStyle=' { size: 8in 8in }'
								trigger={() => (
									<Button sx={{textTransform: 'capitalize'}} variant='contained'>
										Download Pdf
									</Button>
								)}
								content={() => componentRef.current}
							/>
						</CardActions>
					)}
				</Box>
			)}
		</>
	);
}

export default AuthDetail;
