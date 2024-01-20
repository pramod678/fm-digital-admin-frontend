import * as React from "react";
import ManageArtist from "./index";
import AdminManageArtistIndex from "./Admin";
import useAuthStore from "../../store/userstore";



export default function ManageArtistPage() {
    const { userType, setUserType } = useAuthStore()

    return (
        <>
            {userType !== "User" ? <AdminManageArtistIndex /> : <ManageArtist />}
        </>
    )
}