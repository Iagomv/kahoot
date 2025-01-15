import React, { createContext, useContext, useEffect, useState } from 'react'
// Como crear un proveedor que comparte datos con sus children
// 1. Crear el contexto
const AuthContext = createContext()

// 2. Crear el proveedor del contexto
export const AuthProvider = ({ children }) => {
	// 2.1. Definir el estado del token
	// Se inicializa con el valor almacenado en localStorage (si existe), o null si no hay ninguno
	const [token, setToken] = useState(localStorage.getItem('token') || null)

	useEffect(() => {
		localStorage.setItem('token', token)
		console.log(token + 'desde proveedor')
	}, [token])
	// 2.2. Proveer el estado y la función de actualización a los componentes hijos
	return (
		<AuthContext.Provider value={{ token, setToken }}>
			{children} {/* Los componentes hijos envueltos tendrán acceso al contexto */}
		</AuthContext.Provider>
	)
}

// 3. Crear un hook personalizado para usar el contexto de manera más sencilla
export const useAuthProvider = () => {
	return useContext(AuthContext) // Devuelve el valor del contexto (token y setToken)
}
