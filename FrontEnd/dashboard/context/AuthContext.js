import { createContext, useContext, useState, useEffect } from 'react';
import Router from 'next/router';
import { login, fetchUserProfile } from '../services/api';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const user = await fetchUserProfile(token);
                setUser(user);
            } catch (error) {
                toast.error('Validação do token falhou');
                console.error("Token validation failed", error);
                localStorage.removeItem('token');
            }
        }
        setIsLoading(false);
    };
    initAuth();
  }, []);

  const handleLogin = async (email, senha) => {
    setIsLoading(true); // Inicia o carregamento
    try {
      const { token } = await login(email, senha);
      if (token) {
        localStorage.setItem('token', token);
        const user = await fetchUserProfile(token);
        setUser(user);
        Router.push('/dashboard');
      }
    } catch (error) {
      console.error("Login failed", error);
      toast.error('Login Falhou');
    } finally {
      setIsLoading(false); // Finaliza o carregamento
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    Router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, login: handleLogin, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
