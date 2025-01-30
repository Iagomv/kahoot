import React from 'react'

export const MostrarResultados = ({jugadores}) => {
  return (
    <div>
      <h2>MostrarResultados</h2>
      <p>{JSON.stringify(jugadores)}</p>
    </div>
  )
}
