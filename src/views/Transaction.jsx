import React, {useState} from 'react';
import {ListResult} from './components/member/list-result';
import {ListToolbar} from './components/member/list-toolbar';
import Checkout from './Checkout';

//@material-ui
import {Box, Container, Button, Card, CardContent, TextField, Modal, InputAdornment, SvgIcon, Typography, CardHeader, Divider, Grid, IconButton} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

//  local icon
import {Search as SearchIcon} from '../assets/icons/search';
import {Upload as UploadIcon} from '../assets/icons/upload';
import {Download as DownloadIcon} from '../assets/icons/download';

export const Transaction = () => {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	function currentDate() {
		let today = new Date();
		let dd = String(today.getDate()).padStart(2, '0');
		let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
		let yyyy = today.getFullYear();

		today = mm + '/' + dd + '/' + yyyy;
		return today;
	}
	return (
		<>
			<Box
				component='main'
				sx={{
					flexGrow: 1,
					pb: 4,
					pt: 2,
				}}>
				<Container maxWidth={false}>
					<Box
						sx={{
							alignItems: 'center',
							display: 'flex',
							justifyContent: 'space-between',
							flexWrap: 'wrap',
							m: -1,
						}}>
						<Typography sx={{m: 1}} variant='h6'>
							{currentDate()}
						</Typography>
						<Box sx={{m: 1}}>
							<Button startIcon={<VisibilityIcon fontSize='small' />} sx={{mr: 1}}>
								View
							</Button>
							<Button startIcon={<UpgradeIcon fontSize='small' />} sx={{mr: 1}}>
								Update
							</Button>
							<Button startIcon={<DeleteOutlineIcon fontSize='small' />} sx={{mr: 1}}>
								Delete
							</Button>
							<Button startIcon={<FilterAltIcon fontSize='small' />} sx={{mr: 1}}>
								Filter
							</Button>

							<Button color='primary' onClick={handleOpen} variant='contained'>
								Add New Record
							</Button>
						</Box>
					</Box>

					<Box sx={{mt: 3}}>
						<ListResult />
					</Box>
				</Container>
			</Box>

			{/* notification pannel */}
			<Modal open={open} onClose={handleClose} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
				<Box sx={style}>
					<IconButton onClick={handleClose} sx={{position: `absolute`, right: `10px`, top: `10px`}}>
						<CloseIcon />
					</IconButton>
					<Checkout />
				</Box>
			</Modal>
		</>
	);
};

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	minWidth: '40vw',
	minHeight: '50vh',
	bgcolor: 'background.paper',
	// border: '2px solid #000',
	boxShadow: 24,
	borderRadius: '1rem',
	p: 4,
};
