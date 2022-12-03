import React from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";

const UsersList = ({ user, update, refresh }) => {
  const deleteUser = function () {
    axios.delete(`http://localhost:4000/api/v1/users/${user.id}`).then(() => {
      refresh();
    });
  };

  return (
    <div className="card">
      <ul>
        <li>
          <h2>
            Empleado:
            {user.name}
          </h2>
        </li>
        <li>Cedula: {user.CC}</li>
        <li>Fecha nacimiento: {user.birthDate}</li>
        <li>Profesión: {user.profession}</li>
        <li>Télefono: {user.phone}</li>
        <li>Genero: {user.gender}</li>
        <li>Ciudad: {user.city}</li>
        <li>Departamento: {user.state}</li>
        <li>Vehiculo
          <ul>
            <li>Tipo {user.vehicle?.type}</li>
            <li>Marca {user.vehicle?.brand}</li>
            <li>Modelo {user.vehicle?.year}</li>
          </ul>
        </li>
      </ul>
      <div className="deleteEdit">
        <button
          onClick={() => {
            update(user);
          }}
        >
          <FontAwesomeIcon icon={faPencil} />
        </button>
        <button onClick={deleteUser}>
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
      </div>
    </div>
  );
};
export default UsersList;
