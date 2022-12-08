import React, { useEffect, useState } from 'react';
import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/Navbar/Navbar";
import PropertyList from "../../components/propertyList/PropertyList";
const HotelsMainPage = () => {

  return (
    <div>
      <Navbar />
      <Header type={'list'}/>
      <div className="homeContainer">
        <Featured />
        <h1 className="homeTitle">Browse by property type</h1>
        <PropertyList />
        <h1 className="homeTitle">Homes guests love</h1>
        <FeaturedProperties />
        <MailList />
        <Footer />
      </div>
    </div>
  );

  );
}

export { HotelsMainPage };
