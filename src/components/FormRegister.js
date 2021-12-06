import React from "react";
import { useState } from "react";
import axios from "axios";
import {
  BsFillPersonCheckFill,
  BsMailbox,
  BsFillLockFill,
} from "react-icons/bs";
import { useHistory } from "react-router";
import Swal from "sweetalert2";

const Register = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const history = useHistory();

  const handleSetName = (e) => {
    setName(e.target.value);
  };
  const handleSetPassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSetEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/register", {
        name: name,
        email: email,
        password: password,
      })
      .then(() =>
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Registrado con éxito`,
          showConfirmButton: false,
          timer: 1400,
        })
      )
      .then(() => history.push("/login"))
      .catch((e) =>
        Swal.fire({
          icon: "warning",
          title: "Oops...",
          text: "Tenemos un error",
        })
      );
    setEmail("");
    setName("");
    setPassword("");
  };
  return (
    <>
    <div class="tile is-parent level-item has-text-centered">
      <form onSubmit={handleSubmit}>
        <div class="field">
          <p class="control has-icons-left">
            <input
              class="input"
              type="text"
              placeholder="Name"
              value={name}
              onChange={handleSetName}
            />
            <span class="icon is-small is-left">
              <BsFillPersonCheckFill />
            </span>
          </p>
        </div>
        <div class="field">
          <p class="control has-icons-left has-icons-right">
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
            <span class="icon is-small is-right"></span>
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
            <button class="button is-success">Register</button>
          </p>
        </div>
      </form>
      </div>
    </>
  );
};

export default Register;
