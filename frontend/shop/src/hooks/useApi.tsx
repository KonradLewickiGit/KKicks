import React, { ReactNode, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { User, LoginData, ApiContextType } from '../assets/types'
import AxiosApi from '../axios.config'

interface Props {
  children: ReactNode
}

const ApiContext = React.createContext<ApiContextType | undefined>(undefined)

export const ApiProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState<string>('')
  const navigate = useNavigate()
  const updateUser = (updatedUser: User): void => {
    setUser(updatedUser);
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      (async () => {
        try {
          const response = await AxiosApi.get('/user/find', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          console.log("Odpowiedź serwera:", response);
          setUser(response.data);
        } catch (e) {
          console.log(e);
        }
      })();
    }
  }, []);
  

  const signIn = async (formData: LoginData): Promise<void> => {
    try {
      const response = await AxiosApi.post('/api/auth/authenticate', formData)
      const token = response.data.token;
      if (token) {
        localStorage.setItem('token', token);
        setUser(response.data.user);
        console.log("zalogowano pomyslnie");
      } else {
        setError("Logowanie powiodło się, ale nie otrzymano tokenu.");
      }
    } catch (error: any) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.message)
      }
    }
  }

  const signOut = (): void => {
    setUser(null)
    localStorage.removeItem('token')
  }

  const signUp = async (formData: LoginData): Promise<void> => {
    try {
      const response = await AxiosApi.post('/api/auth/register', formData);
      const token = response.data.token;
      if (token) {
        localStorage.setItem('token', token);
        setUser(response.data.user); 
      } else {
        setError("Rejestracja powiodła się, ale nie otrzymano tokenu.");
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 
                           error.request ? "Brak odpowiedzi od serwera." : 
                           "Wystąpił błąd podczas rejestracji.";
      setError(errorMessage);
    }
  }
  return (
    <ApiContext.Provider value={{ user, signIn, signOut, signUp, updateUser, error, }}>
      {children}
    </ApiContext.Provider>
  )
}

export const useAuth = () => {
  const auth = useContext(ApiContext)

  if (!auth) {
    throw Error('useAuth needs to be used inside AuthContext')
  }

  return auth
}