import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import React from "react";
import { CategoriesProps } from "../../types/CategoriesProps";

const checkboxStyle = {
  color: "ADB6B0",
  "&.Mui-checked": {
    color: "#ffa500",
  },
};

function Categories({ onChange }: CategoriesProps) {
  const [selectedGroups, setSelectedGroups] = React.useState<string[]>([]);

  const handleGroupChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const groupName = event.target.value;
    if (event.target.checked) {
      setSelectedGroups((prevGroups) => [...prevGroups, groupName]);
    } else {
      setSelectedGroups((prevGroups) =>
        prevGroups.filter((group) => group !== groupName)
      );
    }
    onChange(selectedGroups); // Pass the updated selectedGroups to the parent component
  };
  React.useEffect(() => {
    onChange(selectedGroups); // Notify the parent component of the updated selectedGroups
  }, [selectedGroups, onChange]);

  return (
    <Box sx={{ marginLeft: "29px" }}>
      <Typography sx={{ color: "gray" }}>FILTERS FOR STUDY GROUPS</Typography>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              sx={checkboxStyle}
              checked={selectedGroups.includes("Typography")}
              onChange={handleGroupChange}
              value="Typography"
            />
          }
          label="Typography"
        />
        <FormControlLabel
          control={
            <Checkbox
              sx={checkboxStyle}
              checked={selectedGroups.includes("Biologists")}
              onChange={handleGroupChange}
              value="Biologists"
            />
          }
          label="Biologists"
        />
        <FormControlLabel
          control={
            <Checkbox
              sx={checkboxStyle}
              checked={selectedGroups.includes("Chemistry Capital")}
              onChange={handleGroupChange}
              value="Chemistry Capital"
            />
          }
          label="Chemistry Capital"
        />
        <FormControlLabel
          control={
            <Checkbox
              sx={checkboxStyle}
              checked={selectedGroups.includes("Web designers")}
              onChange={handleGroupChange}
              value="Web designers"
            />
          }
          label="Web designers"
        />
        <FormControlLabel
          control={
            <Checkbox
              sx={checkboxStyle}
              checked={selectedGroups.includes("Black magicians")}
              onChange={handleGroupChange}
              value="Black magicians"
            />
          }
          label="Black magicians"
        />
        <FormControlLabel
          control={
            <Checkbox
              sx={checkboxStyle}
              checked={selectedGroups.includes("Lame gamer boys")}
              onChange={handleGroupChange}
              value="Lame gamer boys"
            />
          }
          label="Lame gamer boys"
        />
      </FormGroup>
    </Box>
  );
}

export default Categories;
