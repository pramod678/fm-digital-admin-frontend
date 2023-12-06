import * as React from 'react';
import { Navigate, } from 'react-router-dom';

export default function PublicRoute({ children }: { children: any }) {
    const token = localStorage.getItem("token")
    return !token ? children : <Navigate to="/" />;
}