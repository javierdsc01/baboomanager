import React, { useEffect, useState } from 'react';
import styles from './partido.module.css';
import axios from 'axios';
import PartidoBox from './partidobox';

const PartidosComponent = ({ sofascoreId }) => {
  const [partidos, setPartidos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let combinedPartidos = [];
      try {
        const res1 = await axios.get(`https://www.sofascore.com/api/v1/team/${sofascoreId}/performance`);
        combinedPartidos = [...combinedPartidos, ...res1.data.events];
      } catch (error) {
        console.error('Error fetching data', error);
      }

      try {
        const res2 = await axios.get(`https://www.sofascore.com/api/v1/team/${sofascoreId}/events/next/0`);

        combinedPartidos = [...combinedPartidos, ...res2.data.events];
      }
      catch (error) {
        console.error('Error fetching data', error);
      }

      setPartidos(combinedPartidos);
    };

    fetchData();
  }, []);

  const ahora = Date.now() / 1000;
  const proximosPartidos = partidos.filter(partido => partido.startTimestamp > ahora).slice(0, 6);
  const ultimosPartidos = partidos.filter(partido => partido.startTimestamp <= ahora).slice(0, 10);

  return (
    <div className={styles.container}>
      <section className={styles.partidos}>
        <h2>Próximos partidos</h2>
        <div className={styles.contenedorPartidos}>
          {proximosPartidos.map((partido) => (
            <PartidoBox key={partido.id} partido={partido} />
          ))}
        </div>
      </section>
      <section className={styles.partidos}>
        <h2>Últimos partidos</h2>
        <div className={styles.contenedorPartidos}>
          {ultimosPartidos.map((partido) => (
            <PartidoBox key={partido.id} partido={partido} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default PartidosComponent;
