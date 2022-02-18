import "../App.css";
import React from "react";
import {  useHistory } from "react-router-dom";
import AdminMail from "../components/AdminMail";
import { isAuth ,unAuth} from "../user/User";
import LogoutButton from "../components/LogoutButton";
import Username from "../components/Username";
import BackButton from "../components/BackButton";
function DataSelectionPage() {
  const history = useHistory();
  
  const assignedTasksClicked = async () => {
    if (isAuth()) {
      history.push("list");
    } else logout();
  };


  const logout = () => {
    unAuth();
    history.push("login");
  };
    const myTasksClicked = async () => {

      if (isAuth()) {
        history.push("list");
      } else logout();
  };


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
            width: "30%",
          }}
        >
         

         {/* <button
            onClick={assignedTasksClicked}
            style={{
              backgroundColor: "#20DF7F",
              width: "100%",
              height: 35,
              borderRadius: 7,
              marginTop: 10,
              color: "white",
            }}
          >
            Assigned Tasks
          </button>
          <div style={{ height: 100 }}></div>*/}
          <button
            onClick={myTasksClicked}
            style={{
              backgroundColor: "#20DF7F",
              width: "100%",
              height: 35,
              borderRadius: 7,
              marginTop: 10,
              color: "white",
            }}
          >
            My Tasks
          </button>
          <div style={{ height: 10 }}></div>
        </div>

        
        
        <img
          src={require("../images/background.png")}
          style={{
            bottom: "0%",
            backgroundColor: "rgba(0,0,0,0)",
            width: "100%",
            position: "absolute",
          }}
        ></img>
      </header>
    </div>
  );
}

export default DataSelectionPage;