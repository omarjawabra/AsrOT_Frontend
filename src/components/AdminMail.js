import React from "react";

export default function AdminMail()
{
    return(
        <div
            style={{
              position: "absolute",
              top: "3%",
              right: "2%",
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
            Admin Email: speechdatacollector@gmail.com
          </div>
    );
}