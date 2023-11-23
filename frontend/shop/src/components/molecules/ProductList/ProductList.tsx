// ProductList.tsx
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Product } from '../../../assets/types'; // Importuj interfejs Product
import { fetchProducts } from '../../../api/apiService'; // Zaimportuj funkcję fetchProducts
import { ProductListWrapper, ProductItem } from './ProductList.styles';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  const handleProductClick = (Id: number) => {
    navigate(`/productdetails/${Id}`);
  };

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Błąd podczas pobierania produktów:', error);
      }
    };

    loadProducts();
  }, []);

  return (
    <ProductListWrapper>
    {products.map(product => (
      <ProductItem key={product.id} onClick={() => handleProductClick(product.id)}>
        Model: {product.model}, {product.price} zł
      </ProductItem>
    ))}
  </ProductListWrapper>
  );
};

export default ProductList;
