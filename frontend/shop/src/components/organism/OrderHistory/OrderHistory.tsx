// OrderHistory.tsx

import React, { useEffect, useState } from 'react';
import { fetchOrdersByBuyerId, changeOrderStatusToDelivered } from '../../../api/apiService';
import { Order } from '../../../assets/types';
import { useAuth } from '../../../hooks/useApi';

const OrderHistory: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
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

  return (
    <div>
      <h2>Historia Zamówień</h2>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            <p>Model: {order.product.model}</p>
            <p>Cena zamówienia: {order.price} zł</p>
            <p>Data zamówienia: {new Date(order.orderDate).toLocaleDateString()}</p>
            {order.status === "ON_DELIVERY" && (
              <button onClick={() => handleDeliveredStatusChange(order.id)}>Otrzymano</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
};

export default OrderHistory;
