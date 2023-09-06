import "./navbar.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import MyDogPlaceIcon from '../../assets/images/My-Dog-Place-Logo.png'

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <div className="navContainer">
        <img style={{ height:'80px'}} className='image-icon' src={MyDogPlaceIcon}/>       
        {user.userName && <text style={{color:'#43882F', marginTop:'30px', paddingRight:'1000px', fontFamily:"Verdana, Geneva, Tahoma, sans-serif", fontSize:'20px', fontWeight:'bold'}}>{`שלום ${user.userName}!`}</text>}
      </div>
    </div>
  );
};

export default Navbar;