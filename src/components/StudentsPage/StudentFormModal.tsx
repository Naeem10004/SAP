import React, { ChangeEvent } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Modal,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

interface StudentFormModalProps {
  open: boolean;
  onClose: () => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  title: string;
  name: string;
  sex: string;
  dateOfBirth: string;
  group: string;
  setName: (name: string) => void;
  setSex: (sex: string) => void;
  setDateOfBirth: (date: string) => void;
  setGroup: (group: string) => void;
}

const StudentFormModal: React.FC<StudentFormModalProps> = ({
  open,
  onClose,
  handleSubmit,
  title,
  name,
  sex,
  dateOfBirth,
  group,
  setName,
  setSex,
  setDateOfBirth,
  setGroup,
}) => {
  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSexChange = (event: SelectChangeEvent<string>) => {
    setSex(event.target.value);
  };

  const handleDateOfBirthChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDateOfBirth(event.target.value);
  };

  const handleGroupChange = (event: SelectChangeEvent<string>) => {
    setGroup(event.target.value);
  };

  return (
    <Modal open={open} onClose={onClose}>
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
          {title}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            sx={{ marginBottom: "10px" }}
            required
            fullWidth
            label="Name"
            type="text"
            value={name}
            onChange={handleNameChange}
          />
          <FormControl sx={{ marginBottom: "10px" }} required fullWidth>
            <InputLabel>Sex</InputLabel>
            <Select value={sex} onChange={handleSexChange}>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
          <TextField
            sx={{ marginBottom: "10px" }}
            required
            fullWidth
            type="date"
            value={dateOfBirth}
            onChange={handleDateOfBirthChange}
          />
          <FormControl sx={{ marginBottom: "10px" }} required fullWidth>
            <InputLabel>Group</InputLabel>
            <Select value={group} onChange={handleGroupChange}>
              <MenuItem value="Typography">Typography</MenuItem>
              <MenuItem value="Biologists">Biologists</MenuItem>
              <MenuItem value="Chemistry Capital">Chemistry Capital </MenuItem>
              <MenuItem value="Web designers">Web designers</MenuItem>
              <MenuItem value="Black magicians">Black magicians</MenuItem>
              <MenuItem value="Lame gamer boys">Lame gamer boys</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button type="submit" variant="contained" sx={{ mr: 1 }}>
              Save
            </Button>
            <Button onClick={onClose} variant="contained" color="error">
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default StudentFormModal;
