import Register from '../components/Admin-components/admin-ui/Register'
import Protected_routes from './proteced_routes';
import  {Routes, Route} from "react-router-dom";
import Home from '../pages/home/home'

const Rutas = () => {
  return (
    <>
    <Routes>
        <Route path="/" element={<Home/>} />
    
    <Route path="/Register" element={<Register />} />
        <Route
          path="/Administration"
          element={
            <Protected_routes>
              <Register />
            </Protected_routes>
          }/>
    </Routes>
      
    </>
  )
}

export default Rutas

