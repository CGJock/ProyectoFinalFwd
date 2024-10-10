import React, { useState } from 'react'

export const Changepassword = () => {
    const [oldPassword, setoldPassword] = useState('')
    const [newPassword, setnewPassword] = useState('')
    const [confirmedPassword, setconfirmedPassword] = useState('')
    async function handleForm() {
        
    }
  return (
    <>
    <div className='reset_login_container'>
        <h3>Por favor rellene los espacios para cambiar la contrasenna</h3>
        <div>
            <p>Contrasenna actual</p>
            <input type="text" name="oldPassword" id="" value={oldPassword} onChange={(event) => setoldPassword(event.target.value)} />
        </div>

        <div>
            <p>Nueva Contrasenna</p>
            <input type="text" name="newPassword" id="" value={newPassword} onChange={(event) => setnewPassword(event.target.value)} />
        </div>

        <div>
            <p>Confirma la contrasenna</p>
            <input type="text" name="confirmedPassword" id="" value={confirmedPassword} onChange={(event) => setconfirmedPassword(event.target.value)} />
        </div>

        <div>
            <button onClick={handleForm}></button>
        </div>

    </div>
    </>
    
  )
}
