import RootNode from "./RootNode";
import { StyledEngineProvider } from "@mui/material/styles";
import {
  BrowserRouter as Router,
  Navigate,
  Routes,
  Route,
} from "react-router-dom";
import Login from "./Login";
import { Toaster } from "react-hot-toast";

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
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            // Define default options
            className: "",
            duration: 5000,
            style: {
              background: "#363636",
              color: "#fff",
            },
            // Default options for specific types
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
