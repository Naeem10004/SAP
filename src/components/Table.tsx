import React from "react";
import AddModal from "./AddModal";
import EditModal from "./EditModal";
import ConfirmationModal from "./ConfirmationModal";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  TextField,
  Typography,
  Stack,
  Modal,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  InputAdornment,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from "@mui/material";

const checkboxStyle = {
  color: "ADB6B0",
  "&.Mui-checked": {
    color: "#ffa500",
  },
};
const theme = createTheme({
  components: {
    MuiCheckbox: {
      styleOverrides: {
        root: {
          "&.Mui-checked": {
            color: "#f57c00", // Change the checkbox color here
          },
        },
      },
    },
  },
});
export interface Student {
  id: number;
  name: string;
  sex: string;
  dob: string;
  groups: string;
}

function Table() {
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] =
    React.useState(false);
  const [data, setData] = React.useState<Student[]>([]);
  const [filteredData, setFilteredData] = React.useState<Student[]>([]);
  const [selectedRow, setSelectedRow] = React.useState<Student | null>(null);

  const [searchText, setSearchText] = React.useState("");
  const [selectedGroups, setSelectedGroups] = React.useState<string[]>([]);

  const [formData, setFormData] = React.useState({
    name: "",
    sex: "",
    dateOfBirth: "",
    group: "",
  });
  const [editRowId, setEditRowId] = React.useState<number | null>(null);

  const handleGroupChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const groupName = event.target.value;
    if (event.target.checked) {
      setSelectedGroups((prevGroups) => [...prevGroups, groupName]);
    } else {
      setSelectedGroups((prevGroups) =>
        prevGroups.filter((group) => group !== groupName)
      );
    }
  };

  React.useEffect(() => {
    fetch("http://localhost:3001/users")
      .then((response) => response.json())
      .then((data: Student[]) => {
        setData(data);
        setFilteredData(data);
      });
  }, []);

  React.useEffect(() => {
    const filteredRows = data.filter(
      (row) =>
        row.name.toLowerCase().includes(searchText.toLowerCase()) &&
        (selectedGroups.length === 0 || selectedGroups.includes(row.groups))
    );
    setFilteredData(filteredRows);
  }, [data, searchText, selectedGroups]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleDeleteConfirm = () => {
    if (selectedRow && selectedRow.id) {
      fetch(`http://localhost:3001/users/${selectedRow.id}`, {
        method: "DELETE",
      })
        .then(() => {
          setData((prevData) =>
            prevData.filter((row) => row.id !== selectedRow.id)
          );
          setSelectedRow(null);
          setIsConfirmationModalOpen(false);
        })
        .catch((error) => {
          console.error("Error deleting data:", error);
        });
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 130 },
    { field: "sex", headerName: "Sex", width: 130 },
    {
      field: "dob",
      headerName: "Place and Date of Birth",
      width: 180,
    },
    {
      field: "groups",
      headerName: "Groups",
      width: 180,
    },
    {
      field: "delete",
      headerName: "",
      width: 80,
      renderCell: (params: { row: Student }) => (
        <DeleteIcon
          style={{ color: "red", cursor: "pointer" }}
          onClick={() => openConfirmationModal()}
        />
      ),
    },
    {
      field: "edit",
      headerName: "",
      width: 80,
      renderCell: (params: { row: Student }) => (
        <EditIcon
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => openEditModal()}
        />
      ),
    },
  ];
  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const openConfirmationModal = () => {
    setIsConfirmationModalOpen(true);
  };

  const closeConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newStudent = {
      id: Math.random(),
      name: formData.name,
      sex: formData.sex,
      dob: formData.dateOfBirth,
      groups: formData.group,
    };

    fetch("http://localhost:3001/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newStudent),
    })
      .then((response) => response.json())
      .then((data: Student) => {
        setData((prevData) => [...prevData, data]);
        closeAddModal();
      })
      .catch((error) => {
        console.error("Error adding data:", error);
      });
  };

  const handleEditSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const editedStudent: Student = {
      id: editRowId!,
      name: formData.name,
      sex: formData.sex,
      dob: formData.dateOfBirth,
      groups: formData.group,
    };

    fetch(`http://localhost:3001/users/${editedStudent.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedStudent),
    })
      .then((response) => response.json())
      .then((data: Student) => {
        setData((prevData) =>
          prevData.map((row) => (row.id === editedStudent.id ? data : row))
        );
        closeEditModal();
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });

    closeEditModal();
  };
  return (
    <Box>
      <Box
        sx={{
          "& .MuiTextField-root": { m: 1, width: "16ch" },
          display: "flex",
          margin: "10px",
        }}
      >
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
        <Stack
          direction="row"
          spacing={2}
          sx={{
            alignItems: "center",
            marginLeft: "100px",
            width: "60%",
          }}
        >
          <Box
            sx={{
              color: "gray",
              display: "flex",
            }}
          >
            <Person2OutlinedIcon />
            <Typography>{data.length} students</Typography>
          </Box>
          <Button variant="outlined" startIcon={<DeleteIcon />}>
            Delete
          </Button>

          <Button variant="contained" onClick={openAddModal}>
            <AddIcon />
            Add New
          </Button>
          <Box>
            <AddModal
              open={isAddModalOpen}
              onClose={closeAddModal}
              handleSubmit={handleSubmit}
            />
          </Box>
        </Stack>
      </Box>

      <Box sx={{ display: "flex" }}>
        <Box sx={{ marginLeft: "29px" }}>
          <Typography sx={{ color: "gray" }}>
            FILTERS FOR STUDY GROUPS
          </Typography>
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
        <div style={{ height: 400, width: "100%" }}>
          <ThemeProvider theme={theme}>
            <DataGrid
              rows={filteredData}
              columns={columns}
              checkboxSelection
              components={{
                Toolbar: GridToolbar,
              }}
            />
          </ThemeProvider>
          <ConfirmationModal
            open={isConfirmationModalOpen}
            onClose={closeConfirmationModal}
            handleConfirm={handleDeleteConfirm}
          />
          <EditModal
            open={isEditModalOpen}
            onClose={closeEditModal}
            handleSubmit={handleEditSubmit}
            row={selectedRow}
          />
        </div>
      </Box>
    </Box>
  );
}

export default Table;
