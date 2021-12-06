import axios from "axios";
import React from "react"
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../features/userSlice";
import {useHistory} from "react-router"


const Logout = () =>{
    const history = useHistory()
    const user = useSelector(selectUser);
    const dispatch = useDispatch()
    const handleLogOut =(e)=>{
        e.preventDefault()
        axios.post("/api/logout")
        .then(val=>dispatch(logout(val)))
        .then(() => history.push("/"))
        .catch((e)=>console.log(e))
    }

    return(
        <>
        <h1 className="has-text-white is-size-4	has-text-weight-bold">Welcome <span>{user.name}</span>
        &nbsp;
        &nbsp;
        <button class="button is-info is-inverted" onClick={handleLogOut}>Logout</button>
        </h1>
        
        </>
    )
}

export default Logout