import React from 'react'
import { OpcionesInputNuevaPregunta } from './opcionesInputNuevaPregunta'

export const InputNuevaPregunta = ({ pregunta, handleCambioPregunta, index }) => {
	return (
		<>
			{/* Fila tiempo_respuesta y texto */}
			<div className="row">
				<div className="container p-3">
					<form className="form p-3 d-flex flex-column gap-3 bg-light rounded shadow-sm">
						{/* Fila tiempo_respuesta */}
						<h5>Pregunta {index + 1}</h5>
						<div className="form-group d-flex flex-row gap-5">
							<div className="col-2">
								<label htmlFor="inputtiempo_respuesta" className="form-label">
									tiempo
								</label>
							</div>
							<input
								id="inputtiempo_respuesta"
								type="text"
								className="form-control input-sm"
								name="tiempo_respuesta"
								onChange={(e) => handleCambioPregunta(e, index)}
							/>
						</div>

						{/* Fila texto */}
						<div className="form-group d-flex flex-row gap-5">
							<div className="col-2">
								<label htmlFor="inputTexto" className="form-label">
									texto
								</label>
							</div>
							<textarea
								id="inputTexto"
								className="form-control input-sm"
								name="texto"
								onChange={(e) => handleCambioPregunta(e, index)}
							/>
						</div>
						<OpcionesInputNuevaPregunta
							pregunta={pregunta}
							index={index}
							handleCambioPregunta={handleCambioPregunta}
						/>
					</form>
				</div>
			</div>
		</>
	)
}
