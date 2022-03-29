import MainComponent from "./MainComponet";
import Login from "./views/login";
import { Account } from "./views/Account";
import { StyledEngineProvider } from "@mui/material/styles";
import RouteComponents from "./RouteComponents";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <Router>
        <StyledEngineProvider>
          <Routes>
            <Route path="/register" element={<Login />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/*" element={<MainComponent />} />
          </Routes>
          {/* <MainComponent /> */}
          {/* <Account /> */}
        </StyledEngineProvider>
      </Router>
    </>
  );
}

export default App;
