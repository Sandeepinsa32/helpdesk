import React, {useEffect} from 'react';
import {Routes, Route} from 'react-router-dom';
import {Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';

// importing components

import AddUser from './views/Agents';
import SearchRecord from './views/GlobalRecords';
import {Transaction} from './views/MyRecords';
import Email from './views/Email';
import Dashboard from './views/Dashboard';
import ChargeTransaction from './views/ChargeTransaction';
import AddNewRecord from './views/components/AddNewRecord';

const data = {};
export default function RouteComponent({isAdmin}) {
	const navigate = useNavigate();

	const Signoff = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('role');
		localStorage.clear();
		navigate('/login');
	};
	const redirectToDashBoard = () => {
		navigate('/');
	};

	useEffect(() => {
		console.clear();
	});

	return (
		<Routes>
			{/*  DashBOard */}
			<Route path='/' element={<Dashboard />}></Route>
			{/*  MyRecords */}
			<Route path='/my-records' element={<Transaction />}></Route>
			{/*  add New MyRecords */}
			<Route path='/add-new-record' element={<AddNewRecord isview={false} data={data} />}></Route>
			{/*  GlobalRecords */}
			<Route path='/all' element={<SearchRecord />}></Route>

			<Route path='/logout' element={<Signoff />}></Route>
			{isAdmin && (
				<>
					<Route path='/agents' element={<AddUser />}></Route>
					<Route path='/Charge-request' element={<ChargeTransaction />}></Route>
				</>
			)}
			<Route path='*' element={<Dashboard />} />
		</Routes>
	);
}
