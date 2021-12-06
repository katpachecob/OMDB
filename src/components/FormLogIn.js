import React from "react";
import { useState } from "react";
import axios from "axios";

import { useHistory } from "react-router";

import { useDispatch, useSelector } from "react-redux";
import { login, selectUser } from "../features/userSlice";
import Swal from "sweetalert2";
import {

  BsMailbox,
  BsFillLockFill,
} from "react-icons/bs";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const user = useSelector(selectUser);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSetPassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSetEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/login", {
        email: email,
        password: password,
      })
      .then((data) => dispatch(login(data.data)))
      .then((user) =>
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Bienvenido ${user.payload.name}`,
          showConfirmButton: false,
          timer: 1400,
        })
      )
      .then(() => history.push("/search"))
      .catch((err) =>
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Credenciales incorrectas!",
        })
      );
    setEmail("");
    setPassword("");
  };

  return (
    <>
      {user ? (
        <>
          <button className="button is-primary">
            <strong>Log out</strong>
          </button>
          <h1>{user.name}</h1>
        </>
      ) : (
        <>
          <div class="tile is-parent level-item has-text-centered">
            <form onSubmit={handleSubmit}>
              <div class="field">
                <p class="control has-icons-left has-icons-right ">
                  
                   <input
                  
                    class="input"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleSetEmail}
                  />
                  <span class="icon is-small is-left">
                  <BsMailbox />
                  </span>
                  <span class="icon is-small is-right">
                    <i class="fas fa-check"></i>
                  </span>
                </p>
              </div>
              <div class="field">
                <p class="control has-icons-left">
                  <input
                    class="input"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handleSetPassword}
                  />
                  <span class="icon is-small is-left">
                  <BsFillLockFill />
                  </span>
                </p>
              </div>
              <div class="field">
                <p class="control">
                  <button class="button is-success">Login</button>
                </p>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default Login;
