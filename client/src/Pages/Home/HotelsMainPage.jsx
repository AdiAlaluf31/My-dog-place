import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import MailList from "../../Components/MailList/MailList";
import Navbar from "../../Components/Navbar/Navbar";
const HotelsMainPage = () => {

  return (
    <div className='rootHome' style={{background:'linear-gradient(0.25turn, #3f87a6, #ebf8e1, #f69d3c)'}}>
      <Navbar />
      <Header type=''/>
      <div className="homeContainer">
        <MailList/>
        <Footer/>
      </div>
    </div>
  );
}

export { HotelsMainPage };
