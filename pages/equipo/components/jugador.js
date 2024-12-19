
import styles from "./jugador.module.css";
import Image from "next/image";
export default function Jugador({ jugador }) {
  return (
    <a href={`/jugadores/${jugador.id}`} className={styles.player}>
      <div className={styles.foto}>
        <Image src={jugador.photos['001']['2048x2225']} alt="escudo" width={150} height={150} className={styles.escudo} />
      </div>
      <h2>{jugador.person.nickname}</h2>
    </a>
  );
}

/*
import styles from "./jugador.module.css";

export default function Jugador({ jugador }) {
  return (
    <div className={styles.jugador}>
      <h3>{jugador.nombre}</h3>
      <p>{jugador.posicion}</p>
    </div>
  );
}    */

