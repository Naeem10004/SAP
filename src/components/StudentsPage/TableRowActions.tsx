import React, { MouseEventHandler } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

interface TableRowActionsProps {
  handleDeleteClick: MouseEventHandler<SVGSVGElement>;
  handleEditClick: MouseEventHandler<SVGSVGElement>;
}

const TableRowActions: React.FC<TableRowActionsProps> = ({
  handleDeleteClick,
  handleEditClick,
}) => {
  return (
    <>
      <DeleteIcon
        style={{ color: "red", cursor: "pointer" }}
        onClick={handleDeleteClick}
      />
      <EditIcon
        style={{ color: "blue", cursor: "pointer" }}
        onClick={handleEditClick}
      />
    </>
  );
};

export default TableRowActions;
