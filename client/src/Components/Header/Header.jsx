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
  faDog,
  faCity
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import he from "date-fns/locale/he";

const Header = ({ type }) => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const navigate = useNavigate();
  const {action,user,setAction} =useContext(AuthContext);


  const { dispatch } = useContext(SearchContext);

  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates} });
    navigate("/hotels", { state: { destination, dates} });
  };

  const handleRegisterReq = () => {
    setAction('register');
    navigate('/register')
    
  }

  const handleLoginReq = () => {
    setAction('logIn');
    navigate('/register')
  }
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
              הצטרף אלינו וקבל הנחה !
            </h1>
            <p className="headerDesc">
              הצטרף אלינו וקבל הטבות ייחודיות! צבור נקודות וקבל בנחה חד פעמים של 10%
            </p>
            <div className='navButtonsContainer'>
            <button  className="headerBtn" onClick={handleRegisterReq}>הצטרף</button>
            <button className="headerBtn" onClick={handleLoginReq}>התחבר</button>
            </div>

            <div className="headerSearch">
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCity} className="headerIcon" />
                <input
                 fontFamily='Verdana'
                  type="text"
                  placeholder="בחר אזור"
                  className="headerSearchInput"
                  onChange={(e) => setDestination(e.target.value)}
                />
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