import React, { useState, useEffect } from "react";
import { Button, Box } from "@mui/material";

import StudentTable from "./StudentTable";
import StudentFormModal from "./StudentFormModal";
import Search from "./Search";
import Categories from "./Categories";
import {
  useAddStudent,
  useDeleteStudent,
  useStudents,
  useUpdateStudent,
} from "../customHooks/Crud";
import { StudentData } from "../../types/StudentData";

function StudentsPage() {
  const { data: students, isLoading, isError } = useStudents();
  const addStudentMutation = useAddStudent();
  const updateStudentMutation = useUpdateStudent();
  const deleteStudentMutation = useDeleteStudent();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [searchText, setSearchText] = useState("");
  const [filteredStudents, setFilteredStudents] = useState<StudentData[]>([]);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [modalData, setModalData] = useState<StudentData>({
    _id: "",
    name: "",
    sex: "",
    dateOfBirth: "",
    group: "",
  });

  useEffect(() => {
    if (students) {
      filterStudents(searchText, selectedGroups);
    }
  }, [students, searchText, selectedGroups, modalData]);

  const handleAdd = () => {
    setModalTitle("Add Student");
    setModalData({
      _id: "",
      name: "",
      sex: "",
      dateOfBirth: "",
      group: "",
    });
    setIsModalOpen(true);
  };

  const handleEdit = (student: StudentData) => {
    setModalTitle("Edit Student");
    setModalData(student);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSearch = (text: string) => {
    setSearchText(text);
    filterStudents(text, selectedGroups);
  };

  const handleGroupChange = (selectedGroups: string[]) => {
    setSelectedGroups(selectedGroups);
    filterStudents(searchText, selectedGroups);
  };

  const filterStudents = (text: string, selectedGroups: string[]) => {
    const filtered = students.filter(
      (student: StudentData) =>
        student.name.toLowerCase().includes(text.toLowerCase()) &&
        (selectedGroups.length === 0 || selectedGroups.includes(student.group))
    );
    setFilteredStudents(filtered);
  };

  const handleModalSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (modalTitle === "Add Student") {
      try {
        await addStudentMutation.mutateAsync(modalData);
      } catch (error) {
        console.log("Error adding student:", error);
      }
    } else if (modalTitle === "Edit Student") {
      try {
        await updateStudentMutation.mutateAsync(modalData);
      } catch (error) {
        console.log("Error updating student:", error);
      }
    }
    handleModalClose();
  };

  const handleDelete = async (studentId: string) => {
    try {
      await deleteStudentMutation.mutateAsync(studentId);
    } catch (error) {
      console.log("Error deleting student:", error);
    }
  };

  if (isLoading) {
    return <div>Loading students...</div>;
  }

  if (isError) {
    return <div>Error loading students.</div>;
  }

  return (
    <div>
      <Box
        sx={{
          marginBottom: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginRight: "500px",
        }}
      >
        <Search onSearch={handleSearch} />
        <Button variant="contained" onClick={handleAdd}>
          Add Student
        </Button>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Categories onChange={handleGroupChange} />

        <StudentTable
          students={filteredStudents}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      </Box>
      <StudentFormModal
        open={isModalOpen}
        onClose={handleModalClose}
        handleSubmit={handleModalSubmit}
        title={modalTitle}
        name={modalData.name}
        sex={modalData.sex}
        dateOfBirth={modalData.dateOfBirth}
        group={modalData.group}
        setName={(value) => setModalData({ ...modalData, name: value })}
        setSex={(value) => setModalData({ ...modalData, sex: value })}
        setDateOfBirth={(value) =>
          setModalData({ ...modalData, dateOfBirth: value })
        }
        setGroup={(value) => setModalData({ ...modalData, group: value })}
      />
    </div>
  );
}

export default StudentsPage;
