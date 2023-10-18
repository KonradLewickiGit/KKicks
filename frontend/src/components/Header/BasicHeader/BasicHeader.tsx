
import React, { useState } from 'react';
import LoggedInHeader from '../LoggedInHeader/LoggedInHeader';
import LoggedOutHeader from '../LoggedOutHeader/LoggedOutHeader';
import HeaderLogo from '../HeaderLogo/HeaderLogo';
import LoginForm from '../../LoginForm/LoginForm';
import { useLocation } from 'react-router-dom';
import CategoryList from '../../Categories/CategoryList';

const BasicHeader = () => {
  // Załóżmy, że mamy stan isLoggedIn, który określa, czy użytkownik jest zalogowany
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const isOnLoginPage = location.pathname === '/login';

  return (
    <div>
      {isOnLoginPage ? (
        <HeaderLogo /> // Jeśli użytkownik jest na ścieżce /login, wyświetl HeaderLogo
      ) : isLoggedIn ? (
        <LoggedInHeader />
      ) : (
        <>
          <LoggedOutHeader />
          <CategoryList /> {/* Wyświetl CategoryList na stronie głównej */}
        </>
      )}
    </div>
  );
};

export default BasicHeader;
