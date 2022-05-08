import RootNode from "./RootNode";
import { StyledEngineProvider } from "@mui/material/styles";
import {
  BrowserRouter as Router,
  Routes,
  Navigate,
  Route,
} from "react-router-dom";
import Login from "./Login";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import axios from "axios";

function App() {
  return (
    <>
      <StyledEngineProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />}></Route>

            <Route
              path="/*"
              element={
                localStorage.getItem("token") ? (
                  <RootNode />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
          </Routes>
        </Router>
        <Toaster
          position="top-right"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            duration: 5000,
            style: {
              background: "#363636",
              color: "#fff",
            },
            success: {
              duration: 3000,
              theme: {
                primary: "green",
                secondary: "black",
              },
            },
          }}
        />
      </StyledEngineProvider>
    </>
  );
}

export default App;
