import Image from "next/image";
import styles from "./page.module.css";
import { Baloo_2 } from "next/font/google";
import HexagonosSVG from "../components/hexagonos/Hexagonos";

const baloo_2 = Baloo_2({ subset: "latin", preload: false });

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.background} />
      <div className={styles.laliga}>
        <Image src="/laliga.png" alt="laliga" width={160} height={41} />
      </div>
      <HexagonosSVG svgStyle={styles.hexagonos} />
      <HexagonosSVG svgStyle={styles.hexagonos2} segundo />
      <div className={styles.register}>
        <h2 className={styles.title}>REGISTRO</h2>
        <form className={styles.form}>
          <div className={styles.inputs}>
            <input
              type="text"
              placeholder="Usuario"
              className={styles.input}
            ></input>
            <input
              type="mail"
              placeholder="Correo electronico"
              className={styles.input}
            ></input>
            <input
              type="password"
              placeholder="Contraseña"
              className={styles.input}
            ></input>
          </div>
          <button className={`${styles.button} ${baloo_2.className}`}>Registrarse</button>
          <p className={styles.text}>¿Ya tienes una cuenta? <a href="/">Iniciar sesión</a></p>
        </form>
      </div>
    </div>
    /* PRIMERO HAY QUE COMPROBAR QUE EL IDENTIFICADOR DEL MAIL ES UNICA, SI LO ES, 
   HAY QUE INSERTAR ESTOS VALORES EN LA TABLA DE USUARIOS, SI YA ESTA EN LA TABLA,
   PONER UN MENSAJE DE QUE ESE USUARIO YA ESTÁ REGISTRADO*/
  );
}
