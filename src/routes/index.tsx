import React from 'react';
import AuthRoutes from './Auth';
import AppRoutes from './App';
import { useAuth } from '../contexts/Auth';
import Layout from '../components/Layout';

const Routes = () => {
    const { signed, loading } = useAuth();

    if (loading)
        return (
            <React.Fragment></React.Fragment>
        );

    return signed
        ? (
            <Layout>
                <AppRoutes />
            </Layout>
        )
        : (
            <AuthRoutes />
        );
};

export default Routes;