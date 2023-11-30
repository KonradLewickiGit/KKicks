// W OrdersPanel.tsx

import React, { useState, useEffect } from 'react';
import { fetchAllOrders } from '../../../api/apiService';
import { Order } from '../../../assets/types';
import { ManagementWrapper, Row } from '../../molecules/ManageAdmin/ManageAdmin.styles';

const OrdersPanel: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false // Jeśli chcesz używać formatu 24-godzinnego
    };
    return new Date(dateString).toLocaleDateString('pl-PL', options);
  };

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const fetchedOrders = await fetchAllOrders();
        setOrders(fetchedOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    loadOrders();
  }, []);
  

  return (
    <ManagementWrapper>
      <h1>Zamówienia</h1>
      {orders.map(order => (
        <Row key={order.id}>
          <p>ID Zamówienia: {order.id}</p>
          <p>Cena: {order.price} zł</p>
          <p>Data zamówienia: {formatDate(order.orderDate)}</p>
          <p>Dostawca: {order.provider}</p>
          <p>Status: {order.status ? 'Zrealizowane' : 'Oczekujące'}</p>
          {/* Tutaj możesz dodać StyledButton, jeśli jest taka potrzeba */}
        </Row>
      ))}
    </ManagementWrapper>
  );
};

export default OrdersPanel;
