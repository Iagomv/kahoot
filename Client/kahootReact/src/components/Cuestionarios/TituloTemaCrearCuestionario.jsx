import React from 'react'

export const TituloTemaCrearCuestionario = ({ infoCuestionario, handleCambioInfo, setMostrarInputTituloTematica }) => {
	return (
		<>
			{/* Fila para título y temática */}
			<div className="row justify-content-center fade-in">
				<div className="container p-3 justify-content-center col-6">
					<form className="form p-3 d-flex flex-column gap-3 bg-light rounded shadow-sm ">
						{/* Fila título */}
						<div className="form-group d-flex flex-row gap-5">
							<div className="col-2">
								<label htmlFor="inputTitulo" className="form-label">
									Titulo
								</label>
							</div>
							<input
								id="inputTitulo"
								type="text"
								className="form-control input-sm"
								name="titulo"
								value={infoCuestionario.titulo}
								onChange={handleCambioInfo}
							/>
						</div>

						{/* Fila temática */}
						<div className="form-group d-flex flex-row gap-5">
							<div className="col-2">
								<label htmlFor="inputTema" className="form-label">
									Tematica
								</label>
							</div>
							<input
								id="inputTema"
								type="text"
								className="form-control input-sm"
								name="tema"
								value={infoCuestionario.tema}
								onChange={handleCambioInfo}
							/>
						</div>
						<button
							type="button"
							className="btn btn-outline-secondary btn-sm col-4 align-self-center"
							onClick={() => setMostrarInputTituloTematica(false)}
						>
							Confirmar
						</button>
					</form>
				</div>
			</div>
		</>
	)
}
