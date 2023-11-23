import React, { useEffect, useState } from 'react';
import { fetchCategories } from '../../../api/apiService';
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
          <CategoryItem key={category.id}>{category.categoryName}</CategoryItem>
        ))}
      </CategoryListContainer>
    </Wrapper>
  );
};

export default CategoryList;
