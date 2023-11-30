// AddProduct.tsx
import React, { useState, useEffect } from 'react';
import { addProduct, fetchCategories, fetchManufacturers } from '../../api/apiService';
import { Category, Manufacturer } from '../../assets/types';
import { useAuth } from '../../hooks/useApi';
import Button from '../../components/atoms/Button/Button';
import {StyledFileInput, StyledSelect, FormWrapper} from './addProduct.styles';
import FormField from '../../components/molecules/formField/FormField';
const AddProduct = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const { user } = useAuth();
  const [selectedManufacturer, setSelectedManufacturer] = useState<number>(0);
  const [productData, setProductData] = useState({
    model: '',
    price: 0,
    description: '',
    size: '',
    color: '',
  });
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    const loadInitialData = async () => {
      const categoriesData = await fetchCategories();
      const manufacturersData = await fetchManufacturers();
      setCategories(categoriesData);
      setManufacturers(manufacturersData);
    };

    loadInitialData();
  }, []);

  const handleInputChange  = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(parseInt(e.target.value));
  };

  const handleManufacturerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedManufacturer(parseInt(e.target.value));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
        setFiles(Array.from(e.target.files));
      }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Pobierz userId z hooka useAuth
    const userId = user ? user.id : null; // Zakładając, że user ma pole 'id'

    if (userId) {
      try {
        console.log(files);
        await addProduct(userId, selectedCategory, selectedManufacturer, productData, files);
        alert('Product added successfully');
        // Opcjonalnie resetuj stan po dodaniu produktu
      } catch (error) {
        console.error('Error adding product:', error);
        alert('Error adding product');
      }
    } else {
      alert('User ID is not available. Please log in.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
        <FormWrapper>
        <StyledSelect onChange={handleCategoryChange} value={selectedCategory}>
        <option value="0">Wybierz kategorię</option>
        {categories.map(category => (
          <option key={category.id} value={category.id}>{category.categoryName}</option>
        ))}
      </StyledSelect>

      <StyledSelect onChange={handleManufacturerChange} value={selectedManufacturer}>
        <option value="0">Wybierz markę</option>
        {manufacturers.map(manufacturer => (
          <option key={manufacturer.id} value={manufacturer.id}>{manufacturer.manufacturerName}</option>
        ))}
      </StyledSelect>
      <StyledFileInput type="file" accept="image/jpeg" multiple onChange={handleFileChange} />
      <FormField 
          id="model" 
          labelText="Model" 
          type="text" 
          value={productData.model} 
          onChange={handleInputChange} 
          name="model"
        />

        <FormField 
          id="price" 
          labelText="Cena" 
          type="text" 
          value={productData.price.toString()} 
          onChange={handleInputChange} 
          name="price"
        />

        <FormField 
          id="description" 
          labelText="Opis" 
          type="text" 
          value={productData.description} 
          onChange={handleInputChange} 
          name="description"
        />

        <FormField 
          id="size" 
          labelText="Rozmiar" 
          type="text" 
          value={productData.size} 
          onChange={handleInputChange} 
          name="size"
        />

        <FormField 
          id="color" 
          labelText="Kolor" 
          type="text" 
          value={productData.color} 
          onChange={handleInputChange} 
          name="color"
        />

      </FormWrapper>
      <Button type="submit">Dodaj produkt </Button>
      
    </form>
  );
};

export default AddProduct;
