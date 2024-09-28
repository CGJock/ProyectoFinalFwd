import { useState } from "react";
import postRegister from "../../../services/fetch";
import { getRegister } from "../../../services/fetch";



const Register = () => {
    //variables de inputs usuarios generales
    const [user_type, Setuser_type] = useState('')
    const [dni_number, Setdni_number] = useState('')
    const [username, Setusername] = useState('')
    const [name, Setname] = useState('')
    const [first_name, setFirst_name] = useState('')
    const [birth_date, setbirth_date] = useState('')
    const [last_name, setlast_name] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [phone_number, setphone_number] = useState('')


    //variables para estudiantes
    const [user_grade, setuser_grade] = useState('')
    
    //variables de inputs para funcionalidad
    const [profileExists, setprofileExists] = useState('')

    async function handle_form() {
      
      event.preventDefault()
      if(!dni_number || !username || name || first_name || birth_date ||  last_name || email || password || phone_number) {
        alert('Please fill all the fields')
        } 
          let data = await getRegister()
          for (const e in data)
            if (e.dni_number ==  dni_number || e.email ==  email) {
            setprofileExists(true);
            }
            else{
            setprofileExists(false);
            }

            if  (profileExists == false) {
              let data = await postRegister(user_type, dni_number, username, name, first_name,)
            }else{
              alert('User already exists')
            }
              
          }

          
    

  return (
    <div className="register_form">

    <form method='POST' className="RegisterForm">
        <label>Cedula</label>
        <input type="text" name="dni_number" value={ dni_number } onChange={(event) => Setdni_number(event.target.value)}/>

        <label>Username</label>
        <input type="text" name="username" value={ username } onChange={(event) => Setusername(event.target.value)} />

        <label>Nombre</label>
        <input type="text" name="name" value={ name } onChange={(event) => Setname(event.target.value)}/>

        <label>Primer Apellido</label>
        <input type="text" name="first_name" value={ first_name } onChange={(event) => setFirst_name(event.target.value)}/>

        <label>Segundo Apellido</label>
        <input type="text" name="last_name" value={ last_name } onChange={(event) => setlast_name(event.target.value)}/>

        <label>Fecha de nacimiento</label>
        <input type="date" value={birth_date} onChange={(event) => setbirth_date(event.target.value)}/>

        <label>Correo Electronico</label>
        <input type="email" name="email" value={ email } onChange={(event) => setemail(event.target.value)}/>

        <label>Contrasenna</label>
        <input type="text" name="password" value={ password } onChange={(event) => setpassword(event.target.value)}/>

        <label>Numero Telefonico</label>
        <input type="number" name="phone_number" value={ phone_number } onChange={(event) => setphone_number(event.target.value)}/>

        <label>Tipo de usuario</label>
        <select 
        value={user_type}
        onChange={(event) => Setuser_type(event.target.value)}
        name="products"
        id="products"
      >
        <option value={1}>Administrador</option>
        <option value={2}>Estudiante</option>
        <option value={3}>Psicologo</option>
        <option value={4}>Moderador</option>
        </select>

    </form>

      <div className="student_inputs">
        <form method="put" className="student_form">
        
        <label>Selecciona Grado Academico</label>
        <select 
        value={user_grade}
        onChange={(event) => setuser_grade(event.target.value)}
        name="grade"
        id="grade"
      >
        <option value={7}>Administrador</option>
        <option value={8}>Estudiante</option>
        <option value={9}>Psicologo</option>
        <option value={10}>Moderador</option>
        <option value={11}>Moderador</option>
        <option value={12}>Moderador</option>
        </select>

        <label>Selecciona Grado Academico</label>
        <select 
        value={id_institution}
        onChange={(event) => Setuser_type(event.target.value)}
        name="institution"
        id="institution"
      >
        <option value={7}>Administrador</option>
        <option value={8}>Estudiante</option>
        <option value={9}>Psicologo</option>
        <option value={10}>Moderador</option>
        <option value={11}>Moderador</option>
        <option value={12}>Moderador</option>
        </select>
        </form>
        </div>
      
      </div>

  )
}


export default Register
