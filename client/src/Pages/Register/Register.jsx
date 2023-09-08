import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import user_icon from '../../assets/images/person.png';
import email_icon from '../../assets/images/email.png';
import password_icon from '../../assets/images/password.png';
import phone from '../../assets/images/phone.png';
import "./register.css";
import { AuthContext } from '../../Context/AuthContext';

const Register = () => {
  const {action,user,setUser, setToken} =useContext(AuthContext);
  const[userInfo, setUserInfo]= useState({user:'',email:'',password:'', phone:''})
  const[error,setError]= useState(false)
  const navigate = useNavigate();

  const handleRegisterReq = () => {
    fetch("http://localhost:8800/api/auth/register", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          username: userInfo.user,
          password: userInfo.password,
          email: userInfo.email

      })
  }).then(res => {
    res.json().then(data => {
      if(data.status!==200){
        setError('משתמש כבר קיים!');
      }
      else{
        handleLoginReq();
      }
    })
  })
}

  const handleLoginReq = () => {
    fetch("http://localhost:8800/api/auth/login", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          username: userInfo.user,
          password: userInfo.password,
          email: userInfo.email
      })
  }).then(res => {
    res.json().then(data => {
      if(data.status!==200){
        setError(data.message);
      }else{
        setUser({userName:data.details?.username, email:data.details?.email, phone:userInfo.phone})
        setToken(data.token)
        setError(false)
        navigate('/')
      }
    })
  })
  }
  return (
      <div className="container">
        <div className='header'>
          <div className='text'>{action==='register'?'הצטרף אלינו':'התחבר'}</div>
          <div className='underline'></div>
        </div>
        <div className="inputs">
        <div className="input">
          <img src={user_icon} alt="" />
          <input
            value={userInfo?.user}
            type="text" 
            className="text" 
            placeholder="שם מלא "
            onChange={(e)=>{setUserInfo({...userInfo,user:e.target.value});setError(false)}}
            />
        </div>
        {action==='register'&&
          <div className="input">
          <img src={phone} alt="" style={{width:'20px'}}/>
            <input
              value={userInfo?.phone}
              type="phone"
              className="text"
              placeholder='פלאפון'
              onChange={(e) => { setUserInfo({ ...userInfo, phone: e.target.value }); setError(false); } } 
            />
          </div>
        }
        <div className="input">
          <img src={email_icon} alt="" />
          <input
            value={userInfo?.email}
            type="email" 
            className="text" 
            placeholder='דואר אלקטרוני'
            onChange={(e)=>{setUserInfo({...userInfo,email:e.target.value});setError(false)}}
            />
        </div>     
        <div className="input">
          <img src={password_icon} alt="" />
          <input 
            value={userInfo?.password}
            type="password" 
            className="text" 
            placeholder='סיסמא'
            onChange={(e)=>{setUserInfo({...userInfo,password:e.target.value});setError(false)}}
          />
        </div>
        </div>
        <div className="submit-container">
          {action==='register'?<button className="submit" onClick={handleRegisterReq}>הצטרף</button>:
          <button className="submit" onClick={handleLoginReq}>הכנס</button>}
          {error&&<div className="error">{error}</div>}
        </div>
      </div>
  );
};

export default Register;