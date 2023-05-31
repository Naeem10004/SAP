import { useQuery, useMutation } from "react-query";
import axios from "axios";
import { StudentData } from "../../types/StudentData";

const backendUrl = "http://localhost:4000"; // Update with your backend server URL

export function useAddStudent() {
  return useMutation(async (newStudent: StudentData) => {
    console.log(newStudent);
    const response = await axios.post(`${backendUrl}/users`, newStudent);
    return response.data;
  });
}

export function useUpdateStudent() {
  return useMutation(async (student: StudentData) => {
    const response = await axios.put(
      `${backendUrl}/users/${student._id}`,
      student
    );
    return response.data;
  });
}

export function useDeleteStudent() {
  return useMutation(async (studentId: string) => {
    await axios.delete(`${backendUrl}/users/${studentId}`);
  });
}

export function useStudents() {
  return useQuery("students", async () => {
    const response = await axios.get(`${backendUrl}/users`);
    return response.data;
  });
}
