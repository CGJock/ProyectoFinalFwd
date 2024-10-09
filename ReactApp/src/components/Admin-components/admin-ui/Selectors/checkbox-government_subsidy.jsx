

export const Checkboxgovernment_subsidy = ({setgovernment_subsidy, government_subsidy}) => {
    

    const handleChange = (event) => {
        const value = event.target.checked ? 1 : 0;
        setgovernment_subsidy(value);
    }

  return (
    <>
    
      <input className="checkbox"
        type="checkbox"
        checked={government_subsidy === 1} 
        onChange={handleChange}
      />
      
    
    </>
  )
}

