import React from "react"
import {useEffect, useState} from "react";
import mainRoute from "../api/mainRoute";
import APIkey from "../api/Key";
import { Link, Route, useParams } from "react-router-dom";
import Card from "../content/Card";

const Each=()=>{
    const {name,id}=useParams()
    const [oneMovie, setOneMovie]=useState([])
   
    useEffect(()=>{
        mainRoute.get(`?apikey=${APIkey}&i=${id}&${name}`)
        .then(res=>res.data)
        .then(data=>setOneMovie(data))
    },[id])



    return(
       <Route>
           <div className="column is-3 content ">

           <Card movie={oneMovie}/>
           <h1>{oneMovie.Plot}</h1>
           <h2>{oneMovie.Rating}</h2>
           <h3>{oneMovie.Runtime}</h3>
           <h3>{oneMovie.Genre}</h3>
           <button class="button is-large mb-4"><Link to="/">Home</Link></button>
           </div>
       
       </Route>
    )
}

export default Each