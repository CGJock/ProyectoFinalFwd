
import '../../../../styles/administrator-styles/selectores.css'
export const Checkscholarship = ({setscholarship, scholarship}) => {
    

    const handleChange = (event) => {
        const value = event.target.checked ? 1 : 0;
        setscholarship(value);
    }

  return (
    <>
      <input className="checkbox"
        type="checkbox"
        checked={scholarship == 1} 
        onChange={handleChange}
      />
     
    
    </>
  )
}

