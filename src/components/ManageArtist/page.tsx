import * as React from "react";
import ManageArtist from "./index";
import AdminManageArtistIndex from "./Admin";



export default function ManageArtistPage() {
    const [admin, setAdmin] = React.useState(false);

    return (
        <>
            {true ? <AdminManageArtistIndex /> : <ManageArtist />}
        </>
    )
}