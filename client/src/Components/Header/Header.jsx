import "./header.css";
import { DateRange } from "react-date-range";
import { useContext, useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../Context/SearchContext";
import { AuthContext } from "../../Context/AuthContext";
import {
  faCalendarDays,
  faCity
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import he from "date-fns/locale/he";

const Header = ({ type }) => {
  const navigate = useNavigate();
  const {setAction} =useContext(AuthContext);
  const { dispatch } = useContext(SearchContext);
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const cities=['תל אביב','ראשון לציון','באר שבע','ירושלים','חיפה','רמת גן','גבעתיים'];

  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates} });
    navigate("/hotels", { state: { destination, dates} });
  };
  return (
    <div className={
      type === "list" ? "header listMode" : "header"
    }>
      <div
        className={
          type === "list" ? "headerContainer listMode" : "headerContainer"
        }
      >
        {type !== "list" && (
          <>
            <h1 className="headerTitle">
              מצא את המקום המתאים ביותר לכלבך!            </h1>
            {/* <p className="headerDesc">
              הצטרף אלינו וקבל עדכונים על כל המקומות המתאימים לכלבך! בנוסף קבל הטבה חד פעמית של 10% הנחה!
            </p> */}
            {/* <div className='navButtonsContainer'>
            <button  className="headerBtnLogin" onClick={handleRegisterReq}>הצטרף</button>
            <button className="headerBtnLogin" onClick={handleLoginReq}>התחבר</button>
            </div> */}
            <div className="headerSearch">
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCity} className="headerIcon" />
                <div className="dropdown">
                  <button  type="button" className='dropDownBtn'>
                    {destination||'בחר עיר'}
                  </button>
                  <div className="dropdown-content" aria-labelledby="dropdownMenuButton">
                    {cities.map((city,index)=>{
                        return <div onClick={(e)=>setDestination(cities[e.currentTarget.id])} className="dropdown-item" id={index}>{city}</div>
                    })}
                  </div>
                </div>
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="headerSearchText"
                >{`${format(dates[0].startDate, "dd/MM/yyyy")} עד ${format(
                  dates[0].endDate,
                  "dd/MM/yyyy"
                )}`}</span>
                {openDate && (
                  <DateRange
                    locale={he}
                    editableDateInputs={true}
                    onChange={(item) => setDates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    className="date"
                    minDate={new Date()}
                  />
                )}
              </div>
              <div className="headerSearchItem">
                <button className="headerBtn" onClick={handleSearch}>
                  חפש
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;