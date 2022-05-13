import { CircularProgress, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Authorizing = () => {
  const [showLoading, setShowLoading] = useState(true);
  const [message, Message] = useState("You have confirmed the tickets");
  const handleConfirm = async () => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos/1")
      .then((res) => {
        setShowLoading(false);
        console.log(res);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    handleConfirm();
  }, []);

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
