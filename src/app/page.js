"use client"
import { useState } from "react";
import styles from "./page.module.css";
import HexagonosSVG from "./components/hexagonos/Hexagonos";
import React from "react";
import axios from "axios";


export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();  // Evita el comportamiento por defecto del formulario

    try {
      axios.post("/api/login", { email, password }, { withCredentials: true })  // { withCredentials: true } es necesario para enviar cookies
        .then((response) => {
          console.log(response);
          window.location.href = "/dashboard";
        })
        .catch((error) => {
          console.error(error);
        });
    }
    catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.background} />
      <div className={styles.laliga} />
      <HexagonosSVG svgStyle={styles.hexagonos} />
      <div className={styles.login}>
        <h2 className={styles.title}>INICIAR SESIÓN</h2>
        <form className={styles.form}>
          <div className={styles.inputs}>
            <input
              type="text"
              placeholder="Usuario"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <input
              type="password"
              placeholder="Contraseña"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <button className={styles.button} onClick={handleSubmit}>
            Iniciar sesión
          </button>
          <p className={styles.text}>¿No tienes cuenta? <a href="/registro">Registrate</a></p>
        </form>
      </div>
    </div>
  );
}

