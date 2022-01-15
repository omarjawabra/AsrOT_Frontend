import toast, { Toaster } from "react-hot-toast";
import { AiOutlineCheckCircle } from "react-icons/ai";
import ProgressBar from "react-bootstrap/ProgressBar";
import React, { useState } from "react";
function TaskRow(props) {

  const [progressValue, setProgressValue] = useState(0);
  const copyTaskId = () => {
    navigator.clipboard.writeText(props.task.task_id);
    toast.success("Task id copied to clipboard", { position: "bottom-center" });
  };


  const calculateProgress=(startingTime,size)=>
  {
    
    const st = Date.parse(startingTime);  
   let et = (size/1040512)*40;
   let now = new Date()
   let timePassed = (now-st)/1000; 
    let progress = parseInt((timePassed/et)*100);
    if(progress>99)
      progress=99;
    setProgressValue(progress)

  }

  const Status = (task) => {
    let status = task.status.status
    if (status == "done") {
      return (
        <p
          style={{
            flex: 1,
            fontSize: 15,
            fontSize: 15,
            color: "green",
            fontWeight: "bold",
            alignSelf: "center",
          }}
        >
          {status}
        </p>
      );
    } else {
      if (status == "failed")
        return (
          <p
            style={{
              flex: 1,
              fontSize: 15,
              alignSelf: "center",
              color: "red",
              fontWeight: "bold",
            }}
          >
            {status}
          </p>
        );
      else
      {
        calculateProgress(task.status.date_time,task.status.file_size)
        return (
          <div style={{flex:1}}>
            <p
              style={{
                flex: 1,
                fontSize: 15,
                alignSelf: "center",
                color: "blue",
                fontWeight: "bold",
              }}
            >
              {status}
            </p>
            <div style={{ flexDirection: "row", display: "flex",alignSelf:'center',alignItems:'center',justifyContent:'center'}}>
              <progress max="100" value={progressValue} style={{ width: 50 ,margin:0,padding:0}}></progress>
              <p style={{ fontSize: 10, alignSelf: "center",margin:0,padding:0}}>{progressValue}%</p>
            </div>
          </div>
        );
      }
    }
  };
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
      <p style={{ flex: 1, fontSize: 15, alignSelf: "center" }}>
        {props.task.task_name}
      </p>
      

      <p style={{ flex: 1, fontSize: 15, alignSelf: "center" ,padding:0,margin:0}}>
        {new Date(props.task.date_time).toLocaleString()}
      </p>
      
      <Status status={props.task}></Status>

      <button
        onClick={copyTaskId}
        style={{ flex: 1, fontSize: 15, alignSelf: "center" }}
      >
        copy task id
      </button>
      <Toaster></Toaster>
    </div>
  );
}

{
  /**

<div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <button style={{ alignSelf: "center" }}>Download Resources</button>
      </div>


*/
}
export default TaskRow;
