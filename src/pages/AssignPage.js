import "../App.css";
import TaskAssignRow from "../components/TaskAssignRow";
import Username from "../components/Username";
import React, { useEffect, useState } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { getToken, isAuth, unAuth } from "../user/User";
import getTaskList from "../api/GetAllTasks";
import LogoutButton from "../components/LogoutButton";
import AdminMail from "../components/AdminMail";
import BackButton from "../components/BackButton";
import AssignModal from "../components/AssignModal";

function AssignPage() {
  const history = useHistory();
  const [tasks, setTasks] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [taskSelected, setTaskSelected] = useState(null);

  const showModal = (taskID) => {
    setTaskSelected(taskID);
    setShowAssignModal(true);
  }

  const hideModal = () => {
    setTaskSelected(null);
    setShowAssignModal(false);
  }

  const assign = (userEmail) => {
    console.log("Assigning task");
    console.log("userEmail: " + userEmail);
    console.log("taskID: "+ taskSelected);
  }

  /**
   * get the task list if logged in, otherwise logs out
   */
  const getTasksAndMetaInfo = async () => {
    let token = getToken();
    if (token) {
      let resp = await getTaskList(token);
      console.log(resp);
      if (resp) {
        const allTasks = resp.results;
        setTasks(allTasks);
        setNextPage(resp.next);
        setPrevPage(resp.previous);
      }
    } else {
      unAuth();
      history.push("login");
    }
  };

  useEffect(() => {
    getTasksAndMetaInfo();
  }, []);

  if (isAuth()) {
    return (
      <div className="App">
        <header className="App-header">
          <LogoutButton></LogoutButton>
          <AdminMail></AdminMail>
          <Username></Username>
          <BackButton></BackButton>

          <h1 style={{ color: "#ffffff", fontSize: 75 }}>
            Automatic Transcriber
          </h1>
          <div
            style={{
              backgroundColor: "rgba(255,255,255,0.05)",
              padding: 20,
              borderRadius: 10,
              width: "50%",
            }}
          >
            <p style={{ fontSize: 30, margin: 0, fontWeight: "bold" }}>
              All Tasks
            </p>
            <AssignModal show={showAssignModal} handleClose={hideModal} handleAssign={assign}>
              <p>User List</p>
            </AssignModal>
            {tasks
              .slice(0)
              .reverse()
              .map((e, i) => {
                if (e.status == "done" || e.status == "failed")
                  return <TaskAssignRow key={i} task={e} openModal={showModal}></TaskAssignRow>;
              })}
          </div>
        </header>
      </div>
    );
  } else {
    return <Redirect to="login"></Redirect>;
  }
}

export default AssignPage;
