import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { GetTokenValidateApi } from '../../lib/endpoint';
import * as React from 'react';
import { BounceLoader } from 'react-spinners';

interface PublicRouteProps {
    children: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isVerified, setIsVerified] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        const validateToken = async () => {
            if (!token) {
                setIsLoading(false);
                return;
            }

            try {
                const response = await GetTokenValidateApi(navigate, setIsVerified, token);
                if (response?.data?.data?.users_id) {
                    setIsVerified(true);
                }
            } catch (error) {
                console.error('Token validation error:', error);
                setIsVerified(false);
            } finally {
                setIsLoading(false);
            }
        };

        validateToken();
    }, [token, navigate]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <BounceLoader color="#36d7b7" />
            </div>
        );
    }

    if (token && isVerified) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

export default PublicRoute;