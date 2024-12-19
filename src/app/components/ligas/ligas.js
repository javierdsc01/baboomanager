import React from 'react';
import styles from './ligas.module.css';

export default function Ligas({ nombre, equipos, puntos, presupuesto }) {
    return (
        <div className={styles.miLiga}>
            <div className={styles.infoLigas}>
                <p className={styles.textoLiga}>{nombre}</p>
                <p className={styles.textoLiga}></p>
                <p className={styles.textoLiga}></p>
                <p className={styles.textoLiga}>{equipos}</p>
                <p className={styles.textoLiga}>{puntos}</p>
                <p className={styles.textoLiga}>{presupuesto}</p>
            </div>
        </div>
    );
}