import React from 'react';
import {FaCog} from 'react-icons/fa'; // Importuj ikony z react-icons
import SearchBar from '../SearchingBar/SearchingBar';
import '../LoggedOutHeader/LoggedOutHeader.css';
import { Link } from 'react-router-dom';

const LoggedOutHeader = () => {
  return (
    <header className="logged-in-header">
      <div className="header-left">
        <div className="logo">
          <h1>K&Kicks</h1>
        </div>
        <div className="search-bar">
          <SearchBar />
        </div>
      </div>
      <div className="header-right">
        <button className="header-button">Koszyk</button>
        <button className="header-button">Pomoc</button>
        <button className="header-button"><FaCog /></button>
        <Link to="/register">
        <button className="header-button">Rejestracja</button>
        </Link>
        <Link to="/login">
        <button className="header-button">Logowanie</button>
        </Link>
      </div>
    </header>
  );
};

export default LoggedOutHeader;
