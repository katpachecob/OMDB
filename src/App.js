import Search from "./components/Search";
import React from "react";
import { Route, Switch } from "react-router-dom";
import Each from "./components/eachMovie";
import Navbar from "./components/Navbar";
import Login from "./components/FormLogIn";
import Register from "./components/FormRegister";
import { useSelector } from "react-redux";
import {  selectUser } from "./features/userSlice";
import Logout from "./components/Logout";
import Home from "./components/Home"

import MyFavorite from "./components/myFavoriteMovies";


const App = () => {
  const user = useSelector(selectUser);

  return (
    <>
    <Navbar />
      
        <Switch>
        {user ? <Route path={"/logout"}><Logout /></Route>  : <Route path={"/login"}><Login /></Route>}
       <Route exact path="/">
        <Home/>
      </Route>  
        <Route  path={"/my/movies/:id"}>
          <MyFavorite />
        </Route>
 
        <Route  path={"/:name/:id"}>
          <Each />
        </Route>
        <Route  path={"/register"}>
          <Register />
        </Route>
        <Route  exact path={"/:search"}>
          <Search />
        </Route>
        </Switch>
    </>
  );
};

export default App;
