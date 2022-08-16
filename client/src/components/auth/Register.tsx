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
import { Link, useNavigate } from "react-router-dom";
import Loading from "../Loading";

const Register = () => {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    errors: {},
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const key = e.target.name as keyof typeof state;
    setState((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newUser = {
      name: state.name,
      email: state.email,
      password: state.password,
      password2: state.password2,
    };

    setIsLoading(true);

    axios
      .post("/api/users/register", newUser)
      .then(() => navigate("/login"))
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
              <Alert severity="error">
                <AlertTitle>ERROR</AlertTitle>
                {error}
              </Alert>
            )}
            <Typography variant="h6">Register</Typography>
            <Typography>
              Already have an account? <Link to="/login">Sign in here</Link>
            </Typography>

            <Stack
              component="form"
              id="reg-form"
              onSubmit={onSubmit}
              spacing={2}
              sx={{ my: 2 }}
            >
              <TextField
                label="Name"
                name="name"
                onChange={onChange}
                placeholder="Enter your name"
                required
                variant="standard"
              />

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

              <TextField
                label="Confirm password"
                name="password2"
                onChange={onChange}
                placeholder="Confirm password"
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

export default Register;
