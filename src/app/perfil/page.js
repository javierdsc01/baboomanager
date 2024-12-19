"use client";

import { useState, useEffect } from 'react';
import "../globals.css";
import Image from 'next/image';
import styles from './page.module.css';
import HexagonosSVG from "../components/hexagonos/Hexagonos";
import axios from 'axios';
import { destroyCookie } from 'nookies';

export default function Perfil() {
    const [username, setUsername] = useState();
    const [userImageData, setUserImageData] = useState(null);

    useEffect(() => {
        axios.get('/api/current')
            .then((response) => {
                setUsername(response.data.data.name);
                setUserImageData(response.data.data.avatar);
            })
            .catch((error) => {
                console.error(error);
            });

    }, []);

    const getImageOrPlaceholder = () => {
        if (userImageData && userImageData.imageUrl) {
            return <Image src={userImageData.imageUrl} alt="perfil" width={130} height={130} />;
        } else if (userImageData) {
            return (
                <div
                    className={styles.avatarPlaceholder}
                    style={{ backgroundColor: userImageData.color }}
                >
                    {userImageData.letters}
                </div>
            );
        } else {
            return null;
        }
    };

    const handleCambiarPerfil = () => {
        axios.post('/api/settings', { value: username })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const handleCerrarSesion = async () => {
        // Llamar a la API para cerrar sesión y eliminar cookies
        await axios.post('/api/logout');
        // Opcionalmente, puedes eliminar las cookies del lado del cliente también
        destroyCookie(null, 'refresh-token', { path: '/' });
        destroyCookie(null, 'token', { path: '/' });

        window.location.href = '/login';
    }

    return (
        <div className={styles.container}>
            <div className={styles.background} />
            <HexagonosSVG svgStyle={styles.hexagonos} />
            <div className={styles.laliga}>
                <Image src="/laliga.png" alt="laliga" width={160} height={41} />
            </div>
            <div className={styles.imagePerfil}>
                {getImageOrPlaceholder()}
            </div>

            <div className={styles.cambiarPerfil}>
                <span className={styles.label}>NOMBRE DE USUARIO</span>
                <input
                    type="text"
                    className={styles.title}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>

            <button className={styles.guardarCambios} onClick={handleCambiarPerfil}>
                GUARDAR CAMBIOS
            </button>

            <button className={styles.cerrarSesion} onClick={handleCerrarSesion}>CERRAR SESIÓN</button>
            <a className={styles.EliminarCuenta} href="/">ELIMINAR CUENTA</a>
        </div>
    );
}
