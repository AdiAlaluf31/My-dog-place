import "./mailList.css"

const MailList = () => {
  return (
    <div className="mail">
      <h1 className="mailTitle">חסוך זמן, חסוך כסף!</h1>
      <span className="mailDesc">הזמן דרכנו וקבל את המחיר הטוב ביותר.</span>
      <span className="mailDesc">מצאת מחיר טוב יותר? צור קשר עם שירות הלקוחות ונדאג להשוות את המחיר עבורך.</span>

      {/* <div className="mailInputContainer">
        <input type="text" placeholder="המייל שלך" />
        <button>קבל עדכונים מאיתנו</button>
      </div> */}
    </div>
  )
}

export default MailList