// Order.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById, createOrder } from '../../api/apiService';
import { Product } from '../../assets/types';
import { useAuth } from '../../hooks/useApi';
import Button from '../../components/atoms/Button/Button';

const Order: React.FC = () => {
  const { id: productId } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<string>('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const loadProductDetails = async () => {
      if (productId) {
        try {
          const productDetails = await fetchProductById(parseInt(productId));
          setProduct(productDetails);
        } catch (error) {
          console.error('Error fetching product details:', error);
        }
      }
    };

    loadProductDetails();
  }, [productId]);

  const handleProviderChange = (provider: string) => {
    setSelectedProvider(provider);
  };

  const handleSubmitOrder = async () => {
    if (user && product) {
      try {
        await createOrder(user.id, product.id, selectedProvider, 9.99);
        console.log('Order placed successfully');
        navigate('/order-confirmation'); // Przekierowanie do strony potwierdzenia zamówienia
      } catch (error) {
        console.error('Error placing order:', error);
      }
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Order for {product.model}</h1>
      {/* Tutaj wyświetl szczegóły produktu */}
      <div>
        <label>
          <input 
            type="radio" 
            name="provider" 
            value="DHL" 
            onChange={() => handleProviderChange('DHL')}
            checked={selectedProvider === 'DHL'} 
          />
          DHL - 9.99 zł
        </label>
        <label>
          <input 
            type="radio" 
            name="provider" 
            value="POCZTEX" 
            onChange={() => handleProviderChange('POCZTEX')}
            checked={selectedProvider === 'POCZTEX'} 
          />
          POCZTEX - 9.99 zł
        </label>
        <label>
          <input 
            type="radio" 
            name="provider" 
            value="INPOST" 
            onChange={() => handleProviderChange('INPOST')}
            checked={selectedProvider === 'INPOST'} 
          />
          INPOST - 9.99 zł
        </label>
      </div>
      <Button onClick={handleSubmitOrder}>Przejdź dalej</Button>
    </div>
  );
};

export default Order;
