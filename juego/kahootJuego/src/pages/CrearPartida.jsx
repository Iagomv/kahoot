import {useNavigate} from 'react-router'
import React, {useEffect, useCallback} from 'react'
import Axios from 'axios'
import MostrarCuestionarios from '../components/cuestionarios/MostrarCuestionarios'
// Al crear la partida se borra el joinToken si lo hubiera
export const CrearPartida = () => {
  const navega = useNavigate()

  const hadleClickCuestionario = useCallback(
    async (cuestionario) => {
      const data = {
        token: localStorage.getItem('token'),
        idCuestionario: cuestionario.id
      }
      try {
        const pinPartida = await Axios.post('http://localhost:6245/juego/partida', {data})
        navega(`/iagoKH/salaPartida/${pinPartida.data}`, {state: {cuestionario: cuestionario}})
      } catch (error) {
        console.error('Error al crear la partida:', error)
      }
    },
    [navega]
  )

  // Redirección si no hay token
  useEffect(() => {
    localStorage.removeItem('joinToken')
    const token = localStorage.getItem('token')
    if (!token || token === 'null') {
      navega('/iagoKH/login')
    }
  }, [navega])

  return (
    <>
      <MostrarCuestionarios hadleClickCuestionario={hadleClickCuestionario} />
    </>
  )
}

export default CrearPartida
