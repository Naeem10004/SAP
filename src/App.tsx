// ... import statements

import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Box } from "@mui/material";
import Navbar from "./components/navbar/Navbar";
import StudentsPage from "./components/StudentsPage/StudentsPage";
import LoginPage from "./components/loginpage/LoginPage";
import RegisterUser from "./components/registeruser/RegisterUser";

const queryClient = new QueryClient();

function PrivateRoute({
  element,
  isLoggedIn,
}: {
  element: React.ReactNode;
  isLoggedIn: boolean;
}): JSX.Element {
  return isLoggedIn ? (element as JSX.Element) : <Navigate to="/login" />;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem("isLoggedIn");
    if (storedLoginStatus) {
      setIsLoggedIn(JSON.parse(storedLoginStatus));
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
  };

  const handleLogout = () => {
    fetch("http://localhost:4000/logout", {
      method: "POST",
      // Include this line if you're using cookies for session management
    })
      .then((response) => {
        if (response.ok) {
          setIsLoggedIn(false);
          localStorage.removeItem("isLoggedIn");
          console.log("Logout successful");
        } else {
          console.error("Logout failed");
        }
      })
      .catch((error) => {
        console.error("Logout failed", error);
      });
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Box>
          <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
          <Routes>
            <Route
              path="/login"
              element={<LoginPage onLogin={handleLogin} />}
            />
            <Route path="/register" element={<RegisterUser />} />
            <Route
              path="/"
              element={
                <PrivateRoute
                  element={<StudentsPage />}
                  isLoggedIn={isLoggedIn}
                />
              }
            />
          </Routes>
        </Box>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
