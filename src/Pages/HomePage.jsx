import React from "react";
import HeroSlider from "../Components/HeroSlider";
import BeginarFriendly from "../Components/BeginarFriendly";
import CommonMisteks from "../Components/CommonMisteks";
import RecentAdd from "../Components/RecentAdd";
import HowItWorks from "../Components/HowItWorks";

const HomePage = () => {
  return (
    <div>
      
      <HeroSlider></HeroSlider>
      <RecentAdd></RecentAdd>
      <BeginarFriendly></BeginarFriendly> 
      <HowItWorks></HowItWorks>
      <CommonMisteks></CommonMisteks>
      
    </div>
  );
};

export default HomePage;
