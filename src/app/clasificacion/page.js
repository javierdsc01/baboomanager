import Image from "next/image";
import styles from "./page.module.css";
import { Baloo_2 } from "next/font/google";
import React from "react";
import Menu from "../components/menu/menu";

const baloo_2 = Baloo_2({ subset: "latin", preload: false });


export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.background} />
      <div className={styles.laliga} />
      <Menu />
      <div className={styles.cuerpo}>
        <div className={styles.title_box}>
          <h2 className={styles.title}>Liga UEM:</h2>
        </div>
        <div className={styles.tablas}>
          <table className={styles.tabla_jornada}>
            <thead>
              <tr>
                <th>Jornada 3</th>
              </tr>
            </thead>
            <tbody>
              <tr className={styles.tabla_contenido}>
                <td>1º</td>
                <td>Jammin`</td>
                <td>88 puntos</td>
              </tr>
              <tr className={styles.tabla_contenido}>
                <td>2º</td>
                <td>Jammin`</td>
                <td>88 puntos</td>
              </tr>
              <tr className={styles.tabla_contenido}>
                <td>3º</td>
                <td>Jammin`</td>
                <td>88 puntos</td>
              </tr>
              <tr className={styles.tabla_contenido}>
                <td>4º</td>
                <td>Jammin`</td>
                <td>88 puntos</td>
              </tr>
              <tr className={styles.tabla_contenido}>
                <td>5º</td>
                <td>Jammin`</td>
                <td>88 puntos</td>
              </tr>
              <tr className={styles.tabla_contenido}>
                <td>6º</td>
                <td>Jammin`</td>
                <td>88 puntos</td>
              </tr>
            </tbody>
          </table>

          <table className={styles.tabla_general}>
            <thead>
              <tr>
                <th>Jornada 3</th>
              </tr>
            </thead>
            <tbody>
              <tr className={styles.tabla_contenido}>
                <td>1º</td>
                <td>Jammin`</td>
                <td>88 puntos</td>
              </tr>
              <tr className={styles.tabla_contenido}>
                <td>2º</td>
                <td>Jammin`</td>
                <td>88 puntos</td>
              </tr>
              <tr className={styles.tabla_contenido}>
                <td>3º</td>
                <td>Jammin`</td>
                <td>88 puntos</td>
              </tr>
              <tr className={styles.tabla_contenido}>
                <td>4º</td>
                <td>Jammin`</td>
                <td>88 puntos</td>
              </tr>
              <tr className={styles.tabla_contenido}>
                <td>5º</td>
                <td>Jammin`</td>
                <td>88 puntos</td>
              </tr>
              <tr className={styles.tabla_contenido}>
                <td>6º</td>
                <td>Jammin`</td>
                <td>88 puntos</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

