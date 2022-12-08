import "./navbar.css"

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo">MyDogPlace</span>
        <div className="navItems">
          <button className="navButton">הצטרפות</button>
          <button className="navButton">התחברות</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar