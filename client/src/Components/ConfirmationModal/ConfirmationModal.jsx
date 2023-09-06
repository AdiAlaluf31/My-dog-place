import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "./confirmationModal.css";
import dog_img from '../../assets/images/background-dog.png'
import { format } from "date-fns";
import { useContext } from "react";
import { SearchContext } from "../../Context/SearchContext";

const ConfirmationModal = ({ setOpen, hotel }) => {
  const { dates } = useContext(SearchContext);

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <div style={{display:'flex', flexDirection:'row'}}>
          <div className='reserveConfirmationHeader'>
            <div>{`תודה רבה הזמנתך ל ${hotel.name}`}</div>
            <div>{`בתאריכים ${format(
                dates[0].startDate,
                "dd/MM/yyyy"
              )} עד ${format(dates[0].endDate, "dd/MM/yyyy")} אושרה.`}</div>

            <div style={{marginTop:'20px'}}>נתראה בקרוב!</div>
          </div>

        <img src={dog_img} style={{width:'200px', marginRight:'50px'}}></img>

        </div>

      </div>
    </div>
  );
};

export default ConfirmationModal;