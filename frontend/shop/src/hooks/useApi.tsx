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
        navigate('/');
      } else {
        // Obsługa sytuacji, gdy token jest undefined
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
      // Zakładając, że token jest zwracany w odpowiedzi
      const token = response.data.token;
      if (token) {
      localStorage.setItem('token', token);
      setUser(response.data.user); // Ustawienie stanu użytkownika
    } else {
      // Obsługa sytuacji, gdy token nie jest zwracany
      setError("Rejestracja powiodła się, ale nie otrzymano tokenu.");
    }
    } catch (error: any) {
      if (error.response) {
        // Obsługa błędów odpowiedzi HTTP
        setError(error.response.data.message);
      } else if (error.request) {
        // Obsługa błędów związanych z brakiem odpowiedzi
        setError("Brak odpowiedzi od serwera.");
      } else {
        // Obsługa innych błędów
        setError("Wystąpił błąd podczas rejestracji.");
      }
    }
  }

  return (
    <ApiContext.Provider value={{ user, signIn, signOut, signUp, error}}>
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