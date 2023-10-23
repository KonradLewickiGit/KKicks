import React, { useEffect, useState } from 'react';
import '../Manufactures/Manufactures.css';

interface Manufacturer {
  id: number;
  manufacturerName: string;
}

const Manufacturers: React.FC = () => {
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);

  useEffect(() => {
    // Wyślij żądanie GET do serwera backendowego, aby pobrać wszystkie marki
    fetch('http://localhost:8080/manufacturer/findAll')
      .then(response => response.json())
      .then(data => {
        console.log('Odpowiedź z serwera:', data);
        setManufacturers(data);
      })
      .catch(error => console.error('Błąd podczas żądania do backendu:', error));
  }, []);

  return (
    <div>
      <div className="manufacturer-list">
      {manufacturers.map(manufacturer => (
        <div key={manufacturer.id} className="manufacturer-item">
          {manufacturer.manufacturerName}
        </div>
      ))}
    </div>
    </div>
  );
};

export default Manufacturers;
