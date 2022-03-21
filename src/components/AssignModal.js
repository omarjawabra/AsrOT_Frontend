import "../css/AssignModalStyle.css";
import React, { useEffect, useState } from "react";
import getUserList from "../api/UserList";
import { getToken } from "../user/User";

function AssignModal(props) {
    const showHideClassName = props.show ? '' : 'hidden'
    let [users, setUsers] = useState([]);
    useEffect(() => {
        if (!props.show) return;
        async function getUsers(token) {
            return await getUserList(token);
        }
        const token = getToken();
        getUsers(token).then((userList) => {
            setUsers(userList);
        });
    });
    return (
        <div className={`modal ${showHideClassName}`}>
            <div className='modal-main'>
                <button className="close" onClick={props.handleClose}>&#10006;</button>
                <h3>User List</h3>
                {props.children}
                <table id="user-list">
                    <tbody>
                        {users.map((user, i) => {
                            return (<tr key={i}>
                                <td>{user.email}</td>
                                <td>
                                    <button onClick={() => {
                                        props.handleAssign(user.email);
                                    }}>
                                        Assign
                                    </button>
                                </td>
                            </tr>)
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AssignModal;