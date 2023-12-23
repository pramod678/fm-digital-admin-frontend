import * as React from "react";
import AdminLabelIndex from "./Admin";
import Label from "./index";



export default function LabelPage() {
    const [admin, setAdmin] = React.useState(false);

    return (
        <>
            {true ? <AdminLabelIndex /> : <Label />}
        </>
    )
}