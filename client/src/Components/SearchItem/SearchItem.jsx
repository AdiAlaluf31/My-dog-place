
import { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import "./searchItem.css";
import { SearchContext } from "../../Context/SearchContext";

const SearchItem = (props) => {
  const {item,dates,destination}= props;
  const navigate = useNavigate();
  const { dispatch } = useContext(SearchContext);

  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates} });
    navigate(`/hotels/${item?._id}`, { state: { destination, dates} });
  };

  return (
    <div className="searchItem">
      <img
        src={"https://cf.bstatic.com/xdata/images/hotel/square600/261707778.webp?k=fa6b6128468ec15e81f7d076b6f2473fa3a80c255582f155cae35f9edbffdd78&o=&s=1"}
        alt=""
        className="siImg"
      />
      <div className="siDesc">
        <h1 className="siTitle">{item?.item?.name}</h1>
        {item?.price<100&&<span className="siCancelOp">מחיר שווה במיוחד</span>}
        <span className="siFeatures">
        {item?.description} 
        </span>
      </div>
      <div className="siDetails">
        {item?.rating>4.5 && <div className="siRating">
          <span>דירוג גבוה ביותר!</span>
          <button>{item?.rating}</button>
        </div>}
        <div className="siDetailTexts">
          <span className="siPrice">{`${item?.price} ש״ח ללילה `}</span>
          <span className="siTaxOp">כולל מע״מ</span>
          <button onClick={handleSearch} className="siCheckButton">פרטים נוספים</button>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;