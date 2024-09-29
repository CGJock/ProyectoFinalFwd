import { useState } from "react"

export const Checkbox = () => {
    const [checkbox_value, setcheckbox_value] = useState('0')//valor por default ,sera negativo

    const handleChange = (event) => {
        const value = event.target.checked ? 1 : 0;
        console.log(value)
        setcheckbox_value(value);
    }

  return (
    <>
    <label>Ayuda Gobernamental</label>
      <input
        type="checkbox"
        checked={checkbox_value === 1} 
        onChange={handleChange}
      />
      Checkbox is {checkbox_value === 1 ? 'Checked' : 'Unchecked'}
    
    </>
  )
}

