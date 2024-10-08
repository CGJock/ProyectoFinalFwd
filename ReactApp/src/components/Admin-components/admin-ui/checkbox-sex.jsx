
export const Selector_gender = ({sex,setsex}) => {
    

  return (
    <>
   <label>Selecciona el Rol del usuario</label>

<select 
value={sex}
onChange={(event) => setsex(event.target.value)}
name="sex"
id="sex"
>
<option key={1} value={'masculino'}> 
     masculino
    </option>
    <option key={2} value={'femenino'}> 
     femenino
    </option>
    </select>
    </>
  )
}

