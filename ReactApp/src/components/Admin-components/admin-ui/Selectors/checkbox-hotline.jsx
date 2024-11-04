import '../../../../styles/administrator-styles/selectores.css'

export const Selector_Hotline = ({assigned_to_hotline,setassigned_to_hotline}) => {
    

  return (
    <>

<select className='selector_hotlne'
value={assigned_to_hotline}
onChange={(event) => setassigned_to_hotline(event.target.value)}
name="hotline"
id="hotline"
>
<option key={1} value={true} selected> 
     Casos de emergencia
    </option>
    <option key={2} value={false}> 
     Casos con seguimiento
    </option>
    </select>
    
    </>
  )
}