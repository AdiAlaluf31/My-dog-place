import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes';
import "./searchItem.css";
import {Link} from "react-router-dom";

const SearchItem = (item) => {
  const navigate = useNavigate();

  return (
    <div className="searchItem">
      <img
        src={"https://cf.bstatic.com/xdata/images/hotel/square600/261707778.webp?k=fa6b6128468ec15e81f7d076b6f2473fa3a80c255582f155cae35f9edbffdd78&o=&s=1"}
        alt=""
        className="siImg"
      />
      <div className="siDesc">
        <h1 className="siTitle">{item.item.name}</h1>
        <span className="siDistance">{item.item.distance}m from center</span>
        <span className="siTaxiOp">Free airport taxi</span>
        <span className="siFeatures">
        {item.item.desc} 
        </span>
        <span className="siCancelOp">Free cancellation </span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails">
        {item.item.rating && <div className="siRating">
          <span>Excellent</span>
          <button>{item.item.rating}</button>
        </div>}
        <div className="siDetailTexts">
          <span className="siPrice">${item.item.chepestPrice}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <Link to={`/hotels/${item.item._id}`}>
            <button className="siCheckButton">See availability</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;