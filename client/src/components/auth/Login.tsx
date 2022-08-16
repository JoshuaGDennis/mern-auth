import {
  Alert,
  AlertTitle,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios, { AxiosError } from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import setAuthToken from "../../utils/setAuthToken";
import jwtDecode from "jwt-decode";
import { useAppDispatch } from "../../app/hooks";
import { setUser } from "../../app/slices/auth";
import { User } from "../../types";
import Loading from "../Loading";

const Login = () => {
  const dispatch = useAppDispatch();

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [state, setState] = useState({
    email: "",
    password: "",
    errors: {},
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const key = e.target.name as keyof typeof state;
    setState((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const req = {
      email: state.email,
      password: state.password,
    };

    setIsLoading(true);

    axios
      .post<{ token: string }>("/api/users/login", req)
      .then((res) => {
        const { token } = res.data;

        localStorage.setItem("jwtToken", token);
        setAuthToken(token);

        const decoded = jwtDecode<User>(token);

        dispatch(setUser(decoded));
      })
      .catch((err) => {
        const axiosErr = err as AxiosError<{ message: string }>;
        setError(axiosErr.response?.data.message || axiosErr.message);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <Container>
      <Paper
        sx={{
          maxWidth: 600,
          minHeight: 250,
          mx: "auto",
          p: 2,
          position: "relative",
          width: "100%",
        }}
      >
        {isLoading ? (
          <Loading message="Submitting..." />
        ) : (
          <>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                <AlertTitle>ERROR</AlertTitle>
                {error}
              </Alert>
            )}

            <Typography variant="h6">Login</Typography>
            <Typography>
              Don't have an account? <Link to="/register">Sign up here</Link>
            </Typography>

            <Stack
              component="form"
              id="reg-form"
              onSubmit={onSubmit}
              spacing={2}
              sx={{ my: 2 }}
            >
              <TextField
                label="Email"
                name="email"
                onChange={onChange}
                placeholder="Enter your email"
                required
                variant="standard"
              />

              <TextField
                label="Password"
                name="password"
                onChange={onChange}
                placeholder="Enter a password"
                required
                type="password"
                variant="standard"
              />

              <Button
                sx={{ alignSelf: "end" }}
                type="submit"
                variant="contained"
              >
                Submit
              </Button>
            </Stack>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default Login;
