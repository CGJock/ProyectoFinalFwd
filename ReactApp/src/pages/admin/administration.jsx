
import Register from "../../components/Admin-components/admin-ui/Register"

import UsersContainer from "../../components/Admin-components/admin-ui/UsersContainer"
import { Outlet } from 'react-router-dom';

const Administration = () => {
  return (
   <>
   
    <h1>Pagina de administracion</h1>
    <main>
    <Outlet />
    </main>
   
  
   </>
  )
}

export default Administration
