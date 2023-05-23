import "./navbar.css"
import {Link} from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to='/' style={{color:"inherit", textDecoration:"none"}}>
          <span className="logo">MyDogPlace</span>
        </Link>
        <div className="navItems">
          <button className="navButton">הצטרפות</button>
          <button className="navButton">התחברות</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar