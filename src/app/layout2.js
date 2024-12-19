import "./globals.css";
import Menu from "@/app/components/menu/menu";
import styles from "./layout2.module.css";
import { useEffect } from "react";

export default function RootLayout({ children }) {
  // Comprobamos si esta la session iniciada haciendo una peticion a api/current si devuelve 401 redirigimos a login si no mostramos el contenido
  useEffect(() => {
    fetch("/api/current")
      .then((response) => {
        console.log(response);
        if (response.status !== 200) {
          window.location.href = "/";
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <div className={`body`}>
      <div className={styles.container}>
        <Menu />
        <div className={styles.background} />
        {children}
      </div>
    </div>
  );
}
