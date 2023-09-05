import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "./confirmationModal.css";
import dog_img from '../../assets/images/background-dog.png'

const ConfirmationModal = ({ setOpen, hotel }) => {
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
            <div>{`תודה רבה הזמנתך ל ${hotel.name} אושרה`}</div>
            <div>נתראה בקרוב!</div>
          </div>

        <img src={dog_img} style={{width:'200px', marginRight:'50px'}}></img>

        </div>

      </div>
    </div>
  );
};

export default ConfirmationModal;