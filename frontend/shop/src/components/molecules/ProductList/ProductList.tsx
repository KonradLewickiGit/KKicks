// ProductList.tsx
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Product } from '../../../assets/types'; // Importuj interfejs Product
import { fetchProducts, fetchProductImagesNames, loadProductImage } from '../../../api/apiService'; // Zaimportuj funkcję fetchProducts
import { ProductListWrapper, ProductItem } from './ProductList.styles';
import { StyledImage } from '../../atoms/Image/Image.styled';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productImages, setProductImages] = useState<{ [key: number]: string }>({});
  const navigate = useNavigate();

  const handleProductClick = (Id: number) => {
    navigate(`/productdetails/${Id}`);
  };

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
        for (const product of fetchedProducts) {
          const imageNames = await fetchProductImagesNames(product.id);
          if (imageNames.length > 0) {
            const imageUrl = await loadProductImage(imageNames[0].path);
            setProductImages(prevImages => ({ ...prevImages, [product.id]: imageUrl }));
          }
        }
      } catch (error) {
        console.error('Błąd podczas pobierania produktów:', error);
      }
    };


    loadProducts();
  }, []);

  return (
    <ProductListWrapper>
   {products
        .filter(product => product.availability !== "SOLD") // Filtrowanie produktów, które nie są sprzedane
        .map(product => (
          <ProductItem key={product.id} onClick={() => handleProductClick(product.id)}>
            {productImages[product.id] && (
              <StyledImage src={productImages[product.id]} alt="Product" />
            )}
            <strong>{product.model}</strong> <strong>{product.price} zł</strong>
          </ProductItem>
        ))}
  </ProductListWrapper>
  );
};

export default ProductList;
