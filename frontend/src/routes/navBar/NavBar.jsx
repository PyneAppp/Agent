import React, { useState } from "react";
import "./NavBar.scss";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import AccommodationApp from "../accomodation/Accomodation";

export default function NavBar() {
  return (
    <div className="nav">
      <div className="left">
        <img src={logo}></img>
        <h1 style={{ color: "green", marginRight: "50px" }}>ToraBasa</h1>
        <ul>
          <Link to={"/"}>
            <li>HOME</li>
          </Link>
          <Link to={"/accomodation"}>
            {" "}
            <li>HOUSES</li>
          </Link>
          <li>HIRE</li>
          <li>JOBS</li>
        </ul>{" "}
      </div>
      <div className="right">
        {" "}
        <ul>
          <li>SIGN IN</li>
          <li>SIGN UP</li>
        </ul>{" "}
      </div>
    </div>
  );
}
