import "./footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="fLists">
        <ul className="fList">
          <li className="fListItem">שירות לקוחות</li>
          <li className="fListItem">רוצה לפרס אצלנו?</li>
          <li className="fListItem">קריירה</li>
          <li className="fListItem">תנאי רכישה</li>
        </ul>
      </div>
      <div className="fText">Copyright © 2022 My Dog Place.</div>
    </div>
  );
};

export default Footer;