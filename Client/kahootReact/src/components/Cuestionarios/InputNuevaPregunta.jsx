import React from 'react'

export const InputNuevaPregunta = ({ pregunta, handleCambioPregunta, index }) => {
	return (
		<>
			{/* Fila TiempoRespuesta y texto */}
			<div className="row">
				<div className="container p-3">
					<form className="form p-3 d-flex flex-column gap-3 bg-light rounded shadow-sm">
						{/* Fila TiempoRespuesta */}
						<h5>Pregunta {index + 1}</h5>
						<div className="form-group d-flex flex-row gap-5">
							<div className="col-2">
								<label htmlFor="inputTiempoRespuesta" className="form-label">
									TiempoRespuesta
								</label>
							</div>
							<input
								id="inputTiempoRespuesta"
								type="text"
								className="form-control input-sm"
								name="tiempoRespuesta"
								onChange={(e) => handleCambioPregunta(e, index)}
							/>
						</div>

						{/* Fila texto */}
						<div className="form-group d-flex flex-row gap-5">
							<div className="col-2">
								<label htmlFor="inputTexto" className="form-label">
									Texto
								</label>
							</div>
							<textarea
								id="inputTexto"
								className="form-control input-sm"
								name="texto"
								onChange={(e) => handleCambioPregunta(e, index)}
							/>
						</div>
					</form>
				</div>
			</div>
		</>
	)
}
