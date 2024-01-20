import * as React from "react";
import Catalogs from "./index";
import ProfileLinking from "./index";
import AdminProfileLinkingIndex from "./Admin";
import useAuthStore from "../../../store/userstore";



export default function ProfileLinkingPage() {
    const { userType, setUserType } = useAuthStore()

    return (
        <>
            {userType !== "User" ? <AdminProfileLinkingIndex /> : <ProfileLinking />}
        </>
    )
}