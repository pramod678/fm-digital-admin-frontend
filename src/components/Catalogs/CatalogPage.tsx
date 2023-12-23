import * as React from "react";
import Catalogs from "./index";
import AdminCatalogsList from "./AdminCatalogsList";



export default function CatalogsPage(){
    const [admin, setAdmin] = React.useState(false);
    
    return(
        <>
            {true ? <AdminCatalogsList /> : <Catalogs />}
        </>
    )
}