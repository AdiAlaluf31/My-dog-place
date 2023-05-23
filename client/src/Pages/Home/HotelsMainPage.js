import Featured from "../../Components/Featured/Featured";
import FeaturedProperties from "../../Components/FeaturedProperties/FeaturedProperties";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import MailList from "../../Components/MailList/MailList";
import Navbar from "../../Components/Navbar/Navbar";
import PropertyList from '../../Components/PropertyList/PropertyList';
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
