import Image from "next/image";
import styles from "./page.module.css";
import { Baloo_2 } from "next/font/google";
import HexagonosSVG from "../components/hexagonos/Hexagonos";
import React from "react";
import Menu  from "../components/menu/menu";

const baloo_2 = Baloo_2({ subset: "latin", preload: false });


export default function Home() {
  return (
    <div className={styles.container}>
        <Menu />

        <h1>SELECCIONA UNA LIGA:</h1>
        <div className={styles.bloque_liga} >
            <Image src="/laliga.png" alt="escudo" width={300} height={100} className={styles.escudo} />
            <button className={`${styles.button}`}><a href="/la_liga">LA LIGA</a></button>
        </div>
        <div className={styles.bloque_liga} >
            <Image src="/laliga.png" alt="escudo" width={300} height={100} className={styles.escudo} />
            <button className={`${styles.button}`}><a href="/la_liga">PREMIER LEAGUE</a></button>
        </div>
        <div className={styles.bloque_liga} >
            <Image src="/laliga.png" alt="escudo" width={300} height={100} className={styles.escudo} />
            <button className={`${styles.button}`}><a href="/la_liga">LIGUE 1</a></button>
        </div>
        <div className={styles.bloque_liga} >
            <Image src="/laliga.png" alt="escudo" width={300} height={100} className={styles.escudo} />
            <button className={`${styles.button}`}><a href="/la_liga">BUNDESLIGA</a></button>
        </div>
        <HexagonosSVG svgStyle={styles.hexagonos} />
    </div>
  );
}