import { Route, Navigate, Outlet } from 'react-router-dom';

const PrivateRouteWrapper = ({ children }) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === "true";
    return isLoggedIn ? <Outlet/> : <Navigate to="/sign-in" />;
};

export default PrivateRouteWrapper