import React, { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/Api';
import UsersService from '../../services/Users';
import UserLoginRequest from '../../services/Users/dtos/requests/UserLoginRequest';
import UserPayloadLoginReponse from '../../services/Users/dtos/responses/UserPayloadLoginReponse';
import AuthContextModel from './models/AuthContextModel';

const AuthContext = createContext<AuthContextModel>({} as AuthContextModel);

interface Props {
    children: ReactNode
}

export const AuthProvider = ({ children }: Props) => {
    const navigate = useNavigate();

    const [user, setUser] = useState<UserPayloadLoginReponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const start = useCallback(() => {
        setLoading(true);
        const storagedUser = sessionStorage.getItem('@App:user');
        const storagedToken = sessionStorage.getItem('@App:token');

        if (storagedToken && storagedUser) {
            setUser(JSON.parse(storagedUser));
            api.defaults.headers['Authorization'] = `Bearer ${storagedToken}`;
        }

        setLoading(false);
    }, []);

    useEffect(() => {
        start();
    }, [start]);

    const login = useCallback(async (request: UserLoginRequest) => {
        try {
            // const response = await UsersService.login(request);

            const user = {
                name: 'Kevelyn'
            };

            const response = {
                token: '87r3hfhu8wehhiu2nudhf2wfi2ehh2u',
                user: user,
            };

            api.defaults.headers['Authorization'] = `Bearer ${response.token}`;
            sessionStorage.setItem('@App:user', JSON.stringify(response.user));
            sessionStorage.setItem('@App:token', response.token);
            navigate('/', { replace: true });
            setUser(response.user);
        } catch (error) {
            alert(error);
        }
    }, []);

    const logout = useCallback(() => {
        setUser(null);
        sessionStorage.removeItem('@App:user');
        sessionStorage.removeItem('App:token');
        navigate('/login', { replace: true });
    }, []);

    return (
        <AuthContext.Provider value={{ signed: !!user, user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    const context = useContext(AuthContext);
    return context;
}