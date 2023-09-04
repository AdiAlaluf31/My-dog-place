import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "./reserve.css";
import useFetch from "../../Hooks/useFetch";
import { useContext, useState } from "react";
import { SearchContext } from "../../Context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Reserve = ({ setOpen, hotel }) => {
  const [error,setError]=useState(false)
  // const { dates } = useContext(SearchContext);
  // const getDatesInRange = (startDate, endDate) => {
  //   const start = new Date(startDate);
  //   const end = new Date(endDate);
  //   const date = new Date(start.getTime());
  //   const dates = [];
  //   while (date <= end) {
  //     dates.push(new Date(date).getTime());
  //     date.setDate(date.getDate() + 1);
  //   }
  //   return dates;
  // };
  // const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);
  // const isAvailable = (roomNumber) => {
  //   const isFound = roomNumber.unavailableDates.some((date) =>
  //     alldates.includes(new Date(date).getTime())
  //   );

  //   return !isFound;
  // };
  // const handleSelect = (e) => {
  //   const checked = e.target.checked;
  //   const value = e.target.value;
  //   setSelectedRooms(
  //     checked
  //       ? [...selectedRooms, value]
  //       : selectedRooms.filter((item) => item !== value)
  //   );
  // };
  // const navigate = useNavigate();
  // const handleClick = async () => {
  //   try {
  //     await Promise.all(
  //       selectedRooms.map((roomId) => {
  //         const res = axios.put(`/rooms/availability/${roomId}`, {
  //           dates: alldates,
  //         });
  //         return res.data;
  //       })
  //     );
  //     setOpen(false);
  //     navigate("/");
  //   } catch (err) {}
  // };
  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <div className='reserveModalHeader'>מלא את הפרטים הבאים על מנת שנוכל להבטיח את הזמנתך:</div>
        <div className="reserveInputs">
          <div className="reserveInput">
            <input
              value={''}
              type="text" 
              className="reserveText" 
              placeholder="שם הבעלים "
              onChange={(e)=>{}}
              />
          </div>
          <div className="reserveInput">
            <input
              value={''}
              type="text" 
              className="reserveText" 
              placeholder="שמספר פלאפון"
              onChange={(e)=>{}}
              />
          </div>
          <div className="reserveInput">
            <input
              value={''}
              type="email" 
              className="reserveText" 
              placeholder='דואר אלקטרוני'
              onChange={(e)=>{}}
              />
          </div>     
          <div className="reserveInputDates">
            <input 
                value={''}
                type="date" 
                className="reserveText" 
                placeholder='תאריך התחלה'
                onChange={(e)=>{}}
              />
              <input 
                value={''}
                type="date" 
                className="reserveText" 
                placeholder='תאריך סיום'
                onChange={(e)=>{}}
              />
          </div>
        </div>
        <div className='divider'></div>
        <div className='reserveDogInputs'>
          <div className='reserveModalHeader'>אנא מלא פרטים חיונים על כלבך:</div>
          <div className="reserveInputs">
            <div className="reserveInput">
              <input
                value={''}
                type="email" 
                className="reserveText" 
                placeholder="גיל הכלב"
                onChange={(e)=>{}}
              />
            </div>
          <div className="reserveInput">
            <input
              value={''}
              type="email" 
              className="reserveText" 
              placeholder="מין הכלב"
              onChange={(e)=>{}}
              />
          </div>
          <div className="reserveInput">
            <input
              value={''}
              type="email" 
              className="reserveText" 
              placeholder="מישע נוסף שיכול לסייע לנו בעת שהותו בפנסיוןב"
              onChange={(e)=>{}}
              />
          </div>      
          </div>
        </div>
        <div className="submitContainer">
          <button className="submitReservation" onClick={()=>{}}>אשר הזמנה</button>
          {error&&<div className="errorReservation">אנא מלא את כל הפרטים</div>}
        </div>
      </div>
    </div>
  );
};

export default Reserve;