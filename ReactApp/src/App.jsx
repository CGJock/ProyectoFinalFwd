import { useState } from 'react'
import Login from "./pages/login"
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
    <Route path="/" element={<Login />} />
   
    </Routes>
    
   </>
  
  )
}

export default App
