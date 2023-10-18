// ProductList.tsx
import React, { useEffect, useState } from 'react';

interface Product {
  id: number;
  productName: string;
  category: {
    id: number;
    categoryName: string;
  };
  manufacturer: {
    id: number;
    manufacturerName: string;
  };
  price: number;
  size: string;
  posted_by_user_id: number;
  color: string;
  description: string;
  is_verified: boolean;
  model: string;
  // Dodaj inne pola produktu, jeśli są dostępne
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Wyślij żądanie GET do serwera backendowego, aby pobrać wszystkie produkty
    fetch('http://localhost:8080/product/findAll')
      .then((response) => response.json())
      .then((data) => {
        console.log('Odpowiedź z serwera:', data);
        setProducts(data);
      })
      .catch((error) => console.error('Błąd podczas żądania do backendu:', error));
  }, []);

  return (
    <div>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-item">
            <h2>{product.productName}</h2>
            <p>Category ID: {product.category.id}</p>
            <p>Manufacturer ID: {product.manufacturer.id}</p>
            <p>Price: {product.price}</p>
            <p>Size: {product.size}</p>
            <p>Posted by User ID: {product.posted_by_user_id}</p>
            <p>Color: {product.color}</p>
            <p>Description: {product.description}</p>
            <p>Is Verified: {product.is_verified ? 'Yes' : 'No'}</p>
            <p>Model: {product.model}</p>
            {/* Dodaj wyświetlanie innych informacji o produkcie */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
