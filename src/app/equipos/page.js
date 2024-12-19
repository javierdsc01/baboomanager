"use client"

import { useEffect, useState } from 'react';
import styles from './page.module.css';
import Image from 'next/image';
import axios from 'axios';

function Equipo({ equipo }) {
    const image = equipo.shield.url;
    return (
        <a className={styles.equipo} href={`/equipo/${equipo.sofascoreId}-${equipo.slug}`}>
            <Image src={image} alt='escudo' width={100} height={100} />
            <p>{equipo.nickname}</p>
        </a>
    )
}

export default function Page() {
    const [equipos, setEquipos] = useState([]);
    useEffect(() => {
        let equipoTemp = [];
        axios.get("https://apim.laliga.com/public-service/api/v1/teams?subscriptionSlug=laliga-easports-2023&limit=99&offset=0&orderField=nickname&orderType=ASC&contentLanguage=es&countryCode=ES&subscription-key=c13c3a8e2f6b46da9c5c425cf61fab3e")
            .then((response) => {
                equipoTemp = response.data.teams;

            })
            .catch((error) => {
                console.error(error);
            });

        axios.get("https://www.sofascore.com/api/v1/unique-tournament/8/season/52376/teams"
        )
            .then((response) => {
                // Comparamos equipos de la liga con los equipos de la API de La Liga para añadir el id de sofascore a equipoTemp
                response.data.teams.forEach((equipo) => {
                    console.log(equipo.name)
                    const equipoTempIndex = equipoTemp.findIndex((equipoTemp) => equipoTemp.slug === equipo.slug);
                    if (equipoTempIndex !== -1) {
                        equipoTemp[equipoTempIndex].sofascoreId = equipo.id;
                    }
                });
                setEquipos(equipoTemp);
            })
            .catch((error) => {
                console.error(error);
            }
            )
    }, []);
    return (
        <div className={styles.container}>
            {
                equipos.map((equipo, index) => (
                    <Equipo key={index} equipo={equipo} />
                ))
            }
        </div>
    );
}