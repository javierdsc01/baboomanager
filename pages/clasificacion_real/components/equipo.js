import React from "react";
import styles from "./equipo.module.css";
import Image from "next/image";

export default function Equipo({ posicion, escudo, nombre, puntos, url }) {
  const handleRowClick = () => {
    window.location.href = url;
  };

  return (
    <tr className={styles.tabla_contenido} onClick={handleRowClick} style={{ cursor: "pointer" }}>
      <div className={styles.flex1}>
        <td>{posicion}.</td>
        <td>
          <Image src={escudo} alt="escudo" width={44} height={44} className={styles.escudo} />
        </td>
        <td>{nombre}</td>
      </div>
      <td className={styles.puntos}>{puntos} pts.</td>
    </tr>
  );
}
