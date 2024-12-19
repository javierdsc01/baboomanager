import styles from "./page.module.css";
import Image from "next/image";

function Recomendacion({ player }) {
    return (
        <div className={styles.recomendacion}>
            <div className={styles.fondo}>
                <Image src={player.foto} alt="foto" width={300} height={300} />
            </div>
            <div>
                <p>{player.precio} €</p>
                <p>{player.nombre}</p>
                <button>Pujar Ahora</button>
            </div>

        </div>
    );

}

export default function Home() {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Recomendaciones</h2>
            <div className={styles.recomendaciones}>
                {
                    Recomendaciones.map((player) => (
                        <Recomendacion key={player.id} player={player} />
                    ))
                }
            </div>
        </div>
    );
}

const Recomendaciones = [
    {
        id: 1,
        nombre: "C. Ramos",
        precio: 3541000,
        foto: "https://assets.laliga.com/squad/2023/t1737/p442838/2048x2225/p442838_t1737_2023_1_001_000.png"
    },
    {
        id: 2,
        nombre: "F. López",
        precio: 12652000,
        foto: "https://assets.laliga.com/squad/2023/t178/p551086/2048x2225/p551086_t178_2023_1_001_000.png"
    },
    {
        id: 3,
        nombre: "A. Pedrosa",
        precio: 167000,
        foto: "https://assets.laliga.com/squad/2023/t179/p446990/2048x2225/p446990_t179_2023_1_001_000.png"
    }
];