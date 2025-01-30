import React from 'react'

export const MostrarResultadoJugador = ({resultadoCliente}) => {
  const mostrarMensajeCorrecto = () => {
    return (
      <div className="container d-flex justify-content-center align-items-center">
        <div className="alert alert-success p-5 shadow-lg rounded" style={{textAlign: 'center', fontSize: '2rem'}}>
          <h1>¡Correcto!!!</h1>
          <p className="mt-3" style={{fontSize: '1.5rem', fontWeight: '500'}}>
            ¡Has respondido correctamente! Bien hecho.
          </p>
          <h3>
            Has sumado <b>{JSON.stringify(resultadoCliente)} puntos</b>
          </h3>
        </div>
      </div>
    )
  }

  const mostrarMensajeLoser = () => {
    return (
      <div className="container d-flex justify-content-center align-items-center">
        <div className="alert alert-danger p-2 shadow-lg rounded" style={{textAlign: 'center', fontSize: '2rem'}}>
          <h1>¡Has fallado!</h1>
          <p className="mt-3" style={{fontSize: '1.5rem', fontWeight: '500'}}>
            Intenta nuevamente, ¡puedes mejorar!
          </p>

          <h3>
            Has sumado <b>{JSON.stringify(resultadoCliente)} puntos</b>
          </h3>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="container justify-content-center">
        <h1></h1>
        {resultadoCliente !== 0 ? mostrarMensajeCorrecto() : mostrarMensajeLoser()}
      </div>
    </div>
  )
}
