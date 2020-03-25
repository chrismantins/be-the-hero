import React, { useState, useEffect } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";

import api from "../../services/api";

import "./styles.css";
import LogoImg from "../../assets/logo.svg";

export default function NewIncident() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");

  const history = useHistory();

  const ongId = localStorage.getItem("ongId");

  async function handleNewIncident(event) {
    event.preventDefault();

    const data = { title, description, value };
    console.log(data);
    try {
      await api.post("incidents", data, {
        headers: { Authorization: ongId }
      });
      console.log(data);
      history.push("/profile");
    } catch (err) {
      alert("Error ao cadastrar o novo caso, tente novamente mais tarde.");
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={LogoImg} alt="Heroes" />

          <h1>Cadastrar novo caso</h1>
          <p>
            Descreva o caso detalhadamente para encontrar um herói para resolve
            isso.
          </p>

          <Link className="default-link" to="/">
            <FiArrowLeft size={16} color="#e01541" />
            Voltar para home
          </Link>
        </section>
        <form onSubmit={handleNewIncident}>
          <input
            placeholder="Tílulo do caso"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Descrição"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <input
            placeholder="Valor em Reais"
            value={value}
            onChange={e => setValue(e.target.value)}
          />

          <button className="button">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}
