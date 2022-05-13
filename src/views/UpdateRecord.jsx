import React, { useState, useEffect } from "react";
import UpdateRecordForm from "./components/AddTicketForm/UpdateRecordForm";
import valid from "card-validator";
// import AddNewPaymentForm from './components/AddTicketForm/AddNewPaymentForm';
import { useFormik, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {
  Grid,
  Box,
  Alert,
  Typography,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { BASEURL } from "../utils/Utils";
// mui Icon
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const UpdateRecord = ({ data }) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    alternateEmail,
    alternatePhone,
    pnrNo,
    fareType,
    mcoNo,
    airlineCode,
    bookingType,
    bookedOn,
    productType,

    totalInhouseCharge,
    departureDate,
    returnDate,
    adultCount,
    childCount,
    elderCount,
    grandTotal,

    childPrice,
    adultPrice,
    elderPrice,
    ccTimes,
    ccAmount,
    ccDigits,
    isCompanyCCUsed,
    flightMarkup,
    hotelMarkup,
    carMarkup,
    insuranceMarkup,
    addonMarkup,
    cards,
    checkboxValue,
    createdAt,
    // notes,
  } = data;

  console.log(data);

  const [inputList, setInputList] = useState(cards);
  const [isCompanyCard, setIsCompanyCard] = useState(isCompanyCCUsed);
  const [isDisable, setIsDisable] = useState(true);

  // formik validation object
  const formik = useFormik({
    initialValues: {
      firstName: firstName ? firstName : "",
      lastName: lastName ? lastName : "",
      email: email ? email : "",
      phone: phone ? phone : "",
      alternateEmail: alternateEmail ? alternateEmail : "",
      alternatePhone: alternatePhone ? alternatePhone : "",
      pnrNo: pnrNo ? pnrNo : "",
      fareType: fareType ? fareType : "",
      mcoNo: mcoNo ? mcoNo : "",
      airlineCode: airlineCode ? airlineCode : "",
      bookingType: bookingType ? bookingType : "",
      bookedOn: bookedOn ? bookedOn : "",
      productType: productType ? productType : "",
      totalInhouseCharge: totalInhouseCharge ? totalInhouseCharge : 0,
      adultCount: adultCount ? adultCount : 0,
      childCount: childCount ? childCount : 0,
      elderCount: elderCount ? elderCount : 0,
      grandTotal: grandTotal ? grandTotal : "",
      childPrice: childPrice ? childPrice : "",
      adultPrice: adultPrice ? adultPrice : "",
      elderPrice: elderPrice ? elderPrice : "",
      //date
      departureDate: departureDate ? departureDate : null,
      returnDate: returnDate ? returnDate : null,
      checkboxValue: checkboxValue ? checkboxValue : "",
      //companyCard details
      isCompanyCCUsed: isCompanyCCUsed ? isCompanyCCUsed : false,
      ccTimes: ccTimes ? ccTimes : "",
      ccAmount: ccAmount ? ccAmount : "",
      ccDigits: ccDigits ? ccDigits : "",

      //markup

      flightMarkup: flightMarkup ? flightMarkup : "",
      hotelMarkup: hotelMarkup ? hotelMarkup : "",
      carMarkup: carMarkup ? carMarkup : "",
      insuranceMarkup: insuranceMarkup ? insuranceMarkup : "",
      addonMarkup: addonMarkup ? addonMarkup : "",

      //paymentCard
      card: cards ? cards : inputList,
    },
    validationSchema: Yup.object({
      //basic
      firstName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      lastName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      phone: Yup.number("input must consist if number")
        .positive("input must consist if positive number")
        .integer()
        .required("phone is required"),
      alternateEmail: Yup.string()
        .email("Invalid email address")
        .required("Required"),
      alternatePhone: Yup.number("input must consist if number")
        .positive("input must consist if positive number")
        .integer()
        .required("phone is required"),

      pnrNo: Yup.string().max(255),
      mcoNo: Yup.number("input must consist if number")
        .positive("input must consist if positive number")
        .integer()
        .required("This Field is required"),
      airlineCode: Yup.string(2)
        .min(2)
        .max(3, "maximum limit for Aieline code is 2 ")
        .required("airlineCode is required"),
      productType: Yup.array().required("Required"),

      //dropdown

      fareType: Yup.string()
        .oneOf(
          ["publish", "private", "fxl", "dummy"],
          "Fare Type Value is diffrent "
        )
        .required("Required"),
      bookingType: Yup.string()
        .oneOf(
          ["new", "exchange", "refund", "addon"],
          "input should be one of below value"
        )
        .required("Required"),
      bookedOn: Yup.string()
        .oneOf(
          ["web", "trippro", "skybird", "picasso"],
          "input should be one of below value"
        )
        .required("This field is  required"),
      //currency

      totalInhouseCharge: Yup.number("input must consist if number")
        .positive("input must consist if positive number")
        .integer()
        .required("This field is  Required"),
      grandTotal: Yup.number("input must consist if number")
        .positive("input must consist if positive number")
        .integer()
        .required("This field is  Required"),

      //number of passenger
      adultCount: Yup.number("input must consist if number")
        .integer()
        .required("This field is  Required"),
      childCount: Yup.number("input must consist if number")
        .integer()
        .required("This field is  Required"),
      elderCount: Yup.number("input must consist if number")
        .integer()
        .required("This field is  Required"),

      childPrice: Yup.number("input must consist if number")
        .positive("input must consist if positive number")
        .integer()
        .when(["childCount"], (childCount, schema) => {
          return childCount > 0
            ? schema.required("this field required ")
            : schema;
        }),
      adultPrice: Yup.number("input must consist if number")
        .positive("input must consist if positive number")
        .integer()
        .when(["adultCount"], (adultCount, schema) => {
          return adultCount > 0
            ? schema.required("this field required ")
            : schema;
        }),
      elderPrice: Yup.number("input must consist if number")
        .positive("input must consist if positive number")
        .integer()
        .when(["elderCount"], (elderCount, schema) => {
          return elderCount > 0
            ? schema.required("this field required ")
            : schema;
        }),
      checkboxValue: Yup.object().shape({
        flight: Yup.bool(),
        hotel: Yup.bool(),
        car: Yup.bool(),
        insurance: Yup.bool(),
        addon: Yup.bool(),
      }),

      //date
      departureDate: Yup.string().required("This field is required").nullable(),
      returnDate: Yup.string()
        .required(
          "please enter  DepartureDate value first ,This field is required"
        )
        .nullable(),
      //companyCard details
      isCompanyCCUsed: Yup.bool(),
      ccTimes: Yup.number("input must consist if number")
        .positive("input must consist if positive number")
        .integer()
        .when(["isCompanyCCUsed"], (isCompanyCCUsed, schema) => {
          return isCompanyCCUsed === true
            ? schema.required("this field required ")
            : schema;
        }),
      ccAmount: Yup.number("input must consist if number")
        .positive("input must consist if positive number")
        .integer()
        .when(["isCompanyCCUsed"], (isCompanyCCUsed, schema) => {
          return isCompanyCCUsed === true
            ? schema.required("this field required ")
            : schema;
        }),
      ccDigits: Yup.number("input must consist if number")
        .min(4, "please enter only last 4 digits of card")
        .positive("input must consist if positive number")
        .when(["isCompanyCCUsed"], (isCompanyCCUsed, schema) => {
          return isCompanyCCUsed === true
            ? schema.required("this field required ")
            : schema;
        }),

      //markup
      flightMarkup: Yup.number("input must consist if number")
        .positive("input must consist if positive number")
        .integer(),
      hotelMarkup: Yup.number("input must consist if number")
        .positive("input must consist if positive number")
        .integer(),
      carMarkup: Yup.number("input must consist if number")
        .positive("input must consist if positive number")
        .integer(),
      insuranceMarkup: Yup.number("input must consist if number")
        .positive("input must consist if positive number")
        .integer(),
      addonMarkup: Yup.number("input must consist if number")
        .positive("input must consist if positive number")
        .integer(),

      card: Yup.array()
        .of(
          Yup.object().shape({
            cardHolderName: Yup.string()
              .max(15, "Must be 15 characters or less")
              .required("Required"),
            cardHolderNumber: Yup.number("input must consist of number")
              .positive("input must consist of positive number")
              .integer()
              .required("Phone is required"),
            // cardNumber: Yup.number('input must consist of number').positive('input must consist of positive number').integer().required('Card Number is required'),
            cardNumber: Yup.string()
              .test(
                "test-number", // this is used internally by yup
                "Credit Card number is invalid", //validation message
                (value) => valid.number(value).isValid
              ) // return true false based on validation
              .required()
              .max(16, "Must be 16 characters")
              .min(16, "Must be 16 characters"),
            cvv: Yup.number()
              .positive("input must consist of positive number")
              .integer()
              .test(
                "len",
                "Max 4 numbers",
                (val) =>
                  val.toString().length >= 3 && val.toString().length <= 4
              ),
            expiryDate: Yup.string()
              .required("This field is required")
              .nullable(),
          })
        )
        .min(1, "card is >= 1"),
      // comments: Yup.string().max(255),
      // notes: '',
      // pricePerPerson: Yup.number('input must consist if number').positive('input must consist if positive number').integer().required('This field is  Required'),
      // totalPassengerCount: Yup.number('input must consist if number').max(9).positive('input must consist if positive number').integer().required('This field is  Required'),
    }),
    onSubmit: () => {
      console.log(formik.values, inputList);
      axios
        .put(BASEURL + `/ticket/${data._id}`, {
          data: formik.values,
          cards: inputList,
        })
        .then((res) => console.log(res))
        .catch((e) => console.log(e));
    },
  });

  // handle input change
  const handleCardInput = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };
  const handleDateInputChange = (index, value) => {
    const list = [...inputList];
    const name = "expiryDate";
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([
      ...inputList,
      {
        cardHolderName: "",
        cardHolderNumber: "",
        cardNumber: "",
        expiryDate: null,
        cvv: "",
      },
    ]);
  };
  const items = [
    {
      name: "ccTimes",
      label: "CC used How many times? ",
    },
    {
      name: "ccAmount",
      label: "Company CC Used Amount",
    },
    {
      name: "ccDigits",
      label: "Last 4 Digits of of Company CC ",
    },
  ];

  function msToTime(date) {
    const duration = new Date() - new Date(date);

    var milliseconds = Math.floor((duration % 1000) / 100),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    // let GenTime = hours + ':' + minutes + ':' + seconds + '.' + milliseconds;
    let GenTime = hours;
    console.log(GenTime);
    GenTime = GenTime >= 48 ? false : true;

    return Boolean(GenTime);
  }
  useEffect(() => {
    msToTime(createdAt) ? setIsDisable(false) : setIsDisable(true);
  }, [0]);

  return (
    <>
      <Formik>
        <form onSubmit={formik.handleSubmit}>
          <Box
            sx={{
              m: 1,
              p: 1,
              py: 3,
              bgcolor: "background.paper",
              borderRadius: 1,
            }}
          >
            <UpdateRecordForm formik={formik} disabled={isDisable} />
          </Box>
          <Box sx={{ m: 1 }}>
            <Typography variant="h6" gutterBottom sx={{ my: 4 }}>
              Payment method :
            </Typography>
          </Box>
          <Box
            sx={{
              m: 1,
              p: 2,
              py: 3,
              bgcolor: "background.paper",
              borderRadius: 1,
            }}
          >
            {inputList.map((x, i) => {
              return (
                <Grid key={i} container spacing={3}>
                  {/* Card Holder NAme field */}
                  <Grid item xs={12} md={2}>
                    <TextField
                      required
                      name="cardHolderName"
                      label="Name on card"
                      fullWidth
                      disabled={isDisable}
                      autoComplete="cc-name"
                      onChange={(e) => {
                        handleCardInput(e, i);
                      }}
                      value={inputList[i].cardHolderName}
                    />
                  </Grid>
                  {/*  Card Holder Phone no. */}
                  <Grid item xs={12} md={3}>
                    <TextField
                      required
                      name="cardHolderNumber"
                      label="Phone no."
                      fullWidth
                      disabled={isDisable}
                      onChange={(e) => handleCardInput(e, i)}
                      value={inputList[i].cardHolderNumber}
                    />
                  </Grid>
                  {/* CardNumber Field */}
                  <Grid item xs={12} md={3}>
                    <TextField
                      required
                      name="cardNumber"
                      label="Card number"
                      fullWidth
                      disabled={isDisable}
                      autoComplete="cc-number"
                      onChange={(e) => handleCardInput(e, i)}
                      value={inputList[i].cardNumber}
                    />
                  </Grid>
                  {/* CVV Field */}
                  <Grid item xs={12} md={2}>
                    <TextField
                      required
                      name="cvv"
                      label="CVV"
                      fullWidth
                      disabled={isDisable}
                      autoComplete="cc-csc"
                      onChange={(e) => handleCardInput(e, i)}
                      value={inputList[i].cvv}
                    />
                  </Grid>
                  {/* expiry date field */}
                  <Grid item xs={12} md={2}>
                    <LocalizationProvider
                      fullWidth
                      disabled={isDisable}
                      dateAdapter={AdapterDateFns}
                    >
                      <DatePicker
                        fullWidth
                        disabled={isDisable}
                        views={["year", "month"]}
                        name="expiryDate"
                        label="Expiry date"
                        inputFormat="MM/yyyy"
                        placeholder="MM/yyyy"
                        minDate={new Date()}
                        onChange={(newValue) => {
                          handleDateInputChange(
                            i,
                            new Date(newValue).toLocaleDateString("en-US", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            })
                          );

                          // setExpiryDateValue(newValue);
                        }}
                        value={inputList[i].expiryDate}
                        renderInput={(params) => (
                          <TextField placeholder="MM/yyyy" {...params} />
                        )}
                      />
                    </LocalizationProvider>
                  </Grid>
                  {/*  add/Remove btn for multiple card */}
                  <Box
                    xs={12}
                    md={2}
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      width: "100%",
                    }}
                  >
                    {inputList.length !== 1 && (
                      <Button
                        startIcon={<RemoveIcon fontSize="small" />}
                        onClick={() => handleRemoveClick(i)}
                        sx={{ mr: 1 }}
                      >
                        Remove
                      </Button>
                    )}
                    {inputList.length < 4 && inputList.length - 1 === i && (
                      <Button
                        startIcon={<AddIcon fontSize="small" />}
                        onClick={handleAddClick}
                        sx={{ mr: 1 }}
                      >
                        Add One More Card
                      </Button>
                    )}
                  </Box>
                </Grid>
              );
            })}
            <Grid container spacing={3}>
              {/*  company card  */}

              <Grid item xs={12} md={3}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isCompanyCard}
                      onChange={(e) => {
                        setIsCompanyCard(!isCompanyCard);
                        formik.setFieldValue("isCompanyCCUsed", !isCompanyCard);
                      }}
                      name="companyCard"
                      color="primary"
                    />
                  }
                  label="Company CC used ?"
                />
              </Grid>

              {isCompanyCard &&
                items.map((item, i) => {
                  const { name, label } = item;

                  return (
                    <Grid item xs={12} md={3} key={i}>
                      <TextField
                        // required
                        name={name}
                        label={label}
                        fullWidth
                        disabled={isDisable}
                        error={formik.touched[name] && formik.errors[name]}
                        helperText={formik.touched[name] && formik.errors[name]}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.name}
                      />
                    </Grid>
                  );
                })}
            </Grid>
          </Box>
          {/* Formik alert one  */}
          {!isDisable && (
            <Box xs={8} md={10}>
              {Object.keys(formik.errors).length !== 0 && formik.errors && (
                <Alert variant="outlined" severity="error">
                  {JSON.stringify(formik.errors)}
                </Alert>
              )}
            </Box>
          )}
          {!isDisable && (
            <Box xs={4} md={4}>
              <Button variant="contained" type="submit" sx={{ mt: 3, ml: 1 }}>
                submit
              </Button>
            </Box>
          )}
        </form>
      </Formik>
    </>
  );
};

export default UpdateRecord;
