import React from 'react'
import axios from 'axios'

export const JoinPartida = () => {
  const handleUnirse = () => {}
  return (
    <div>
      <div className="container h-100 w-100">
        <div className="display-2">JoinPartida</div>
        <div className="container form-control d-flex-column p-3">
          <div className="row justify-content-center align-items-center">
            <span className="col-2">Pin</span>
            <input type="text" className="col-4 " placeholder="Pin de la partida" />
          </div>
          <div className="row justify-content-center align-items-center mt-3">
            <span className="col-2">Nombre</span>
            <input type="text" className="col-4 " placeholder="Nombre" />
          </div>
          <button
            className="btn btn-primary mt-3 btn-sm"
            onClick={() => {
              handleUnirse
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
