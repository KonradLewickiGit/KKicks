import React, { useEffect, useState } from 'react';
import { fetchProductsByManufacturer, fetchProductImagesNames, loadProductImage } from '../../../api/apiService';
import { Product } from '../../../assets/types';
import { useNavigate } from 'react-router-dom';
import { StyledImage } from '../../atoms/Image/Image.styled';
import { ManufacturerProductsWrapper, ManufacturerProductItem } from './HomeManufactuters.styles';

const HomeManufacturers = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productImages, setProductImages] = useState<{ [key: number]: string }>({});
  const manufacturerId = 3; // Stała wartość dla producenta o id=3
  const navigate = useNavigate();

  useEffect(() => {
    const loadManufacturerProducts = async () => {
      try {
        const fetchedProducts = await fetchProductsByManufacturer(3);
        setProducts(fetchedProducts.slice(0, 3)); // Pobierz tylko pierwsze 3 produkty

        for (const product of fetchedProducts.slice(0, 3)) {
          const imageNames = await fetchProductImagesNames(product.id);
          if (imageNames.length > 0) {
            const imageUrl = await loadProductImage(imageNames[0].path);
            setProductImages(prevImages => ({ ...prevImages, [product.id]: imageUrl }));
          }
        }
      } catch (error) {
        console.error('Błąd podczas pobierania produktów producenta:', error);
      }
    };

    loadManufacturerProducts();
  }, []);

  return (
    <ManufacturerProductsWrapper>
      {products.map(product => (
        <ManufacturerProductItem key={product.id} onClick={() => navigate(`/productdetails/${product.id}`)}>
          {productImages[product.id] && (
            <StyledImage src={productImages[product.id]} alt="Product" />
          )}
          Model: {product.model}, Cena: {product.price} zł
        </ManufacturerProductItem>
      ))}
    </ManufacturerProductsWrapper>
  );
};

export default HomeManufacturers;
