import React from "react";
import styles from "./menu.module.css";

export default function Menu() {
  return (
    <div className={styles.header}>
      <ul className={styles.menu}>
        <li className={styles.menuItem}><a href="/equipos">Equipos</a></li>
        <li className={styles.menuItem}><a href="/prediccion">Prediccion</a></li>
      </ul>
      <a href="/" className={styles.logo}>Baboo Manager</a>
      <ul className={styles.menu}>
        <li className={styles.menuItem}><a href="/mercado">Mercado</a></li>
        <li className={styles.menuItem}><a href="/perfil">Perfil</a></li>
      </ul>
    </div>
  );
}
