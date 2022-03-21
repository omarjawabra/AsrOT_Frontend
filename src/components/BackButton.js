import React from "react";
import {Link} from "react-router-dom";
export default function BackButton()
{
    return(
        <Link to="/">
        <button
            style={{
              position: "absolute",
              top: "10%",
              left: "2%",
              zIndex: 10,
              padding: 10,
              borderRadius: 10,
              backgroundColor: "rgba(0, 0, 0, 0.4)",
              color: "white",
              border: "none",
              fontSize: "0.75em",
              cursor: "pointer",
            }}
          >
            Back
          </button>
          </Link>
    );
}