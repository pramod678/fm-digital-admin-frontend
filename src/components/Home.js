import React, {  useEffect, useState } from "react";
import AdminHome from "./adminHome";

import Dashboard from "./DashboardHome";
import ReleseInfo from "../pages/ReleseInfo";
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [userData, setUserData] = useState("");
  const [admin, setAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://192.168.29.202:5000/api/v1/user/userData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        if (data.data.userType === "Admin") {
          setAdmin(true);
        }

        setUserData(data.data);
        if (data.data === "token expired") {
          alert("Token expired login again");
          window.localStorage.clear();
          navigate('/sign-in');
        }
      });
  }, []);

  return admin ? <AdminHome /> : <Dashboard userData={userData} />;
}
