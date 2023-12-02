import React, { useEffect, useState } from 'react';
import { fetchAllObservedProducts, fetchProductImagesNames, loadProductImage, deleteProductFromObserved } from '../../api/apiService';
import { Product } from '../../assets/types';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/atoms/Button/Button';
import { StyledImage } from '../../components/atoms/Image/Image.styled';
import { ProductItem, ProductListWrapper } from '../../components/molecules/ProductList/ProductList.styles';
import { useAuth } from '../../hooks/useApi';
const ObservedProducts: React.FC = () => {
  const [observedProducts, setObservedProducts] = useState<Product[]>([]);
  const [productImages, setProductImages] = useState<{ [key: number]: string }>({});
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.id) {
      const loadObservedProducts = async () => {
        try {
          const products = await fetchAllObservedProducts(user.id);
          setObservedProducts(products);

          for (const product of products) {
            const imageNames = await fetchProductImagesNames(product.id);
            if (imageNames.length > 0) {
              const imageUrl = await loadProductImage(imageNames[0].path);
              setProductImages(prevImages => ({ ...prevImages, [product.id]: imageUrl }));
            }
          }
        } catch (error) {
          console.error('Error fetching observed products:', error);
        }
      };

      loadObservedProducts();
    }
  }, [user]);

  const handleRemoveProduct = async (productId: number) => {
    if (user && user.id) {
      try {
        await deleteProductFromObserved(user.id, productId);
        // Aktualizacja listy produktów po usunięciu
        setObservedProducts(observedProducts.filter(product => product.id !== productId));
      } catch (error) {
        console.error('Error while removing product from observed:', error);
      }
    }
  };
  const handleNavigateToProduct = (productId: number) => {
    navigate(`/productdetails/${productId}`);
  };

  return (
    <ProductListWrapper>
      {observedProducts.map(product => (
        <ProductItem key={product.id}>
          {productImages[product.id] && (
            <StyledImage 
            src={productImages[product.id]} 
            alt={`Product ${product.id}`} 
            onClick={() => handleNavigateToProduct(product.id)} // Dodanie obsługi kliknięcia
          />
          )}
          <p>Model: {product.model}</p>
          <p>Cena: {product.price} zł</p>
          <Button onClick={() => handleRemoveProduct(product.id)}>Usuń z obserwowanych</Button>
        </ProductItem>
      ))}
    </ProductListWrapper>
  );
};

export default ObservedProducts;
