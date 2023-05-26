import { DataGrid, GridColDef } from "@mui/x-data-grid";
import TableRowActions from "./TableRowActions";
import { StudentData } from "../../types/StudentData";

interface StudentTableProps {
  students: StudentData[];
  handleDelete: (id: string) => void;
  handleEdit: (student: StudentData) => void;
}

const StudentTable: React.FC<StudentTableProps> = ({
  students,
  handleDelete,
  handleEdit,
}) => {
  const columns: GridColDef[] = [
    { field: "_id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "sex", headerName: "Sex", width: 100 },
    {
      field: "dateOfBirth",
      headerName: "Date of Birth",
      width: 150,
    },
    {
      field: "group",
      headerName: "Group",
      width: 200,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <TableRowActions
          handleDeleteClick={() => handleDelete(params.row.id as string)}
          handleEditClick={() => handleEdit(params.row as StudentData)}
        />
      ),
    },
  ];

  const rows = students.map((student) => ({
    id: student._id,
    name: student.name,
    sex: student.sex,
    dateOfBirth: student.dateOfBirth,
    group: student.group,
  }));

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
};

export default StudentTable;
