import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Dashboard from "./Dashboard";
import AdminHome from "./AdminHome";
import { GetUserDataApi } from "../../api/authentication";
import useAuthStore from "../../store/userstore";
import { BounceLoader } from "react-spinners";


export default function Index() {
    const [userData, setUserData] = useState("");
    const navigate = useNavigate();
    const token = localStorage.getItem("token")
    const { userType, setUserType } = useAuthStore()
    const { data: getUserData, isLoading: isLoadinggetUserData } = GetUserDataApi(setUserData, navigate, setUserType, token);

    if (isLoadinggetUserData) {
        return <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-100">
            <BounceLoader size={150} color={"#000000"} />
        </div>
    }

    return (<>{getUserData?.data?.data?.userType !== "User" ? <AdminHome /> : <Dashboard userData={userData} />}</>);
}