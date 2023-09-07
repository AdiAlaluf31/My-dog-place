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
        <img style={{ height:'80px'}} className='image-icon' src={MyDogPlaceIcon} onClick={()=>navigate('/')}/>       
        {user.userName && 
         <div className='actions'>
          <text  className='navBarText' style={{ paddingRight: '1000px'}}>{`שלום ${user.userName}!`}</text>
          <a  className='navBarText' href='/orders'>ההזמנות שלי</a>
          </div>
         }
      </div>
    </div>
  );
};

export default Navbar;