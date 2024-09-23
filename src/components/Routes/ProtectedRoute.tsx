import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { GetTokenValidateApi } from '../../api/authentication';
import * as React from 'react';
import { BounceLoader } from 'react-spinners';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const token = React.useMemo(() => localStorage.getItem('token'), []);
    const navigate = useNavigate();
    const [isVerified, setIsVerified] = useState(true);
    const { data: GetTokenValidate, isLoading } = GetTokenValidateApi(navigate, setIsVerified, token);

    if (isLoading) {
        return <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-100">
            <BounceLoader size={150} color={"#000000"} />
        </div>
    }

    if (token && GetTokenValidate?.data?.data?.users_id) {
        // Token is present and verified, render protected content
        return <>{children}</>;
    }

    return <Navigate to="/sign-in" />;
};

export default ProtectedRoute;
