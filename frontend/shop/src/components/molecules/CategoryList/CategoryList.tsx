import React, { useEffect, useState } from 'react';
import { fetchCategories } from '../../../api/apiService';
import { Link } from 'react-router-dom';
import { Category } from '../../../assets/types';
import { Wrapper, CategoryItem, CategoryListContainer } from './CategoryList.styles';
const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const loadCategories = async () => {
      const data = await fetchCategories();
      setCategories(data);
    };

    loadCategories();
  }, []);

  return (
    <Wrapper>
      <CategoryListContainer>
        {categories.map(category => (
          <Link key={category.id} to={`/categories/${category.id}`}>
          <CategoryItem>{category.name}</CategoryItem>
        </Link>
        ))}
      </CategoryListContainer>
    </Wrapper>
  );
};

export default CategoryList;
