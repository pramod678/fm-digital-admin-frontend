import * as React from "react";
import YouTubeClaims from "./index";
import Tickets from "./index";
import AdminTicketsIndex from "./Admin";
import useAuthStore from "../../store/userstore";



export default function TicketsPage() {
    const { userType, setUserType } = useAuthStore()

    return (
        <>
            {userType !== "User" ? <AdminTicketsIndex /> : <Tickets />}
        </>
    )
}