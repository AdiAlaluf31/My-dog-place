import {
  faBed,
  faCalendarDays,
  faCar,
  faPerson,
  faPlane,
  faTaxi,
  faDog,
  faCity
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import { DateRange } from "react-date-range";
import { useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { ROUTES } from '../../routes';

interface IHeader {
  type: string;
}
const Header = ({ type }: IHeader) => {
  const [destination, setDestination] = useState<string>("");
  const [openDate, setOpenDate] = useState<boolean>(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState<boolean>(false);
  const [options, setOptions] = useState({
    dogs: 1,

  });

  const navigate = useNavigate();

  const handleOption = (name: keyof typeof options, operation: string) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const handleSearch = () => {
    navigate(ROUTES.HOTELS, { state: { destination, date, options } });
  };

  return (
    <div className="header">
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
            <button className="headerBtn">הצטרף / התחבר</button>
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
                >{`${format(date[0].startDate, "MM/dd/yyyy")} עד ${format(
                  date[0].endDate,
                  "MM/dd/yyyy"
                )}`}</span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item:any) => setDate([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                    className="date"
                    minDate={new Date()}
                  />
                )}
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faDog} className="headerIcon" />
                <span
                  onClick={() => setOpenOptions(!openOptions)}
                  className="headerSearchText"
                >{`${options.dogs} כלבים`}</span>
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
              </div>
              <div className="headerSearchItem">
                <button className="headerBtn" onClick={handleSearch}>
                  Search
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