import React, {useEffect, useState} from 'react'
import Axios from 'axios'
const Cuestionarios = () => {
  const [cuestionarios, setCuestionarios] = useState([])

  useEffect(() => {
    const buscaCuestionarios = async () => {
      try {
        const response = await Axios.get('http://localhost:6245/cuestionarios')
        console.log(response.data)
        //setCuestionarios(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    buscaCuestionarios()
  }, [])

  return (
    <>
      <h1>Cuestionarios</h1>
    </>
  )
}

export default Cuestionarios
