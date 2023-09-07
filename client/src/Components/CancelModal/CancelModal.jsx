import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "./cancelModal.css";
import dog_img from '../../assets/images/background-dog.png'
import { format } from "date-fns";
import { useContext } from "react";
import { SearchContext } from "../../Context/SearchContext";

const CancelModal = ({ setOpen, hotel }) => {
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
            ביטול הזמנתך הועבר לטיפול.
          </div> 
          <img src={dog_img} style={{width:'200px', marginRight:'50px'}}/>
        </div>
      </div>
    </div>
  );
};

export default CancelModal;