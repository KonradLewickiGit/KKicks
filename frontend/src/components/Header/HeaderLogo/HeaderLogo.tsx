import React from 'react';
import './HeaderLogo.css'; // Zaimportuj poprawny plik CSS z nowymi nazwami klas

const HeaderLogo: React.FC = () => {
  return (
    <header className="custom-logged-in-header"> {/* Zmieniona klasa CSS */}
      <div className="custom-header-center"> {/* Zmieniona klasa CSS */}
        <div className="custom-logo"> {/* Zmieniona klasa CSS */}
          <h1>K&Kicks</h1>
        </div>
      </div>
    </header>
  );
};

export default HeaderLogo;
