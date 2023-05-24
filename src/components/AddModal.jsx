import React, { useState } from "react";
import {
  Button,
  Modal,
  Typography,
  Box,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  InputAdornment,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";

const AddModal = ({ open, onClose, handleSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    sex: "",
    dateOfBirth: "",
    group: "",
  });

  const handleCloseModal = () => {
    setFormData({
      name: "",
      sex: "",
      dateOfBirth: "",
      group: "",
    });
    onClose();
  };

  return (
    <Modal open={open} onClose={handleCloseModal}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          minWidth: 300,
        }}
      >
        <Typography variant="h5" component="h2">
          Add New Student
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            sx={{ marginBottom: "10px" }}
            required
            fullWidth
            label="Name"
            type="text"
            value={formData.name || ""}
            onChange={(event) =>
              setFormData({ ...formData, name: event.target.value })
            }
          />
          <FormControl sx={{ marginBottom: "10px" }} required fullWidth>
            <InputLabel>Sex</InputLabel>
            <Select
              value={formData.sex}
              onChange={(event) =>
                setFormData({ ...formData, sex: event.target.value })
              }
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
          <TextField
            sx={{ marginBottom: "10px" }}
            required
            fullWidth
            // label="Date of Birth"
            type="date"
            value={formData.dateOfBirth}
            onChange={(event) =>
              setFormData({
                ...formData,
                dateOfBirth: event.target.value,
              })
            }
          />
          <FormControl sx={{ marginBottom: "10px" }} required fullWidth>
            <InputLabel>Group</InputLabel>
            <Select
              value={formData.group}
              onChange={(event) =>
                setFormData({ ...formData, group: event.target.value })
              }
            >
              <MenuItem value="Typography">Typography</MenuItem>
              <MenuItem value="Biologists">Biologists</MenuItem>
              <MenuItem value="Chemistry Capital">Chemistry Capital </MenuItem>
              <MenuItem value="Web designers">Web designers</MenuItem>
              <MenuItem value="Black magicians">Black magicians</MenuItem>
              <MenuItem value="Lame gamer boys">Lame gamer boys</MenuItem>
            </Select>
          </FormControl>

          <Button type="submit" variant="contained" sx={{ mr: 1 }}>
            Save
          </Button>
          <Button onClick={handleCloseModal} variant="outlined">
            Cancel
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default AddModal;
