import { useQuery, useMutation } from "react-query";
import axios from "axios";
import { StudentData } from "../../types/StudentData";
export function useAddStudent() {
  return useMutation(async (newStudent: StudentData) => {
    const response = await axios.post(
      "http://localhost:3001/users",
      newStudent
    );
    return response.data;
  });
}

export function useUpdateStudent() {
  return useMutation(async (student: StudentData) => {
    const response = await axios.put(
      `http://localhost:3001/users/${student.id}`,
      student
    );
    return response.data;
  });
}

export function useDeleteStudent() {
  return useMutation(async (studentId: string) => {
    await axios.delete(`http://localhost:3001/users/${studentId}`);
  });
}

export function useStudents() {
  return useQuery("students", async () => {
    const response = await axios.get("http://localhost:3001/users");
    return response.data;
  });
}
