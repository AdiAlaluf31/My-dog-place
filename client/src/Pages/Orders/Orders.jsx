import "./orders.css";
import Navbar from "../../Components/Navbar/Navbar";
import Header from "../../Components/Header/Header";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import CancelationModal from '../../Components/CancelModal/CancelModal'
import useFetch from "../../Hooks/useFetch";
import {AuthContext} from "../../Context/AuthContext"
import ReviewsModal from "../../Components/ReviewsModal/ReviewsModal";
import { format } from "date-fns";

const Orders = () => {
  const [openCancelationModal, setOpenCancelationModal] = useState(false);
  const navigate = useNavigate();
  const [kennelId,setKennelId]=useState('');
  const { user, setAction, setUser,setToken, token } = useContext(AuthContext);
  const [openAddReviewModal, setOpenAddReviewModal] = useState(false);

  const { data:userOrders, loading, error, reFetch } = useFetch(
    `/reservations`
  );

  return (
    <div className='background'>
      {openAddReviewModal&& <ReviewsModal setOpen={setOpenAddReviewModal} kennelId={kennelId}/>}
      {openCancelationModal && <CancelationModal setOpen={setOpenCancelationModal}/>}
      <Navbar />
      <Header type="list" />
      <div className="ordersContainer">
        {userOrders.length &&<div className="ordersTitle">
          ההזמנות שלי
        </div>}
        {userOrders? userOrders.map(order=>
          <div className='orderContainer'>
            <div className='orderDetails'>
              <div className="detailshader">
              <img  style={{height:'50px',width:'50px'}}src={order.kennel.images[0]}/>
                <div className="kennelName">{order.kennel.name}</div>
                <button onClick={()=>navigate(`/hotels/${order.kennel._id}`)}>לצפייה בפנסיון</button>
              </div>
              <div className="orderDates">{`${format(new Date(order.startDate), "dd/MM/yyyy")} עד ${format(new Date(order.endDate), "dd/MM/yyyy")}`}</div>
              <button onClick={()=>setOpenCancelationModal(true)} className="cancelOrder">לביטול הזמנה</button>
              <button className="reviewOrder" style={{backgroundColor: '#eeb06e'}} onClick={()=>{setOpenAddReviewModal(true); setKennelId(order.kennel._id)}}>הוסף דירוג</button>

            </div>
            <div className="orderPrice">{`${order.kennel.price} ש״ח` }</div>
          </div>
          ):
          <div className='ordersEmpty'>
            <div className="emptyOrdersText">טרם התקבלו הזמנות מחשבונך.</div>
          </div>
          }
      </div>
    </div>
  );
};

export default Orders;