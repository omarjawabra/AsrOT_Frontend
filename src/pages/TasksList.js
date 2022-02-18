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

const options = ["one", "two", "three"];
const defaultOption = options[0];
var intervalId;

function TasksList() {
  const history = useHistory();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const logout = () => {
    unAuth();
    clearInterval(intervalId);
    intervalId=null;
    history.push("login");
  };

  const createTask = () => {
    clearInterval(intervalId);
    intervalId=null;
    if (isAuth()) {
      history.push("create");
    } else logout();
  };

  const getTasks = async () => {
    let token = getToken();
    if (token) {
      let tasks = await getTaskList(token);
      if (tasks) {
        tasks = tasks.tasks;
        setTasks(tasks);
      }
    } else {
      unAuth();
      clearInterval(intervalId);
      intervalId=null;
      history.push("login");
    }
  };

  useEffect(() => {
    if (!loading) {
      setLoading(true)
      if(!intervalId)
      {
        intervalId = setInterval(getTasks, 30000);
        getTasks();
        setLoading(false)
      }
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
            {tasks.slice(0).reverse().map((e,i) => {
              if(e.status=='done'||e.status=='failed')
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
