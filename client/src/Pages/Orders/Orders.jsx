import "./orders.css";
import Navbar from "../../Components/Navbar/Navbar";
import Header from "../../Components/Header/Header";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import CancelationModal from '../../Components/CancelModal/CancelModal'
import useFetch from "../../Hooks/useFetch";
import {AuthContext} from "../../Context/AuthContext"
const Orders = () => {
  const [openCancelationModal, setOpenCancelationModal] = useState(false);
  const navigate = useNavigate();
  const { user, setAction, setUser,setToken, token } = useContext(AuthContext);

  const { data:userOrders, loading, error, reFetch } = useFetch(
    `/reservations`
  );

  return (
    <div className='background'>
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
                <div className="kennelName">{order.kennel.name}</div>
                <button onClick={()=>navigate(`/hotels/${order.kennelId}`)}>לצפייה בפנסיון</button>
              </div>
              <div className="orderDates">{`${order.startDate} עד ${order.endDate}`}</div>
              <button onClick={()=>setOpenCancelationModal(true)} className="cancelOrder">לביטול הזמנה</button>
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