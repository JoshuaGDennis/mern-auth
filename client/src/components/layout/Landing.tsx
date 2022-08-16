import { Button, Container, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Landing = () => (
  <Container sx={{ mt: 4, textAlign: "center" }}>
    <Typography paragraph variant="h3">
      MERN stack login demo
    </Typography>
    <Typography paragraph>
      Creating a full-stack login and register auth system
    </Typography>

    <Stack
      alignItems="center"
      direction="row"
      justifyContent="center"
      spacing={2}
    >
      <Button component={Link} to="/register" variant="outlined">
        Register
      </Button>

      <Button component={Link} to="/login" variant="contained">
        Login
      </Button>
    </Stack>
  </Container>
);

export default Landing;
