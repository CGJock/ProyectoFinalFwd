

import Rutas from './routes/routes'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
<<<<<<< HEAD
import AuthProvider from './context/AuthContext';

=======
import { AuthProvider } from './context/AuthContext';
// import { useAuth } from './context/AuthContext';
>>>>>>> e714734dc5203dee4fa4536d45cbbbd2d93c5103


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
