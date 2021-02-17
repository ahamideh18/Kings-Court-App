import { useState, useContext, useEffect } from "react";
import { useMutation } from 'react-query'
import axios from 'axios'

import { authContext } from './AuthProvider'

axios.interceptors.request.use(
    config => {
        const { origin } = new URL(config.url);
        const allowedOrigins = ['http://localhost:3000/api'];
        const token = localStorage.getItem('token');
        if (allowedOrigins.includes(origin)) {
            config.headers.authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export const useAuth = () => {
    return useContext(authContext);
};

export const useProvideAuth = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    const signin = async (username, password) => {
        try {
            const { data } = await axios.post(
                'http://localhost:4000/api/user/signin',
                { username, password },
                { withCredentials: true, credentials: 'include' },
            )
            localStorage.setItem('token', data);
            setUser(data)
            return data
        }
        catch (Err) {
            setError(Err)
        }
    };

    const signup = (email, password, username) => {
        return
    };

    const checkAuth = async () => {
        try {
            const checkResponse = await axios.get(
                'http://localhost:4000/api/user/checkAuth',
                { withCredentials: true, credentials: 'include' },
            )
            setUser(checkResponse)
            return checkResponse
        }
        catch (Err) {
            setError(Err)
        }
    };

    const signout = async () => {
        try {
            await axios.get(
                'http://localhost:3000/api/user/logout',
                { withCredentials: true, credentials: 'include' },
            )
            setUser(null)
        }
        catch (Err) {
            setError(Err)
        }
    };

    return {
        user,
        error,
        signin,
        signup,
        signout,
        checkAuth
    };
}