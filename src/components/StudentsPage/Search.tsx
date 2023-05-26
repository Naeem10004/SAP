import React, { ChangeEvent } from "react";
import { Box, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface SearchProps {
  onSearch: (text: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    onSearch(text);
  };

  return (
    <Box sx={{ width: "200px", margin: "10px" }}>
      <TextField
        onChange={handleSearch}
        variant="filled"
        id="input-with-icon-textfield"
        label="Search for Name"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default Search;
