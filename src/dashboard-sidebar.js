//  NavBar dashboard -- sidebar

import {useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
// import NextLink from 'next/link';
import PropTypes from 'prop-types';
import {Box, Button, Avatar, Divider, Drawer, Typography, useMediaQuery} from '@mui/material';
import {styled, useTheme} from '@mui/material/styles';
import {UserCircle as UserCircleIcon} from './assets/icons/user-circle';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import {ChartBar as ChartBarIcon} from './assets/icons/chart-bar';
import {Cog as CogIcon} from './assets/icons/cog';
import {Lock as LockIcon} from './assets/icons/lock';
import {Selector as SelectorIcon} from './assets/icons/selector';
import {ShoppingBag as ShoppingBagIcon} from './assets/icons/shopping-bag';
import {User as UserIcon} from './assets/icons/user';
import {UserAdd as UserAddIcon} from './assets/icons/user-add';
import {Users as UsersIcon} from './assets/icons/users';
import {XCircle as XCircleIcon} from './assets/icons/x-circle';
import LogoutIcon from '@mui/icons-material/Logout';
import {Logo} from './logo';
import {NavItem} from './nav-item';

const items = [
	{
		href: '/404',
		icon: <XCircleIcon fontSize='small' />,
		title: 'Error',
	},
	{
		href: '/logout',
		icon: <LogoutIcon fontSize='small' />,
		title: 'Logout',
	},
];

export const DashboardSidebar = (props) => {
	const theme = useTheme();
	const {open, onClose} = props;

	// const router = Router();
	// const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
	// 	defaultMatches: true,
	// 	noSsr: false,
	// });

	// useEffect(
	// 	() => {
	// 		if (!router.isReady) {
	// 			return;
	// 		}

	// 		if (open) {
	// 			onClose?.();
	// 		}
	// 	},
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// 	[router.asPath]
	// );

	if (theme.breakpoints.up('lg')) {
		return (
			<Drawer
				anchor='left'
				open
				PaperProps={{
					sx: {
						backgroundColor: 'neutral.900',
						// color: '#FFFFFF',
						width: 280,
					},
				}}
				variant='permanent'>
				<h1>llless</h1>
			</Drawer>
		);
	}

	return (
		<Drawer
			anchor='left'
			onClose={onClose}
			open
			// open={open}
			PaperProps={{
				sx: {
					backgroundColor: 'neutral.900',
					// color: '#FFFFFF',
					width: 280,
				},
			}}
			sx={{zIndex: (theme) => theme.zIndex.appBar + 100}}
			variant='temporary'>
			{console.log()}
			<h1>dd</h1>
		</Drawer>
	);
};
const content = (
	<>
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				height: '100%',
			}}>
			<div>
				<Box sx={{p: 3}}>
					{/* <Link href='/'> */}
					<a>
						<Logo
							sx={{
								height: 42,
								width: 42,
								margin: `0px 5rem `,
							}}
						/>
					</a>
					{/* </Link> */}
				</Box>
				<Box sx={{px: 2}}>
					<Box
						sx={{
							alignItems: 'center',
							backgroundColor: 'rgba(255, 255, 255, 0.04)',
							cursor: 'pointer',
							display: 'flex',
							justifyContent: 'space-around',
							px: 3,
							py: '11px',
							borderRadius: 1,
						}}>
						<div>
							<Typography color='inherit' variant='subtitle1'>
								Agent vinod
							</Typography>
							<Typography color='neutral.400' variant='body2'>
								Role : Admin
							</Typography>
						</div>

						<Avatar
							sx={{
								height: 40,
								width: 40,
								ml: 1,
							}}
							src='/static/images/avatars/avatar_1.png'>
							<UserCircleIcon fontSize='small' />
						</Avatar>
					</Box>
				</Box>
			</div>
			<Divider
				sx={{
					borderColor: '#2D3748',
					my: 3,
				}}
			/>
			<Box sx={{flexGrow: 1}}>
				{items.map((item) => (
					<NavItem key={item.title} icon={item.icon} href={item.href} title={item.title} />
				))}
			</Box>
			<Divider sx={{borderColor: '#2D3748'}} />
		</Box>
	</>
);

const item2 = [
	{
		href: '/',
		icon: <ChartBarIcon fontSize='small' />,
		title: 'Dashboard',
	},
	{
		href: '/customers',
		icon: <UsersIcon fontSize='small' />,
		title: 'Customers',
	},
	{
		href: '/products',
		icon: <ShoppingBagIcon fontSize='small' />,
		title: 'Products',
	},
	{
		href: '/account',
		icon: <UserIcon fontSize='small' />,
		title: 'Account',
	},
	{
		href: '/settings',
		icon: <CogIcon fontSize='small' />,
		title: 'Settings',
	},
	{
		href: '/login',
		icon: <LockIcon fontSize='small' />,
		title: 'Login',
	},
	{
		href: '/register',
		icon: <UserAddIcon fontSize='small' />,
		title: 'Register',
	},
	{
		href: '/404',
		icon: <XCircleIcon fontSize='small' />,
		title: 'Error',
	},
	{
		href: '/logout',
		icon: <LogoutIcon fontSize='small' />,
		title: 'Logout',
	},
];
