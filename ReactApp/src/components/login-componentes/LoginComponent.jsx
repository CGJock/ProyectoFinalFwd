import { useState } from "react"
import { postRegister } from "../../services/fetch"
import {  useNavigate } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';


 



export const LoginComponent = () => {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const navigate = useNavigate()
    const [errorMessage, seterrorMessage] = useState('')
    const { Loggin } = useAuth();//llama a la funcion desde el contexto

    async function handleLogin(){
    
    const user_data = {
        email: email,
        password: password
    }
    
    const data =  await Loggin(user_data)
    

    try {
      await Loggin(user_data);
    if(data && data.jwt){
        console.log("se encontro su usuario")
        console.log(data,'esto es la data del user')
       
    }
    }catch (error){
        console.log("error logn",error.message);
        seterrorMessage(error.message)
    }}


  return (
    <>
    <div className="contenedor_login">
    <h1>Login</h1>
    
    
    <label>Correo Electronico</label>
    <input type="text" placeholder='Ingrese correo electronico' value={email} onChange={(e => setemail(e.target.value))}/>

    <label>Contrasenna</label>
    <input type="text" placeholder='Ingrese correo contrasenna' value={password} onChange={(e => setpassword(e.target.value))}/>

    <button onClick={handleLogin}>Login</button>
    </div>
    </>
  )
}
