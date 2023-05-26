import React from "react";
import Navbar from "./components/navbar/Navbar";
import { QueryClient, QueryClientProvider } from "react-query";
import { Box } from "@mui/material";

import StudentsPage from "./components/StudentsPage/StudentsPage";
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Box>
        <Navbar />
        <Box sx={{ display: "flex" }}>
          <StudentsPage />
        </Box>
      </Box>
    </QueryClientProvider>
  );
}

export default App;
