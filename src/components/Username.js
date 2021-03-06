import getUserInfo from "../api/GetUserInfo";
import { getEmail, getToken } from "../user/User";
import React, {  useState } from "react";
var userName;

export default function Username()
{

    let email = getEmail();

    return(
        <div
            style={{
              position: "absolute",
              top: "3%",
              left: "2%",
              zIndex: 10,
              padding: 10,
              borderRadius: 10,
              backgroundColor: "rgba(0, 0, 0, 0.2)",
              color: "white",
              border: "none",
              fontSize: "0.75em",
              cursor: "pointer",
            }}
          >
            Logged in as: {email}
          </div>
    );
}