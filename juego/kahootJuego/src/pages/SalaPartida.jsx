import React, {useEffect, useState} from 'react'
import {useLocation, useNavigate, useParams} from 'react-router-dom'
import {useSocket} from '../hooks/useSockets'
import {SalaEspera} from '../components/SalaEspera'
import PantallaHost from '../components/Juego/PantallaHost'
import PantallaJugador from '../components/Juego/PantallaJugador'

export const SalaPartida = () => {
  const {pin} = useParams() // Obtenemos el pin desde la url
  const location = useLocation() // hook para tener acceso al location.state.cuestionario
  const navigate = useNavigate() // hook para navegar

  const joinToken = JSON.parse(localStorage.getItem('joinToken')) // token que tiene el jugador al unirse
  const token = JSON.parse(localStorage.getItem('token')) // token del host

  //hook para manejar el socket y la sala
  const {
    sala,
    crearPartida,
    unirsePartida,
    salirPartida,
    empezarPartida,
    siguientePregunta,
    enviarRespuestaJugador,
    preguntaTimeout,
    resultadoCliente
  } = useSocket('http://localhost:6246', pin, joinToken)

  //Cuando cambia el estado de la sala
  useEffect(() => {}, [sala])

  //useEffect al montar el component
  useEffect(() => {
    joinToken ? unirsePartida(joinToken) : crearPartida(token, location.state.cuestionario)
    return () => salirPartida(joinToken || token) // Limpieza al desmontar
  }, [])

  //Renderizados de las pantallas
  const mostrarPantallaJuego = () => {
    return joinToken == null ? (
      <PantallaHost sala={sala} siguientePregunta={siguientePregunta} preguntaTimeout={preguntaTimeout} />
    ) : (
      <PantallaJugador
        sala={sala}
        enviarRespuestaJugador={enviarRespuestaJugador}
        resultadoCliente={resultadoCliente}
      />
    )
  }
  const mostrarSalaEspera = () => {
    return (
      <SalaEspera
        cuestionario={sala.cuestionario}
        jugadores={sala.jugadores}
        pin={pin}
        joinToken={joinToken}
        empezarPartida={() => empezarPartida()}
        salirPartida={() => navigate('/iagoKH')}
      />
    )
  }
  return (
    <>
      {sala.pregunta_actual == -1 && mostrarSalaEspera()}
      {sala.pregunta_actual != -1 && mostrarPantallaJuego()}
    </>
  )
}

export default SalaPartida
