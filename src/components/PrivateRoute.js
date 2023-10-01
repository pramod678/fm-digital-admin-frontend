import { Route, Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
    const isLoggedIn = window.localStorage.getItem("loggedIn");
    return isLoggedIn ? children : <Navigate to="/sign-in" />;
}
