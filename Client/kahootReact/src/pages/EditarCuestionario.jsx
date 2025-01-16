import {useEffect, useState} from 'react'
import React from 'react'
import axios from 'axios'
import {useParams} from 'react-router'
import PreguntasCuestionario from '../components/Cuestionarios/PreguntasCuestionario'

export const EditarCuestionario = () => {
  const {id} = useParams()
  const [cuestionario, setCuestionario] = useState(null) // Inicializar como null para diferenciar entre cargando y datos
  const [cargando, setCargando] = useState(true) // Indicador de carga
  const [error, setError] = useState(null) // Manejo de errores

  useEffect(() => {
    const getInfoCuestionario = async () => {
      try {
        console.log('Obteniendo cuestionario con ID:', id)
        const response = await axios.get(`http://localhost:6245/cuestionarioCompletoEdicion/${id}`)
        setCuestionario(response.data)
      } catch (err) {
        console.error('Error al obtener el cuestionario:', err)
        setError('No se pudo cargar el cuestionario. Inténtalo de nuevo más tarde.')
      } finally {
        setCargando(false) // Asegura que el indicador de carga se detenga
      }
    }
    getInfoCuestionario()
  }, [id]) // Agregar `id` como dependencia para mayor claridad

  useEffect(() => {
    console.log('Cambios en EditarCuestionario')
    console.log(cuestionario)
  }, [cuestionario])
  if (cargando) {
    return <p>Cargando cuestionario...</p> // Indicador de carga
  }

  if (error) {
    return <p>{error}</p> // Mensaje de error
  }

  return (
    <>
      {cuestionario ? (
        <PreguntasCuestionario key={cuestionario.id} cuestionario={cuestionario} setCuestionario={setCuestionario} />
      ) : (
        <p>No se encontraron datos del cuestionario.</p>
      )}
    </>
  )
}

export default EditarCuestionario
