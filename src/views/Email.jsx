import React, { useState, useEffect } from "react";
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
import Email1 from "./components/email1";
import axios from "axios";
import qs from "qs";

import {
  BASEURL,
  createQueryString,
  errorToast,
  successToast,
} from "../utils/Utils";
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

const Email = ({ Ticketid, onClose }) => {
  const [selectedEmailTemplate, setSelectedEmailTemplate] = useState(1);
  const [inputList, setInputList] = useState([
    {
      firstName: "john",
      middleName: "D",
      lastName: "doe",
      ticket: "2.72136E+11",
      confirmation: "KFQHMW",
      price: "200",
    },
  ]);
  const [totalAmt, setTotalAmt] = useState(0);
  const [previewModal, setPreviewModal] = useState(false);
  const [pnrValue, setPnrValue] = useState(
    "1 VS8020 M 15JAN 2 BOMLHR HK1 2 235A 700A 77W E0 R"
  );
  const [pnrData, setPnrData] = useState([]);

  useEffect(() => {
    calculateTotalAmount();
  });
  // handle click event of the Remove button
  const calculateTotalAmount = () => {
    let Amount = [];
    inputList.map((x, i) => {
      Amount.push(inputList[i].price);
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
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    var list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([
      ...inputList,
      {
        firstName: "",
        middleName: "",
        lastName: "",
        ticket: "",
        confirmation: "",
        price: "",
      },
    ]);
    // setInputList([...inputList, {firstName: 'john', middleName: 'D', lastName: 'doe', ticket: '2.72136E+11', confirmation: 'KFQHMW', price: '200'}]);
    calculateTotalAmount();
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

  const handleConfirm = () => {
    calculateTotalAmount();
    let newArr = clean(inputList);
    console.log(Ticketid);
    newArr = newArr.filter((value) => Object.keys(value).length !== 0);
    console.log(pnrValue);
    console.log(
      "selectedEmailTemplate",
      selectedEmailTemplate,
      "inputList ->",
      inputList,
      "newArr - >",
      newArr,
      "totalAmt",
      totalAmt
    );
  };
  const handlePreviewClose = () => {
    setPreviewModal(false);
  };

  const handleSendEmail = async () => {
    axios
      .post(BASEURL + "/ticket/email", {
        data: inputList,
        ticketId: Ticketid,
      })
      .then((res) => {
        console.log(res);
        onClose();
      })
      .catch((e) => console.log(e));
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

  return (
    <>
      <Box sx={{ width: 1, height: 1 }}>
        <>
          <Grid container spacing={1} sx={{ m: 0, p: 1 }}>
            {/*  Email template  */}
            <Grid item md={6} sx={{ pr: 1 }}>
              <FormControl required fullWidth>
                <InputLabel id="Email-template-Dropdown-label">
                  Email Template
                </InputLabel>
                <Select
                  size="small"
                  labelId="Email-template-Dropdown-label	"
                  id="Email-template-Dropdown"
                  value={selectedEmailTemplate}
                  onChange={handleEmailTemplateChange}
                  fullWidth
                  name="emailTemplate"
                  label="Email Template"
                >
                  <MenuItem value="1">New Booking Confirmation </MenuItem>
                  <MenuItem value="2">Exchange</MenuItem>
                  <MenuItem value="3">Refund</MenuItem>
                  <MenuItem value="4">Void</MenuItem>
                  <MenuItem value="5">Add On </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={6} sx={{ pr: 1 }}>
              <TextField
                required
                name="ticketId"
                size="small"
                label="Booking ID"
                fullWidth={true}
                value={Ticketid}
                disabled={true}
              />
            </Grid>

            <Grid item md={10} sx={{ pr: 1, my: 2 }}>
              <TextField
                id="outlined-multiline-flexible"
                multiline
                maxRows={4}
                name="PnrConverter"
                label="PnrConverter"
                size="small"
                fullWidth={true}
                onChange={(e) => {
                  setPnrValue(e.target.value);
                }}
                value={pnrValue}
              />
            </Grid>
            <Grid item xs={6} md={2} sx={{ pr: 1, my: 2 }}>
              <Button onClick={handlePnrConverter} variant="contained">
                Convert
              </Button>
            </Grid>
          </Grid>

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
                    ].map((th) => (
                      <TableCell key={th}>{th}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {inputList.map((x, i) => {
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
                            value={inputList[i].firstName}
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
                            value={inputList[i].middleName}
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
                            value={inputList[i].lastName}
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
                            value={inputList[i].ticket}
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
                            value={inputList[i].confirmation}
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
                                <InputAdornment position="start">
                                  $
                                </InputAdornment>
                              ),
                            }}
                            onChange={(e) => {
                              handleInputChange(e, i);
                              calculateTotalAmount();
                            }}
                            value={inputList[i].price}
                          />
                        </TableCell>
                        {inputList.length !== 1 && (
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
            {inputList.length < 9 && (
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

            <Grid item xs={6} md={10}></Grid>
            {/* <Grid item xs={6} md={1}>
							<Button onClick={() => setPreviewModal(true)} variant='contained'>
								Preview
							</Button>
						</Grid> */}
            <Grid item xs={6} md={2} sx={{ mb: 3 }}>
              <Button onClick={handleSendEmail} variant="contained">
                Submit
              </Button>
            </Grid>
          </Grid>
        </>
      </Box>

      <Box sx={{ m: 3 }}></Box>
      <Paper elevation={1}>
        <Email1
          selectedEmailTemplate={selectedEmailTemplate}
          data={inputList}
          TotalAmount={totalAmt}
          pnrData={pnrData}
        />
      </Paper>
    </>
  );
};

export default Email;

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
