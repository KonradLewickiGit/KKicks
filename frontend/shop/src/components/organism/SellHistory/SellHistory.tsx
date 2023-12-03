// SellHistory.tsx

import React, { useEffect, useState } from 'react';
import { fetchSalesBySellerId, changeOrderStatusToOnDelivery } from '../../../api/apiService';
import { Order } from '../../../assets/types';
import { useAuth } from '../../../hooks/useApi';

const SellHistory: React.FC = () => {
  const [sales, setSales] = useState<Order[]>([]);
  const [shipmentConfirmed, setShipmentConfirmed] = useState<{ [key: number]: boolean }>({});
  const { user } = useAuth(); // Użycie hooka useAuth

  useEffect(() => {
    const loadSales = async () => {
      if (user && user.id) {
        try {
          const fetchedSales = await fetchSalesBySellerId(user.id);
          setSales(fetchedSales);
        } catch (error) {
          console.error('Error fetching sales:', error);
        }
      }
    };

    loadSales();
  }, [user]);

  const handleStatusChange = async (orderId: number) => {
    try {
      const updatedOrder = await changeOrderStatusToOnDelivery(orderId);
      setSales(sales.map(sale => sale.id === orderId ? updatedOrder : sale));
      setShipmentConfirmed({...shipmentConfirmed, [orderId]: true});
    } catch (error) {
      console.error('Error changing status:', error);
    }
  };

  return (
    <div>
      <h2>Historia Sprzedaży</h2>
      <ul>
        {sales.map(sale => (
          <li key={sale.id}>
            <p>Model: {sale.product.model}</p>
            <p>Cena: {sale.price} zł</p>
            <p>Data sprzedaży: {new Date(sale.orderDate).toLocaleDateString()}</p>
            {sale.status === "PAID" && (
              <button onClick={() => handleStatusChange(sale.id)}>Wysłano</button>
            )}
            {shipmentConfirmed[sale.id] && <p>Zamówienie wysłane</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SellHistory;
