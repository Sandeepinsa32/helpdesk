import { react, useState } from "react";
import { AgentProfileModal } from "./components/AgentProfileModal";
import { NavLink, useNavigate } from "react-router-dom";

import RouteComponent from "../MyRoutes";

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
  Modal,
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
import ReceiptIcon from "@mui/icons-material/Receipt";
import LogoutIcon from "@mui/icons-material/Logout";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

// local icon
import { Bell as BellIcon } from "../assets/icons/bell";
import { UserCircle as UserCircleIcon } from "../assets/icons/user-circle";
import { Users as UsersIcon } from "../assets/icons/users";
import { ChartBar as ChartBarIcon } from "../assets/icons/chart-bar";
import { Cog as CogIcon } from "../assets/icons/cog";
import { Lock as LockIcon } from "../assets/icons/lock";
import { Selector as SelectorIcon } from "../assets/icons/selector";
import { ShoppingBag as ShoppingBagIcon } from "../assets/icons/shopping-bag";
import { User as UserIcon } from "../assets/icons/user";
import { UserAdd as UserAddIcon } from "../assets/icons/user-add";
import { XCircle as XCircleIcon } from "../assets/icons/x-circle";

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
  const navigate = useNavigate();
  const goToCustomer = () => {
    navigate("/customers");
  };
  const [open, setOpen] = useState(false);
  const [modalopen, setModalopen] = useState(false);
  const [modalNotiopen, setModalNotiopen] = useState(false);

  const handleNotiModalOpen = () => setModalNotiopen(true);

  const handleNotiModalClose = () => setModalNotiopen(false);

  const handleModalOpen = () => setModalopen(true);
  const handleModalClose = () => setModalopen(false);

  const handleDrawerOpen = () => setOpen(true);

  const handleDrawerClose = () => setOpen(false);

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
          </IconButton>
          {/*  search icon  */}

          <Box sx={{ flexGrow: 1 }} />

          {/* user icon  */}
          <Tooltip title="Add new agent " onClick={goToCustomer}>
            <IconButton sx={{ ml: 1 }}>
              <GroupAddIcon fontSize="large" />
            </IconButton>
          </Tooltip>
          {/* notification icon  */}

          {/* avatar/user  icon  */}
          <Tooltip title="User Details">
            <IconButton sx={{ ml: 1 }} onClick={handleModalOpen}>
              <ManageAccountsIcon fontSize="large" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Logout">
            <NavLink
              className="navlink-decoration"
              onClick={() => localStorage.removeItem("token")}
              to="/login"
            >
              <IconButton sx={{ ml: 1 }}>
                <LogoutIcon fontSize="large" />
              </IconButton>
            </NavLink>
          </Tooltip>
        </Toolbar>
      </AppBar>
      {/* Account Details */}
      <Modal
        open={modalopen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <IconButton
            onClick={handleModalClose}
            sx={{ position: `absolute`, right: `10px`, top: `10px` }}
          >
            <CloseIcon />
          </IconButton>
          <AgentProfileModal />
        </Box>
      </Modal>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader> </DrawerHeader>

        <List>
          {items.map((item, index) => (
            <NavLink
              key={item.title}
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

      {/* MAIN - child conotain */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          // background: 'rgb(227, 242, 253) !Important',
          background: "rgba(0, 0, 0, 0.04) !Important",
          borderRadius: "2rem",
          margin: "9vh 0.5rem 0",
          minHeight: "90vh",
          height: "auto",
          boxShadow: "inset rgb(0 0 0 / 7%) 0px 0px 21px 1px",
        }}
      >
        {/* <DrawerHeader /> */}

        <RouteComponent />
      </Box>
    </Box>
  );
}

const items = [
  {
    href: "/",
    icon: <ChartBarIcon fontSize="small" />,
    title: "Dashboard",
  },

  {
    href: "/my-records",
    icon: <ReceiptIcon fontSize="small" />,
    title: "My Records",
  },
  {
    href: "/all",
    icon: <SearchIcon fontSize="small" />,
    title: "All Transaction",
  },
  // {
  // 	href: '/account',
  // 	icon: <UserIcon fontSize='small' />,
  // 	title: 'Account',
  // },
  // {
  // 	href: '/settings',
  // 	icon: <CogIcon fontSize='small' />,
  // 	title: 'Settings',
  // },
  // {
  // 	href: '/login',
  // 	icon: <LockIcon fontSize='small' />,
  // 	title: 'Login',
  // },
  {
    href: "/logout",
    icon: <LogoutIcon fontSize="small" />,
    title: "Log Out",
  },
  {
    href: "/email",
    icon: <BellIcon fontSize="small" />,
    title: "Email",
  },
  // {
  // 	href: '/404',
  // 	icon: <XCircleIcon fontSize='small' />,
  // 	title: 'Error',
  // },
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "40vw",
  minHeight: "50vh",
  bgcolor: "background.paper",
  // border: '2px solid #000',
  boxShadow: 24,
  borderRadius: "1rem",
  p: 4,
};
