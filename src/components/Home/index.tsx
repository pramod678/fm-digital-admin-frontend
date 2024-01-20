import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Dashboard from "./Dashboard";
import AdminHome from "./AdminHome";
import { GetUserDataApi } from "../../api/authentication";
import useAuthStore from "../../store/userstore";


export default function Index() {
    const [userData, setUserData] = useState("");
    const [admin, setAdmin] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem("token")
    console.log(token, "token")
    const { userType, setUserType } = useAuthStore()
    const { mutate: getUserData, isLoading: isLoadinggetUserData } = GetUserDataApi(setAdmin, setUserData, navigate, setUserType)


    useEffect(() => {
        getUserData({ token: token })
    }, []);

    return (<>{userType !== "User" ? <AdminHome /> : <Dashboard userData={userData} />}</>);
}