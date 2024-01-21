import * as React from "react";
import ManageArtist from "./index";
import useAuthStore from "../../store/userstore";
import AdminManageArtistIndex from "./Admin/page";



export default function ManageArtistPage() {
    const { userType, setUserType } = useAuthStore()

    return (
        <>
            {userType !== "User" ? <AdminManageArtistIndex /> : <ManageArtist />}
        </>
    )
}