import * as React from 'react';
import {styled, useTheme} from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CloseIcon from '@mui/icons-material/Close';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
// import {DashboardNavbar} from './dashboard-navbar';

import {Avatar, Badge, Box, IconButton, Toolbar, Tooltip} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {Bell as BellIcon} from './assets/icons/bell';
import {UserCircle as UserCircleIcon} from './assets/icons/user-circle';
import {Users as UsersIcon} from './assets/icons/users';

import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import {ChartBar as ChartBarIcon} from './assets/icons/chart-bar';
import {Cog as CogIcon} from './assets/icons/cog';
import {Lock as LockIcon} from './assets/icons/lock';
import {Selector as SelectorIcon} from './assets/icons/selector';
import {ShoppingBag as ShoppingBagIcon} from './assets/icons/shopping-bag';
import {User as UserIcon} from './assets/icons/user';
import {UserAdd as UserAddIcon} from './assets/icons/user-add';

import {XCircle as XCircleIcon} from './assets/icons/x-circle';
// import {Users as UsersIcon} from './assets/icons/users';

const drawerWidth = 240;

const openedMixin = (theme) => ({
	width: drawerWidth,
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: 'hidden',
});

const closedMixin = (theme) => ({
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: 'hidden',
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up('sm')]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

const DrawerHeader = styled('div')(({theme}) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
})(({theme, open}) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(({theme, open}) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: 'nowrap',
	boxSizing: 'border-box',
	...(open && {
		...openedMixin(theme),
		'& .MuiDrawer-paper': openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		'& .MuiDrawer-paper': closedMixin(theme),
	}),
}));

export default function MiniDrawer() {
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<Box sx={{display: 'flex'}}>
			<CssBaseline />

			{/*  custom navabar  */}
			<AppBar
				sx={{
					// left: open ? 240 : 0,
					// width: open ? `calc(100% - 240px)` : null,
					background: 'rgb(255, 255, 255)',
					boxShadow: 'none',
				}}>
				<Toolbar
					disableGutters
					sx={{
						minHeight: 64,
						left: 0,
						px: 2,
					}}>
					<IconButton
						onClick={open ? handleDrawerClose : handleDrawerOpen}
						sx={{
							display: {
								xs: 'inline-flex',
							},
						}}>
						{open ? <CloseIcon /> : <MenuIcon fontSize='small' />}
						{/* <MenuIcon fontSize='small' /> */}
					</IconButton>
					{/*  search icon  */}
					<Tooltip title='Search'>
						<IconButton sx={{ml: 1}}>
							<SearchIcon fontSize='small' />
						</IconButton>
					</Tooltip>

					<Box sx={{flexGrow: 1}} />

					{/* <Box sx={{flexGrow: 1}} /> */}

					{/* user icon  */}
					{/* <Tooltip title='Contacts'>  
						<IconButton sx={{ml: 1}}>
							<UsersIcon fontSize='small' />
						</IconButton>
					</Tooltip> */}

					{/* notification icon  */}
					<Tooltip title='Notifications'>
						<IconButton sx={{ml: 1}}>
							<Badge badgeContent={4} color='primary' variant='dot'>
								<BellIcon fontSize='small' />
							</Badge>
						</IconButton>
					</Tooltip>
					{/* avatar/user  icon  */}
					<Avatar
						sx={{
							height: 40,
							width: 40,
							ml: 1,
						}}
						src='/static/images/avatars/avatar_1.png'>
						<UserCircleIcon fontSize='small' />
					</Avatar>
				</Toolbar>
			</AppBar>

			<Drawer variant='permanent' open={open}>
				<DrawerHeader> </DrawerHeader>
				<List>
					<ListItemButton
						key='Agent'
						sx={{
							minHeight: 48,
							justifyContent: open ? 'initial' : 'center',
							// px: 2.5,
						}}>
						<ListItemIcon
							sx={{
								minWidth: 0,
								mr: open ? 1.35 : 'auto',
								// justifyContent: 'center',
							}}>
							<Avatar
								sx={{
									height: 40,
									width: 40,
									ml: -0.5,
								}}
								src='/static/images/avatars/avatar_1.png'>
								<UserCircleIcon fontSize='small' />
							</Avatar>
						</ListItemIcon>
						<ListItemText primary='John Doe' sx={{opacity: open ? 1 : 0}} />
					</ListItemButton>
				</List>
				{/* <Divider /> */}
				<List>
					{items.map((item, index) => (
						<ListItemButton
							key={item.title}
							sx={{
								minHeight: 48,
								justifyContent: open ? 'initial' : 'center',
								px: 2.5,
							}}>
							<ListItemIcon
								sx={{
									minWidth: 0,
									mr: open ? 3 : 'auto',
									justifyContent: 'center',
								}}>
								{item.icon}
							</ListItemIcon>
							<ListItemText primary={item.title} sx={{opacity: open ? 1 : 0}} />
						</ListItemButton>
					))}
				</List>
			</Drawer>

			{/* MAIN - child conotain */}
			<Box component='main' sx={{flexGrow: 1, p: 3, background: 'rgb(227, 242, 253) !Important', borderRadius: '2rem', mt: '9vh', height: '90vh'}}>
				<DrawerHeader />
				<Typography paragraph>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
					facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id donec
					ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras. Metus
					vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget arcu
					dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien faucibus et molestie ac.
				</Typography>
				<Typography paragraph>
					Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac tincidunt.
					Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed vulputate
					odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et tortor.
					Habitant morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas accumsan
					lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices sagittis orci a.
				</Typography>
			</Box>
		</Box>
	);
}

const items = [
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
];
