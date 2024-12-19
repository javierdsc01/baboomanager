import React from 'react';
import Image from 'next/image';
import styles from './partidobox.module.css';

const PartidoBox = ({ partido }) => {
  const jornada = partido.roundInfo ? !partido.roundInfo.name ? `J.${partido.roundInfo.round}` : partido.roundInfo.name : "";
  console.log(partido);
  // Función para convertir el timestamp en una fecha legible
  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const now = new Date();

    // Comprobar si el partido es hoy
    if (date.toDateString() === now.toDateString()) {
      // Mostrar la hora si el partido es hoy
      return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
    } else {
      // Mostrar la fecha si el partido no es hoy
      return `${date.getDate()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
    }
  };
  const marcador = partido.status.code == 0 ? formatDate(partido.startTimestamp) : `${partido.homeScore.display} - ${partido.awayScore.display}`;
  return (
    <div className={styles.BoxPartidos}>
      {/* Columna 1: Escudo del equipo local */}
      <div className={styles.columna}>
        <div className={styles.teamLogo}>
          <Image src={`https://api.sofascore.app/api/v1/team/${partido.homeTeam.id}/image`} alt={partido.local} width={75} height={75} />
        </div>
      </div>

      {/* Columna 2: Texto y puntuación */}
      <div className={styles.columna}>
        <div className={styles.details}>
          <p className={styles.text}>{`${partido.season.name} ${jornada}`}</p>
          <p className={styles.score}>{marcador}</p>
        </div>
      </div>

      {/* Columna 3: Escudo del equipo visitante */}
      <div className={styles.columna}>
        <div className={styles.teamLogo}>
          <Image src={`https://api.sofascore.app/api/v1/team/${partido.awayTeam.id}/image`} alt={partido.visitante} width={75} height={75} />
        </div>
      </div>
    </div>
  );
};

export default PartidoBox;