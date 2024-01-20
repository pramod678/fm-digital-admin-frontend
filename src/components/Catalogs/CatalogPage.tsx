import * as React from "react";
import Catalogs from "./index";
import AdminCatalogsList from "./AdminCatalogsList";
import useAuthStore from "../../store/userstore";



export default function CatalogsPage(){
    const { userType, setUserType } = useAuthStore()

    
    return(
        <>
            {userType !== "User"  ? <AdminCatalogsList /> : <Catalogs />}
        </>
    )
}