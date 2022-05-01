import { Box, Container, Grid, Typography } from "@mui/material";
import { Profile } from "./components/account/Profile";
import { Detail } from "./components/account/Details";

export const Account = () => (
  <>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        pb: 6,
        pt: 2,
      }}
    >
      <Container maxWidth="lg">
        <Typography sx={{ mb: 3 }} variant="h4">
          Account
        </Typography>
        <Grid container spacing={3}>
          {/* <Grid item lg={4} md={6} xs={12}>
						<Profile />
					</Grid> */}
          <Grid item lg={8} md={6} xs={12}>
            <Detail />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);
