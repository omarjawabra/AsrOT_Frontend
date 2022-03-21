import "./AssignModalStyle.css";
import React, { useEffect, useState } from "react";
import getUserList from "../api/UserList";
import { getToken } from "../user/User";

function AssignModal(props) {
    const showHideClassName = props.show ? 'modal display-block' : 'modal display-none';
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
        <div className={showHideClassName}>
            <section className='modal-main'>
                {props.children}
                {users.map((user) => {
                    return (<div>
                        <span>{user.email}</span>
                        <button onClick={() => {
                            props.handleAssign(user.email);
                        }}>
                            Assign
                        </button>    
                    </div>)
                })}
                <button
                    onClick={props.handleClose}
                >
                    Close
                </button>
            </section>
        </div>
    )
}

export default AssignModal;