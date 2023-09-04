import "./list.css";
import Navbar from "../../Components/Navbar/Navbar";
import Header from "../../Components/Header/Header";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../Components/SearchItem/SearchItem";
import useFetch from "../../Hooks/useFetch";
import { Oval } from 'react-loader-spinner';
import notFoundImg from '../../assets/images/notFoundResults.webp';
import he from "date-fns/locale/he";


const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [openDate, setOpenDate] = useState(false);

  const { data, loading, error, reFetch } = useFetch(
    `/kennels?startDate=${dates[0].startDate}&endDate=${dates[0].endDate}&city=${destination}`
  );

  const handleClick = () => {
    reFetch();
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listHeader">התוצאות המתאימות ביותר עבורך:</div>
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <div className="lsItem">
              <label style={{color:'white'}}>עיר</label>
              <input placeholder={destination} type="text" onChange={(e)=>setDestination(e.target.value)}/>
            </div>
            <div className="lsItem">
              <label style={{color:'white'}}>תאריכים</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                dates[0].startDate,
                "dd/MM/yyyy"
              )} עד ${format(dates[0].endDate, "dd/MM/yyyy")}`}</span>
              {openDate && (
                <DateRange
                locale={he}
                  onChange={(item) => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />
              )}
            </div>

            <button className="headerBtnList" onClick={handleClick}>חפש</button>
          </div>
          <div className="listResult">
            {loading ? 
            <Oval
            height={80}
            width={80}
            color="#4fa94d"
            wrapperStyle={{padding:'300px'}}
            wrapperClass=""
            visible={true}
            ariaLabel='oval-loading'
            secondaryColor="#4fa94d"
            strokeWidth={2}
            strokeWidthSecondary={2}
          /> : (
              <>
                {data.length ?data.map((item) => (
                  <SearchItem item={item} dates={dates} destination={destination}/>
                )):
                <div>
                    <div type='text' style={{color:'#6D9542',paddingRight:'300px', width:'50%',paddingTop:'100px', fontSize:27}}>
                  לצערנו לא מצאנו תוצאות מתאימות עבורך,נסה שנית.
                </div>
                <img src={notFoundImg} alt="" style={{width:'400px', paddingRight:'260px', marginTop:'50px'}}/>

                </div>
              }
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;