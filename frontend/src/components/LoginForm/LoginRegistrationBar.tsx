import React from 'react';
import LoginForm from './LoginForm';
import '../LoginForm/LoginForm.css';
import HeaderLogo from '../Header/HeaderLogo/HeaderLogo';
import { Link } from 'react-router-dom';
const Log = () => {
    const handleLoginSuccess = () => {
        // Ta funkcja zostanie wywołana po pomyślnym zalogowaniu
        // Możesz dodać tutaj odpowiednią logikę, np. przekierowanie do innej strony
        console.log('Zalogowano pomyślnie');
      };
    
      return (
      <div className="login-container">
      <button className="logowanie-button">Logowanie</button>
      <Link to="/register">
      <button className="rejestracja-button">Rejestracja</button>
      </Link>
      <LoginForm onLoginSuccess={handleLoginSuccess} />

    </div>
  );
};

export default Log;
