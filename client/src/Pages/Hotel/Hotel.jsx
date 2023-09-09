import "./hotel.css";
import Navbar from "../../Components/Navbar/Navbar";
import Header from "../../Components/Header/Header";
import { format } from "date-fns";
import { Oval } from 'react-loader-spinner';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState, useEffect } from "react";
import useFetch from "../../Hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../Context/SearchContext";
import { AuthContext } from "../../Context/AuthContext";
import Reserve from "../../Components/Reserve/Reserve";
import ConfirmationModal from "../../Components/ConfirmationModal/ConfirmationModal";
import ReviewsModal from "../../Components/ReviewsModal/ReviewsModal";
import dogBackground from "../../assets/images/background2-dog.png"

const Hotel = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openReservationModal, setOpenReservationModal] = useState(false);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [openAddReviewModal, setOpenAddReviewModal] = useState(false);

  const { data, loading, error } = useFetch(`/kennels/${id}`);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const { dates:finalDates, destination } = useContext(SearchContext);
  const dates=location?.state?.dates;

  const { data:dogsData, loading:loadingDogsData, error:errorDogsData, reFetch } = useFetch(
    `/kennels/${id}/reservations?startDate=${dates?.[0].startDate}&endDate=${dates?.[0].endDate}&city=${destination}`
  );

  useEffect(()=>
  {
    reFetch();
  },[openConfirmationModal])

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    if(date1 &&date2){
      const timeDiff = Math.abs(date2.getTime() - date1.getTime());
      const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
      return diffDays;
    }
  }

  const days = dayDifference(dates?.[0]?.endDate, dates?.[0]?.startDate);

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  const handleClick = () => {
      setOpenReservationModal(true);
  };
  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? 
           <Oval
            height={80}
            width={80}
            color="#4fa94d"
            wrapperStyle={{paddingRight:'1000px', paddingTop:'300px'}}
            wrapperClass=""
            visible={true}
            ariaLabel='oval-loading'
            secondaryColor="#4fa94d"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />: (
        <div className="hotelContainer">
          {open && (
            <div className="slider">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="close"
                onClick={() => setOpen(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="arrow"
                onClick={() => handleMove("l")}
              />
              <div className="sliderWrapper">
                <img
                  src={data?.images?.[slideNumber]}
                  alt=""
                  className="sliderImg"
                />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="arrow"
                onClick={() => handleMove("r")}
              />
            </div>
          )}
          <div className="hotelWrapper">
        
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">{data?.name}</h1>
              {data?.address&&<div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data?.address}</span>
            </div>}
                <p className="hotelDesc">{data?.description}</p>
              </div>
              <div className="hotelDetailsPrice">
                {dates?.length ?<><h2>
                    <b>{days * data?.price} ש״ח </b>
                    (עבור {days}{" "}
                    לילות)
                  </h2><text style={{ fontSize: '12px' }}>{`${format(dates?.[0].startDate, "dd/MM/yyyy")} עד ${format(
                    dates?.[0].endDate,
                    "dd/MM/yyyy"
                  )}`}</text></>:<div>{`${data?.price} ש״ח ללילה`}</div>}
                {dates?.length&&<button className="bookNow" onClick={handleClick}>הזמן כעת!</button>}
              </div>
            </div>
            <div className="hotelImages">
              {data.images?.map((photo, i) => (
                <div className="hotelImgWrapper" key={i}>
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo}
                    alt=""
                    className="hotelImg"
                  />
                </div>
              ))}
            </div>

            <div className='reviewsContainer'>
              <div className="starsReview">
                <div style={{marginBottom:'5px'}}>
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star"></span>
                  <span className="fa fa-star"></span>
                </div>
                <button onClick={()=>setOpenAddReviewModal(true)}style={{border:'none', background:'none'}}>הוסף דירוג</button>
              </div>
              <text className="scoreReview">4.6</text>
            </div>
            <div className="dogsDescription" style={{display:'flex', flexDirection:'row', gap:'80px'}}>
      {dogsData?.length?<div className="dogsDescContainer" >
                <h3 >מידע חשוב על הכלבים שיהיו באותו זמן עם כלבך:</h3>
                {dogsData.map((dog,index)=><div key={`dog-${index}`} className='dogDescription'>{`${dog.dog.name}: ${dog.dog.description}`}</div>)}
              </div>:<div className="dogsDescContainer">כלבך יהיה הראשון בתאריכים אלה!</div>}
              <img src={dogBackground} alt="" style={{height:'200px', direction:'inherit'}}/>
            </div>
          </div>
        </div>
        
      )}
      {openReservationModal && <Reserve setOpenReservation={setOpenReservationModal} setOpenConfirmation={setOpenConfirmationModal} kennel={data}/>}
      {openConfirmationModal&& <ConfirmationModal setOpen={setOpenConfirmationModal} hotel={data}/>}
      {openAddReviewModal&& <ReviewsModal setOpen={setOpenAddReviewModal} hotel={data}/>}
    </div>
  );
};

export default Hotel;