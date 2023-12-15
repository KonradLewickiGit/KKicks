// OrderHistory.tsx

import React, { useEffect, useState } from 'react';
import { fetchOrdersByBuyerId, changeOrderStatusToDelivered, addUserRatingByOrderId } from '../../../api/apiService';
import { Order } from '../../../assets/types';
import { useAuth } from '../../../hooks/useApi';
import styled from 'styled-components';
const OrderHistoryContainer = styled.div`
  margin-top: 20px; // Dodatkowy margines na górę
`;

const RatingStarsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const RatingStar = styled.button`
font-size: ${({ theme }) => theme.fontSize.s};
background-color: transparent;
border: none;
cursor: pointer;
outline: none;
color: ${({ theme }) => theme.colors.blue}; // Wszystkie gwiazdki są koloru niebieskiego

&:hover {
  transform: scale(1.2); // Powiększenie gwiazdki przy najechaniu
  transition: transform 0.2s; // Gładka animacja transformacji
}
`;
const OrderHistory: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [ratingSubmitted, setRatingSubmitted] = useState<{ [orderId: number]: boolean }>({});
  const { user } = useAuth(); // Użycie hooka useAuth

  useEffect(() => {
    const loadOrders = async () => {
      if (user && user.id) {
        try {
          const fetchedOrders = await fetchOrdersByBuyerId(user.id);
          setOrders(fetchedOrders);
        } catch (error) {
          console.error('Error fetching orders:', error);
        }
      }
    };

    loadOrders();
  }, [user]);
  const handleDeliveredStatusChange = async (orderId: number) => {
    try {
      const updatedOrder = await changeOrderStatusToDelivered(orderId);
      setOrders(orders.map(order => order.id === orderId ? updatedOrder : order));
    } catch (error) {
      console.error('Error changing status:', error);
    }
  };
  const handleRating = async (orderId: number, stars: number) => {
    if (!user || !user.id) {
      console.error('Error: User is not authenticated');
      return;
    }

    try {
      await addUserRatingByOrderId(user.id, orderId, stars);
      setRatingSubmitted(prev => ({ ...prev, [orderId]: true }));
      // Dodaj logikę aktualizacji zamówienia po dodaniu oceny (opcjonalnie)
    } catch (error) {
      console.error('Error adding user rating:', error);
    }
  };

  const renderRatingStars = (orderId: number) => {
    return (
      <div>
        <p>Oceń użytkownika sprzedającego:</p>
        {[1, 2, 3, 4, 5].map(star => (
          <button key={star} onClick={() => handleRating(orderId, star)}>★ {star}</button>
        ))}
      </div>
    );
  };

  return (
    <div>
    <h2>Historia Zamówień</h2>
    <ul>
      {orders.map(order => (
        <li key={order.id}>
          <p>Model: {order.product.model}</p>
          <p>Cena zamówienia: {order.price} zł</p>
          <p>Data zamówienia: {new Date(order.orderDate).toLocaleDateString()}</p>
          {order.status === 'ON_DELIVERY' && (
            <button onClick={() => handleDeliveredStatusChange(order.id)}>Otrzymano</button>
          )}
                    {order.status === 'DELIVERED' && (
              <RatingStarsContainer>
                <p>Oceń użytkownika sprzedającego:</p>
                {[1, 2, 3, 4, 5].map(star => (
                  <RatingStar
                    key={star}
                    onClick={() => handleRating(order.id, star)}
                  >
                    ★ {star}
                  </RatingStar>
                ))}
              </RatingStarsContainer>
            )}
            {ratingSubmitted[order.id] && <p>Dziękujemy za opinię!</p>}
          </li>
        ))}
    </ul>
    </div>
  )
};

export default OrderHistory;
