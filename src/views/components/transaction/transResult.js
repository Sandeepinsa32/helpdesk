import React from 'react';
import {useState} from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {Button, IconButton, Box, Card, Checkbox, Table, Modal, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography} from '@mui/material';
// import {getInitials} from '../../utils/get-initials';
import {v4 as uuid} from 'uuid';
import Checkout from '../Checkout';

//  mui icon
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export const Result = (props) => {
	const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
	const [limit, setLimit] = useState(10);
	const [page, setPage] = useState(0);
	const [viewModal, setViewModal] = useState(false);
	const [userData, setUserData] = useState({});

	const handleSelectAll = (event) => {
		let newSelectedCustomerIds;

		if (event.target.checked) {
			newSelectedCustomerIds = customers.map((customer) => customer.id);
		} else {
			newSelectedCustomerIds = [];
		}

		setSelectedCustomerIds(newSelectedCustomerIds);
	};

	const handleSelectOne = (event, id) => {
		const selectedIndex = selectedCustomerIds.indexOf(id);
		let newSelectedCustomerIds = [];

		if (selectedIndex === -1) {
			newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, id);
		} else if (selectedIndex === 0) {
			newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
		} else if (selectedIndex === selectedCustomerIds.length - 1) {
			newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, selectedIndex), selectedCustomerIds.slice(selectedIndex + 1));
		}

		setSelectedCustomerIds(newSelectedCustomerIds);
	};

	const handleLimitChange = (event) => {
		setLimit(event.target.value);
	};
	const HandleViewModal = (data) => {
		setViewModal(true);
		setUserData(data);
	};

	const handlePageChange = (event, newPage) => {
		setPage(newPage);
	};

	return (
		<Card>
			<PerfectScrollbar>
				<Box sx={{minWidth: 1050}}>
					<Table>
						<TableHead>
							<TableRow>
								{['Email', 'Agent Name', 'Booking ID', 'CCH Name', 'Phone', 'Total G.P', 'Airline	No.of PAX', 'Fare Type', 'Dep Date', 'Return Date'].map((fieldName) => (
									<TableCell>{fieldName}</TableCell>
								))}
								<TableCell sx={{pl: 3.5}}>View</TableCell>
								{/* <TableCell sx={{pl: 3.5}}>Delete</TableCell> */}
							</TableRow>
						</TableHead>
						{/* <TableBody>
							{ResultData.map((customer, i) => (
								<TableRow hover key={customer[i]} selected={selectedCustomerIds.indexOf(customer.id) !== -1}>
									// {setUserData(customer)}

									{customer.map((details) => (
										<>
											<TableCell>{details}</TableCell>
										</>
									))}
									<TableCell sx={{width: `15%`}}>
										<Button sx={{textTransform: 'capitalize'}} onClick={(e) => HandleViewModal(customer)}>
											View
										</Button>
									</TableCell>
									// <TableCell sx={{width: `15%`}}>
										//<Button sx={{textTransform: 'capitalize'}}>Delete</Button>
									// </TableCell> 
								</TableRow>
							))}
						</TableBody> */}
					</Table>
				</Box>
			</PerfectScrollbar>
			<TablePagination
				component='div'
				count={customers.length}
				onPageChange={handlePageChange}
				onRowsPerPageChange={handleLimitChange}
				page={page}
				rowsPerPage={limit}
				rowsPerPageOptions={[5, 10, 25]}
			/>
			<Modal open={viewModal} onClose={() => setViewModal(false)} size='xs' aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
				<Box sx={style}>
					<IconButton onClick={() => setViewModal(false)} sx={{position: `absolute`, right: `10px`, top: `10px`}}>
						<CloseIcon />
					</IconButton>
					<Checkout data={userData} isView={true} />
				</Box>
			</Modal>
		</Card>
	);
};

const customers = [
	{
		id: uuid(),
		address: {
			country: 'USA',
			state: 'West Virginia',
			city: 'Parkersburg',
			street: '2849 Fulton Street',
		},
		avatarUrl: '/static/images/avatars/avatar_3.png',
		createdAt: 1555016400000,
		email: 'ekaterina.tankova@devias.io',
		name: 'Ekaterina Tankova',
		phone: '304-428-3097',
	},
	{
		id: uuid(),
		address: {
			country: 'USA',
			state: 'Bristow',
			city: 'Iowa',
			street: '1865  Pleasant Hill Road',
		},
		avatarUrl: '/static/images/avatars/avatar_4.png',
		createdAt: 1555016400000,
		email: 'cao.yu@devias.io',
		name: 'Cao Yu',
		phone: '712-351-5711',
	},
	{
		id: uuid(),
		address: {
			country: 'USA',
			state: 'Georgia',
			city: 'Atlanta',
			street: '4894  Lakeland Park Drive',
		},
		avatarUrl: '/static/images/avatars/avatar_2.png',
		createdAt: 1555016400000,
		email: 'alexa.richardson@devias.io',
		name: 'Alexa Richardson',
		phone: '770-635-2682',
	},
	{
		id: uuid(),
		address: {
			country: 'USA',
			state: 'Ohio',
			city: 'Dover',
			street: '4158  Hedge Street',
		},
		avatarUrl: '/static/images/avatars/avatar_5.png',
		createdAt: 1554930000000,
		email: 'anje.keizer@devias.io',
		name: 'Anje Keizer',
		phone: '908-691-3242',
	},
	{
		id: uuid(),
		address: {
			country: 'USA',
			state: 'Texas',
			city: 'Dallas',
			street: '75247',
		},
		avatarUrl: '/static/images/avatars/avatar_6.png',
		createdAt: 1554757200000,
		email: 'clarke.gillebert@devias.io',
		name: 'Clarke Gillebert',
		phone: '972-333-4106',
	},
	{
		id: uuid(),
		address: {
			country: 'USA',
			state: 'California',
			city: 'Bakerfield',
			street: '317 Angus Road',
		},
		avatarUrl: '/static/images/avatars/avatar_1.png',
		createdAt: 1554670800000,
		email: 'adam.denisov@devias.io',
		name: 'Adam Denisov',
		phone: '858-602-3409',
	},
	{
		id: uuid(),
		address: {
			country: 'USA',
			state: 'California',
			city: 'Redondo Beach',
			street: '2188  Armbrester Drive',
		},
		avatarUrl: '/static/images/avatars/avatar_7.png',
		createdAt: 1554325200000,
		email: 'ava.gregoraci@devias.io',
		name: 'Ava Gregoraci',
		phone: '415-907-2647',
	},
	{
		id: uuid(),
		address: {
			country: 'USA',
			state: 'Nevada',
			city: 'Las Vegas',
			street: '1798  Hickory Ridge Drive',
		},
		avatarUrl: '/static/images/avatars/avatar_8.png',
		createdAt: 1523048400000,
		email: 'emilee.simchenko@devias.io',
		name: 'Emilee Simchenko',
		phone: '702-661-1654',
	},
	{
		id: uuid(),
		address: {
			country: 'USA',
			state: 'Michigan',
			city: 'Detroit',
			street: '3934  Wildrose Lane',
		},
		avatarUrl: '/static/images/avatars/avatar_9.png',
		createdAt: 1554702800000,
		email: 'kwak.seong.min@devias.io',
		name: 'Kwak Seong-Min',
		phone: '313-812-8947',
	},
	{
		id: uuid(),
		address: {
			country: 'USA',
			state: 'Utah',
			city: 'Salt Lake City',
			street: '368 Lamberts Branch Road',
		},
		avatarUrl: '/static/images/avatars/avatar_10.png',
		createdAt: 1522702800000,
		email: 'merrile.burgett@devias.io',
		name: 'Merrile Burgett',
		phone: '801-301-7894',
	},
];

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	minWidth: '70vw',
	minHeight: '60vh',
	maxHeight: '90vh',
	overflowX: ' auto',
	bgcolor: 'background.paper',
	// border: '2px solid #000',
	boxShadow: 24,
	borderRadius: '1rem',
	p: 4,
};

const ResultData = [
	// [20655, 'john Doe', 'JohnDoe@dev.co', 'JODO', 1555016400000],
	{
		firstname: 'John',
		lastname: 'doe',
		phone: '5655656565',
		email: 'dsnsnn@gmgmg.cmo',

		passengerCount: '2',
		pnr: 'xssc',
		mco: '5',
		airlineCode: 'ss55',

		totalCharge: '55',
		pricePerPax: '5',

		productType: 'flight',
		bookingType: 'new',
		fareType: 'private',
		bookedon: 'trippro',
		departureDateValue: '22/04/2022',
		returnDateValue: '28/04/2022',
	},
];
