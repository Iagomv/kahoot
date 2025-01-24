import React, {useEffect} from 'react'
import {useNavigate} from 'react-router'
import '../styles/FadeIn.css'

export const Landing = ({}) => {
  const navegar = useNavigate()

  //Navegacion
  const navegacionCrearPartida = () => {
    localStorage.getItem('token') ? navegar('/iagoKH/crearPartida') : navegar('/iagoKH/login')
  }
  const unirsePartida = () => {
    localStorage.getItem('token') ? navegar('/iagoKH/joinPartida') : navegar('/iagoKH/login')
  }
  return (
    <>
      <div className="container m-auto w-50 bg-white rounded shadow-sm mt-4">
        {/*Container principal */}
        <div className="fade-in  p-3 d-flex flex-column gap-3 ">
          {/*Container central con fondo de color gris */}
          {/*Container para los elementos boton tipo boton*/}
          <div className="h-50 d-flex flex-column gap-3">
            {/*Cada uno de los elementos "boton"*/}
            <button className="btn btn-primary" onClick={() => navegacionCrearPartida()}>
              Crear partida
            </button>
            <button className="btn btn-primary" onClick={() => navegar('/iagoKH/joinPartida')}>
              Unirse a partida en curso
            </button>
            <button className="btn btn-primary">Crear nuevo cuestionario</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Landing
