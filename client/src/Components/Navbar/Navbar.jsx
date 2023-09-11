import "./navbar.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import MyDogPlaceIcon from '../../assets/images/My-Dog-Place-Logo.png'

const Navbar = () => {
  const { user, setAction, setUser,setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegisterReq = () => {
    setAction('register');
    navigate('/register')   
  }

  const handleLoginReq = () => {
    setAction('logIn');
    navigate('/register')
  }
  const handleLogOutReq = ()=>{
    setUser({})
    setToken('')

  }
  return (
    <div className="navbar">
      <div className="navContainer">
        <img style={{ height:'80px'}} className='image-icon' src={MyDogPlaceIcon} onClick={()=>navigate('/')}/>       
        {user?.userName ? 
         <div className='actions'>
          <text  className='navBarText' style={{ paddingRight: '900px'}}>{`שלום ${user?.userName}!`}</text>
          <a  className='navBarText' href='/orders'>ההזמנות שלי</a>
          <button  className="headerBtnLogin" onClick={handleLogOutReq}>התנתק</button>
          </div>:
              <div className='navButtonsContainer'>
                  <button  className="headerBtnLogin" onClick={handleRegisterReq}>הצטרף</button>
                  <button className="headerBtnLogin" onClick={handleLoginReq}>התחבר</button>
              </div>
         }
      </div>
    </div>
  );
};

export default Navbar;