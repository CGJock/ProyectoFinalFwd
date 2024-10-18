import '../../../../styles/administrator-styles/selectores.css'

export const Selector_gender = ({sex,setsex}) => {
    

  return (
    <>

<select className='selector_gender'
value={sex}
onChange={(event) => setsex(event.target.value)}
name="sex"
id="sex"
>
<option key={1} value={'masculino'}> 
     Masculino
    </option>
    <option key={2} value={'femenino'}> 
     Femenino
    </option>
    </select>
    
    </>
  )
}

