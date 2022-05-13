import { CircularProgress, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASEURL } from "../utils/Utils";
import { useParams } from "react-router-dom";

const Authorizing = () => {
  const { id } = useParams();
  const [showLoading, setShowLoading] = useState(true);
  const [message, Message] = useState("You have confirmed the tickets");

  const handleConfirm = async () => {
    axios
      .put(BASEURL + "/ticket/auth-email/", {
        id,
      })
      .then((res) => {
        setShowLoading(false);
        console.log(res);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    if (id) handleConfirm();
  }, [id]);

  return (
    <div
      style={{
        top: "50%",
        display: "flex",
        left: "50%",
        position: "absolute",
        transform: "translate(-50%, -50%)",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant="h4" mb={2}>
        Authorizing
      </Typography>
      {showLoading && <CircularProgress />}

      {!showLoading && (
        <Typography variant="body" mb={4}>
          {message}
        </Typography>
      )}
    </div>
  );
};

export default Authorizing;
