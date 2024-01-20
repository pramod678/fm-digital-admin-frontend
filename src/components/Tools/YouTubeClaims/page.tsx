import * as React from "react";
import AdminYouTubeClaimsIndex from "./Admin";
import YouTubeClaims from "./index";
import useAuthStore from "../../../store/userstore";



export default function YouTubeClaimsPage() {
    const { userType, setUserType } = useAuthStore()

    return (
        <>
            {userType !== "User"  ? <AdminYouTubeClaimsIndex /> : <YouTubeClaims />}
        </>
    )
}