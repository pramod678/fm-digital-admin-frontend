import * as React from "react";
import Catalogs from "./index";
import ProfileLinking from "./index";
import AdminProfileLinkingIndex from "./Admin";



export default function ProfileLinkingPage() {
    const [admin, setAdmin] = React.useState(false);

    return (
        <>
            {true ? <AdminProfileLinkingIndex /> : <ProfileLinking />}
        </>
    )
}