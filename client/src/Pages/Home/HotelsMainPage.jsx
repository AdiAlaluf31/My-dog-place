import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import MailList from "../../Components/MailList/MailList";
import Navbar from "../../Components/Navbar/Navbar";
const HotelsMainPage = () => {

  return (
    <div>
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
