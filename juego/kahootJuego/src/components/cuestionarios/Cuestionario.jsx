import {useEffect} from 'react'
import React from 'react'

export const Cuestionario = (cuestionario) => {
  useEffect(() => {
    const buscaPreguntas = async () => {
      try {
        const response = await Axios.get(`http://localhost:6245/preguntas/${cuestionario.id}`)
        console.log(response.data)
        setPreguntas(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    buscaPreguntas()
  }, [])
  return (
    <>
      <h4>{cuestionario.titulo}</h4>
      <h5>{cuestionario.tema}</h5>
    </>
  )
}

export default Cuestionario
