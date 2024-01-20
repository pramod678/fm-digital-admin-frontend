import * as React from "react";
import AdminLabelIndex from "./Admin";
import Label from "./index";
import useAuthStore from "../../store/userstore";



export default function LabelPage() {
    const { userType, setUserType } = useAuthStore()

    return (
        <>
            {userType !== "User"  ? <AdminLabelIndex /> : <Label />}
        </>
    )
}