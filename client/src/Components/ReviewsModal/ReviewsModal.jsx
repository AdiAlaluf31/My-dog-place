import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "./reviewsModal.css";
import { useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

const ReviewsModal = ({ setOpen, kennel }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const { token } = useContext(AuthContext);


  function handleOnScoreSend(){
    setOpen(false)
    fetch(`http://localhost:8800/api/kennels/${kennel._id}/reviews`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "authorization": `bearer ${token}`
      },
      body: JSON.stringify({
        rating,

      })
  }).then(res => {
    res.json().then(data => {
      console.log(data,'data')
      
    })
  })

  }

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
          <div className="star-rating">
            {[...Array(5)].map((star, index) => {
              index += 1;
              return (
                <button
                  type="button"
                  key={index}
                  className={index <= (hover || rating) ? "on" : "off"}
                  onClick={() => setRating(index)}
                  onMouseEnter={() => setHover(index)}
                  onMouseLeave={() => setHover(rating)}
                >
                  <span className="star">&#9733;</span>
                </button>
              );
            })}
          </div>
          <button onClick={handleOnScoreSend} className='sendReviewBtn'>שלח</button>
        </div>
      </div>
    </div>
  );
};

export default ReviewsModal;