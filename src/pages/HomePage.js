import "../App.css";
import React, { useState } from "react";
import login from "../api/Login";
import ClipLoader from "react-spinners/ClipLoader";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../user/User";
import toast, { Toaster } from 'react-hot-toast';
import AdminMail from "../components/AdminMail";

function HomePage() {
  const history = useHistory();
  const myDataClicked = async () => {
    /*setLoading(true);
    let response = await login(email, password);
    setLoading(false);
    if (response) {
      auth(response.token, email);
      history.push("/");
    } else {
      toast.error("Failed to login, please check your credentials", { position: "bottom-center" });
    }*/
  };

    const uploadNewTaskClicked = async () => {
    /*setLoading(true);
    let response = await login(email, password);
    setLoading(false);
    if (response) {
      auth(response.token, email);
      history.push("/");
    } else {
      toast.error("Failed to login, please check your credentials", { position: "bottom-center" });
    }*/
  };


  return (
    <div className="App">
      <header className="App-header">
        <AdminMail></AdminMail>
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
         

          <button
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
            My Data
          </button>
          <div style={{ height: 100 }}></div>
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
            Upload New Task
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

export default HomePage;
