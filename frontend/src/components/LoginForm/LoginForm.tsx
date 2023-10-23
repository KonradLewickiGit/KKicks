import React, { useState } from 'react';
//import '../LoginForm/LoginForm.css';

interface LoginFormProps {
  onLoginSuccess: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginComponent, setIsLoginComponent] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (email.trim() === '' || password.trim() === '') {
      setError('Wszystkie pola są wymagane');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Niepoprawny format adresu email');
      return;
    }

    if (password.length < 6) {
      setError('Hasło musi mieć co najmniej 6 znaków');
      return;
    }

    // Tutaj możesz umieścić swoją logikę logowania
    // Jeśli logowanie jest udane, ustaw isLoggedIn na true
    setIsLoggedIn(true);

    // Po zalogowaniu zmieniamy isLoginComponent na false
    setIsLoginComponent(false);

    // Wywołujemy funkcję onLoginSuccess, która może być przekazana z wyższego poziomu
    onLoginSuccess();
  };

  const isValidEmail = (email: string) => {
    // Prosta walidacja formatu adresu email (możesz dostosować złożoność walidacji według potrzeb)
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  return (
    <div>
      {isLoginComponent ? (
        <>
          <div>
            <label className="emailtext">Email</label>
            <input
              type="email"
              placeholder="Wprowadź swój email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <button type="submit" className="zalogujbutton"  onClick={handleLogin}>Zaloguj</button>
          <div className="rejestracja-div">
            Nie masz jeszcze konta?{' '}
            <button type="button" className="zarejestrujbutton" onClick={handleLogin} >Zarejestruj się</button>
          </div>
        </>
      ) : (
        // Komponent rejestracji (możesz dodać odpowiednią logikę)
        <>
          <div>
            <label>Email</label>
            <input
              type="email"
              placeholder="Wprowadź swój email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
            />
          </div>
          <div>
            <label>Hasło</label>
            <input
              type="password"
              placeholder="Wprowadź swoje hasło"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
            />
          </div>
       
        </>
      )}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default LoginForm;
