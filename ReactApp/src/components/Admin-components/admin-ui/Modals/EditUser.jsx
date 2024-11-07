import { useState, useEffect } from "react";
import { user_fetch } from "../../../../services/user_fetch";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import '../../../../styles/administrator-styles/edit-user.css'
import { useAuth } from "../../../../context/AuthContext";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useNavigate } from "react-router-dom";


export const EditUser = ({ Show, userEdit, setShow }) => {
  const apiPost = "http://localhost:8000/api/user/user";
  const [UserData, setUserData] = useState(null); // Cambia a null para validar más fácilmente
  const [loading, setLoading] = useState(true); // Estado de carga
  const [refresh, setrefresh] = useState(0)
  const { edit_user,formatDate } = useAuth()
  const navigate = useNavigate()


  const [nameEdit, setnameEdit] = useState('')
  const [dniEdit, setdniEdit] = useState('')
  const [emailEdit, setemailEdit] = useState('')
  const [lastnameEdit, setlastnameEdit] = useState('')
  const [firstnameEdit, setfirstnameEdit] = useState('')
  const [phonenumberEdit, setphonenumberEdit] = useState('')
  const [sexEdit, setsexEdit] = useState('')
  const [usernameEdit, setusernameEdit] = useState('')
  const [birthdateEdit, setbirthdateEdit] = useState('')

  useEffect(() => {
    if (userEdit) {
      fetch_user();
    }
  }, [userEdit,refresh]);

  const fetch_user = async () => {
    setLoading(true); // Iniciar carga
    const userData = await user_fetch(apiPost, userEdit);
    setUserData(userData);
    console.log(UserData)
    setdniEdit(userData.dni_number)
    setnameEdit(userData.name)
    setlastnameEdit(userData.last_name)
    setfirstnameEdit(userData.first_name)
    setemailEdit(userData.email)
    setphonenumberEdit(userData.phone_number)
    setsexEdit(userData.sex)
    setusernameEdit(userData.username)
    setbirthdateEdit(userData.birth_date)
    setLoading(false); // Terminar carga

    
  };

  async function handleClose() {
    setShow(!Show);
  }

  async function handleEdit(user_id) {
    const user_data = {
        id_user: userEdit,
        name: nameEdit,
        last_name: lastnameEdit,
        first_name: firstnameEdit,
        dni_number: dniEdit,
        email: emailEdit,
        phone_number: phonenumberEdit,
        sex: sexEdit,
        username: usernameEdit,
        birth_date: birthdateEdit
        }
        try {
            await edit_user(user_id, user_data);
            setrefresh(refresh + 1); // Incrementa refresh si la edición fue exitosa
            handleClose(); // Cierra el modal después de editar
        } catch (error) {
            console.error("Error al editar el usuario:", error); // Manejo de errores
            // Aquí podrías mostrar un mensaje de error al usuario si lo deseas
        }
    }

async function handleDelete(user_id) {
    const user_data = {
        id_user: userEdit,
        name: nameEdit,
        last_name: lastnameEdit,
        first_name: firstnameEdit,
        dni_number: dniEdit,
        email: emailEdit,
        phone_number: phonenumberEdit,
        sex: sexEdit,
        username: usernameEdit,
        birth_date: birthdateEdit,
        is_active:  0

        }
        try {
            await edit_user(user_id, user_data);
            setrefresh(refresh + 1); // Incrementa refresh si la edición fue exitosa
            alert('actualizado con exito')
            handleClose(); // Cierra el modal después de editar
        } catch (error) {
            console.error("Error al editar el usuario:", error); // Manejo de errores
            // Aquí podrías mostrar un mensaje de error al usuario si lo deseas
        }
    }
  return (
    <>
      <Modal style={{width:"500px", marginLeft:"35%",marginBottom:"80%"}}
        show={Show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        dialogClassName="edit-user-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Edita la información del usuario {userEdit}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading ? ( // Mostrar estado de carga
            <p>Cargando datos del usuario...</p>
          ) : UserData ? ( // Verifica si UserData tiene datos
            <>
            <div>
              <label>Nombre</label>
              <input value={nameEdit} onChange={(event) => setnameEdit(event.target.value)} type="text" />
            </div>

            <div>
              <label>Primer Apellido</label>
              <input value={firstnameEdit} onChange={(event) => setfirstnameEdit(event.target.value)} type="text" />
            </div>

            <div>
              <label>Segundo Apellido</label>
              <input value={lastnameEdit} onChange={(event) => setlastnameEdit(event.target.value)} type="text" />
            </div>

            <div>
              <label>Email</label>
              <input value={emailEdit} onChange={(event) => setemailEdit(event.target.value)} type="mail" />
            </div>

            <div>
              <label>Telefono</label>
              <input value={phonenumberEdit} onChange={(event) => setphonenumberEdit(event.target.value)} type="text" />
            </div>

            <div>
              <label>Genero</label>
              <input value={sexEdit} onChange={(event) => setsexEdit(event.target.value)} type="text" />
            </div>

            <div>
              <label>Username</label>
              <input value={usernameEdit} onChange={(event) => setusernameEdit(event.target.value)} type="text" />
            </div>


            <div>
              <label>cedula</label>
              <input  value={dniEdit} onChange={(event) => setdniEdit(event.target.value)} type="number" />
              
            </div>

            <div>
            <input type="date"  value={birthdateEdit} onChange={(event) => setbirthdateEdit(event.target.value)}/>
            <p className="label_input">Fecha de nacimiento</p>
          </div>
              
            </>
          ) : (
            <p>No se encontró información del usuario.</p> // Mensaje si no hay datos
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={() => handleEdit(userEdit)} >Editar Usuario </Button>
          <Button variant="third"><DeleteForeverIcon sx={{ fontSize: 40, color: 'red' }}  onClick={() => handleDelete(userEdit)} /></Button>

        </Modal.Footer>
      </Modal>
    </>
  );
};
