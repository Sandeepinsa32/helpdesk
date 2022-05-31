import React from 'react';

import {
	Box,
	Button,
	Card,
	Container,
	CardContent,
	TextField,
	CircularProgress,
	Modal,
	InputAdornment,
	SvgIcon,
	Typography,
	Grid,
	IconButton,
	Tooltip,
	// ListItem,
	// ListItemButton,
	// ListItemText,
	// ListItemIcon,
	// List,
} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Paper, ThemeProvider} from '@mui/material';
import {createTheme} from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';

//  local icon
import {Search as SearchIcon} from '../assets/icons/search';
import CloseIcon from '@mui/icons-material/Close';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import PaymentIcon from '@mui/icons-material/Payment';

function ChargeTransaction() {
	return (
		<>
			<Box
				component='main'
				sx={{
					flexGrow: 1,
					pb: 4,
					pt: 2,
				}}>
				<Container maxWidth={false} sx={{p: `0!important`}}>
					<Box
						sx={{
							alignItems: 'center',
							display: 'flex',
							justifyContent: 'space-between',
							flexWrap: 'wrap',
							m: -1,
						}}>
						<Typography sx={{m: 1}} variant='h6'>
							Raised Request :
						</Typography>
					</Box>

					{/* Search COmponent */}
					<Box sx={{mt: 3}}>
						<Card>
							<CardContent>
								<Box fullWidth sx={{display: ''}}>
									<Grid container spacing={4} justifyContent='flex-start'>
										<Grid item xs={3} md={3}>
											<TextField
												size='small'
												fullWidth
												sx={{height: `2rem`}}
												InputProps={{
													startAdornment: (
														<InputAdornment position='start'>
															<SvgIcon color='action' fontSize='small'>
																<SearchIcon />
															</SvgIcon>
														</InputAdornment>
													),
												}}
												onChange={(e) => console.log(e.target.value)}
												placeholder='Enter Id'
												variant='outlined'
											/>
										</Grid>

										{/* <Grid item xs={0} md={0}></Grid> */}
										{/* btn --reset and serach  */}
										<Grid item xs={3} md={3} sx={{px: 2, mt: 0.5}}>
											<Button sx={{textTransform: 'capitalize', mx: 1}} size='small' variant='contained' onClick={() => console.log('sreach btn click')}>
												Search
											</Button>
											<Button sx={{textTransform: 'capitalize', mx: 1}} size='small' variant='contained' color='neutral' onClick={() => console.log('reset btn click')}>
												Reset
											</Button>
										</Grid>
									</Grid>
								</Box>
							</CardContent>
						</Card>
					</Box>
					{/* End: Search  Component */}

					<Box sx={{mt: 3}}>
						<TableContainer component={Paper}>
							<Table sx={{minWidth: 650}} aria-label='simple table'>
								<TableHead>
									<TableRow>
										{['Email', 'Name', 'Booking ID', 'Dep Date', 'Return Date', 'Action'].map((th) => (
											<TableCell sx={{p: 1}} key={th}>
												{th}
											</TableCell>
										))}
									</TableRow>
								</TableHead>
								<TableBody>
									{false ? (
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
									) : true ? (
										<>
											{/* myRecords.map((row, index) => ( */}
											<TableRow
												// key={index}
												sx={'generate' === 'generate' ? {borderLeft: '4px solid #E0021B'} : {}}>
												<TableCell sx={{padding: ` 16px 0 16px 8px !important`}}>5</TableCell>
												<TableCell sx={{padding: ` 16px 0 16px 8px !important`}}>5</TableCell>
												<TableCell sx={{padding: ` 16px 0 16px 8px !important`}}>5</TableCell>

												<TableCell sx={{padding: ` 16px 0 16px 8px !important`}}>5</TableCell>
												<TableCell sx={{padding: ` 16px 0 16px 8px !important`}}>5</TableCell>

												<TableCell sx={{p: 0}}>
													{/* logs*/}
													<Tooltip title='View Logs'>
														<IconButton aria-label='viewlogs'>
															<ReceiptLongIcon />
														</IconButton>
													</Tooltip>
													{/* charge*/}
													<Tooltip title='Request to charges'>
														<IconButton aria-label='Charge'>
															<PaymentIcon />
														</IconButton>
													</Tooltip>
												</TableCell>
											</TableRow>
											{/* )) */}
										</>
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
						</TableContainer>
						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
								margin: '20px auto',
								width: '100%',
							}}>
							{/* <Pagination count={totalRecords != -1 && Math.ceil(totalRecords / size)} page={page} onChange={handleChange} /> */}
						</div>
					</Box>
				</Container>
			</Box>
		</>
	);
}

export default ChargeTransaction;
