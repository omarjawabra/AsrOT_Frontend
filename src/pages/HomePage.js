import "../App.css";
import React from "react";
import {  useHistory } from "react-router-dom";
import AdminMail from "../components/AdminMail";
import { isAuth ,unAuth, getToken} from "../user/User";
import LogoutButton from "../components/LogoutButton";
import Username from "../components/Username";
import { Redirect } from "react-router-dom";
import getUserInfo from "../api/GetUserInfo";
import TaskRow from "../components/TaskRow";
import {useState, useEffect} from "react";
import getTaskList from "../api/GetTaskList";
import getCSV from "../api/GetCSV";
import toast, { Toaster } from "react-hot-toast";
var intervalId;
function HomePage() {
  const history = useHistory();
  let [canMakeAssignments, setCanMakeAssignments] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function getCanMakeAssignments(token) {
      const userObj = await getUserInfo(token);
      return userObj.canMakeAssignments;
    }
    const token = getToken();
    getCanMakeAssignments(token).then((cma) => {
      setCanMakeAssignments(cma);
    });
  });

  const myDataClicked = async () => {
    if (isAuth()) {
      history.push("/list");
    } else logout();
  };

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
          //const assignedTasks = tasks.assignedTasks;
          //setAssignedTasks(assignedTasks);
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


  const logout = () => {
    unAuth();
    history.push("login");
  };
    const uploadNewTaskClicked = async () => {

      if (isAuth()) {
        history.push("create");
      } else logout();
  };

  const handleAssignments = () => {
    history.push("/assign");
  }

  if (isAuth()) {
  return (
    <div className="App">
      <header className="App-header">
        <AdminMail></AdminMail>
        <Username></Username>
        <LogoutButton></LogoutButton>
        <h1 style={{ color: "#ffffff", fontSize: 75 }}>
          Automatic Transcriber
        </h1>
        <div
          style={{
            backgroundColor: "rgba(255,255,255,0.05)",
            padding: 20,
            borderRadius: 10,
            width: "30%",
          }}
        >
         

          {/* <button
            onClick={myDataClicked}
            style={{
              backgroundColor: "#20DF7F",
              width: "100%",
              height: 35,
              borderRadius: 7,
              marginTop: 10,
              color: "white",
            }}
          >
            My Media
          </button>
          <div style={{ height: 10 }}></div>*/}
          <button
            onClick={uploadNewTaskClicked}
            style={{
              backgroundColor: "#20DF7F",
              width: "100%",
              height: 35,
              borderRadius: 7,
              marginTop: 10,
              color: "white",
            }}
          >
            Upload Media
          </button>
            {/* canMakeAssignments && (<><div style={{ height: 10 }}></div><button
            onClick={handleAssignments}
            style={{
              backgroundColor: "#20DF7F",
              width: "100%",
              height: 35,
              borderRadius: 7,
              marginTop: 10,
              color: "white",
            }}
          >
            Assign tasks
          </button><div style={{ height: 10 }}></div></>)*/}
        </div>
        <div style={{ height: 20 }}></div>
        <div
            style={{
              backgroundColor: "rgba(255,255,255,0.05)",
              padding: 20,
              borderRadius: 10,
              width: "50%",
            }}
          >
            <div style={{display:'flex',flexDirection:'row'}}>
            <div style={{flex:1}}>
            <button onClick={ async ()  =>  {
              let text = await getCSV()
              if (text) {
                const element = document.createElement("a");
                const file = new Blob([text], { type: "text/plain" });
                element.href = URL.createObjectURL(file);
                element.download = "YourLinks.csv";
                document.body.appendChild(element); // Required for this to work in FireFox
                element.click();
              } else {
                toast.error("links file could not be downloaded", {
                  position: "bottom-center",
                });
              }
            }}>
              Get all Links
            </button>
            </div>
            <p style={{ fontSize: 30, margin: 0, fontWeight: "bold",flex:1 }}>
              Your Media
            </p>
            <p style={{flex:1}}>

            </p>
            </div>
            {tasks
              .slice(0)
              .reverse()
              .map((e, i) => {
                  return <TaskRow key={i} task={e}></TaskRow>;
              })}
          </div>
        
        
        {/*<img
          src={require("../images/background.png")}
          style={{
            bottom: "0%",
            backgroundColor: "rgba(0,0,0,0)",
            width: "100%",
            position: "absolute",
          }}
        ></img>*/}
        <Toaster></Toaster>
      </header>

    </div>
    )
    } else {
      return <Redirect to="login"></Redirect>;
    }
}

export default HomePage;
