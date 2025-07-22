import React from "react";
import Swiper from "../../components/Carousel/Carousel";
import "./Home.scss";
import Chatbot from "../../components/chatBot/Chatbot";
import Card from "../../components/Cards/Card";
import AccommodationApp from "../../components/Royce's/AccommodationApp";

export default function Home() {
  return (
    <div className="home">
      <div className="top">
        <Swiper />
      </div>
      <div className="bottom">
        <div className="bottoml">
          <h1 style={{ color: "darkgreen" }}>Latest on the Market</h1>
          <Card />
        </div>
        <div className="bottomr">
          <Chatbot />
        </div>
        <div className="royceS">
          <AccommodationApp />
        </div>
      </div>
    </div>
  );
}
