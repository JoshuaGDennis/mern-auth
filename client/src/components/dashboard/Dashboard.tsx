import { Button, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setUser } from "../../app/slices/auth";
import setAuthToken from "../../utils/setAuthToken";

const Dashboard = () => {
  const dispatch = useAppDispatch();

  const username = useAppSelector((state) => state.auth.user?.name || "");

  const onLogout = () => {
    localStorage.removeItem("jwtToken");
    setAuthToken("");
    dispatch(setUser(null));
  };

  return (
    <>
      <Typography>Hello {username}!</Typography>
      <Button onClick={onLogout} variant="contained">
        Logout
      </Button>
    </>
  );
};

export default Dashboard;
