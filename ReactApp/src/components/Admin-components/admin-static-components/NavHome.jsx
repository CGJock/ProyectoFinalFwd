import { Link } from "react-router-dom";
import '../../../styles/nav-home.css'
import { useState } from "react";

const NavHome = () => {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };

    return (
        <nav className="navHome">
            <div className="navHome-container">

            <button className="nav-toggle" onClick={toggleMenu}>
          ☰
        </button>
            <ul className={`navHome-menu ${isOpen ? 'open' : ''}`}>
                <li><Link to="/" className="home_link">Home</Link></li>
                <li><Link to="/about"className="about_link">About</Link></li>
                <li><Link to="/FAQ" className="questions_link">FAQ</Link></li>
                <li><Link to="/contact"className="contact_link">Contact</Link></li>
            </ul>
            </div>
        </nav>
    )
   }


export default NavHome