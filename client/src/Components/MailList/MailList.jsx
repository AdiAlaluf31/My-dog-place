import "./mailList.css"

const MailList = () => {
  return (
    <div className="mail">
      <h1 className="mailTitle">חסוך זמן, חסוך כסף!</h1>
      <span className="mailDesc">הרשם ונשלח לך את הדילים הטובים ביותר בשבילך</span>
      <div className="mailInputContainer">
        <input type="text" placeholder="המייל שלך" />
        <button>קבל עדכונים מאיתנו</button>
      </div>
    </div>
  )
}

export default MailList