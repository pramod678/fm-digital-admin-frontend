import * as React from "react";
import YouTubeClaims from "./index";
import Tickets from "./index";
import AdminTicketsIndex from "./Admin";



export default function TicketsPage() {
    const [admin, setAdmin] = React.useState(false);

    return (
        <>
            {true ? <AdminTicketsIndex /> : <Tickets />}
        </>
    )
}