import RootNode from "./RootNode";
import { StyledEngineProvider } from "@mui/material/styles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./login";

function App() {
  return (
    <>
      <StyledEngineProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/*" element={<RootNode />} />
          </Routes>
        </Router>
      </StyledEngineProvider>
    </>
  );
}

export default App;
