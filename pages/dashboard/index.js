import React, { useState } from 'react';
import styles from './page.module.css';
import "../../src/app/globals.css";
import Image from 'next/image';
import Ligas from "../../src/app/components/ligas/ligas";
import axios from 'axios';

function Partido({ partido, style }) {
  console.log(partido);

  // Transformamos partido.startTimestamp a una variable fecha y otra variable hora

  const fecha = new Date(partido.startTimestamp * 1000);
  const fechaFormateada = fecha.toLocaleDateString('es-ES');
  const hora = `${fecha.getHours()}:${fecha.getMinutes().toString().padStart(2, '0')}`



  return (
    <div className={styles.BoxPartidos} style={style}>
      <p className={styles.TituloJornada}>{`Jornada ${partido.roundInfo.round}`}</p>

      <Image src={`https://api.sofascore.app/api/v1/team/${partido.homeTeam.id}/image`} alt={partido.homeTeam.name} width={50} height={50} />
      <div className={styles.infoPartido}>
        <div className={styles.fechaHora}> {fechaFormateada} </div>
        <div className={styles.fechaHora}> {hora} </div>
      </div>
      <Image src={`https://api.sofascore.app/api/v1/team/${partido.awayTeam.id}/image`} alt={partido.awayTeam.name} width={50} height={50} />
    </div>
  );
}


const gridcells = [
  { gridArea: 1 / 1 / 2 / 2 },
  { gridArea: 1 / 2 / 2 / 3 },
  { gridArea: 1 / 3 / 2 / 4 },
  { gridArea: 2 / 1 / 3 / 2 },
  { gridArea: 2 / 2 / 3 / 3 },
  { gridArea: 2 / 3 / 3 / 4 },
  { gridArea: 3 / 1 / 4 / 2 },
  { gridArea: 3 / 2 / 4 / 3 },
  { gridArea: 3 / 3 / 4 / 4 },
  { gridArea: 4 / 2 / 5 / 3 },


];

const ligasData = [
  {
    nombre: "JANMIN",
    equipos: "2/10",
    puntos: "1270 PFDY",
    presupuesto: "47.500.642€"
  },
  {
    nombre: "NanoLiga",
    equipos: "1/10",
    puntos: "1500 PFDY",
    presupuesto: "50.780.961€"
  },
  {
    nombre: "LIGAUEM",
    equipos: "7/10",
    puntos: "2548 PFDY",
    presupuesto: "2.150.780€"
  }
];




export default function Dahsboard({ partidos }) {
  const partidosFinales = partidos.events;
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    ligaName: '',
    numTeams: '',
    points: '',
    budget: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const [competiciones, setCompeticiones] = useState([]);
  const handleCreateLiga = () => {
    setShowPopup(true);

    axios.get("/api/obtener-competiciones").then((response) => {
      setCompeticiones(response.data.data.items);
    }
    ).catch((error) => {
      console.log(error);
    });
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleSubmit = (id) => {
    console.log(formData);

    axios.post("/api/crear-liga", {
      competicionId: id,
    }, { withCredentials: true }).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
    });
    handleClosePopup();
  };


  return (
    <>
      <h1 className={styles.title3}>MIS LIGAS</h1>

      {ligasData.map((liga, index) => (
        <Ligas
          key={index}
          nombre={liga.nombre}
          equipos={liga.equipos}
          puntos={liga.puntos}
          presupuesto={liga.presupuesto}
        />
      ))}
      <button className={styles.CrearLiga} onClick={handleCreateLiga}>
        <h1 className={styles.title2}>CREAR / UNIRSE A LIGA</h1>
      </button>
      <h1 className={styles.title3}>PARTIDOS DE LA JORNADA</h1>

      <div className={styles.contenedorPartidos}>
        {partidosFinales.map((partido, index) => (
          <Partido key={partido.id} partido={partido} style={gridcells[index]} />
        ))}
      </div>
      {showPopup && (
        <div className={styles.popupOverlay}>
          <div className={styles.popupContent}>
            <button className={styles.closeButton} onClick={handleClosePopup}>X</button>
            {
              competiciones.map((competicion) => (
                <button key={competicion.id} className={styles.competicion} onClick={() => handleSubmit(competicion.id)}>
                  <img src={competicion.logo} alt={competicion.name} width={50} height={50} />
                  <h3>{competicion.name}</h3>
                </button>
              ))
            }
          </div>
        </div >
      )
      }

    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch('https://www.sofascore.com/api/v1/unique-tournament/8/season/52376/events/round/38')
  const partidos = await res.json()



  return { props: { partidos: partidos } }
}
