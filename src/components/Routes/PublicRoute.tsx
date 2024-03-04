import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { GetTokenValidateApi } from '../../api/authentication';
import * as React from 'react';
import { BounceLoader } from 'react-spinners';

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [isVerified, setIsVerified] = useState(true);
    const { mutate: GetTokenValidate, isLoading } = GetTokenValidateApi(navigate, setIsVerified);

    useEffect(() => {
        if (token) {
            GetTokenValidate({ token });
        }
    }, [ ]);

    if (isLoading) {
        return 
    }

    if (token && isVerified) {
        return <Navigate to="/" />;
    }

    return <>{children}</>;
};

export default PublicRoute;
