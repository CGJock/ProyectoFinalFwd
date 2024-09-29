import { useState } from 'react'
import login from "./pages/user/user-ui/login"
import { Routes, Route } from "react-router-dom"
import './App.css'

function App() {
  

  return (
    <>
    <Routes>
    <Route path="/" element={<login/>} />
    </Routes>
    
    </>
  )
}

export default App
