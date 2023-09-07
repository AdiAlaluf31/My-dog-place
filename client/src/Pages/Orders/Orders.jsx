import "./orders.css";
import Navbar from "../../Components/Navbar/Navbar";
import Header from "../../Components/Header/Header";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CancelationModal from '../../Components/CancelModal/CancelModal'

const Orders = () => {
  const [openCancelationModal, setOpenCancelationModal] = useState(false);
  const navigate = useNavigate();
  const userOrders =[{kennelName:'המקום של טלי', startDate:'18/9',endDate:'22/9', price:'250', kennelId:'64e669e06ba978c101591029'}]

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
                <div className="kennelName">{order.kennelName}</div>
                <button onClick={()=>navigate(`/hotels/${order.kennelId}`)}>לצפייה בפנסיון</button>
              </div>
              <div className="orderDates">{`${order.startDate} עד ${order.endDate}`}</div>
              <button onClick={()=>setOpenCancelationModal(true)} className="cancelOrder">לביטול הזמנה</button>
            </div>
            <div className="orderPrice">{`${order.price} ש״ח` }</div>
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