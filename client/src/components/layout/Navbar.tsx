import { AppBar, Stack, Toolbar, Typography } from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";
import { Link } from "react-router-dom";

const Navbar = () => (
  <AppBar color="transparent" position="static" sx={{ boxShadow: "none" }}>
    <Toolbar sx={{ justifyContent: "center" }}>
      <Stack
        component={Link}
        direction="row"
        spacing={1}
        sx={{
          color: (theme) => theme.palette.grey[600],
          textDecoration: "none",
        }}
        to="/"
      >
        <CodeIcon />
        <Typography sx={{ fontWeight: 500, letterSpacing: 2 }}>MERN</Typography>
      </Stack>
    </Toolbar>
  </AppBar>
);

export default Navbar;
