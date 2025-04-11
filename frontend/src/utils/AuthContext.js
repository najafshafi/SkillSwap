import React, { createContext, useState, useContext, useEffect } from 'react';
import { authApi, userApi } from './api';
import { useNavigate } from 'react-router-dom';

// Create auth context
const AuthContext = createContext();

// Auth provider component
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Fetch user profile
    const fetchUserProfile = async () => {
        try {
            const userData = await userApi.getProfile();


            setUser(userData);
            return userData;
        } catch (error) {
            console.error('Failed to fetch user profile:', error);
            // If token is invalid, log out
            handleLogout();
            return null;
        }
    };

    // Check if user is authenticated on mount
    useEffect(() => {
        const checkAuth = async () => {
            const authStatus = authApi.isAuthenticated();
            setIsAuthenticated(authStatus);

            if (authStatus) {
                await fetchUserProfile();
            }

            setLoading(false);
        };

        checkAuth();
    }, []);

    // Login function
    const handleLogin = async (email, password) => {
        try {

            const data = await authApi.login(email, password);


            if (data.token) {

                // Store authentication data
                localStorage.setItem('token', data.token);
                localStorage.setItem('isAuthenticated', 'true');

                // Update auth state
                setIsAuthenticated(true);

                // Fetch user data after login
                await fetchUserProfile();

                // Navigate to home page after successful login

                navigate('/home');

                return { success: true };
            } else {

                return { success: false, message: 'Invalid response from server' };
            }
        } catch (error) {
            console.error('AuthContext: Login error:', error);
            return { success: false, message: error.message || 'Invalid credentials' };
        }
    };

    // Signup function
    const handleSignup = async (userData) => {
        try {
            const response = await authApi.signup(userData);
            return { success: true, data: response };
        } catch (error) {
            console.error('Signup error:', error);
            return { success: false, message: error.message || 'Registration failed' };
        }
    };

    // Logout function
    const handleLogout = () => {
        authApi.logout();
        setIsAuthenticated(false);
        setUser(null);
        navigate('/login');
    };

    // Value object to be provided to consumers
    const value = {
        isAuthenticated,
        user,
        loading,
        login: handleLogin,
        signup: handleSignup,
        logout: handleLogout,
        fetchUserProfile
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext; 