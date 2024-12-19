"use client"
import { Baloo_2 } from "next/font/google";
import "./globals.css";
import Menu from "@/app/components/menu/menu";
import { useEffect, useState } from "react";

const baloo_2 = Baloo_2({ subset: "latin", preload: false });

export default function RootLayout({ children }) {
  // Comprobamos si esta la session iniciada haciendo una peticion a api/current si devuelve 401 redirigimos a login si no mostramos el contenido
  useEffect(() => {
    fetch("/api/current")
      .then((response) => {
        if (response.status !== 200) {
          window.location.href = "/";
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const [isLogin, setIsLogin] = useState(true);
  // Si la url es / no mostramos el menu
  useEffect(() => {
    if (window.location.pathname === "/" || window.location.pathname === "/registro") {
      setIsLogin(true);
    }
    else {
      setIsLogin(false);
    }
  }, []);
  return (
    <html lang="es">
      <body className={`${baloo_2.className} body`}>
        {!isLogin && <Menu />}
        {children}
      </body>
    </html>
  );
}
