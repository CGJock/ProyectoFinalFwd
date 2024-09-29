

export const Checkscholarship = ({setscholarship, scholarship}) => {
    

    const handleChange = (event) => {
        const value = event.target.checked ? 1 : 0;
        setscholarship(value);
    }

  return (
    <>
    <label>Beca De Institucion</label>
      <input
        type="checkbox"
        checked={scholarship === 1} 
        onChange={handleChange}
      />
      Checkbox is {scholarship === 1 ? 'Checked' : 'Unchecked'}
    
    </>
  )
}

