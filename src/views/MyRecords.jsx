import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import AddNewRecord from "./AddNewRecord";

import {
  BASEURL,
  createQueryString,
  successToast,
  errorToast,
} from "../utils/Utils";
import axios from "axios";

//@material-ui
import {
  Box,
  Button,
  Card,
  Container,
  CardContent,
  TextField,
  CircularProgress,
  Modal,
  InputAdornment,
  SvgIcon,
  Typography,
  Grid,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  List,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Paper, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import Pagination from "@mui/material/Pagination";

import Email from "./Email";

//  local icon
import { Search as SearchIcon } from "../assets/icons/search";
import CloseIcon from "@mui/icons-material/Close";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

export const Transaction = () => {
  const [myRecords, setMyRecords] = useState([]);
  const [open, setOpen] = useState(false);
  const [openLog, setOpenLog] = useState(false);
  const [openEmail, setOpenEmail] = useState(false);
  const [viewEmail, setViewEmail] = useState(false);
  const [viewData, setViewData] = useState(false);
  const [userData, setUserData] = useState({});
  // const [searchId, setSearchId] = useState('');
  // const [searchEmail, setSearchEmail] = useState('');
  // const [searchAgentCode, SearchAgentCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(-1);
  const [size, setSize] = useState(5);
  const [bookingid, setBookingid] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [oldTotalRecords, setOldTotalRecords] = useState(-1);
  const [allRecords, setAllRecords] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };
  const handleLogClose = () => {
    setOpenLog(false);
  };
  const handleEmailClose = () => {
    setOpenEmail(false);
  };
  const navigate = useNavigate();
  const goToAddNewRecord = () => {
    navigate("/add-new-record");
  };

  const [page, setPage] = React.useState(1);

  function searchHandler() {
    setPage(1);
    loadTransactions(createQueryString({ email, bookingid, phone, page }));
  }
  const handleReset = () => {
    setPhone("");
    setEmail("");
    setBookingid("");
    setMyRecords(allRecords);
    setTotalRecords(oldTotalRecords);
  };
  const handleChange = (event, value) => {
    setPage(value);
  };
  const loadTransactions = async (search) => {
    // console.log(search);
    setIsLoading(true);
    axios
      .get(BASEURL + "/ticket/my" + search, {
        headers: {
          authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
      })
      .then((response) => {
        // console.log(response.data);
        if (search === "?page=1") {
          setOldTotalRecords(response.data.data.totalDocuments);

          setAllRecords(response.data.data.tickets);
        }

        setMyRecords(response.data.data.tickets);
        setTotalRecords(response.data.data.totalDocuments);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      })
      .catch((e) => {
        console.log(e);
        // console.log(e.response);
        // console.log(e.response.status);
        setIsLoading(false);
        errorToast(e.response.data.message);
      });
  };

  useEffect(() => {
    console.log("useEffect");
    loadTransactions(createQueryString({ email, bookingid, phone, page }));
  }, [page]);

  // function currentDate() {
  // 	let today = new Date();
  // 	let dd = String(today.getDate()).padStart(2, '0');
  // 	let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  // 	let yyyy = today.getFullYear();

  // 	today = mm + '/' + dd + '/' + yyyy;
  // 	return today;
  // }
  const theme = createTheme({
    palette: {
      neutral: {
        main: "#64748B",
        contrastText: "#fff",
      },
    },
  });
  let arr = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];
  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pb: 4,
          pt: 2,
        }}
      >
        <Container maxWidth={false} sx={{ p: `0!important` }}>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              m: -1,
            }}
          >
            <Typography sx={{ m: 1 }} variant="h6">
              My Records
            </Typography>

            <Box sx={{ m: 1 }}>
              <Button
                color="primary"
                onClick={goToAddNewRecord}
                variant="contained"
              >
                Add New Record
              </Button>
            </Box>
          </Box>

          {/*  Search  Component */}

          <Box>
            <ThemeProvider theme={theme}>
              {/* Search COmponent */}
              <Box sx={{ mt: 3 }}>
                <Card>
                  <CardContent>
                    <Box fullWidth sx={{ display: "" }}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={3}>
                          <TextField
                            size="small"
                            sx={{ width: `19vw`, height: `2rem` }}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <SvgIcon color="action" fontSize="small">
                                    <SearchIcon />
                                  </SvgIcon>
                                </InputAdornment>
                              ),
                            }}
                            onChange={(e) => setBookingid(e.target.value)}
                            placeholder="Enter Booking Id"
                            variant="outlined"
                            value={bookingid}
                          />
                        </Grid>

                        <Grid item xs={12} md={3}>
                          <TextField
                            size="small"
                            sx={{ width: `19vw`, height: `2rem` }}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <SvgIcon color="action" fontSize="small">
                                    <SearchIcon />
                                  </SvgIcon>
                                </InputAdornment>
                              ),
                            }}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter Email id"
                            variant="outlined"
                            value={email}
                          />
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <TextField
                            size="small"
                            sx={{ width: `19vw`, height: `2rem` }}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <SvgIcon color="action" fontSize="small">
                                    <SearchIcon />
                                  </SvgIcon>
                                </InputAdornment>
                              ),
                            }}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Enter Phone Number"
                            variant="outlined"
                            value={phone}
                          />
                        </Grid>
                        <Grid item xs={12} md={3} sx={{ px: 2, mt: 0.5 }}>
                          <Button
                            sx={{ textTransform: "capitalize", mx: 1 }}
                            size="small"
                            disabled={!(email || phone || bookingid)}
                            variant="contained"
                            onClick={searchHandler}
                          >
                            Search
                          </Button>
                          <Button
                            sx={{ textTransform: "capitalize", mx: 1 }}
                            size="small"
                            variant="contained"
                            color="neutral"
                            onClick={handleReset}
                          >
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
          {/* End: Search  Component */}

          <Box sx={{ mt: 3 }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    {[
                      "Email",
                      "Agent Name",
                      "Booking ID",
                      //   "CCH Name",
                      "Phone",
                      "Total G.P",
                      "Airline",
                      "	No.of PAX",
                      "Fare Type",
                      "Dep Date",
                      "Return Date",
                      "action",
                    ].map((th) => (
                      <TableCell key={th}>{th}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={10}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <CircularProgress />
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : myRecords?.length > 0 ? (
                    myRecords.map((row, index) => (
                      <TableRow
                        key={index}
                        sx={
                          index % 2 == 0
                            ? { borderLeft: "8px solid #E0021B" }
                            : { borderLeft: "8px solid #76DF29" }
                        }
                      >
                        <TableCell>{row.email}</TableCell>
                        <TableCell>{`${row.firstName} ${row.lastName}`}</TableCell>
                        <TableCell>{row._id.substring(0, 8)}...</TableCell>
                        {/* <TableCell>{row.cards[0].card}</TableCell> */}
                        <TableCell>{row.phone}</TableCell>
                        <TableCell>{row.grandTotal}</TableCell>
                        <TableCell>{row.airlineCode}</TableCell>
                        <TableCell>{row.passengerCount}</TableCell>
                        <TableCell>{row.fareType}</TableCell>
                        <TableCell>
                          {row.departureDate.substring(0, 10)}
                        </TableCell>
                        <TableCell>{row.returnDate.substring(0, 10)}</TableCell>

                        <TableCell>
                          <Button
                            variant="contained"
                            size="small"
                            onClick={() => {
                              // console.log(row);
                              setViewData(true);
                              setUserData(row);
                              handleOpen();
                            }}
                          >
                            Update
                          </Button>

                          <Button
                            sx={{
                              margin: ` 0 8px`,
                            }}
                            variant="contained"
                            size="small"
                            onClick={(e) => {
                              // alert(row.id);
                              setViewEmail(row._id);
                              // console.log(row.id);
                              setOpenEmail(true);
                            }}
                          >
                            Email
                          </Button>

                          <Button
                            variant="contained"
                            size="small"
                            onClick={() => setOpenLog(true)}
                          >
                            logs
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={10}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <h2>No data found</h2>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "20px auto",
                width: "100%",
              }}
            >
              <Pagination
                count={totalRecords != -1 && Math.ceil(totalRecords / size)}
                page={page}
                onChange={handleChange}
              />{" "}
            </div>
          </Box>
        </Container>
      </Box>

      {/* open Logs*/}
      <Modal
        open={openLog}
        onClose={handleLogClose}
        size="xs"
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} style={{ padding: "32px 16px !important" }}>
          <IconButton
            onClick={handleLogClose}
            sx={{ position: `absolute`, right: `10px`, top: `10px` }}
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ fontSize: `1rem` }} variant="Body2">
            View Logs
          </Typography>
          <Paper>
            <List>
              {arr.map((a, i) => {
                return (
                  <ListItem disablePadding key={i}>
                    <ListItemButton>
                      <ListItemIcon>
                        <ArrowRightAltIcon />
                      </ListItemIcon>

                      <ListItemText
                        primary="John Recently Viewed This Record"
                        secondary={
                          <>
                            <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              John Doe ( 20025)
                            </Typography>
                            {" — For Genrating E-mail "}
                            <span
                              style={{ float: "right", width: "fit-content	" }}
                            >
                              11/05/2022 8:30 PM
                            </span>
                          </>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Paper>
        </Box>
      </Modal>
      {/* Open View Record modal */}
      <Modal
        open={open}
        onClose={handleClose}
        size="xs"
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <IconButton
            onClick={handleClose}
            sx={{ position: `absolute`, right: `10px`, top: `10px` }}
          >
            <CloseIcon />
          </IconButton>
          <AddNewRecord isView={true} data={userData} />
        </Box>
      </Modal>

      {/* Open EMail Modal */}
      <Modal
        open={openEmail}
        onClose={handleEmailClose}
        size="xs"
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            minWidth: "70vw",
            minHeight: "60vh",
            maxHeight: "90vh",
            overflowX: " auto",
            bgcolor: "background.paper",
            // border: '2px solid #000',
            boxShadow: 24,
            borderRadius: "1rem",
            p: 4,
          }}
        >
          <IconButton
            onClick={handleEmailClose}
            sx={{ position: `absolute`, right: `10px`, top: `10px` }}
          >
            <CloseIcon />
          </IconButton>
          <Email Ticketid={viewEmail} />
        </Box>
      </Modal>
    </>
  );
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "70vw",
  minHeight: "60vh",
  maxHeight: "90vh",
  overflowX: " auto",
  bgcolor: "background.paper",
  // border: '2px solid #000',
  boxShadow: 24,
  borderRadius: "1rem",
  p: 4,
};
