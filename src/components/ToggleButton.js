import React, { useState } from "react";
export default function ToggleButton(props)
{
    const [active, setActive] = useState(false);
    return(
        <button
            onClick={()=>setActive(!active)}
            style={{
              backgroundColor: active?"#20DF7F":"#808080",
              width: "100%",
              height: 35,
              borderRadius: 7,
              marginTop: 10,
              color: "white",
              marginLeft:5,
              marginRight:5
            }}
          >
            {props.language}
          </button>
    );
}