import React from "react";
import styles from "./statcard.module.css";

const StatCard = ({ players, statName, optaId }) => {

  return (
    <div className={styles.card}>
      <h3 className={styles.cardTitle}>{statName.toUpperCase()}</h3>
      {players.map((player, index) => {
        const statObject = player.stats[1];
        const stat = statObject ? statObject.stat : "N/A";
        const photoPlayer = `https://assets.laliga.com/squad/2023/${optaId}/${player.opta_player_id}/256x256/${player.opta_player_id}_${optaId}_2023_1_003_000.png`;

        return (
          <div key={player.opta_player_id} className={`${styles.playerCard} ${index === 0 ? styles.highlight : ''}`}>
            <div className={styles.cardHeader}>
              <img
                src={photoPlayer}
                alt={player.extra_info.name}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/pfp.png";
                }}
              />
            </div>
            <div className={styles.cardBody}>
              <h2>{String(index + 1).padStart(2, '0')} - {player.extra_info.name.toUpperCase()}</h2>
              <p>{stat}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatCard;
