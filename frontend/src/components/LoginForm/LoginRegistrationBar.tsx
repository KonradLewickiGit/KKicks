import React from 'react';
import LoginForm from './LoginForm';
import '../LoginForm/LoginForm.css';
import HeaderLogo from '../Header/HeaderLogo/HeaderLogo';
const Log = () => {
    const handleLoginSuccess = () => {
        // Ta funkcja zostanie wywołana po pomyślnym zalogowaniu
        // Możesz dodać tutaj odpowiednią logikę, np. przekierowanie do innej strony
        console.log('Zalogowano pomyślnie');
      };
    
      return (
      <div className="login-container">
      <button className="logowanie-button">Logowanie</button>
      <button className="rejestracja-button">Rejestracja</button>
      <LoginForm onLoginSuccess={handleLoginSuccess} />

    </div>
  );
};

export default Log;
