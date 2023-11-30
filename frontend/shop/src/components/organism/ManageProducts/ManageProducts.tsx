import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../../../api/apiService';
import { Product } from '../../../assets/types';
import styled from 'styled-components';
import { setProductVerification, deleteProductById } from '../../../api/apiService';
import { StyledButton, ManagementWrapper, Row } from '../../molecules/ManageAdmin/ManageAdmin.styles';
import { useNavigate } from 'react-router-dom';

const ManageProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    loadProducts();
  }, []);


  const handleSetProductVerification = async (productId: number) => {
  try {
    const updatedProduct = await setProductVerification(productId);
    setProducts(products.map(product => 
      product.id === productId 
        ? { ...product, isVerified: updatedProduct.isVerified } // Aktualizacja statusu weryfikacji
        : product
    ));
  } catch (error) {
    console.error('Error setting product verification:', error);
  }
};
const handleDeleteProduct = async (productId: number) => {
    try {
      await deleteProductById(productId);
      setProducts(products.filter(product => product.id !== productId)); // Usuwa produkt ze stanu
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
const handleProductClick = (productId: number) => {
    navigate(`/productdetails/${productId}`);
  };
  return (
    <ManagementWrapper>
      <h1>Zarządzanie produktami</h1>
      {products.map(product => (
        <Row key={product.id}>
           <p style={{ cursor: 'pointer', fontWeight: 'bold' }} onClick={() => handleProductClick(product.id)}>
            Model: {product.model}
            </p>
          <p>Cena: {product.price} zł</p>
          <p>Rozmiar: {product.size}</p>
          <p>Kolor: {product.color}</p>
          <p>Opis: {product.description}</p>
          <p>Status: {product.isVerified === 'VERIFIED' ? 'Zweryfikowany' : 'Niezweryfikowany'}</p>
            <StyledButton onClick={() => handleSetProductVerification(product.id)}>
                Zweryfikuj
            </StyledButton>
            <StyledButton onClick={() => handleDeleteProduct(product.id)}>
            Usuń
          </StyledButton>
        
        </Row>
      ))}
    </ManagementWrapper>
  );
};

export default ManageProducts;
