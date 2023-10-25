import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../LoginForm/LoginForm.css';

const LoginForm: React.FC = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (login.trim() === '' || password.trim() === '') {
      setError('Wszystkie pola są wymagane');
      return;
    }

    if (login.length < 4 || password.length < 4) {
      setError('Login i hasło muszą mieć co najmniej 4 znaki');
      return;
    }
    try {
      const response = await fetch('http://localhost:8080/api/auth/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login: login, passwd: password }),
      });

      if (response.status === 200) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        setError(''); 
        console.log('Zalogowano pomyślnie');
      } else {
        setError('Błąd logowania. Sprawdź swoje dane.');
      }
    } catch (error) {
      console.error('Błąd logowania:', error);
    }
  };

  return (
    <div>
      <>
        <div>
          <label className="emailtext">Login</label>
          <input
            type="text"  // Zmieniamy na type="text" zamiast "email"
            placeholder="Wprowadź swój login"  // Zmieniamy na "login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
        </div>
        <div>
          <label className="haslotext">Hasło</label>
          <input
            type="password"
            placeholder="Wprowadź swoje hasło"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="zalogujbutton" onClick={handleLogin}>
          Zaloguj
        </button>
        <div className="rejestracja-div">
          Nie masz jeszcze konta?{' '}
          <Link to="/register">
            <button type="button" className="zarejestrujbutton">
              Zarejestruj się
            </button>
          </Link>
        </div>
      </>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default LoginForm;
