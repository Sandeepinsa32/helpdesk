import {React, useState} from 'react';
import {Box, Button, Card, CardContent, TextField, InputAdornment, SvgIcon, Typography, ThemeProvider} from '@mui/material';
import {blueGrey} from '@mui/material/colors';
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

const color = blueGrey[100];
export const Search = (props) => {
	return (
		<Box>
			<ThemeProvider theme={theme}>
				{/* Search COmponent */}
				<Box sx={{mt: 3}}>
					<Card>
						<CardContent>
							<Box fullWidth sx={{display: 'flex'}}>
								<TextField
									size='small'
									sx={{width: `26vw`, height: `2rem`}}
									InputProps={{
										startAdornment: (
											<InputAdornment position='start'>
												<SvgIcon color='action' fontSize='small'>
													<SearchIcon />
												</SvgIcon>
											</InputAdornment>
										),
									}}
									placeholder='Search customer'
									variant='outlined'
								/>
								<Box sx={{px: 2, mt: 0.5}}>
									<Button sx={{textTransform: 'capitalize', mx: 2}} size='small' variant='contained'>
										Search
									</Button>
									<Button sx={{textTransform: 'capitalize', mx: 2}} size='small' variant='contained' color='neutral'>
										Reset
									</Button>
								</Box>
							</Box>
						</CardContent>
					</Card>
				</Box>
			</ThemeProvider>
		</Box>
	);
};
