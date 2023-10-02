import { Navigate,  } from 'react-router-dom';

export default function PublicRoute({ children }) {
    const isLoggedIn = window.localStorage.getItem("loggedIn");
    return isLoggedIn ? children : <Navigate to="/" />;
}