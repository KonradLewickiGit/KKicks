import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchUserById, fetchAverageUserRating, fetchAllProductsByUser, fetchProductImagesNames, loadProductImage } from '../../api/apiService';
import { User, Product } from '../../assets/types';
import { ProductListWrapper, ProductItem } from '../../components/molecules/ProductList/ProductList.styles';
import { StyledImage } from '../../components/atoms/Image/Image.styled';

const UserProfile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [averageRating, setAverageRating] = useState<number | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [productImages, setProductImages] = useState<{ [key: number]: string }>({});
  const navigate = useNavigate();
  

  useEffect(() => {
    const loadUserProfile = async () => {
      if (userId) {
        try {
          const userData = await fetchUserById(parseInt(userId));
          setUser(userData);
          const userRating = await fetchAverageUserRating(parseInt(userId));
          setAverageRating(userRating);
          const userProducts = await fetchAllProductsByUser(parseInt(userId));
          setProducts(userProducts);
          for (const product of userProducts) {
            const imageNames = await fetchProductImagesNames(product.id);
            if (imageNames.length > 0) {
              const imageUrl = await loadProductImage(imageNames[0].path);
              setProductImages(prevImages => ({ ...prevImages, [product.id]: imageUrl }));
            }
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
    };

    loadUserProfile();
  }, [userId]);

  const handleProductClick = (id: number) => {
    navigate(`/productdetails/${id}`);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Profil Użytkownika</h1>
      <p>Login: {user.username}</p>
      <p>Imię: {user.firstName}</p>
      {averageRating !== null && <p>Średnia ocena: {averageRating.toFixed(2)}</p>}
      <h2>Produkty użytkownika</h2>
      <ProductListWrapper>
        {products.map(product => (
          <ProductItem key={product.id} onClick={() => handleProductClick(product.id)}>
            {productImages[product.id] && (
              <StyledImage src={productImages[product.id]} alt="Product" />
            )}
            <strong>{product.model}</strong> <strong>{product.price} zł</strong>
          </ProductItem>
        ))}
      </ProductListWrapper>
    </div>
  );
};

export default UserProfile;
