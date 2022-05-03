import React, { useState, useEffect } from "react";

//api's
import { BASEURL, createQueryString } from "../utils/Utils";
import axios from "axios";

//material UI
import {
  Box,
  Button,
  Card,
  Container,
  Modal,
  IconButton,
  Grid,
  CardContent,
  TextField,
  ThemeProvider,
  Pagination,
  Paper,
  InputAdornment,
  SvgIcon,
  CircularProgress,
  Typography,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { createTheme } from "@mui/material/styles";

//icon
import CloseIcon from "@mui/icons-material/Close";
import { Search as SearchIcon } from "../assets/icons/search";

export default function SearchRecord() {
  const [recordData, setRecordData] = useState([]);
  const [open, setOpen] = useState(false);
  const [viewData, setViewData] = useState(false);
  const [oldTotalRecords, setOldTotalRecords] = useState(-1);
  const [allRecords, setAllRecords] = useState([]);
  const [userData, setUserData] = useState({});
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = useState("");
  const [totalRecords, setTotalRecords] = useState(-1);
  const [size, setSize] = useState(5);
  const [bookingid, setBookingid] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  //Handler's
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (event, value) => {
    setPage(value);
  };
  const loadTransactions = async (search) => {
    console.log(search);
    setIsLoading(true);
    axios
      .get(BASEURL + "/ticket/all" + search)
      .then((response) => {
        console.log(response.data);
        if (search === "?page=1") {
          setOldTotalRecords(response.data.data.totalDocuments);

          setAllRecords(response.data.data.tickets);
        }

        setRecordData(response.data.data.tickets);
        setTotalRecords(response.data.data.totalDocuments);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
      });
  };

  const addLog = async (ticketId) => {
    axios
      .post(BASEURL + "/log", {
        ticket: ticketId,
      })
      .then((response) => {
        console.log(response.data);
        alert("log added");
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
      });
  };

  const searchHandler = () => {
    setPage(1);
    loadTransactions(createQueryString({ email, bookingid, phone, page }));
  };
  const handleReset = () => {
    setPhone("");
    setEmail("");
    setBookingid("");
    setRecordData(allRecords);
    setTotalRecords(oldTotalRecords);
  };
  useEffect(() => {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + JSON.parse(localStorage.getItem("token"));

    loadTransactions(createQueryString({ email, bookingid, phone, page }));
  }, [page]);

  // MUi Theme COlor Theme
  const theme = createTheme({
    palette: {
      neutral: {
        main: "#64748B",
        contrastText: "#fff",
      },
    },
  });
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
        <Container maxWidth={false}>
          <Typography sx={{ m: 1 }} variant="h6">
            All Transaction
          </Typography>

          {/* Start : Search Component */}

          <Box>
            <ThemeProvider theme={theme}>
              {/* Search COmponent */}
              <Box sx={{ mt: 3 }}>
                <Card>
                  <CardContent>
                    <Box fullWidth sx={{ display: "" }}>
                      <Grid container spacing={3}>
                        <Grid item sm={2} md={3}>
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

                        <Grid item sm={2} md={3}>
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
                        <Grid item sm={2} md={3}>
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
                        <Grid item sm={4} md={3} sx={{ px: 2, mt: 0.5 }}>
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
                  ) : recordData?.length > 0 ? (
                    recordData.map((row, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
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
                              console.log(row);
                              setViewData(true);
                              setUserData(row);
                              handleOpen();
                            }}
                          >
                            View
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
          </Box>
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
            />
          </div>
        </Container>
      </Box>
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

          <Typography sx={{ m: 1 }} variant="body2">
            {JSON.stringify(userData)}
          </Typography>
        </Box>
      </Modal>
    </>
  );
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "70vw",
  maxWidth: "90vw",
  minHeight: "60vh",
  maxHeight: "90vh",
  // overflowX: ' auto',
  bgcolor: "background.paper",
  // border: '2px solid #000',
  boxShadow: 24,
  borderRadius: "1rem",
  p: 4,
};
