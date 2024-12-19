
import styles from "./posicion.module.css";
import Jugador from "./jugador";

export default function Posicion({ jugadores, nombre }) {
    return (
        <>
            <div className={styles.player_pos}>
                <h1>{nombre}</h1>
            </div>
            <div className={styles.player_group}>
                {
                    jugadores.map((jugador, index) => (
                        <Jugador key={index} jugador={jugador} />
                    ))
                }
            </div>
        </>
    );
} 