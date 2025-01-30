import {useEffect, useRef, useState} from 'react'
import {io} from 'socket.io-client'

export const useSocket = (url, pin, initialJoinToken) => {
  const socket = useRef(io(url, {autoConnect: false}))
  const isConnected = useRef(false)
  const [sala, setSala] = useState({})
  const [resultadoCliente, setResultadoCliente] = useState({})

  useEffect(() => {
    // Conecta el socket si no está conectado
    if (!isConnected.current) {
      socket.current.connect()
      isConnected.current = true
    }

    // Manejar eventos del socket
    socket.current.on('sala', (data) => setSala(data))
    socket.current.on('resultadosHost', (data) => console.log(data))
    socket.current.on('resultadoCliente', (data) => setResultadoCliente(data.puntos))

    // Al desmontar el componenente, desconecta el socket
    return () => {
      socket.current.disconnect()
      socket.current.off('sala')
      isConnected.current = false
    }
  }, [url]) // Solo se ejecuta al montar

  // Funciones de socket para gestionar la partida
  const crearPartida = (token, cuestionario) => {
    socket.current.emit('crearPartida', {pin, token, cuestionario})
  }
  const empezarPartida = () => {
    socket.current.emit('empezarPartida', {pin})
  }
  const unirsePartida = (token) => {
    socket.current.emit('unirsePartida', {pin, token})
  }

  const salirPartida = (token) => {
    socket.current.emit('salirPartida', {pin, token})
  }

  const siguientePregunta = () => {
    socket.current.emit('siguientePregunta', {pin})
  }
  const preguntaTimeout = () => {
    socket.current.emit('preguntaTimeout', {pin})
  }
  //TODO Implementar en backend Envia la posicion de la respuesta (index + 1)
  const enviarRespuestaJugador = (data) => {
    const objeto = {pin, indexRespuesta: data.indexRespuesta, segundosLeft: data.segundosLeft, nombre: initialJoinToken}
    socket.current.emit('enviarRespuesta', objeto)
  }
  return {
    sala,
    crearPartida,
    empezarPartida,
    unirsePartida,
    salirPartida,
    siguientePregunta,
    preguntaTimeout,
    enviarRespuestaJugador,
    resultadoCliente
  }
}
