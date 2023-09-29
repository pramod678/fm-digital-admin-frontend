// import React, { Component, useEffect, useState } from "react";
import SideBar from "./Sidebar/SideBar";
import "../index.css";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { Card, Space, Statistic, Table, Typography } from "antd";
import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
// import MenuBar from "./Sidebar/SidebarMenu";
export default function UserHome({ userData }) {
  // console.log("userData",userData);
  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./sign-in";
  };
  console.log("userData.fname",userData.fname);
 

  return (
    <div className="auth-wrapper">
    <div style={{position:'absolute',marginTop:'0px'}} ><SideBar/></div>
      <dev className="login-user">
      <h5 className="user-nmae">{userData.fname}user1</h5>
      <button style={{fontSize:"150%"}}><CgProfile /></button>
      
        <button  onClick={logOut} className="logout-button">
          Log Out
        </button>
       </dev>
       <div  className="cantener">
       <h3>News</h3>
       </div>

    </div>
  );
}
