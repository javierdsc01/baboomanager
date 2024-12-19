import Image from "next/image";
import styles from "./page.module.css";
import { Baloo_2 } from "next/font/google";
import React from "react";
import Equipo from "./components/equipo";

const baloo_2 = Baloo_2({ subset: "latin", preload: false });

export default function Home({ clasificacion }) {

  const equipos = clasificacion.standings[0].rows.map((team, index) => ({
    posicion: team.position,
    nombre: team.team.name,
    puntos: team.points,
    url: `https://www.sofascore.com/team/football/${team.team.slug}/${team.team.id}`,
    escudo: `https://api.sofascore.app/api/v1/team/${team.team.id}/image`,
  }));

  return (
    <div className={styles.container}>
      <div className={styles.background} />
      <div className={styles.cuerpo}>
        <div className={styles.title_box}>
          <h1 className={styles.title}>CLASIFICACIÓN:</h1>
        </div>
        <div className={styles.tablas}>
          <table className={styles.tabla_jornada}>
            <tbody>
              {equipos.map((equipo) => (
                <Equipo key={equipo.posicion} posicion={equipo.posicion} escudo={equipo.escudo} nombre={equipo.nombre} puntos={equipo.puntos} url={equipo.url} />
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch("https://www.sofascore.com/api/v1/unique-tournament/8/season/52376/standings/total");
  const clasificacion = await res.json();
  return {
    props: { clasificacion }
  };
}