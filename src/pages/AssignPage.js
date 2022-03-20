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


function AssignPage() {
  const history = useHistory();
  const [tasks, setTasks] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [loading, setLoading] = useState(false);

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
            {tasks
              .slice(0)
              .reverse()
              .map((e, i) => {
                if (e.status == "done" || e.status == "failed")
                  return <TaskAssignRow key={i} task={e}></TaskAssignRow>;
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