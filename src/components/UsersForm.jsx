import React from 'react';
import axios from 'axios'
import { useState, useEffect } from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faUser,faEnvelope,faKey,faCakeCandles} from "@fortawesome/free-solid-svg-icons"

const UsersForm = ({ itemForUpdate, edited }) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [birthday, setBirthday] = useState("")

    useEffect(() => {
        if (itemForUpdate !== null) {
            setEmail(itemForUpdate.email)
            setPassword(itemForUpdate.password)
            setFirstName(itemForUpdate.first_name)
            setLastName(itemForUpdate.last_name)
            setBirthday(itemForUpdate.birthday)
        }
    }, [itemForUpdate])

    const submit = function (e) {
        
        let newUser = {
            birthday,
            email,
            first_name: firstName,
            last_name: lastName,
            password,
        }
        if (itemForUpdate === null) {
            axios.post("https://users-crud1.herokuapp.com/users/", newUser)
        } else {
            
            axios.put(`https://users-crud1.herokuapp.com/users/${itemForUpdate.id}/`, newUser)
                .catch((e) => { console.log(e) })
        }

    }
    return (
        <div className='form'>
            <form onSubmit={submit}>
                <div>
                
                    <label htmlFor="name"><FontAwesomeIcon icon={faUser} /></label>
                    <input type="text" placeholder='Name' id='name' value={firstName} onChange={(e) => { setFirstName(e.target.value) }} />
                    <label htmlFor="lastName"></label>
                    <input type="text" placeholder='Last name' id='lastName' value={lastName} onChange={e => setLastName(e.target.value)} />                
                </div>
    
                <div>
                    <label htmlFor="email"><FontAwesomeIcon icon={faEnvelope} /></label>
                    <input type="email" placeholder='Email' id='email' value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="password"><FontAwesomeIcon icon={faKey} /></label>
                    <input type="password" placeholder='Password' id='password' value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="dateOdBirthday"><FontAwesomeIcon icon={faCakeCandles}/></label>
                    <input type="date" id='dateOdBirthday' value={birthday} onChange={e => setBirthday(e.target.value)} />
                </div>
                <button type='submit'>{itemForUpdate === null ? "Submit" : "Update"}</button>
            </form>
        </div>
    );
};

export default UsersForm;