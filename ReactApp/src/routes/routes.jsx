import Register from '../pages/admin/admin-ui/Register'
import Protected_routes from './proteced_routes';
import  {Routes, Route} from "react-router-dom";

const Rutas = () => {
  return (
    <>
    <Routes>
        <Route path="/" element={<Register />} />
    </Routes>

    <Protected_routes>
      
    </Protected_routes>
    </>
  )
}

export default Rutas

