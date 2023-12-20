import { useContext } from 'react';
import { useAuth } from '../hooks/useApi'; // Zaimportuj hook useAuth
import { lightTheme, darkTheme } from '../assets/styles/theme'; // Importuj motywy

export const useUserTheme = () => {
  const { user } = useAuth();

  // Ustaw motyw na podstawie preferencji użytkownika
  return user?.browserMode === 'DARK' ? darkTheme : lightTheme;
};
