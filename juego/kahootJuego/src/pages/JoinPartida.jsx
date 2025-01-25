import React from 'react'
import {useNavigate} from 'react-router'
import axios from 'axios'
import {useState} from 'react'
import {io} from 'socket.io-client'

export const JoinPartida = () => {
  const navega = useNavigate()

  const [data, setData] = useState({
    pin: '',
    nombre: ''
  })

  const handleUnirse = async (e) => {
    e.preventDefault()
    const result = await axios.get('http://localhost:6245/juego/partida', {
      params: {pin: data.pin, nombre: data.nombre}
    })
    if (result.status === 207 && result.data.inGame == true && data.nombre.length > 4) {
      localStorage.setItem('token', JSON.stringify(result.data.token))
      console.log(result.data)
      navega(`/iagoKH/salaPartida/${data.pin}`)
    }
  }
  return (
    <div>
      <div className="container h-100 w-75">
        <div className="display-2">Únete {data.nombre}</div>
        <div className="container form-control d-flex-column p-3">
          <div className="row justify-content-center align-items-center">
            <span className="col-2">Pin</span>
            <input
              type="text"
              className="col-4"
              maxLength={10}
              value={data.pin}
              placeholder="Pin de la partida"
              onChange={(e) => setData({...data, pin: e.target.value})}
            />
          </div>
          <div className="row justify-content-center align-items-center mt-3">
            <div className="col-2 mx-3">Nombre</div>
            <input
              type="text"
              className="col-4"
              minLength={5}
              maxLength={15}
              value={data.nombre}
              placeholder="Nombre"
              onChange={(e) => setData({...data, nombre: e.target.value})}
            />
          </div>
          <button
            className="btn btn-primary mt-3 btn-sm"
            type="submit"
            onClick={(e) => {
              handleUnirse(e)
            }}
          >
            Unirse
          </button>
        </div>
      </div>
    </div>
  )
}

export default JoinPartida
