export const Checkboxavailability = ({setavailability , availability }) => {
    

    const handleChange = (event) => {
        const value = event.target.checked ? 1 : 0;
        setavailability (value);
    }

  return (
    <>
    <label>Disponibilidad Psicologo</label>
      <input
        type="checkbox"
        checked={availability  === 1} 
        onChange={handleChange}
      />
      Checkbox is {availability  === 1 ? 'Checked' : 'Unchecked'}
    
    </>
  )
}

