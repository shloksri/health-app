import React, { createContext, useState, useEffect } from 'react';
import { account } from '../appwrite/config';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const getCurrentUser = async () => {
            try {
                const user = await account.get();
                setUser(user);
            } catch (error) {
                setUser(null);
            }
        };
        getCurrentUser();
    }, []);

    const login = async (email, password) => {
        try {
            await account.createEmailSession(email, password);
            const user = await account.get();
            setUser(user);
        } catch (error) {
            console.error('Login Failed', error);
        }
    };

    const logout = async () => {
        await account.deleteSession('current');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
