"use client"
import styles from "./jugador.module.css";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import heatmap from "heatmap.js";
import PreviousMatch from "./componentes/previousMatch";

export default function Jugador({ jugador, mapaCalor, imagen }) {

    const heatmapRef = useRef(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        // Verificar si el contenedor tiene tamaño no nulo
        if (heatmapRef.current && heatmapRef.current.clientHeight > 0) {
            setIsReady(true);
        }
    }, [heatmapRef.current]);

    useEffect(() => {
        if (mapaCalor.points && isReady) {

            const height = heatmapRef.current.clientHeight;  // Altura del contenedor del mapa de calor

            const data = {
                max: 2,
                data: mapaCalor.points.map(point => ({
                    x: point.x * 5,
                    y: height - (point.y * 3.23),  // Invertir la coordenada Y aquí
                    value: point.count
                }))
            };

            const options = {
                container: heatmapRef.current,
                radius: 20,
                blur: 1
            };

            const heatmapInstance = heatmap.create(options);
            heatmapInstance.setData(data);
        }
    }, [mapaCalor, isReady]);

    // Ajustamos la posición de inglés a español
    const [posicion, setPosicion] = useState("");
    useEffect(() => {
        switch (jugador.player.position) {
            case "G":
                setPosicion("POR");
                break;
            case "D":
                setPosicion("DF");
                break;
            case "M":
                setPosicion("MC");
                break;
            case "A":
                setPosicion("DL");
                break;
            default:
                setPosicion("DF");
                break;
        }
    }
        , [jugador]);

    const [edad, setEdad] = useState(0);
    useEffect(() => {
        const fechaNacimiento = new Date(jugador.player.dateOfBirthTimestamp * 1000);
        const hoy = new Date();
        let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
        const m = hoy.getMonth() - fechaNacimiento.getMonth();

        if (m < 0 || (m === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
            edad--;
        }

        setEdad(edad);
    }, [jugador]);

    const [img, setImg] = useState("/griezmann.png");
    useEffect(() => {
        setImg(imagen.player.photos['003']['512x512'])
    }
        , [imagen]);

    return (
        <>
            <video lazy autoPlay muted loop className={styles.video} src="/fondo.mp4"></video>
            <div className={styles.player}>
                <div className={styles.playerHeader}>
                    <div className={styles.playerHeaderInfo}>
                        <p>{posicion}</p>
                        <Image src="/francia.png" className={styles.pais} alt="Francia" width={45} height={45} />
                        <Image src="/atletico.png" className={styles.escudoEquipo} alt="Atletico" width={65} height={84} />
                    </div>
                    {/* <h2 className={styles.playerNumber}>7</h2> */}
                    <div>
                        <h2 className={styles.playerName}>{jugador.player.name.split(" ")[0]}</h2>
                        <h2 className={styles.playerSurname}>{jugador.player.name.split(" ")[1]}</h2>
                    </div>
                </div>
                <div className={styles.playerStats}>
                    <Image src={img} className={styles.playerPic} alt={jugador.player.name.split(" ")[1]} width={400} height={300} />


                    <div className={styles.heatmap}>
                        <div className={styles.pitch} />
                        <div ref={heatmapRef} className={styles.heatmapChart} />
                    </div>
                    <div className={styles.playerData}>
                        <p className={styles.playerDataItem}>Edad <span className={styles.playerDataValue}>{edad}</span></p>
                        <p className={styles.playerDataItem}>Minutos Jugados <span className={styles.playerDataValue}>1239</span></p>
                        <p className={styles.playerDataItem}>Altura <span className={styles.playerDataValue}>{jugador.player.height}</span></p>
                        <p className={styles.playerDataItem}>Puntos <span className={styles.playerDataValue}>237</span></p>
                    </div>
                </div >
            </div >
            <div className={styles.previousMatches}>
                <h3 className={styles.previousMatchesTitle}>Ultimos partidos</h3>
                <div className={styles.previousMatchesContent}>
                    <div className={styles.previousMatchesList}>
                        <PreviousMatch />
                        <PreviousMatch />
                        <PreviousMatch />
                        <PreviousMatch />
                    </div>
                    <div className={styles.expandedMatch}>
                        <div className={styles.expandedMatchHeader}>
                            <Image src="/atletico.png" className={styles.expandedMatchTeamLogo} alt="Atletico" width={65} height={82} />
                            <p className={styles.expandedMatchTeamName}>Atletico</p>
                            <p className={styles.expandedMatchResult}>2-1</p>
                            <p className={styles.expandedMatchTeamName}>Atletico</p>
                            <Image src="/atletico.png" className={styles.expandedMatchTeamLogo} alt="Atletico" width={65} height={82} />
                        </div>
                        <div className={styles.expandedMatchStats}>
                            <div className={styles.leftStats}>
                                <div className={styles.expandedMatchStat}>
                                    <p className={styles.expandedMatchStatTitle}>Arbitro</p>
                                    <p className={styles.expandedMatchStatValue}>Munuera Montero</p>
                                </div>
                                <div className={styles.expandedMatchStat}>
                                    <p className={styles.expandedMatchStatTitle}>Estadio</p>
                                    <p className={styles.expandedMatchStatValue}>Civitas Metropolitano</p>
                                </div>
                                <div className={styles.expandedMatchStat}>
                                    <p className={styles.expandedMatchStatTitle}>Competicion</p>
                                    <p className={styles.expandedMatchStatValue}>Laliga Easports J.38</p>
                                </div>
                            </div>
                            <div className={styles.rightStats}>
                                <div className={styles.expandedMatchStat}>
                                    <p className={styles.expandedMatchStatTitle}>Puntos</p>
                                    <p className={styles.expandedMatchStatValue}>12 puntos</p>
                                </div>
                                <div className={styles.expandedMatchStat}>
                                    <p className={styles.expandedMatchStatTitle}>Goles</p>
                                    <p className={styles.expandedMatchStatValue}>1 gol</p>
                                </div>
                                <div className={styles.expandedMatchStat}>
                                    <p className={styles.expandedMatchStatTitle}>Asistencias</p>
                                    <p className={styles.expandedMatchStatValue}>0 asistencias</p>
                                </div>
                                <div className={styles.expandedMatchStat}>
                                    <p className={styles.expandedMatchStatTitle}>Tiros a puerta</p>
                                    <p className={styles.expandedMatchStatValue}>4 tiros a puerta</p>
                                </div>
                                <div className={styles.expandedMatchStat}>
                                    <p className={styles.expandedMatchStatTitle}>Pases Completados</p>
                                    <p className={styles.expandedMatchStatValue}>33 pases completados</p>
                                </div>
                            </div>
                        </div>
                        <Image src="/griezmann.png" className={styles.expandedMatchPlayer} alt="Griezmann" width={262} height={304} />
                    </div>
                </div>
            </div>
        </>
    );
}

export async function getServerSideProps(context) {
    const { slug } = context.params;
    // Consultamos primero mister
    const payload = new URLSearchParams({
        post: 'players',
        id: slug
    });

    const token = "eyJhbGciOiJFUzI1NiJ9.eyJleHAiOiIxNzE1MTYwMDYyIiwidXNlcmlkIjoiMjQ4ODk2MyIsImFsZyI6IkVTMjU2In0.4gOFiJboGusal1w0ZRQoLxiVk4ynYmVaKw27RHT0ND2kf5X1PPlgD-0csRNLHxWqnJ3rx85r6xs03quq2gi-fA"

    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'X-Requested-With': 'XMLHttpRequest',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.6045.123 Safari/537.36',
        'X-Auth': '6baca5339d20a40b459ad851692e643f',
        'Cookie': `token=${token};`  // Asegúrate de que 'token' está definido
    };

    try {
        const res = await fetch("https://mister.mundodeportivo.com/ajax/sw", {
            method: 'POST',
            headers,
            body: payload
        });
        if (!res.ok) throw new Error("Error al consultar mister")
        const mister = await res.json();
    }
    catch (e) {
        console.log(e)
    }

    // Consultamos a sofascore
    const resSofa = await fetch(`https://api.sofascore.com/api/v1/player/${slug}`);
    const jugador = await resSofa.json()

    // Consultamos el mapa de calor
    const resMapa = await fetch(`https://api.sofascore.com/api/v1/player/${slug}/unique-tournament/7/season/52162/heatmap/overall`);
    const mapaCalor = await resMapa.json();

    // Consultamos la imagen del jugador
    const resImage = await fetch(`https://apim.laliga.com/public-service/api/v1/players/hermoso?contentLanguage=es&countryCode=ES&subscription-key=c13c3a8e2f6b46da9c5c425cf61fab3e`);
    const imagen = await resImage.json();

    return {
        props: { jugador, mapaCalor, imagen }
    };
}