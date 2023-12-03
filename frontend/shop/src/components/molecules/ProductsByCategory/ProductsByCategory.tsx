import React, { useState, useEffect } from 'react';
import { Product, Category } from '../../../assets/types';
import { fetchProductsByCategory } from '../../../api/apiService';

const ProductsByCategory: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    
    useEffect(() => {
        const loadProducts = async () => {
          if (selectedCategoryId !== null) {
            const data = await fetchProductsByCategory(selectedCategoryId);
            setProducts(data);
          }
        };
    
        loadProducts();
      }, [selectedCategoryId]);
    
      return (
        <div>
          <div>
            {categories.map(category => (
              <button key={category.id} onClick={() => setSelectedCategoryId(category.id)}>
                {category.name}
              </button>
            ))}
          </div>
          <div>
            {products.map(product => (
              <div key={product.id}>
                {/* Wyświetlanie informacji o produkcie */}
              </div>
            ))}
          </div>
          {/* Możesz tutaj dodać inne komponenty */}
        </div>
      );
    };

export default ProductsByCategory;
