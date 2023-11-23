import React from 'react';
import CategoryList from '../../components/molecules/CategoryList/CategoryList';
import ProductList from '../../components/molecules/ProductList/ProductList';
import { Label } from './home.styles';

const HomePage = () => {
  return (
    <div>
      <CategoryList />
      <Label>Polecane produkty</Label>
      <ProductList />
    </div>
  );
};

export default HomePage;
