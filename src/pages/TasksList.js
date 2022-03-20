import "../App.css";
import TaskRow from "../components/TaskRow";
import Username from "../components/Username";
import React, { useEffect, useState } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { getToken, isAuth, unAuth } from "../user/User";
import getTaskList from "../api/GetTaskList";
import LogoutButton from "../components/LogoutButton";
import AdminMail from "../components/AdminMail";
import BackButton from "../components/BackButton";

var intervalId;

function TasksList() {
  const history = useHistory();
  const [tasks, setTasks] = useState([]);
  const [assignedTasks, setAssignedTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  /**
   * get the task list if logged in, otherwise logs out
   */
  const getTasks = async () => {
    let token = getToken();
    if (token) {
      let tasks = await getTaskList(token);
      console.log(tasks);
      if (tasks) {
        const myTasks = tasks.tasks;
        setTasks(myTasks);
        const assignedTasks = tasks.assignedTasks;
        setAssignedTasks(assignedTasks);
      }
    } else {
      unAuth();
      clearInterval(intervalId);
      intervalId = null;
      history.push("login");
    }
  };

  
  useEffect(() => {
    if (!loading) {
      getTasks();
      setLoading(true);
      if (!intervalId) {
        //calls getTasks every 30 secs
        intervalId = setInterval(getTasks, 30000);
      }
      setLoading(false);
    }
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
              Your Tasks
            </p>
            {tasks
              .slice(0)
              .reverse()
              .map((e, i) => {
                if (e.status == "done" || e.status == "failed")
                  return <TaskRow key={i} task={e}></TaskRow>;
              })}
          </div>
          <div
            style={{
              backgroundColor: "rgba(255,255,255,0.05)",
              padding: 20,
              borderRadius: 10,
              width: "50%",
            }}
          >
            <p style={{ fontSize: 30, margin: 0, fontWeight: "bold" }}>
              Assigned Tasks
            </p>
            {assignedTasks
              .slice(0)
              .reverse()
              .map((e, i) => {
                if (e.status == "done" || e.status == "failed")
                  return <TaskRow key={i} task={e}></TaskRow>;
              })}
          </div>
        </header>
      </div>
    );
  } else {
    return <Redirect to="login"></Redirect>;
  }
}

export default TasksList;