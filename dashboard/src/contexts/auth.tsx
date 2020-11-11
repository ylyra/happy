import { AxiosResponse } from 'axios';
import React, {createContext, useState, useEffect, useContext} from 'react';
import api from '../services/api'

interface User {
    name: string;
    email: string;
}

interface AuthContextData {
    signed:boolean; 
    user: User | null;
    login(data: any, awaysOn: boolean): Promise<void>
    reset(data: any): Promise<AxiosResponse<any>>
    logout(): void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        async function loadStoragedData() { 
            const storagedUser = localStorage.getItem('@Happy:user')
            const storagedToken = localStorage.getItem('@Happy:token')

            if(storagedUser && storagedToken) {
                setUser(JSON.parse(storagedUser))
                api.defaults.headers['Authorization'] = `Bearer ${storagedToken}`
            }
        }

        loadStoragedData()
    }, [])

    async function login(data: any, awaysOn: boolean) {       
      const response = await api.post('login', data)
      setUser(response.data.user);
      localStorage.setItem('@Happy:user', JSON.stringify(response.data.user))
      localStorage.setItem('@Happy:token', response.data.token)
      localStorage.setItem('@Happy:remember', String(awaysOn))
      api.defaults.headers['Authorization'] = `Bearer ${response.data.token}`
    }

    async function reset(data:any) {
        const response = await api.post('reset', data)
        return response
    }

    function logout() {
        setUser(null);
        localStorage.clear();
    }

    return (
        <AuthContext.Provider value={{ signed: !!user, user, login, reset, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext);
    return context;
}