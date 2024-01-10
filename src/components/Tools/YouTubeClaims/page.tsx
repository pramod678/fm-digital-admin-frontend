import * as React from "react";
import AdminYouTubeClaimsIndex from "./Admin";
import YouTubeClaims from "./index";



export default function YouTubeClaimsPage() {
    const [admin, setAdmin] = React.useState(false);

    return (
        <>
            {true ? <AdminYouTubeClaimsIndex /> : <YouTubeClaims />}
        </>
    )
}