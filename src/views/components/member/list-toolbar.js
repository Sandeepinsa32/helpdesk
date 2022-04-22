import {React, useState} from 'react';
import {Box, Button, Card, CardContent, TextField, InputAdornment, SvgIcon, Typography} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

//  local icon
import {Search as SearchIcon} from '../../../assets/icons/search';
import {Upload as UploadIcon} from '../../../assets/icons/upload';
import {Download as DownloadIcon} from '../../../assets/icons/download';

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
export const ListToolbar = (props) => {
	return (
		<Box>
			{/* <Box
				sx={{
					alignItems: 'center',
					display: 'flex',
					justifyContent: 'space-between',
					flexWrap: 'wrap',
					m: -1,
				}}>
				{
					// Title
				}
				<Typography variant='h4' sx={{textTransform: 'uppercase', m: 1}}>
					{props.title}
				</Typography>

				{
					// btn
				}
				<Box sx={{m: 1}}>
					{props.btn == 'show' ? (
						<Button
							color='primary'
							// onClick={handleOpen}
							variant='contained'>
							{props.btnTitle}
						</Button>
					) : null}
				</Box>
			</Box> */}

			{/* Search COmponent */}
			<Box sx={{mt: 3}}>
				<Card>
					<CardContent>
						<Box sx={{maxWidth: 500}}>
							<TextField
								fullWidth
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
						</Box>
					</CardContent>
				</Card>
			</Box>
		</Box>
	);
};
