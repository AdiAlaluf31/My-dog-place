import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "./reserve.css";
import { format } from "date-fns";
import { useLocation } from "react-router-dom";

import useFetch from "../../Hooks/useFetch";
import { useContext, useState } from "react";
import { SearchContext } from "../../Context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

const Reserve = ({ setOpenReservation,setOpenConfirmation, kennel }) => {
  const location = useLocation();
  const { user, token } = useContext(AuthContext);
  const dates =location.state.dates
  const [error,setError]=useState(false)
  const [formInfo,setFormInfo]=useState({
    ownerName:user?.userName,
    phoneNum:user?.phone,
    email:user?.email,
    dogsAge:'',
    dogsGander:'',
    dogsDesc:'',
    dogsBreed:'',
    dogsName:''
  })

  function isFormValid(){
    const isFullObj = Object.values(formInfo).every(value => {
      if (value) {
        return true;
      }
      return false;
    });
    return isFullObj;

  }
  
  const handleReservation=()=>{
    const isValidForm= isFormValid();
    setError(!isValidForm);
    if(isValidForm){
        fetch("http://localhost:8800/api/reservations", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              "authorization": `bearer ${token}`
          },
          body: JSON.stringify({
              kennel,
              dog: {name:formInfo.dogsName, breed:formInfo.dogsBreed, age:formInfo.dogsAge, isFriendly:true, gender:formInfo.dogsGander, description:formInfo.dogsDesc, user:formInfo.ownerName},
              startDate:dates[0].startDate,
              endDate:dates[0].endDate,
          })
      }).then(res => {
        res.json().then(data => {
          if(data.error){
            setError(data.message);
          }else{
            setOpenReservation(false)
            setOpenConfirmation(true)
          }
        })
      })
    }
  }

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpenReservation(false)}
        />
        <div className='reserveModalHeader'>מלא את הפרטים הבאים על מנת שנוכל להבטיח את הזמנתך:</div>
        <div className="reserveInputs">
          <div className="reserveInput">
            <input
              value={formInfo.ownerName}
              type="text" 
              className="reserveText" 
              placeholder="שם הבעלים "
              onChange={(e)=>setFormInfo({...formInfo, ownerName:e.target.value})}
              />
          </div>
          <div className="reserveInput">
            <input
              value={formInfo.phoneNum}
              type="text" 
              className="reserveText" 
              placeholder="שמספר פלאפון"
              onChange={(e)=>setFormInfo({...formInfo, phoneNum:e.target.value})}
              />
          </div>
          <div className="reserveInput">
            <input
              value={formInfo.email?? user?.email}
              type="email" 
              className="reserveText" 
              placeholder='דואר אלקטרוני'
              onChange={(e)=>setFormInfo({...formInfo, email:e.target.value})}
              />
          </div>     
        </div>
        <div className='divider'></div>
        <div className='reserveDogInputs'>
          <div className='reserveModalHeader'>אנא מלא פרטים חיונים על כלבך:</div>
          <div className="reserveInputs">
          <div className="reserveInput">
              <input
                value={formInfo.dogsName}
                type="email" 
                className="reserveText" 
                placeholder="שם הכלב"
                onChange={(e)=>setFormInfo({...formInfo, dogsName:e.target.value})}
              />
            </div>
            <div className="reserveInput">
              <input
                value={formInfo.dogsAge}
                type="email" 
                className="reserveText" 
                placeholder="גיל הכלב"
                onChange={(e)=>setFormInfo({...formInfo, dogsAge:e.target.value})}
              />
            </div>
          <div className="reserveInput">
            <input
              value={formInfo.dogsGander}
              type="email" 
              className="reserveText" 
              placeholder="מין הכלב"
              onChange={(e)=>setFormInfo({...formInfo, dogsGander:e.target.value})}
              />
          </div>
          <div className="reserveInput">
            <input
              value={formInfo.dogsBreed}
              type="email" 
              className="reserveText" 
              placeholder="גזע הכלב"
              onChange={(e)=>setFormInfo({...formInfo, dogsBreed:e.target.value})}
              />
          </div>
          <div className="reserveInput">
            <input
              value={formInfo.dogsDesc}
              type="email" 
              className="reserveTextLong" 
              placeholder="הוסף תיאור לכלבך על מנת שישהה עם הככלבים המתאימים היותר"
              onChange={(e)=>setFormInfo({...formInfo, dogsDesc:e.target.value})}
              />
          </div>      
          </div>
        </div>
        <div className="submitContainer">
          <button className="submitReservation" onClick={handleReservation}>אשר הזמנה</button>
          {error&&<div className="errorReservation">אנא מלא את כל הפרטים</div>}
        </div>
      </div>
    </div>
  );
};

export default Reserve;