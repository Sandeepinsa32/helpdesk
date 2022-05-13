import RootNode from "./RootNode";
import { StyledEngineProvider } from "@mui/material/styles";
import {
  BrowserRouter as Router,
  Routes,
  Navigate,
  Route,
  useNavigate,
} from "react-router-dom";
import Login from "./login";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import axios from "axios";
import Authorizing from "./Authorizing";

function App() {
  const navigate = useNavigate();

  axios.interceptors.request.use(
    function (config) {
      console.log("func ran from app.js");
      config.headers["Authorization"] =
        "Bearer " + JSON.parse(localStorage.getItem("token"));

      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.response.status === 401) {
        console.log("hey this is inside if ");
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );

  return (
    <>
      <StyledEngineProvider>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/auth" element={<Authorizing />}></Route>

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
