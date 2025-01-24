import {useNavigate} from 'react-router'
import React, {useEffect} from 'react'
import Axios from 'axios'
import MostrarCuestionarios from '../components/cuestionarios/MostrarCuestionarios'

export const CrearPartida = () => {
  const navega = useNavigate()

  const hadleClickCuestionario = async (cuestionario) => {
    const data = {
      token: localStorage.getItem('token'),
      idCuestionario: cuestionario.id
    }
    try {
      const pinPartida = await Axios.post('http://localhost:6245/juego/partida', {data})
      console.log(pinPartida.data)
      navega(`/iagoKH/salaPartida/${pinPartida.data}`)
    } catch (error) {
      console.log(error)
    }
  }
  //Redireccion si no hay token
  useEffect(() => {
    if (!localStorage.getItem('token') || localStorage.getItem('token') === 'null') navega('/iagoKH/login')
    console.log(localStorage.getItem('token'))
  })
  return (
    <>
      <MostrarCuestionarios hadleClickCuestionario={hadleClickCuestionario} />
    </>
  )
}

export default CrearPartida
