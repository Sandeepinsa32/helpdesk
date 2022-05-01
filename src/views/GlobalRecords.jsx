import React, { useState, useEffect } from "react";

import { BASEURL } from "../utils/Utils";
import axios from "axios";

import {
  Box,
  Container,
  Button,
  Modal,
  IconButton,
  Typography,
} from "@mui/material";
// import { Search } from "./components/globalSearch/Search";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Paper, ThemeProvider, Pagination } from "@mui/material";

//icon
import CloseIcon from "@mui/icons-material/Close";

export default function SearchRecord() {
  const [recordData, setRecordData] = useState([]);
  const [open, setOpen] = useState(false);
  const [viewData, setViewData] = useState(false);
  const [userData, setUserData] = useState({});
  const handleOpen = () => setOpen(true);
  const [search, setSearch] = useState("");
  const handleClose = () => setOpen(false);

  const loadTransactions = async (search) => {
    console.log(search);
    axios
      .get(BASEURL + "/ticket/all" + search)
      .then((response) => {
        console.log(response.data.data);
        setRecordData(response.data.data);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    loadTransactions(search);
  }, []);

  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

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

          {/* <Search setSearch={setSearch} /> */}
          <Box sx={{ mt: 3 }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    {[
                      "Email",
                      "Agent Name",
                      //	'Booking ID',
                      "Phone",
                      "Total G.P",
                      "Airline",
                      "	No.of PAX",
                      "Fare Type",
                      //'Dep Date', 'Return Date',
                      "action",
                    ].map((th) => (
                      <TableCell key={th}>{th}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recordData?.length &&
                    recordData.map((row, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell>{row.email}</TableCell>
                        <TableCell>{`${row.firstName} ${row.lastName}`}</TableCell>
                        {/* <TableCell>{row._id.substring(0, 8)}...</TableCell> */}
                        {/* <TableCell>{row.cards[0].card}</TableCell> */}
                        <TableCell>{row.phone}</TableCell>
                        <TableCell>{row.grandTotal}</TableCell>
                        <TableCell>{row.airlineCode}</TableCell>
                        <TableCell>{row.passengerCount}</TableCell>
                        <TableCell>{row.fareType}</TableCell>
                        {/* <TableCell>{row.departureDate.substring(0, 10)}</TableCell>
												<TableCell>{row.returnDate.substring(0, 10)}</TableCell> */}

                        <TableCell>
                          <Button
                            variant="contained"
                            size="small"
                            onClick={() => {
                              console.log(row);
                              // setViewData(true);
                              // setUserData(row);
                              // handleOpen();
                            }}
                          >
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
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
              <Pagination count={10} page={page} onChange={handleChange} />
            </div>
          </Box>
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
