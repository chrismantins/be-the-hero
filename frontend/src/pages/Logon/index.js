import React, { useState } from "react";
import { FiLogIn } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";

import api from "../../services/api";

import "./styles.css";
import heroesImg from "../../assets/heroes.png";
import LogoImg from "../../assets/logo.svg";

export default function Logon() {
  const [id, setId] = useState("");

  const history = useHistory();

  async function handleLogin(event) {
    event.preventDefault();

    try {
      const response = await api.post("sessions", { id });
      localStorage.setItem("ongId", id);
      localStorage.setItem("ongName", response.data.name);
      history.push("/profile");
    } catch (err) {
      alert(`Não foi possivel efetuar o login: ${err.message}`);
    }
  }

  return (
    <div className="logon-cointainer">
      <section className="form">
        <img src={LogoImg} alt="Heroes" />
        <form onSubmit={handleLogin}>
          <h1>Faça seu Logon</h1>
          <input
            placeholder="Sua ID"
            value={id}
            onChange={e => setId(e.target.value)}
          />
          <button className="button" type="submit">
            Entrar
          </button>
          <Link className="default-link" to="/register">
            <FiLogIn size={16} color="#e01541" />
            Não tenho cadastro
          </Link>
        </form>
      </section>
      <img src={heroesImg} alt="Heroes" />
    </div>
  );
}
