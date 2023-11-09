import * as React from 'react';
import { Navigate, } from 'react-router-dom';

export default function PublicRoute({ children }: { children: any }) {
    const isLoggedIn = window.localStorage.getItem("loggedIn");
    return !isLoggedIn ? children : <Navigate to="/" />;
}