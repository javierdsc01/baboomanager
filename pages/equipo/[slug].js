"use client";
import Image from "next/image";
import styles from "./page.module.css";
import HexagonosSVG from "../../src/app/components/hexagonos/Hexagonos";
import React, { useEffect, useState } from "react";
import Plantilla from "./components/plantilla";
import Header from "./components/header";
import Partidos from "./components/partido";
import Estadisticas from "./components/estadisticas";

export default function Home({ equipo, plantilla, sofascoreId, estadisticas, error }) {
  const [index, setIndex] = useState(0);
  const [jugadores, setJugadores] = useState([]);

  useEffect(() => {
    if (plantilla) {

      setJugadores(plantilla);
    }
  }, [plantilla]);

  // Creamos una constante con frases cursis por equipos de LaLiga Santander
  const frasesCursis = {
    "Athletic Club": "Zu zara nagusia",
    "Atlético de Madrid": "Partido a partido",
    "CA Osasuna": "Rojo hasta la muerte",
    "Rayo Vallecano": "La vida pirata es la vida mejor",
    "CD Leganés": "Sueña en grande",
    "Deportivo Alavés": "Jugamos todos",
    "FC Barcelona": "Més que un club",
    "Getafe CF": "Vamos Geta",
    "Granada CF": "Juntos somos más fuertes",
    "Levante UD": "Orgull granota",
    "RCD Espanyol": "Somos pericos",
    "Real Betis": "Más allá de los colores",
    "Real Madrid": "Hala Madrid",
    "Real Sociedad": "Aurrera Reala",
    "Real Valladolid": "Pucela es de Primera",
    "SD Eibar": "Ez egin",
    "SD Huesca": "Vamos Huesca",
    "Sevilla FC": "Mi Sevilla",
    "Valencia CF": "Amunt Valencia",
    "Villarreal CF": "Endavant Villarreal"
  };

  return (
    <div className={styles.container}>
      <div className={styles.laliga} />
      {equipo.team.nickname !== "FC Barcelona" ? (
        <>
          <Header
            index={index}
            setIndex={setIndex}
            escudo={equipo.team.shield.url}
            nombre={equipo.team.nickname}
            frasecitaCursi={frasesCursis[equipo.team.nickname]}
            estadio={equipo.team.venue.image ? equipo.team.venue.image.url : ""}
            fondo={equipo.team.color}
          />
          {index === 0 ? (
            <Plantilla jugadores={jugadores} />
          ) : index === 1 ? (
            <Partidos sofascoreId={sofascoreId} />
          ) : (
            <Estadisticas jugadores={estadisticas} optaId={equipo.team.opta_id} />
          )}
        </>
      ) : (
        <div className={styles.error}>
          <Image src="/referee.png" alt="error" width={200} height={200} />
          <p>Error: {error}</p>
          <p>Lo sentimos, el sr. Negreira aún no recibió ningún pago por este informe.</p>
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  const { slug } = context.params;
  // Separamos la URL en dos por el primer guión
  const slugArray = slug.split("-");
  const sofascoreId = slugArray[0];
  // equipoSlug es el resto de la URL sin separar más por guiones
  const equipoSlug = slugArray.slice(1).join("-");
  console.log(equipoSlug);
  try {
    // Obtenemos equipo para el header
    const resEquipo = await fetch(`https://apim.laliga.com/public-service/api/v1/teams/${equipoSlug}?contentLanguage=es&countryCode=ES&subscription-key=c13c3a8e2f6b46da9c5c425cf61fab3e`);
    const dataEquipo = await resEquipo.json();

    // Segunda petición a la API de La Liga
    const resLaLiga = await fetch(`https://apim.laliga.com/public-service/api/v1/teams/${equipoSlug}/squad-manager?limit=50&offset=0&orderField=id&orderType=DESC&seasonYear=2023&contentLanguage=es&countryCode=ES&subscription-key=c13c3a8e2f6b46da9c5c425cf61fab3e`);
    const dataLaLiga = await resLaLiga.json();




    const optaId = dataEquipo.team.opta_id;
    // Obtenemos información estadística
    const resEstadisticas = await fetch(`https://apim.laliga.com/webview/api/web/seasons/opta/2023/competitions/opta/23/rankings/players/group?stats%5B0%5D=stat.total_goals_ranking&stats%5B1%5D=stat.total_ontarget_attempt_ranking&stats%5B2%5D=stat.total_pass_ranking&stats%5B3%5D=stat.total_assists_ranking&stats%5B4%5D=stat.total_interception_ranking&stats%5B5%5D=stat.total_yellow_card_ranking&stats%5B6%5D=stat.total_red_card_ranking&stats%5B7%5D=stat.total_fouls_ranking&optaTeamId=${optaId}&contentLanguage=es&countryCode=ES&subscription-key=ee7fcd5c543f4485ba2a48856fc7ece9`);
    const jugadores = await resEstadisticas.json();

    return {
      props: {
        equipo: dataEquipo,
        plantilla: dataLaLiga.squads,
        sofascoreId: sofascoreId,
        estadisticas: jugadores,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        plantilla: [],
        error: "Hubo un error al obtener los datos",
      },
    };
  }
}