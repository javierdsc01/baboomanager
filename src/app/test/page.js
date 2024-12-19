import Image from "next/image";
import styles from "./page.module.css";
import { Baloo_2 } from "next/font/google";
import HexagonosSVG from "../components/hexagonos/Hexagonos";
import React from "react";
import Menu from "../components/menu/menu";

const baloo_2 = Baloo_2({ subset: "latin", preload: false });


export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.background} />
      <div className={styles.laliga} />
      <HexagonosSVG svgStyle={styles.hexagonos} />
      <div className={styles.login}>
        <h2 className={styles.title}>- BABOO TEST -</h2>
        <button className={`${styles.button} ${baloo_2.className}`}><a href="/dashboard">DASHBOARD</a></button> {/* DASHBOARD */}
        <button className={`${styles.button} ${baloo_2.className}`}>JUGADOR</button> {/* JUGADOR */}
        <button className={`${styles.button} ${baloo_2.className}`}><a href="/clasificacion">CLASIFICACION</a></button>
        <button className={`${styles.button} ${baloo_2.className}`}><a href="/info">INFO</a></button>
      </div>
    </div>
  );
}