import React, { useState, useEffect } from "react";

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
  Tooltip,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Paper, ThemeProvider } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import UpdateRequestCharge from "./components/modal/UpdateRequestCharge";

import {
  BASEURL,
  createQueryString,
  successToast,
  errorToast,
} from "../utils/Utils";
import axios from "axios";

//  local icon
import { Search as SearchIcon } from "../assets/icons/search";
import CloseIcon from "@mui/icons-material/Close";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PaymentIcon from "@mui/icons-material/Payment";

function ChargeTransaction() {
  const [viewDetailModal, setViewDetailModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(false);
  const [searchId, setSearchId] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  //pagination
  const [totalRecords, setTotalRecords] = useState(-1);
  const [oldTotalRecords, setOldTotalRecords] = useState(-1);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);

  //fetch
  const [requestObj, setRequestObj] = useState([
    {
      cardNumber: 842717555520,
      cvv: 555,
      amount: 55,
      markup: 20,
      remarks: "sasas",
      email: "sandeep@gmail.com",
      phone: "8427175003",
      agent: null,
      ticket: null,
    },
    {
      cardNumber: 842717555520,
      cvv: 555,
      amount: 55,
      markup: 20,
      remarks: "sasas",
      email: "sandeep@gmail.com",
      phone: "8427175003",
      agent: null,
      ticket: null,
    },
  ]);

  // fecth all record
  const loadChargeRequests = async (search) => {
    setIsLoading(true);
    axios
      .get(BASEURL + "/charge/all" + search)
      .then((response) => {
        console.log(response.data.data);
        if (search === "?page=1") {
          //   setOldTotalRecords(response.data.data.totalDocuments);
          // setAllRecords(response.data.data.tickets);
        }
        setRequestObj(response.data.data.tickets);
        // setTotalRecords(response.data.data.totalDocuments);
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

  function searchHandler() {
    setPage(1);
    loadChargeRequests(createQueryString({ searchId, page }));
  }

  const handleReset = () => {
    setSearchId("");
  };

  //  pagination -- change handler
  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    loadChargeRequests(createQueryString({ searchId, page }));
  }, [page]);
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
              Raised Request :
            </Typography>
          </Box>

          {/* Search COmponent */}
          <Box sx={{ mt: 3 }}>
            <Card>
              <CardContent>
                <Box fullWidth sx={{ display: "" }}>
                  <Grid container spacing={4} justifyContent="flex-start">
                    <Grid item xs={3} md={3}>
                      <TextField
                        size="small"
                        fullWidth
                        sx={{ height: `2rem` }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <SvgIcon color="action" fontSize="small">
                                <SearchIcon />
                              </SvgIcon>
                            </InputAdornment>
                          ),
                        }}
                        onChange={(e) => setSearchId(e.target.value)}
                        placeholder="Enter Id"
                        variant="outlined"
                        value={searchId}
                      />
                    </Grid>

                    {/* <Grid item xs={0} md={0}></Grid> */}
                    {/* btn --reset and serach  */}
                    <Grid item xs={3} md={3} sx={{ px: 2, mt: 0.5 }}>
                      <Button
                        sx={{ textTransform: "capitalize", mx: 1 }}
                        size="small"
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
          {/* End: Search  Component */}

          <Box sx={{ mt: 3 }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    {[
                      "Email",
                      "Name",
                      "Booking ID",
                      "Dep Date",
                      "Return Date",
                      "Action",
                    ].map((th) => (
                      <TableCell sx={{ p: 1 }} key={th}>
                        {th}
                      </TableCell>
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
                  ) : requestObj?.length > 0 ? (
                    requestObj.map((row, index) => (
                      <TableRow
                        // key={index}
                        sx={
                          "generate" === "generate"
                            ? { borderLeft: "4px solid #E0021B" }
                            : {}
                        }
                      >
                        <TableCell
                          sx={{ padding: ` 16px 0 16px 8px !important` }}
                        >
                          {row.email}
                        </TableCell>
                        <TableCell
                          sx={{ padding: ` 16px 0 16px 8px !important` }}
                        >
                          {row.phone}
                        </TableCell>
                        <TableCell
                          sx={{ padding: ` 16px 0 16px 8px !important` }}
                        >
                          {row.phone}
                        </TableCell>

                        <TableCell
                          sx={{ padding: ` 16px 0 16px 8px !important` }}
                        >
                          5
                        </TableCell>
                        <TableCell
                          sx={{ padding: ` 16px 0 16px 8px !important` }}
                        >
                          5
                        </TableCell>

                        <TableCell sx={{ p: 0 }}>
                          {/* charge*/}
                          <Tooltip title="Request to charges">
                            <IconButton
                              aria-label="Charge"
                              onClick={() => {
                                setSelectedTicket(row);
                                setViewDetailModal(true);
                              }}
                            >
                              <PaymentIcon />
                            </IconButton>
                          </Tooltip>
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
              />
            </div>
          </Box>
        </Container>
      </Box>

      {/* Open airline Modal */}
      <Modal
        open={viewDetailModal}
        onClose={() => setViewDetailModal(false)}
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
            onClick={() => setViewDetailModal(false)}
            sx={{ position: `absolute`, right: `10px`, top: `10px` }}
          >
            <CloseIcon />
          </IconButton>
          <UpdateRequestCharge
            formData={selectedTicket}
            onClose={() => setViewDetailModal(false)}
          />
        </Box>
      </Modal>
    </>
  );
}

export default ChargeTransaction;
