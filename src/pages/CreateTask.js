import "../App.css";
import Select from "react-select";
import React, { useEffect,useState, useRef } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { getToken, isAuth, unAuth } from "../user/User";
import createTask from "../api/CreateTask";
import ClipLoader from "react-spinners/ClipLoader";
import toast, { Toaster } from 'react-hot-toast';
import Username from "../components/Username";
import LogoutButton from "../components/LogoutButton";
import BackButton from "../components/BackButton";
import getUserInfo from "../api/GetUserInfo";
import AdminMail from "../components/AdminMail";
import TaskRow from "../components/TaskRow";
import getTaskList from "../api/GetTaskList";
const options = [
  { value: "de", label: "German" },
  { value: "en", label: "English" },
  { value: "ar", label: "Arabic" },
];

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "white" : "#093545",
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";

    return { ...provided, opacity, transition };
  },
};

function CreateTask() {
  var intervalId;
  const history = useHistory();
  const [selectedOption, setSelectedOption] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [tasks, setTasks] = useState([]);
  //const [fileName,setFileName] = useState('Select a file')

  const onBrowseClick = () => {
    // `current` points to the mounted file input element
    inputFile.current.click();
  };
  const onSelectFile = () => {
    if (inputFile.current.files.length > 0) {
      //setFileName(inputFile.current.files[0].name)
      setTitle(inputFile.current.files[0].name)
    }
  };

  const inputFile = useRef(null);
  const getTasks = async () => {
    let token = getToken();
    if(!window.location.href.endsWith('create'))
    {
      clearInterval(intervalId);
      intervalId=null;
      return;
    }
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
    if (!loading2) {
      setLoading2(true)
      if(!intervalId)
      {
        intervalId = setInterval(getTasks, 30000);
        getTasks();
        setLoading2(false)
      }
    }
  }, []);

  const onCreateTheTaskClick = async () => {
    /*if (title == "") {
      toast.error("please type a title for the task", { position: "bottom-center" });
      return;
    }*/
    if (selectedOption == "") {
      toast.error("please select the language of the audio file", { position: "bottom-center" });
      return;
    }
    if (inputFile.current.files.length < 1) {
      toast.error("please select an audio file ", { position: "bottom-center" });
      return;
    }


    setLoading(true);
    let token = getToken();
    let userInfo = await getUserInfo(token);
    if(userInfo.restricted&&inputFile.current.files[0].size>10485760)
    {
      toast.error("You have a restricted account, contact the adminstrator for more Info", { position: "bottom-center" });
      setLoading(false);
      return;
    }

    
    let response = await createTask(token, inputFile, title, selectedOption);
    setLoading(false);
    if(response)
      toast.success("Task uploaded successfully", { position: "bottom-center" });
    else
      toast.error("A problem occurred while uploading the task", { position: "bottom-center" });
  };

  if (isAuth()) {
    return (
      <div className="App">
        <header className="App-header">
          <AdminMail></AdminMail>
          <LogoutButton></LogoutButton>
          <BackButton></BackButton>
          <Username></Username>
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
            <div
              style={{
                flexDirection: "row",
                display: "flex",
              }}
            >
              <input
                type="file"
                id="file"
                ref={inputFile}
                style={{ display: "none" }}
                onChange={onSelectFile}
              />
              <button
                onClick={onBrowseClick}
                style={{ alignSelf: "flex-start" }}
              >
                {'Select a File'}
              </button>
            </div>
            <div style={{ height: 25 }}></div>
            
            <input
              onChange={(e) => {
                //setTitle(e.target.value);
              }}
              style={{
                backgroundColor: "#224957",
                width: "100%",
                height: 30,
                marginTop: 10,
                borderRadius: 7,
                color: "#ffffff",
                borderWidth: 0,
              }}
              value={title}
              placeholder={'File Name'}
              readOnly={true}
            ></input>
            <div style={{ height: 25 }}></div>
            <Select
              styles={customStyles}
              defaultValue={selectedOption}
              onChange={(e) => setSelectedOption(e.value)}
              options={options}
            />
            <div style={{ height: 25 }}></div>

            <button
              onClick={onCreateTheTaskClick}
              style={{
                backgroundColor: "#20DF7F",
                width: "100%",
                height: 35,
                borderRadius: 7,
                color: "white",
              }}
            >
              Submit Task
            </button>
            <div style={{height:10}}></div>
            <ClipLoader color={"#ffffff"} loading={loading} size={40} />
          </div>
          <div style={{height:50}}></div>
          <div
            style={{
              backgroundColor: "rgba(255,255,255,0.05)",
              padding: 20,
              borderRadius: 10,
              width: "50%",
            }}
          >
            <div style={{ flexDirection: "row", display: "flex" }}>
             
            </div>

            <p style={{ fontSize: 30, margin: 0, fontWeight: "bold" }}>
              Your Tasks
            </p>
            {tasks.slice(0).reverse().map((e,i) => {
              if(e.status!='failed'&&e.status!='done')
                return <TaskRow key={i} task={e}></TaskRow>;
            })}
          </div>
          <div style={{ height: 10 }}></div>


        </header>
        <Toaster></Toaster>
      </div>
    );
  } else {
    return <Redirect to="login"></Redirect>;
  }
}

export default CreateTask;
