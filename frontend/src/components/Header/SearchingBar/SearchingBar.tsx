import React, { useState } from 'react';
import '../SearchingBar/SearchingBar.css';

const SearchingBar: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchValue('');
  };

  return (
    <div className="searching-bar">
      <input
        type="text"
        placeholder="Wyszukaj produkt..."
        value={searchValue}
        onChange={handleSearchChange}
      />
      {searchValue && (
        <button className="clear-button" onClick={handleClearSearch}>
          Wyczyść
        </button>
      )}
    </div>
  );
};

export default SearchingBar;
