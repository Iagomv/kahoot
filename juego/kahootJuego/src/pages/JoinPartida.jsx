import React from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'
import { useState } from 'react'
// Gestion de JoinPartida llamada a get a la API -> http://localhost:6245/juego/partida
// Se hacen comprobaciones de pin y nombre mediante regEx
// joinToken se actualiza al unirse con los datos proporcionados por el usuario
export const JoinPartida = () => {
	const navega = useNavigate()
	const longitudMaximaPin = 12
	const longitudMinimaPin = 7
	const regExPin = /^[0-9]{7,12}$/
	const regExNombre = /^[a-zA-Z0-9\s]{4,20}$/

	const [data, setData] = useState({
		pin: '',
		nombre: '',
	})
	const comprobarNombre = (nombre) => {
		if (regExNombre.test(nombre) == false) {
			alert('El nombre debe tener entre 4 y 20 caracteres y solo puede contener letras y espacios.')
			return false
		}
		return true
	}
	const comprobarPin = (pin) => {
		if (regExPin.test(pin) == false) {
			alert('El pin debe tener entre 7 y 12 caracteres y solo puede contener numeros.')
			return false
		}
		return true
	}
	const handleUnirse = async (e) => {
		e.preventDefault()
		if (comprobarPin(data.pin) == false || comprobarNombre(data.nombre) == false) {
			return
		} else {
			const result = await axios.get('http://localhost:6245/juego/partida', {
				params: { pin: data.pin, nombre: data.nombre },
			})
			if (result.status === 207 && result.data.exists == true) {
				localStorage.setItem('joinToken', JSON.stringify(data.nombre))
				console.log('token al unirse', localStorage.getItem('joinToken'))
				navega(`/iagoKH/salaPartida/${data.pin}`)
			}
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
							onChange={(e) => setData({ ...data, pin: e.target.value })}
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
							onChange={(e) => setData({ ...data, nombre: e.target.value })}
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
