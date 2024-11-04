export const Checkboxavailability = ({setavailability , availability }) => {
    

    const handleChange = (event) => {
        const value = event.target.checked ? 1 : 0;
        setavailability (value);
    }

  return (
    <>
    
      <input className="checkbox"
        type="checkbox"
        checked={availability  === 1} 
        onChange={handleChange}
      />
      
    
    </>
  )
}

