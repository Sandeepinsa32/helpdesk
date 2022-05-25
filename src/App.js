import RootNode from "./views/RootNode";
import {
  StyledEngineProvider,
  createTheme,
  ThemeProvider,
  styled,
} from "@mui/material/styles";
import {
  BrowserRouter as Router,
  Routes,
  Navigate,
  Route,
  useNavigate,
} from "react-router-dom";
import Login from "./views/login";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import Authorizing from "./views/Authorizing";

function App() {
  const navigate = useNavigate();

  axios.interceptors.request.use(
    function (config) {
      // console.log("func ran from app.js");
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
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );

  const theme = createTheme({
    palette: {
      primary: {
        main: "#1E73DE", // triphelpdesk --color
        light: "#1e83de",
        dark: "#1e53de",
        contrastText: "#fff",
      },

      secondry: {
        main: "#1E73DE", // triphelpdesk --color
        light: "#1a2d4b",
        dark: "#1a254b",
        contrastText: "#fff",
      },
    },
  });
  return (
    <>
      <ThemeProvider theme={theme}>
        <StyledEngineProvider>
          <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/auth/:id" element={<Authorizing />}></Route>

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
            toastOptions={{
              duration: 3000,
              style: {
                background: "#363636",
                color: "#fff",
              },
              success: {
                duration: 3000,
                theme: {
                  primary: "blue",
                  secondary: "black",
                },
              },
            }}
          />
        </StyledEngineProvider>
      </ThemeProvider>
    </>
  );
}

export default App;