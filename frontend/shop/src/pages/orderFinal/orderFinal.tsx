import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Order, PaymentResponse } from '../../assets/types';
import { processPayment, findOrderByUserIdAndProductId } from '../../api/apiService';
import Button from '../../components/atoms/Button/Button';
import { useAuth } from '../../hooks/useApi';
import { Wrapper, Label, RadioGroup, TotalPrice } from './orderFinal.styles';

const OrderFinal = () => {
    const { id: orderId } = useParams();
    const { user } = useAuth(); // Użycie hooka useAuth
    const { id: productId } = useParams<{ id: string }>(); // Pobranie productId z URL
    const [paymentMethod, setPaymentMethod] = useState('');
    const [order, setOrder] = useState<Order | null>(null); // Użyj typu Order
    const [paymentStatus, setPaymentStatus] = useState<PaymentResponse | null>(null);

    useEffect(() => {
        console.log("OrderFinal component is mounted. Order ID:", orderId);
        if (user && productId) {
          const fetchOrder = async () => {
            try {
              const fetchedOrder = await findOrderByUserIdAndProductId(user.id, parseInt(productId));
              setOrder(fetchedOrder);
            } catch (error) {
              console.error('Error fetching order:', error);
            }
          };
    
          fetchOrder();
        }
      }, [user, productId]);

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmitPayment = async () => {
    if (order && paymentMethod) {
      try {
        const response = await processPayment(order.id, paymentMethod);
        console.log('Payment processed successfully:', response);
        setPaymentStatus(response);
      } catch (error) {
        console.error('Payment processing failed:', error);
      }
    }
  };

  return (
    <Wrapper>
      <h2>Wybierz rodzaj płatności:</h2>
      <RadioGroup>
        <Label>
          <input 
            type="radio" 
            name="paymentMethod" 
            value="BLIK" 
            onChange={handlePaymentChange}
            checked={paymentMethod === 'BLIK'} 
          />
          BLIK
        </Label>
        <Label>
          <input 
            type="radio" 
            name="paymentMethod" 
            value="VISA" 
            onChange={handlePaymentChange}
            checked={paymentMethod === 'VISA'} 
          />
          VISA
        </Label>
      </RadioGroup>
      <TotalPrice>Razem: {order ? order.price : '459.98 zł'}</TotalPrice>
      <Button onClick={handleSubmitPayment}>Zapłać</Button>
      {paymentStatus && (
        <div>
          {paymentStatus.isApproved
            ? <p>Płatność zakończona sukcesem!</p>
            : <p>Płatność nie powiodła się. Status: {paymentStatus.status}</p>
          }
        </div>
      )}
    </Wrapper>
  );
};

export default OrderFinal;
