import Navbar from "./components/layout/Navbar";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import Dashboard from "./components/dashboard/Dashboard";
import { useEffect } from "react";
import setAuthToken from "./utils/setAuthToken";
import jwtDecode from "jwt-decode";
import { setUser } from "./app/slices/auth";
import { User } from "./types";

const App = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    const localToken = localStorage.getItem("jwtToken");

    if (localToken) {
      setAuthToken(localToken);
      const decoded = jwtDecode<User & { exp: number }>(localToken);

      dispatch(setUser(decoded));

      const currentTime = Date.now() / 1000; // time in ms

      if (decoded.exp < currentTime) {
        localStorage.removeItem("jwtToken");
        setAuthToken("");
        dispatch(setUser(null));
      }
    }
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <Navbar />

        {isAuthenticated ? (
          <Routes>
            <Route element={<Dashboard />} path="/" />
            <Route element={<Navigate to="/" />} path="*" />
          </Routes>
        ) : (
          <Routes>
            <Route element={<Landing />} path="/" />
            <Route element={<Register />} path="/register" />
            <Route element={<Login />} path="/login" />
            <Route element={<Navigate to="/" />} path="*" />
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
};

export default App;
