import {useEffect, useState} from 'react'
import React from 'react'
import axios from 'axios'
import {useParams} from 'react-router'
import PreguntasCuestionario from '../components/Cuestionarios/PreguntasCuestionario'

export const EditarCuestionario = () => {
  const {id} = useParams()
  const [preguntas, setPreguntas] = useState([])

  useEffect(() => {
    const buscaPreguntas = async () => {
      try {
        console.log(id)
        const response = await axios.get(`http://localhost:6245/preguntas/${id}`)
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
      <PreguntasCuestionario preguntas={preguntas} />
    </>
  )
}

export default EditarCuestionario
