import * as React from "react";
import AddLabel from "./PopUps/AddLabel";
import { UserDataApi } from "../../api/releaseInfo";
import { useNavigate } from "react-router-dom";



export default function Index() {
    const navigate = useNavigate();
    const [userData, setUserData] = React.useState<any>("")
    const token = localStorage.getItem("token")
    const { mutate: getUserData, isLoading: isLoadinggetUserData } = UserDataApi(setUserData, navigate)

    React.useEffect(() => {
        getUserData({ token: token })
    }, []);

    return (
        <>
            <div className="p-4">
                <div className="w-1/2 bg-neutral-800 p-2">
                    <p className="text-white font-semibold ml-4 text-base sm:text-lg ">Add Label</p>
                </div>
                <div className="p-4">
                    <AddLabel userData={userData} />
                </div>
            </div>
        </>
    )
}