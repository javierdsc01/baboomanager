// Home.js
import styles from "./estadisticas.module.css";
import React, { useEffect, useState } from "react";
import StatCard from "./statcard";

export default function Estadisticas({ jugadores, optaId }) {
  const [players, setPlayers] = useState({});
  const [index] = useState({ index: 2 });


  const statNamesMap = {
    "stat.total_goals_ranking": "GOLES",
    "stat.total_ontarget_attempt_ranking": "DISPAROS",
    "stat.total_pass_ranking": "PASES",
    "stat.total_assists_ranking": "ASISTENCIAS",
    "stat.total_interception_ranking": "RECUPERACIONES",
    "stat.total_yellow_card_ranking": "TARJETAS AMARILLAS",
    "stat.total_red_card_ranking": "TARJETAS ROJAS",
    "stat.total_fouls_ranking": "FALTAS",
    "stat.total_dodges_ranking": "REGATES",
    "stat.total_offsides_ranking": "FUERAS DE JUEGO",
    "stat.total_minutes_played_ranking": "MINUTOS JUGADOS",
    "stat.total_saves_ranking": "PARADAS"
  };

  useEffect(() => {
    if (jugadores && jugadores.player_ranking_group) {
      const firstFivePlayers = {};
      Object.keys(jugadores.player_ranking_group).forEach(stat => {
        const statPlayers = jugadores.player_ranking_group[stat].slice(0, 5);
        firstFivePlayers[stat] = statPlayers;
      });
      setPlayers(firstFivePlayers);
    }
  }, [jugadores]);

  return (
    <div className={styles.container}>
      <div className={styles.laliga} />
      <div className={styles.grid}>
        {Object.keys(players).map(statName => (
          <StatCard
            key={statName}
            players={players[statName]}
            statName={statNamesMap[statName] || statName}
            displayName={statNamesMap[statName] || statName}
            optaId={optaId}
          />
        ))}
      </div>
    </div>
  );
}
