
import * as React from "react";
import useAuthStore from "../../../store/userstore";
import FinancialAdmin from "./index"
import Financial from "../index"



export default function FinancialPage() {
    const { userType, setUserType } = useAuthStore()

    return (
        <>
            {userType !== "User" ? <FinancialAdmin /> : <Financial />}
        </>
    )
}