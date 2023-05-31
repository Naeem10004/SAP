import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Container } from "@mui/material";
import { styled } from "@mui/system";

const MyContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
}));

const MyTypography = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const MyForm = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  maxWidth: "400px",
  margin: "0 auto",
}));

const MyButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const MyLink = styled(Link)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const RegisterUser: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
    if (password !== e.target.value) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Perform registration logic here
      const response = await fetch("http://localhost:4000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        console.log("Registration successful");

        // Reset form fields
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setPasswordError("");

        // Navigate to login page
        navigate("/login");
      } else {
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("An error occurred during registration:", error);
    }
  };

  const isFormValid =
    email.trim() !== "" &&
    password !== "" &&
    confirmPassword !== "" &&
    passwordError === "";

  return (
    <MyContainer maxWidth="md">
      <MyTypography variant="h2" align="center" marginBottom={2}>
        Register User
      </MyTypography>
      <MyForm onSubmit={handleSubmit}>
        <TextField
          label="Email"
          type="text"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <TextField
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          required
          error={passwordError !== ""}
          helperText={passwordError}
        />

        <MyButton
          type="submit"
          variant="contained"
          fullWidth
          sx={{ marginTop: 2 }}
          disabled={!isFormValid}
        >
          Register
        </MyButton>
      </MyForm>
      <Typography variant="body1" align="center" marginTop={2}>
        Already have an account? <MyLink to="/login">Go to Login</MyLink>
      </Typography>
    </MyContainer>
  );
};

export default RegisterUser;
