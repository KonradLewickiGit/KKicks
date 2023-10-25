import React, { useState } from 'react';
import SearchBar from '../SearchingBar/SearchingBar';
const LoggedInHeader = () => {
    return (
      <header className="logged-in-header">
        <div className="header-left">
          <div className="logo">
            <h1>K&Kicks zalogowany</h1>
          </div>

          <div className="search-bar">
            <SearchBar />
          </div>
        </div>
        <div className="header-right">
        </div>
      </header>
    );
  };
  
  export default LoggedInHeader;
