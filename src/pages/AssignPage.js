import "../App.css";
import "../css/AssignPage.css";
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
          <h1>Automatic Transcriber</h1>
        </header>
        <main>
          <div className="Content-box">
            <h2>All Tasks</h2>
            <AssignModal show={showAssignModal} handleClose={hideModal} handleAssign={assign}></AssignModal>
            <table id="tasks-list">
              <tbody>
                {tasks
                  .slice(0)
                  .reverse()
                  .map((e, i) => {
                    if (e.status == "done" || e.status == "failed")
                      return <TaskAssignRow key={i} task={e} openModal={showModal}></TaskAssignRow>;
                  })}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    );
  } else {
    return <Redirect to="login"></Redirect>;
  }
}

export default AssignPage;
