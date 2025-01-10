import {useState} from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Cuestionarios from './pages/cuestionarios'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Cuestionarios />}></Route>
          <Route path="" element={''}></Route>
          <Route path="" element={''}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
