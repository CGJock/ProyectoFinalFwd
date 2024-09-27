import { useState } from "react";



export const Register = () => {
 
    const [user_type, Setuser_type] = useState("")

  return (
    <form method='POST'>
        <label>Cedula</label>
        <input type="text" name="dni_number" />

        <label>Username</label>
        <input type="text" name="username" />

        <label>Nombre</label>
        <input type="text" name="name" />

        <label>Fecha de nacimiento</label>
        <input type="date" />

        

    </form>

  )
}
