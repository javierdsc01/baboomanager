
import styles from './header.module.css';
import Image from 'next/image';

export default function Header({ index, setIndex, escudo, nombre, frasecitaCursi, estadio, fondo }) {
    return (
        <div className={styles.cuerpo}>
            <div className={styles.cuerpo_color} />
            <div className={styles.cuerpo_bg} style={{ backgroundColor: fondo }} />
            <div className={styles.info_equipo} >
                <div>
                    <Image src={escudo} alt="escudo" width={300} height={300} className={styles.escudo} />
                </div>
                <div className={styles.nombre}>
                    <h1>{nombre}</h1>
                    <h2>"{frasecitaCursi}"</h2>
                </div>
                <div>
                    {estadio && <Image src={estadio} alt="estadio" width={453} height={265} className={styles.escudo} />}
                </div>
            </div>
            <div className={styles.options}>
                <div className={styles.line} />
                <li className={index == 0 ? styles.active : ""}><div onClick={() => setIndex(0)}>PLANTILLA</div></li>
                <li className={index == 1 ? styles.active : ""}><div onClick={() => setIndex(1)}>PARTIDOS</div></li>
                <li className={index == 2 ? styles.active : ""}><div onClick={() => setIndex(2)}>ESTADISTICAS</div></li>
            </div>
        </div>
    );
}    