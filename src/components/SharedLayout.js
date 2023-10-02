import Navbar from './NavBar';
import SideBar from './Sidebar/SideBar';
import "../Styles/SharedLayout.css"
import { Outlet } from 'react-router-dom';


const SharedLayout = () => {
    return (
        <>
            <div className="layoutcontainer">
                <div className="layoutSideBar">
                    <SideBar />
                </div>
                <div className="layoutNavbar">
                    <div className="">
                        <Navbar />
                    </div>
                    <div className="layoutMain">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}
export default SharedLayout;
