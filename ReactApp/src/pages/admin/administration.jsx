
import Register from "../../components/Admin-components/admin-ui/Register"
import UsersContainer from "../../components/administration-components/UsersContainer"
import { Outlet } from 'react-router-dom';

const Administration = () => {
  return (
   <>
   
    <h1>Pagina de administracion</h1>
    <Outlet />
  
   </>
  )
}

export default Administration
