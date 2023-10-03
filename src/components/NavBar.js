
import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const logOut = () => {
        localStorage.clear();
        navigate('/sign-in');
    };
    return (
        <>
            <div className="flex justify-end items-center px-2 py-3 bg-[rgb(20,20,20)]">
                <div className="flex items-center gap-1 cursor-pointer">
                    <Link to="/userDetails" className="no-underline text-black">
                        <FaUserCircle color={'#ffffff'} size={20} />
                    </Link>
                    <div>
                        <span className="ml-1 text-white cursor-pointer" onClick={logOut}>Logout</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar;