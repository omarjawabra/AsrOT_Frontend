import React from "react";
import "../css/TaskAssignRow.css";

function TaskAssignRow(props) {
    return (
        <tr className="task-assign-row">
            <td>{props.task.task_name}</td>
            <td>
                <button
                    onClick={() => {
                        props.openModal(props.task.task_id);
                    }}>
                    Assign
                </button>
            </td>
        </tr>)
}

export default TaskAssignRow;