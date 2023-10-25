import React from 'react';
import './HeaderLogo.css'; // Zaimportuj poprawny plik CSS z nowymi nazwami klas
import { Link } from 'react-router-dom';

const HeaderLogo: React.FC = () => {
  return (
    <header className="custom-logged-in-header"> {/* Zmieniona klasa CSS */}
      <div className="custom-header-center"> {/* Zmieniona klasa CSS */}
        <div className="custom-logo"> {/* Zmieniona klasa CSS */}
        <Link to="/register">
          <h1>K&Kicks</h1>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default HeaderLogo;
