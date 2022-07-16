import React from 'react';
import axios from 'axios'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons"

const UsersList = ({ user, update, refresh }) => {
    const deleteUser = function () {
        axios.delete(`https://users-crud1.herokuapp.com/users/${user.id}/`)
            .then(() => {
                refresh()
            })
    }

    return (
        <div className='card'>
            <ul>
                <li><h2>{user.first_name} {user.last_name}</h2></li>
                <li>{user.email}</li>
                <li>{user.birthday}</li>
            </ul>
            <div className='deleteEdit'>
                    <button onClick={() => { update(user) }}><FontAwesomeIcon icon={faPencil} /></button>
                    <button onClick={deleteUser}><FontAwesomeIcon icon={faTrashCan} /></button>
                </div>
        </div>
    );
};
export default UsersList;