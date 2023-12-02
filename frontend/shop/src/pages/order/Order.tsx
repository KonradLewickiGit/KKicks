// Order.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById, createOrder } from '../../api/apiService';
import { Product } from '../../assets/types';
import { useAuth } from '../../hooks/useApi';
import Button from '../../components/atoms/Button/Button';
import { Wrapper, Label, DeliveryContainer, DeliveryHeader } from './Order.styles';
import Address from '../../components/organism/Address/AddressList';

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
  const getShippingCost = (provider: string) => {
    switch (provider) {
      case 'DHL':
        return 12.99;
      case 'POCZTEX':
        return 9.99;
      case 'INPOST':
        return 9.99;
      default:
        return 0; // Możesz zdecydować, co zrobić w przypadku, gdy dostawca nie jest wybrany
    }
  };

  const handleSubmitOrder = async () => {
      if (user && product && selectedProvider) {
        const shipPrice = getShippingCost(selectedProvider);
      try {
        await createOrder(user.id, product.id, selectedProvider, shipPrice);
        console.log('Order placed successfully');
        navigate(`/orderfinal/${productId}`);
      } catch (error) {
        console.error('Error placing order:', error);
      }
    } else {
      console.log("User or product is not available"); // Log, gdy użytkownik lub produkt nie są dostępne
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }


  return (
    <Wrapper>
      <h1>Zamawiasz {product.model}</h1>
      {/* Tutaj wyświetl szczegóły produktu */}
      {user && <Address />}
      <DeliveryContainer>
      <DeliveryHeader>Wybierz dostawę</DeliveryHeader>
      <Label>
        <input 
          type="radio" 
          name="provider" 
          value="DHL" 
          onChange={() => handleProviderChange('DHL')}
          checked={selectedProvider === 'DHL'} 
        />
        DHL - 12.99 zł
      </Label>
        <Label>
          <input 
            type="radio" 
            name="provider" 
            value="POCZTEX" 
            onChange={() => handleProviderChange('POCZTEX')}
            checked={selectedProvider === 'POCZTEX'} 
          />
          POCZTEX - 9.99 zł
        </Label>
        <Label>
          <input 
            type="radio" 
            name="provider" 
            value="INPOST" 
            onChange={() => handleProviderChange('INPOST')}
            checked={selectedProvider === 'INPOST'} 
          />
          INPOST - 9.99 zł
        </Label>
        </DeliveryContainer>
      <Button type="button" onClick={handleSubmitOrder}>Przejdź dalej</Button>
      
      </Wrapper>
  );
};

export default Order;
