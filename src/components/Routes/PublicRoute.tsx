import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { GetTokenValidateApi } from '../../api/authentication';
import * as React from 'react';
import { BounceLoader } from 'react-spinners';

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
    const token = React.useMemo(() => localStorage.getItem('token'), []);
    const navigate = useNavigate();
    const [isVerified, setIsVerified] = useState(true);
    const { data: GetTokenValidate, isLoading } = GetTokenValidateApi(navigate, setIsVerified, token);

    if (isLoading) {
        return
    }

    if (token && GetTokenValidate?.data?.data?.users_id) {
        return <Navigate to="/" />;
    }

    return <>{children}</>;
};

export default PublicRoute;
