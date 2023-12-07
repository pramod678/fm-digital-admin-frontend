import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Dashboard from "./Dashboard";
import AdminHome from "./AdminHome";
import { GetUserDataApi } from "../../api/authentication";


export default function Index(){
    const [userData, setUserData] = useState("");
    const [admin, setAdmin] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem("token")
    const { mutate: getUserData, isLoading: isLoadinggetUserData } = GetUserDataApi(setAdmin, setUserData, navigate)

    console.log(token, "token")
    useEffect(() => {
        getUserData({ token: token })
    }, []);

    return (<>{admin ? <AdminHome /> : <Dashboard userData={userData} />}</>);
}