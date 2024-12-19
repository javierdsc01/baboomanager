import Jugador from "./jugador";
import styles from "./plantilla.module.css";
import Image from "next/image";
import Posicion from "./posicion";
import { useEffect, useState } from "react";


export default function Plantilla(props) {
  const { jugadores } = props;

  const [porteros, setPorteros] = useState([]);
  const [defensas, setDefensas] = useState([]);
  const [centrocampistas, setCentrocampistas] = useState([]);
  const [delanteros, setDelanteros] = useState([]);

  useEffect(() => {
    if (!jugadores) return;
    console.log(jugadores);

    setPorteros(jugadores.filter(jugador => jugador.position.name === "Portero"));
    setDefensas(jugadores.filter(jugador => jugador.position.name === "Defensa"));
    setCentrocampistas(jugadores.filter(jugador => jugador.position.name === "Centrocampista"));
    setDelanteros(jugadores.filter(jugador => jugador.position.name === "Delantero"));
  }, [jugadores]);

  return (
    <div className={styles.plantilla}>
      <Posicion jugadores={porteros} nombre="Porteros" />
      <Posicion jugadores={defensas} nombre="Defensas" />
      <Posicion jugadores={centrocampistas} nombre="Centrocampistas" />
      <Posicion jugadores={delanteros} nombre="Delanteros" />
    </div>
  );
}
