
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
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
            <div className="flex justify-between items-center px-2 py-3 bg-black">

                <div className='flex items-center'>
                    <h3 className="text-white text-2xl sm:text-xl md:text-2xl lg:text-3xl capitalize"> {location.pathname.substring(1) === '' ? "Dashboard" : `About ${location.pathname.substring(1) }`}</h3>
                </div>

                <div className="flex items-center gap-1">
                    <Link to="/userDetails" className="no-underline text-black">
                        <div
                            className="flex items-center gap-1 bg-gray-200 border-none rounded cursor-pointer px-1 py-1 mr-5"
                        >
                            <FaUserCircle />
                            <span className="hidden sm:inline">Name</span>
                        </div>
                    </Link>

                    <div>
                        <button
                            type="button"
                            className="flex items-center gap-1 bg-white text-black border-none ml-2 rounded px-1 py-1 cursor-pointer"
                            onClick={logOut}
                        >
                            <FaSignOutAlt />
                            <span className="hidden sm:inline">logout</span>
                        </button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Navbar;