import "../App.css";
import React from "react";
import {  useHistory } from "react-router-dom";
import AdminMail from "../components/AdminMail";
import { isAuth ,unAuth, getToken} from "../user/User";
import LogoutButton from "../components/LogoutButton";
import Username from "../components/Username";
import { Redirect } from "react-router-dom";
import getUserInfo from "../api/GetUserInfo";
import {useState, useEffect} from "react";

function HomePage() {
  const history = useHistory();
  let [canMakeAssignments, setCanMakeAssignments] = useState(false);

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
          <div style={{ height: 10 }}></div>
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
            Upload New Media
          </button>
            { canMakeAssignments && (<><div style={{ height: 10 }}></div><button
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
          </button><div style={{ height: 10 }}></div></>)}
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
    )
    } else {
      return <Redirect to="login"></Redirect>;
    }
}

export default HomePage;
