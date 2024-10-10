

import Rutas from './routes/routes'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider, useAuth } from './context/AuthContext';


function App() {


  return (
    
    
    <>
      <AuthProvider>
      <Rutas />
      </AuthProvider>
    </>
  

  )
}

export default App
