import React from "react";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { ExitToApp } from "@mui/icons-material";

type NavbarProps = {
  isLoggedIn: boolean;
  onLogout: () => void;
};

function Navbar({ isLoggedIn, onLogout }: NavbarProps) {
  return (
    <Box sx={{ flexGrow: 1, bgcolor: "whitesmoke" }}>
      <AppBar position="static" sx={{ bgcolor: "#d4e3e6", height: "100px" }}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "15px",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography
              variant="h3"
              component="div"
              fontWeight={700}
              sx={{ color: "orange" }}
            >
              SAF
            </Typography>
          </Box>

          <Box display={"flex"}>
            {isLoggedIn && (
              <Button sx={{ color: "Black" }} onClick={onLogout}>
                <ExitToApp />
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
