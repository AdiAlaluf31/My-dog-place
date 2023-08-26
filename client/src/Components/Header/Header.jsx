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
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);


  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const { dispatch } = useContext(SearchContext);

  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
    navigate("/hotels", { state: { destination, dates, options } });
  };

  const sendRequest = () => {
    // send request to server at port 8800
    fetch("http://localhost:8800/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: 'yuv1',
            password: 'aaaaaa'
        })
    }).then(res => {
      res.json().then(data => {
        console.log(data);
        })
    })
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
            <button className="headerBtn" onClick={sendRequest}>הצטרף / התחבר</button>
            <div className="headerSearch">
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCity} className="headerIcon" />
                <input
                  type="text"
                  placeholder="בחר עיר"
                  className="headerSearchInput"
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="headerSearchText"
                >{`${format(dates[0].startDate, "MM/dd/yyyy")} עד ${format(
                  dates[0].endDate,
                  "MM/dd/yyyy"
                )}`}</span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    className="date"
                    minDate={new Date()}
                  />
                )}
              </div>
              {/* <div className="headerSearchItem">
                <FontAwesomeIcon icon={faDog} className="headerIcon" />
                {openOptions && (
                  <div className="options">
                    <div className="optionItem">
                      <span className="optionText">Dogs</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.dogs <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("dogs", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.dogs}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("dogs", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div> */}
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