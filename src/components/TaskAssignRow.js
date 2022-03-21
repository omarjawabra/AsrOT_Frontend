import React from "react";

function TaskAssignRow(props) {
    return (
        <div
            style={{
                marginTop: 5,
                marginBottom: 5,
                flexDirection: "row",
                display: "flex",
                backgroundColor: "rgba(128,128,128,0.25)",
                borderRadius: 10,
                paddingLeft: 10,
                paddingRight: 10,
            }}
        >
            <p>
                {props.task.task_name}
            </p>
            <button
          onClick={() => {
              props.openModal(props.task.task_id);
          }}
          style={{ width: 120, fontSize: 15, alignSelf: "center" }}
        >
          Assign
        </button>
        </div>)
}

export default TaskAssignRow;