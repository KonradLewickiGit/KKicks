import React, { useState } from 'react';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    login: '',
    passwd: '',
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
  });
  const [errors, setErrors] = useState({
    login: '',
    passwd: '',
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Walidacja na bieżąco
    validateField(name, value);
  };

  const validateField = (name: string, value: string) => {
    if (value.trim() === '') {
      setErrors({ ...errors, [name]: `${name} jest wymagane` });
      return false;
    }
  
    switch (name) {
      case 'login':
        if (value.length < 5) {
          setErrors({ ...errors, [name]: 'Login musi mieć co najmniej 5 znaków.' });
          return false;
        }
        break;
  
      case 'passwd':
        if (value.length < 8) {
          setErrors({ ...errors, [name]: 'Hasło musi mieć co najmniej 8 znaków.' });
          return false;
        }
        break;
  
      case 'email':
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
          setErrors({ ...errors, [name]: 'Niepoprawny format adresu email' });
          return false;
        }
        break;
  
      case 'firstName':
      case 'lastName':
        if (value.length < 2 || !/^[A-Z][a-zA-Z]*$/.test(value)) {
          setErrors({ ...errors, [name]: 'Imię i nazwisko muszą zaczynać się z dużej litery.' });
          return false;
        }
        break;
  
      case 'phoneNumber':
        if (!/^\d{9}$/.test(value)) {
          setErrors({ ...errors, [name]: 'Numer telefonu musi składać się z 9 cyfr.' });
          return false;
        }
        break;
  
      default:
        return true;
    }
  
    setErrors({ ...errors, [name]: '' });
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const registrationData = {
      login: formData.login,
      passwd: formData.passwd,
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      phoneNumber: formData.phoneNumber,
    };

    try {
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      });

      if (response.status === 200) {
        // Rejestracja zakończona sukcesem, możesz wykonać jakieś akcje, np. przekierowanie na inną stronę
        console.log('Rejestracja zakończona sukcesem');
      } else {
        // Obsłuż błąd rejestracji, np. wyświetl komunikat użytkownikowi
        console.error('Błąd rejestracji');
      }
    } catch (error) {
      console.error('Błąd rejestracji:', error);
    }
  };

  return (
    <div>
      <h2>Rejestracja</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Login:</label>
          <input
            type="text"
            name="login"
            value={formData.login}
            onChange={handleChange}
          />
          {errors.login && <span className="error-message">{errors.login}</span>}
        </div>
        <div>
          <label>Hasło:</label>
          <input
            type="password"
            name="passwd"
            value={formData.passwd}
            onChange={handleChange}
          />
          {errors.passwd && <span className="error-message">{errors.passwd}</span>}
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>
        <div>
          <label>Imię:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          {errors.firstName && <span className="error-message">{errors.firstName}</span>}
        </div>
        <div>
          <label>Nazwisko:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          {errors.lastName && <span className="error-message">{errors.lastName}</span>}
        </div>
        <div>
          <label>Numer telefonu:</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
        </div>
        <button type="submit">Zarejestruj</button>
      </form>
    </div>
  );
};

export default RegisterForm;
