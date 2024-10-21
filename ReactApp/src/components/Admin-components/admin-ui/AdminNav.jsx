import { Link } from 'react-router-dom'
import '../../../styles/administrator-styles/admin_nav.css'
export const AdminNav = () => {
  return (
    <>
        <div className="navbar">
        <h1>Panel de Administrador</h1>
        <div className="nav-buttons">
          <Link to="/administration/institutions" className="nav-button">Instituciones</Link>
            <Link to="/administration/students" className="nav-button">Estudiantes</Link>
            <Link to="/administration/register" className="nav-button">Registro</Link>
            <Link to="/administration/psychologists" className="nav-button">Psicólogos</Link>
            <Link to="/administration/tickets" className="nav-button">Tickets</Link>
        </div>
    </div>
    </>
  )
}
