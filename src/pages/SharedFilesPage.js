import "../App.css";
import TaskRow from "../components/TaskRow";
import Username from "../components/Username";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useHistory, Redirect } from "react-router-dom";
import { getToken, isAuth, unAuth } from "../user/User";
import * as qs from "query-string";
import getTask from "../api/GetTask";
import getTextFile from "../api/GetTextFile";
import getVttFile from "../api/GetVttFile";
import getMediaFile from "../api/GetMediaFile";
import SharedFilesRow from "../components/SharedFilesRow";
import getVttCorrection from "../api/GetVttCorrection";

const options = ["one", "two", "three"];


function SharedFilesPage() {
  const [taskName, setTaskName] = useState("");
  const [taskTime, setTaskTime] = useState("");
  const [taskId, setTaskId] = useState("");
  const [isCorrected, setIsCorrected] = useState("");
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const parsed = qs.parse(location.search);
    setTaskId(parsed.task_id);
    getTask(parsed.task_id).then((e) => {
      console.log(e);
      setTaskName((e.tasks.task_name).split('.')[0]);
      setTaskTime(e.tasks.date_time);
      setIsCorrected(e.tasks.correction);
    });
  }, []);

  const onDownloadTextClick = async () => {
    let text = await getTextFile(taskId);
    if (text) {
      const element = document.createElement("a");
      const file = new Blob([text], { type: "text/plain" });
      element.href = URL.createObjectURL(file);
      element.download = taskId + ".txt";
      document.body.appendChild(element); // Required for this to work in FireFox
      element.click();
    }
  };

  const onDownloadVTTClick = async () => {
    let text = await getVttFile(taskId);
    if (text) {
      const element = document.createElement("a");
      const file = new Blob([text], { type: "text/plain" });
      element.href = URL.createObjectURL(file);
      element.download = taskId + ".vtt";
      document.body.appendChild(element); // Required for this to work in FireFox
      element.click();
    }
  };

  const onDownloadCorrectionClick = async () => {
    let text = await getVttCorrection(taskId);
    if (text) {
      const element = document.createElement("a");
      const file = new Blob([text], { type: "text/plain" });
      element.href = URL.createObjectURL(file);
      element.download = taskId + ".vtt";
      document.body.appendChild(element); // Required for this to work in FireFox
      element.click();
    }
  };

  

  const onDownloadMediaClick = async () => {
    getMediaFile(taskId, taskName);
  };

  return (
    <div className="App">
       {taskName?
      <header className="App-header">
        <h1 style={{ color: "#ffffff", fontSize: 75 }}>
          Automatic Transcriber
        </h1>
        <div
          style={{
            backgroundColor: "rgba(255,255,255,0.05)",
            padding: 20,
            borderRadius: 10,
            width: "70%",
          }}
        >
          <p style={{ fontSize: 30, margin: 0, fontWeight: "bold" }}>
            Shared Files
          </p>
          
              <SharedFilesRow title={"Text File:"} fileName={taskName+".txt"} date={taskTime} onClick={onDownloadTextClick}></SharedFilesRow>
            
            <div style={{ height: 10 }}></div>
            <SharedFilesRow title={"Transcription:"} fileName={taskName+".vtt"} date={taskTime} onClick={onDownloadVTTClick}></SharedFilesRow>
            
            <div style={{ height: 10 }}></div>
            <SharedFilesRow title={"Media:"} fileName={taskName+".mp4"} date={taskTime} onClick={onDownloadMediaClick}></SharedFilesRow>
            
          

          <div style={{ height: 10 }}></div>
          {isCorrected ? (
              <SharedFilesRow title={"Correction:"} fileName={taskName+".vtt"} date={taskTime} onClick={onDownloadCorrectionClick}></SharedFilesRow>
          ) : (
            <div></div>
          )}
        </div>
      </header>
      :<h1 style={{ color: "#000000", fontSize: 75 }}>
      Please check your link!
    </h1>}
    </div>
  );
}

export default SharedFilesPage;
