import React from 'react'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'
export const Redirect = () => {
	const navegar = useNavigate()

	useEffect(() => {
		navegar('/iagoKH/')
	}, [])
	return <div></div>
}

export default Redirect
