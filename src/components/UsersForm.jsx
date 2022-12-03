import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faKey,
  faCakeCandles,
} from "@fortawesome/free-solid-svg-icons";

const UsersForm = ({ itemForUpdate, edited }) => {
  const [name, setName] = useState("");
  const [CC, setCC] = useState(0);
  const [birthDate, setBirthDate] = useState("");
  const [profession, setProfession] = useState("");
  const [phone, setPhone] = useState(0);
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const [type, setType] = useState("");
  const [brand, setBrand] = useState("");
  const [year, setYear] = useState(0);

  useEffect(() => {
    if (itemForUpdate !== null) {
      setName(itemForUpdate.name);
      setCC(itemForUpdate.CC);
      setBirthDate(itemForUpdate.birthDate);
      setProfession(itemForUpdate.profession);
      setPhone(itemForUpdate.phone);
      setGender(itemForUpdate.gender);
      setCity(itemForUpdate.city);
      setState(itemForUpdate.state);

      setType(itemForUpdate.type);
      setBrand(itemForUpdate.brand);
      setYear(itemForUpdate.year);
    }
  }, [itemForUpdate]);

  const submit = function (e) {
    e.preventDefault();
    let newUser = {
      name,
      CC,
      birthDate,
      profession,
      phone,
      gender,
      city,
      state,
    };
    let newVehicle = {
      userId: 12,
      type,
      brand,
      year,
    };
    if (itemForUpdate === null) {
      axios
        .post("http://localhost:4000/api/v1/users", newUser)
        .then((res) => {
          console.log(res.data.data.newUser.id);
          newVehicle.userId = res.data.data.newUser.id;
          newVehicle.year = parseInt(newVehicle.year);
          console.log(newVehicle);
          axios
            .post("http://localhost:4000/api/v1/vehicles", newVehicle)
            .catch(function (e) {
              console.log(e.message);
            })
        })
        
        .catch(function (error) {
          console.log(
            "Hubo un problema con la petición axios:" + error.message
          );
        });
    } else {
      axios
        .patch(
          `http://localhost:4000/api/v1/users/${itemForUpdate.id}/`,
          newUser
        )
        .catch((e) => {
          console.log(e);
        });
    }
    location.reload();
  };
  /*
   {
   "name":"Wilmer",
   "CC":101010525,
   "birthDate":"2012-04-23T18:25:43",
   "profession":"Solar",
   "phone":120344797,
   "gender":"M",
   "city":"Cúcuta",
   "state":"N Santander"
} */
  return (
    <div className="form">
      <form onSubmit={submit}>
        <div>
          <label htmlFor="name">
            <FontAwesomeIcon icon={faUser} /> Nombre
          </label>
          <input
            type="text"
            placeholder="Nombre"
            id="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <label htmlFor="lastName"></label> Cedula
          <input
            type="number"
            placeholder="CC"
            id="lastName"
            value={CC}
            onChange={(e) => setCC(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="email">
            <FontAwesomeIcon icon={faEnvelope} /> Profesión
          </label>
          <input
            type="text"
            placeholder="Profesión"
            id="email"
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">
            <FontAwesomeIcon icon={faKey} /> Télefono
          </label>
          <input
            type="text"
            placeholder="Télefono"
            id="password"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="dateOdBirthday">
            <FontAwesomeIcon icon={faCakeCandles} /> Fecha de nacimiento
          </label>
          <input
            type="date"
            id="dateOdBirthday"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">
            <FontAwesomeIcon icon={faKey} /> Género
          </label>
          <input
            type="text"
            placeholder="Género"
            id="password"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">
            <FontAwesomeIcon icon={faKey} /> Ciudad
          </label>
          <input
            type="text"
            placeholder="Ciudad"
            id="password"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">
            <FontAwesomeIcon icon={faKey} /> Departamento
          </label>
          <input
            type="text"
            placeholder="Departamento"
            id="password"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </div>
        <hr />
        <h2>VEHICULO</h2>
        <div>
          <label htmlFor="password">Tipo</label>
          <input
            type="text"
            placeholder="Carro, moto, etc"
            id="password"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Marca</label>
          <input
            type="text"
            placeholder="Mazda, Suzuki, etc"
            id="password"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Modelo</label>
          <input
            type="number"
            placeholder="2010, 2011, etc"
            id="password"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </div>

        <button type="submit">
          {itemForUpdate === null ? "Submit" : "Update"}
        </button>
      </form>
    </div>
  );
};

export default UsersForm;
