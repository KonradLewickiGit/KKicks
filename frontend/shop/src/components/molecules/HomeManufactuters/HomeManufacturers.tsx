import React, { useEffect, useState } from 'react';
import { fetchProductsByManufacturer } from '../../../api/apiService';
import { Product } from '../../../assets/types';

const HomeManufacturers = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const manufacturerIds = [1, 2, 3, 4];
  
    useEffect(() => {
      const fetchAllProducts = async () => {
        try {
          const allProducts = await Promise.all(
            manufacturerIds.map(id => fetchProductsByManufacturer(id))
          );
          setProducts(allProducts.flat());
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };
      fetchAllProducts();
  }, []);
  return (
    <div>
      {products.length > 0 ? (
        products.map((product) => (
          <div key={product.id}>
            <h3>{product.model}</h3>
            <p>{product.manufacturer.manufacturerName}</p>
            <p>{product.price} zł</p>
            <p>Rozmiar: {product.size}</p>
            <p>Kolor: {product.color}</p>
            {/* Inne szczegóły produktu */}
          </div>
        ))
      ) : (
        <p>Ładowanie produktów...</p>
      )}
    </div>
  );
};

export default HomeManufacturers;