import {React, useState} from 'react';
import {Box, Button, Card, Grid, CardContent, TextField, ThemeProvider, InputAdornment, SvgIcon, Typography} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

//  local icon
import {Search as SearchIcon} from '../../../assets/icons/search';
import {Upload as UploadIcon} from '../../../assets/icons/upload';
import {Download as DownloadIcon} from '../../../assets/icons/download';

import {createTheme} from '@mui/material/styles';
const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 'auto',
	height: 'auto',
	bgcolor: 'background.paper',
	// border: '2px solid #000',
	boxShadow: 24,
	borderRadius: '1rem',
	p: 4,
};
const theme = createTheme({
	palette: {
		neutral: {
			main: '#64748B',
			contrastText: '#fff',
		},
	},
});

export const Search = (props) => {
	const [searchValue, setSearchValue] = useState(null);
	const [searchKey, setSearchKey] = useState({
		name: '',
		email: '',
	});

	function searchHandler(e) {
		console.log(searchValue);
	}
	return (
		<Box>
			<ThemeProvider theme={theme}>
				{/* Search COmponent */}
				<Box sx={{mt: 3}}>
					<Card>
						<CardContent>
							<Box fullWidth sx={{display: ''}}>
								<Grid container spacing={3}>
									<Grid item xs={12} md={3}>
										<TextField
											size='small'
											sx={{width: `20vw`, height: `2rem`}}
											InputProps={{
												startAdornment: (
													<InputAdornment position='start'>
														<SvgIcon color='action' fontSize='small'>
															<SearchIcon />
														</SvgIcon>
													</InputAdornment>
												),
											}}
											onChange={(e) => setSearchValue((prev) => ({...prev, name: e.target.value}))}
											placeholder='Enter Name'
											variant='outlined'
										/>
									</Grid>
									{/* <Grid item xs={12} md={3}>
										<TextField
											size='small'
											sx={{width: `20vw`, height: `2rem`}}
											InputProps={{
												startAdornment: (
													<InputAdornment position='start'>
														<SvgIcon color='action' fontSize='small'>
															<SearchIcon />
														</SvgIcon>
													</InputAdornment>
												),
											}}
											onChange={(e) => setSearchValue(e.target.value)}
											placeholder='Enter '
											variant='outlined'
										/>
									</Grid> */}
									<Grid item xs={12} md={3}>
										<TextField
											size='small'
											sx={{width: `20vw`, height: `2rem`}}
											InputProps={{
												startAdornment: (
													<InputAdornment position='start'>
														<SvgIcon color='action' fontSize='small'>
															<SearchIcon />
														</SvgIcon>
													</InputAdornment>
												),
											}}
											onChange={(e) => setSearchValue((prev) => ({...prev, email: e.target.value}))}
											placeholder='Enter Email id'
											variant='outlined'
										/>
									</Grid>
									<Grid item xs={12} md={3} sx={{px: 2, mt: 0.5}}>
										<Button
											sx={{textTransform: 'capitalize', mx: 1}}
											size='small'
											disabled={searchValue == null || searchValue == '' || searchValue == ' ' ? true : false}
											variant='contained'
											onClick={() => searchHandler()}>
											Search
										</Button>
										<Button sx={{textTransform: 'capitalize', mx: 1}} size='small' variant='contained' color='neutral'>
											Reset
										</Button>
									</Grid>
								</Grid>
							</Box>
						</CardContent>
					</Card>
				</Box>
			</ThemeProvider>
		</Box>
	);
};
