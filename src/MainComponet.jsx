import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import { DashboardLayout } from "./dashboard-layout";
import MiniDrawer from "./drawer";

export default function MainComponent() {
  return (
    <>
      {/* <h1>hello world</h1> */}
      <MiniDrawer></MiniDrawer>
      {/* <DashboardLayout></DashboardLayout> */}
    </>
  );
}
