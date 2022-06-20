import React, { useState, useEffect, useRef } from "react";
import {
  Typography,
  Paper,
  ListItem,
  CardMedia,
  ListItemButton,
  Box,
  ListItemText,
  ListItemIcon,
  CircularProgress,
  List,
  Card,
  CardHeader,
  CardContent,
  Divider,
  CardActions,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import BG from "../../../assets/PDFBG.png";
import ReactToPdf from "react-to-pdf";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import ReactToPrint from "react-to-print";
import { useScreenshot } from "use-screenshot-hook";

function AuthDetail({ Ticketid, TicketData, onClose }) {
  const { authorizedIps, firstName, lastName, email, bookingId } = TicketData;
  const componentRef = React.useRef();
  console.log(TicketData);
  const [isLoading, setIsLoading] = useState(false);
  const pdfRef = useRef(null);
  const options = {
    orientation: "landscape",
    unit: "in",
    format: [600, 400],
  };
  const { image, takeScreenshot } = useScreenshot();

  // const pdfGenrater = () => {
  // 	var doc = new jsPDF('landscape', 'px', 'a4', 'false');
  // 	doc.html(document.querySelector('#Pdf-Wrapper-card'), {
  // 		callback: function (doc) {
  // 			doc.save();
  // 		},
  // 		x: 10,
  // 		y: 10,
  // 		width: 500,
  // 	});
  // };

  var EmailHeader = () => {
    return (
      <div
        style={{
          display: "flex",
          padding: "10px",
          width: "90%",
          margin: "auto",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <img
            style={{ width: "200px" }}
            src="https://triphelpdesk.com/wp-content/uploads/2022/01/Logo.png"
            alt=""
          />
          <p style={{ margin: "0" }}>
            164 20th Street, Suite 2B, Brooklyn, NY 11232, USA
          </p>
        </div>

        <div>
          <p style={{ margin: "0" }}>+1 8662701413</p>
          <p style={{ margin: "0" }}>info@TripHelpDesk.com</p>

          <p style={{ margin: "0" }}> www.TripHelpDesk.com</p>
        </div>
      </div>
    );
  };

  //   const handleDownloadPdf = async () => {
  //     const element = printRef.current;
  //     const canvas = await html2canvas(element);
  //     const data = canvas.toDataURL("image/png");

  //     const pdf = new jsPDF();
  //     const imgProperties = pdf.getImageProperties(data);
  //     console.log(imgProperties);
  //     // const pdfWidth = pdf.internal.pageSize.getWidth();
  //     const pdfWidth = pdf.internal.pageSize.getWidth();
  //     const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

  //     pdf.addImage(data, "PNG", 0, 0);
  //     pdf.save("print.pdf");
  //   };

  var EmailFooter = `   <footer>
      <div style="text-align: center">
        <span style="font-size: 18px;font-weight: bold"><a href="" style="color: #0B4173;">TripHelpDesk</a>
        </span>
        <span style="font-size: 16px; font-weight: bold; color: #0B4173;">
          powered by Valalto</span>
      </div>
      <p style=" line-height:18px;text-align:center;  margin-bottom:0px; color: #0B4173;font-size: 14px;">
              &copy; Copyright 2022
              <a href="https://valalto.com/" style="line-height:18px;color: #0B4173;font-size: 14px; font-weight:bold;">
                Valalto Inc.</a>, All Rights Reserved.
            </p>
      </footer>`;
  return (
    <>
      {isLoading || !TicketData ? (
        <Box
          sx={{
            display: "flex",
            minHeight: "70vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress size={30} />
        </Box>
      ) : (
        <Card
          ref={componentRef}
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.2), rgba(255,255,255,0.6)),url(${BG})`,
            backgroundPosition: "bottom",
            backgroundSize: "cover",
            minHeight: "500px",
          }}
        >
          <EmailHeader />
          <hr />
          <Box sx={{ display: "flex", flexDirection: "row", px: 6 }}>
            <CardContent
              sx={{ width: "84%", margin: "auto", padding: "4rem 0" }}
            >
              <div
                style={{
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="body1"
                  color="text.secondary"
                  display="inline"
                >
                  Customer Name: &nbsp;
                </Typography>
                <Typography variant="subtitle1">{`${firstName} ${lastName}`}</Typography>
              </div>
              <div
                style={{
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="body1"
                  color="text.secondary"
                  display="inline"
                >
                  Email: &nbsp;
                </Typography>
                <Typography variant="subtitle1">{email}</Typography>
              </div>{" "}
              <div
                style={{
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="body1"
                  color="text.secondary"
                  display="inline"
                >
                  Ticket Id: &nbsp;
                </Typography>
                <Typography variant="subtitle1">{bookingId}</Typography>
              </div>{" "}
              <div
                style={{
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="body1"
                  color="text.secondary"
                  display="inline"
                >
                  Card Number: &nbsp;
                </Typography>
                <Typography variant="subtitle1">XXXX4579</Typography>
              </div>
              <div style={{ marginTop: "10px" }}>
                <TableContainer
                //  component={Paper}
                >
                  <Table aria-label="simple table" size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell align="left">S.No</TableCell>
                        <TableCell align="left">Email</TableCell>
                        <TableCell align="left">IP Address</TableCell>
                        <TableCell align="left">Timestamp</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {authorizedIps.map((data, index) => (
                        <TableRow key={data.name}>
                          <TableCell align="left">{index + 1}</TableCell>
                          <TableCell align="left">{data.email}</TableCell>
                          <TableCell align="left">
                            {data.ipAddress
                              ? data.ipAddress
                              : "Response Awaited"}
                          </TableCell>
                          <TableCell align="left">{data.timestamp}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </CardContent>
          </Box>
          <hr />

          <CardMedia
            sx={{ my: 2 }}
            children={
              <span dangerouslySetInnerHTML={{ __html: EmailFooter }} />
            }
          />
        </Card>
      )}

      {/* <CardActions>
        <ReactToPrint
          pageStyle=" { size: 8in 8in }"
          trigger={() => (
            <Button
              sx={{ textTransform: "capitalize" }}
              variant="contained"
              //   onClick={handleDownloadPdf}
              //   onClick={() => {
              //     const content = pdfRef.current;

              //     const doc = new jsPDF();
              //     doc.html(content, {
              //       callback: function (doc) {
              //         doc.save("sample.pdf");
              //       },
              //       html2canvas: { scale: 0.5 },
              //     });
              //   }}
            >
              Download Pdf
            </Button>
          )}
          content={() => componentRef.current}
        />
      </CardActions> */}

      <CardActions>
        <Button
          sx={{ textTransform: "capitalize" }}
          variant="contained"
          onClick={() => takeScreenshot({ componentRef })}
        >
          Download Pdf
        </Button>
        {image && <img src={image} />}
      </CardActions>
    </>
  );
}

export default AuthDetail;

{
  /* <List>{'sa' === 'sa' ? <Box>data goes here</Box> : <Typography variant='h6'>No Logs found!!</Typography>}</List> */
}
