import { Link } from 'react-router-dom'
import '../../../styles/administrator-styles/admin_nav.css'
import { useAuth } from '../../../context/AuthContext'
export const AdminNav = () => {
  const {logout} = useAuth()

  function handle_logout() {
    logout()
    
  }
  return (
    <>
        <div className="navbar">
        <h1>Panel de Administrador</h1>
        <div className="nav-buttons">
            <Link to="/home"><p style={{color:"white" , underline:'none'}} href="">Home</p></Link>
            <Link to="/administration/institutions" className="nav-button">Instituciones</Link>
            <Link to="/administration/students" className="nav-button">Estudiantes</Link>
            <Link to="/administration/register" className="nav-button">Registro</Link>
            <Link to="/administration/psychologists" className="nav-button">Psicólogos</Link>
            <Link to="/administration/tickets" className="nav-button">Tickets</Link>
            <Link to="/administration/expedients" className="nav-button">Expedientes</Link>
            <Link style={{color:'white',backgroundColor:'red'}} to="/home" className="nav-button" onClick={handle_logout}>Salir</Link>
        </div>
    </div>
    </>
  )
}
