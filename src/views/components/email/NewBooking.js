import React, { useState, useEf } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  InputAdornment,
  TextField,
  IconButton,
  Modal,
  Button,
  Paper,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
import Email1 from "../email1";
import axios from "axios";
import qs from "qs";

import {
  BASEURL,
  createQueryString,
  errorToast,
  successToast,
} from "../../../utils/Utils";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { createTheme } from "@mui/material/styles";

// mui ICon
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { lightGreen } from "@mui/material/colors";

const NewBooking = ({ inputList1, setInputList1 }) => {
  const [selectedEmailTemplate, setSelectedEmailTemplate] = useState(1);

  const [totalAmt, setTotalAmt] = useState(0);
  const [previewModal, setPreviewModal] = useState(false);
  const [pnrValue, setPnrValue] = useState(
    "1 VS8020 M 15JAN 2 BOMLHR HK1 2 235A 700A 77W E0 R"
  );
  const [pnrData, setPnrData] = useState([]);

  const calculateTotalAmount = () => {
    let Amount = [];
    inputList1.map((x, i) => {
      Amount.push(inputList1[i].price);
    });

    var total = 0;
    for (var i in Amount) {
      total += Number(Amount[i]);
    }
    setTotalAmt(total);
  };
  const handleEmailTemplateChange = (e) => {
    setSelectedEmailTemplate(Number(e.target.value));
    // console.log(selectedEmailTemplate);
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList1];
    list[index][name] = value;
    setInputList1(list);
    // tableData(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    var list = [...inputList1];
    list.splice(index, 1);
    setInputList1(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList1([
      ...inputList1,
      {
        firstName: "",
        middleName: "",
        lastName: "",
        ticket: "",
        confirmation: "",
        price: "",
      },
    ]);
    // setInputList1([...inputList1, {firstName: 'john', middleName: 'D', lastName: 'doe', ticket: '2.72136E+11', confirmation: 'KFQHMW', price: '200'}]);
    calculateTotalAmount();
  };
  const handlePnrConverter = async (e) => {
    e.preventDefault();
    axios
      .post(
        `https://api.pnrconverter.com/api`,
        {
          pnr: pnrValue,
        },
        {
          headers: {
            ContentType: "application/x-www-form-urlencoded",
            PUBLIC_APP_KEY:
              "6e0b98437220f87494a76c81543e941083aa6a4c85a2c87be5820372e87b82c9",
            PRIVATE_APP_KEY: "pCPsHMMMZI2J2ZF4GAKB0v9XGxs0Yknxva1",
          },
        }
      )
      .then((response) => {
        setPnrData(response.data.flightData.flights);
      })
      .catch((e) => {
        console.log(e.response.data.message);
      });
  };
  function clean(obj) {
    obj.map((x, i) => {
      for (var propName in x) {
        if (
          obj[i][propName] === null ||
          obj[i][propName] === undefined ||
          obj[i][propName] === ""
        ) {
          delete obj[i][propName];
        }
      }
    });

    return obj;
  }
  return (
    <>
      <Box sx={{ mt: 2, p: 1 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {[
                  "First Name",
                  "Middle Name",
                  "last Name",
                  "Ticket",
                  "Confirmation",
                  "Price",
                  "Action",
                ].map((th) => (
                  <TableCell key={th}>{th}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {inputList1.map((x, i) => {
                return (
                  <TableRow
                    key={i}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell>
                      <TextField
                        required
                        size="small"
                        name="firstName"
                        label="First Name"
                        fullWidth
                        autoComplete="firstName"
                        onChange={(e) => {
                          handleInputChange(e, i);
                        }}
                        value={inputList1[i].firstName}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        required
                        size="small"
                        name="middleName"
                        label="Middle Name"
                        fullWidth
                        autoComplete="middleName"
                        onChange={(e) => {
                          handleInputChange(e, i);
                        }}
                        value={inputList1[i].middleName}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        required
                        name="lastName"
                        label="Last Name"
                        size="small"
                        fullWidth
                        autoComplete="lastName"
                        onChange={(e) => {
                          handleInputChange(e, i);
                        }}
                        value={inputList1[i].lastName}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        required
                        name="ticket"
                        label="Ticket"
                        fullWidth
                        size="small"
                        autoComplete="ticket"
                        onChange={(e) => {
                          handleInputChange(e, i);
                        }}
                        value={inputList1[i].ticket}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        required
                        name="confirmation"
                        size="small"
                        label="Confirmation"
                        fullWidth
                        autoComplete="confirmation"
                        onChange={(e) => {
                          handleInputChange(e, i);
                        }}
                        value={inputList1[i].confirmation}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        required
                        name="price"
                        size="small"
                        label="Price"
                        fullWidth
                        autoComplete="price"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">$</InputAdornment>
                          ),
                        }}
                        onChange={(e) => {
                          handleInputChange(e, i);
                          calculateTotalAmount();
                        }}
                        value={inputList1[i].price}
                      />
                    </TableCell>
                    {inputList1.length !== 1 && (
                      <Grid container>
                        <Grid item xs={6} md={2}>
                          <Button
                            startIcon={
                              <DeleteOutlineIcon
                                color="error"
                                fontSize="small"
                              />
                            }
                            onClick={() => handleRemoveClick(i)}
                            sx={{ mr: 1, mt: "1.8rem" }}
                          ></Button>
                        </Grid>
                      </Grid>
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Grid container spacing={1} sx={{ m: 0, p: 1 }}>
        {inputList1.length < 9 && (
          <Grid item xs={6} md={12} sx={{ pr: 1 }}>
            <Button
              startIcon={<AddIcon fontSize="small" />}
              fullWidth={true}
              onClick={handleAddClick}
              sx={{ mr: 1, pr: 1 }}
              variant="outlined"
            >
              Add new
            </Button>
          </Grid>
        )}
        {/* Total Amount */}
        <Grid item xs={6} md={12} sx={{ pr: 1, my: 3 }}>
          <TextField
            disabled
            size="small"
            required
            name="totalAmount"
            label="Grand Total"
            fullWidth={true}
            onChange={(e) => {
              setTotalAmt(e.target.value);
            }}
            value={totalAmt}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default NewBooking;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "45vw",
  maxWidth: "60vw",
  minHeight: "60vh",
  maxHeight: "90vh",
  overflowX: " auto",
  bgcolor: "background.paper",
  // border: '2px solid #000',
  boxShadow: 24,
  borderRadius: "1rem",
  p: 4,
};
