import * as React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }: { children: any }) {
    // const isLoggedIn = window.localStorage.getItem("loggedIn");
    const token = localStorage.getItem("token")
    return token ? children : <Navigate to="/sign-in" />;
}   