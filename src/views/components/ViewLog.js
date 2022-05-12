import React, { useState, useEffect } from "react";
import {
  Typography,
  Paper,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  List,
} from "@mui/material";
import axios from "axios";
import { BASEURL } from "../../utils/Utils";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

const ViewLog = ({ id }) => {
  id = id._id;

  const handleLoadLogs = async (id) => {
    axios
      .get(BASEURL + "/log/" + id)
      .then((res) => setTicketLogs(res.data.data))
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    handleLoadLogs(id);
  }, [id]);

  const [ticketLogs, setTicketLogs] = useState([]);

  return (
    <>
      <Typography variant="h5" mb={2}>
        Logs
      </Typography>
      <hr />
      <Paper elevation={0}>
        <List>
          {ticketLogs?.length > 0 ? (
            ticketLogs.map((a, i) => {
              console.log(a);
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
            })
          ) : (
            <Typography variant="h6">No Logs found!!</Typography>
          )}
        </List>
      </Paper>
    </>
  );
};

export default ViewLog;
