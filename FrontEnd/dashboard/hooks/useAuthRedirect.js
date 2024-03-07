import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import Router from 'next/router';

export const useAuthRedirect = () => {
    const { isAuthenticated, isLoading } = useAuth();

    useEffect(() => {

        console.log('isLoading', isLoading)
        console.log('isAuthenticated', isAuthenticated)
        if (!isLoading && !isAuthenticated) {
            console.log('redirecionou pro login')
            Router.push('/login');
        }
    }, [isAuthenticated, isLoading]);
};
