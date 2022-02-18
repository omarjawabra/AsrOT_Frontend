import toast, { Toaster } from "react-hot-toast";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import ProgressBar from "react-bootstrap/ProgressBar";
import React, { useState } from "react";
import getTextFile from "../api/GetTextFile";
import { getToken } from "../user/User";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import getVttFile from "../api/GetVttFile";
import getMediaFile from "../api/GetMediaFile";
function SharedFilesRow(props) {
  

    return(
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
              <div
                style={{
                  flex: 1,
                }}
              >
                {props.title}
              </div>

              <div
                style={{
                  flex: 1,
                }}
              >
                {props.fileName}
              </div>
              <div
                style={{
                  flex: 1,
                }}
              >
                {props.date}
              </div>
              <button
                onClick={props.onClick}
                style={{
                  flex: 1,
                  width: 120,
                  fontSize: 15,
                  alignSelf: "center",
                }}
              >
                download
              </button>
            </div>
    )
}
export default SharedFilesRow;
