<<<<<<< HEAD:src/drawer.js
import * as React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import RouteComponents from "./RouteComponents";
=======
import {react, useState} from 'react';
import {NavLink} from 'react-router-dom';
import RouteComponent from '../routes/index';
>>>>>>> 9d2487c3d23177d87646cc846320b6ac5c9351b0:src/others/drawer.js

//  Material UI
import { styled, useTheme } from "@mui/material/styles";
import {
  Avatar,
  Badge,
  Box,
  Divider,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
  CssBaseline,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";

// material icon
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

// local icon
<<<<<<< HEAD:src/drawer.js
import { Bell as BellIcon } from "./assets/icons/bell";
import { UserCircle as UserCircleIcon } from "./assets/icons/user-circle";
import { Users as UsersIcon } from "./assets/icons/users";
import { ChartBar as ChartBarIcon } from "./assets/icons/chart-bar";
import { Cog as CogIcon } from "./assets/icons/cog";
import { Lock as LockIcon } from "./assets/icons/lock";
import { Selector as SelectorIcon } from "./assets/icons/selector";
import { ShoppingBag as ShoppingBagIcon } from "./assets/icons/shopping-bag";
import { User as UserIcon } from "./assets/icons/user";
import { UserAdd as UserAddIcon } from "./assets/icons/user-add";
import { XCircle as XCircleIcon } from "./assets/icons/x-circle";
=======
import {Bell as BellIcon} from '../assets/icons/bell';
import {UserCircle as UserCircleIcon} from '../assets/icons/user-circle';
import {Users as UsersIcon} from '../assets/icons/users';
import {ChartBar as ChartBarIcon} from '../assets/icons/chart-bar';
import {Cog as CogIcon} from '../assets/icons/cog';
import {Lock as LockIcon} from '../assets/icons/lock';
import {Selector as SelectorIcon} from '../assets/icons/selector';
import {ShoppingBag as ShoppingBagIcon} from '../assets/icons/shopping-bag';
import {User as UserIcon} from '../assets/icons/user';
import {UserAdd as UserAddIcon} from '../assets/icons/user-add';
import {XCircle as XCircleIcon} from '../assets/icons/x-circle';
>>>>>>> 9d2487c3d23177d87646cc846320b6ac5c9351b0:src/others/drawer.js

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
<<<<<<< HEAD:src/drawer.js
  const [open, setOpen] = React.useState(false);
=======
	const [open, setOpen] = useState(false);
>>>>>>> 9d2487c3d23177d87646cc846320b6ac5c9351b0:src/others/drawer.js

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/*  custom navabar  */}

      <AppBar
        sx={{
          // left: open ? 240 : 0,
          // width: open ? `calc(100% - 240px)` : null,
          background: "rgb(255, 255, 255)",
          boxShadow: "none",
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2,
          }}
        >
          {/*  hamburger menu icon  */}

          <IconButton
            onClick={open ? handleDrawerClose : handleDrawerOpen}
            sx={{
              display: {
                xs: "inline-flex",
              },
            }}
          >
            {open ? <CloseIcon /> : <MenuIcon fontSize="small" />}
            {/* <MenuIcon fontSize='small' /> */}
          </IconButton>

          {/*  search icon  */}
          <Tooltip title="Search">
            <IconButton sx={{ ml: 1 }}>
              <SearchIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Box sx={{ flexGrow: 1 }} />

          {/* <Box sx={{flexGrow: 1}} /> */}

          {/* user icon  */}

          <Tooltip title="Contacts">
            <IconButton sx={{ ml: 1 }}>
              <UsersIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          {/* notification icon  */}

          <Tooltip title="Notifications">
            <IconButton sx={{ ml: 1 }}>
              <Badge badgeContent={4} color="primary" variant="dot">
                <BellIcon fontSize="small" />
              </Badge>
            </IconButton>
          </Tooltip>
          <Typography color="#000">John Doe</Typography>
          {/* avatar/user  icon  */}
          <Avatar
            sx={{
              height: 40,
              width: 40,
              ml: 1,
            }}
            src="/static/images/avatars/avatar_1.png"
          >
            <UserCircleIcon fontSize="small" />
          </Avatar>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader> </DrawerHeader>
        {/* <List>
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
				</List> */}
        {/* <Divider /> */}
        <List>
          {items.map((item, index) => (
            <NavLink
              style={({ isActive }) => {
                return {
                  display: "block",
                  margin: "1rem 0",
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  color: isActive ? "#000" : "",
                  background: isActive ? " rgb(227, 242, 253)" : "",
                  borderRadius: "5px",
                  textDecoration: "none !important",
                  color: `unset !important`,
                };
              }}
              className="navlink-decoration"
              to={item.href}
            >
              <ListItemButton
                key={item.title}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.title}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </NavLink>
          ))}
        </List>
      </Drawer>

<<<<<<< HEAD:src/drawer.js
      {/* MAIN - child conotain */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          // background: 'rgb(227, 242, 253) !Important',
          borderRadius: "2rem",
          margin: "9vh 0.5rem 0",
          minHeight: "90vh",
          background: "#E3F2FD",
          height: "auto",
          boxShadow: "inset rgb(0 0 0 / 7%) 0px 0px 21px 1px",
        }}
      >
        <DrawerHeader />
        <RouteComponents />
      </Box>
    </Box>
  );
=======
				<RouteComponent />
			</Box>
		</Box>
	);
>>>>>>> 9d2487c3d23177d87646cc846320b6ac5c9351b0:src/others/drawer.js
}

const items = [
  {
    href: "/",
    icon: <ChartBarIcon fontSize="small" />,
    title: "Dashboard",
  },
  {
    href: "/customers",
    icon: <UsersIcon fontSize="small" />,
    title: "Customers",
  },
  {
    href: "/products",
    icon: <ShoppingBagIcon fontSize="small" />,
    title: "Products",
  },
  {
    href: "/account",
    icon: <UserIcon fontSize="small" />,
    title: "Account",
  },
  {
    href: "/settings",
    icon: <CogIcon fontSize="small" />,
    title: "Settings",
  },
  {
    href: "/login",
    icon: <LockIcon fontSize="small" />,
    title: "Login",
  },
  {
    href: "/register",
    icon: <UserAddIcon fontSize="small" />,
    title: "Register",
  },
  {
    href: "/404",
    icon: <XCircleIcon fontSize="small" />,
    title: "Error",
  },
];
