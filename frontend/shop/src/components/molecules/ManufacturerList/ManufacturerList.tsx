// ManufacturerList.tsx
import React, { useEffect, useState } from 'react';
import { fetchManufacturers } from '../../../api/apiService';
import { Manufacturer, ManufacturerListProps } from '../../../assets/types';
import { ManufacturerListContainer, ManufacturerItem } from './ManufacturerList.styles';
const ManufacturerList: React.FC<ManufacturerListProps> = ({ onManufacturerSelect }) => {
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);

  useEffect(() => {
    const loadManufacturers = async () => {
      try {
        const fetchedManufacturers = await fetchManufacturers();
        setManufacturers(fetchedManufacturers);
      } catch (error) {
        console.error('Error fetching manufacturers:', error);
      }
    };

    loadManufacturers();
  }, []);

  return (
    <ManufacturerListContainer>
      {manufacturers.map(manufacturer => (
        <ManufacturerItem key={manufacturer.id} onClick={() => onManufacturerSelect(manufacturer.id)}>
        {manufacturer.name}
      </ManufacturerItem>
        
      ))}
    </ManufacturerListContainer>
  );
};

export default ManufacturerList;
