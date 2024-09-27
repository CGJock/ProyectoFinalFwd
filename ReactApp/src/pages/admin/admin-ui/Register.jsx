import { useState } from "react";



export const Register = () => {
 
    const [user_type, Setuser_type] = useState('')
    const [dni_number, Setdni_number] = useState('')
    const [username, Setusername] = useState('')
   
    

  return (
    <form method='POST' className="RegisterForm">
        <label>Cedula</label>
        <input type="text" name="dni_number" value={ dni_number }/>

        <label>Username</label>
        <input type="text" name="username" value={ username } />

        <label>Nombre</label>
        <input type="text" name="name" value={ name } />

        <label>Primer Apellido</label>
        <input type="text" name="first_name" value={ first_name }/>

        <label>Segundo Apellido</label>
        <input type="text" name="first_name" valuie={ last_name } />

        <label>Fecha de nacimiento</label>
        <input type="date" value={ date }/>

        <label>Correo Electronico</label>
        <input type="email" name="email" value={ email } />

        <label>Contrasenna</label>
        <input type="text" name="password" value={ password } />

        <label>Numero Telefonico</label>
        <input type="number" name="phone_number" valuie={ phone_number }/>

        
        

        






        

    </form>

  )
}
