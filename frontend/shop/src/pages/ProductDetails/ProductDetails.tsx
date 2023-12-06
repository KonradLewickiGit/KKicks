// ProductDetails.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById, addProductToObserved, fetchProductImagesNames, loadProductImage, fetchUserByPostedProductId } from '../../api/apiService';
import { Product, User } from '../../assets/types';
import Button from '../../components/atoms/Button/Button';
import { useAuth } from '../../hooks/useApi';
import { Wrapper, DetailsContainer, Field, ImageContainer, StyledImage, ButtonContainer, ClickableField} from './ProductDetails.styles';
import ProductChatRoom from '../../components/organism/ProductChatRoom/ProductChatRoom';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [productUser, setProductUser] = useState<User | null>(null);
  const [productImages, setProductImages] = useState<string[]>([]);
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isObserved, setIsObserved] = useState(false);
  type ImageName = {
    path: string;
    // inne właściwości, jeśli istnieją
  };
  useEffect(() => {
    const loadProductDetails = async () => {
      if (id) {
        try {
          const productDetails = await fetchProductById(parseInt(id));
          setProduct(productDetails);
          const imageNames = await fetchProductImagesNames(parseInt(id));
          const imageUrls = await Promise.all(
            imageNames.map((image: ImageName) => loadProductImage(image.path))
          );
          setProductImages(imageUrls);
          const userData = await fetchUserByPostedProductId(parseInt(id));
          setProductUser(userData);
        } catch (error) {
          console.error('Error:', error);
        }
      }
    };

    loadProductDetails();
  }, [id]);

  const handleBuyNow = () => {
    console.log('Kupiono produkt:', product?.model);
    navigate(`/order/${id}`);
  };
  if (!product) {
    return <div>Loading...</div>;
  }
  const navigateToUserProfile = () => {
    if (productUser && productUser.id) {
      navigate(`/userprofile/${productUser.id}`);
    }
  };
  const handleAddToObserved = async () => {
    if (user && user.id && product && product.id && !isObserved) {
      try {
        await addProductToObserved(user.id, product.id);
        setIsObserved(true); // Ustaw stan na true po pomyślnym dodaniu do obserwowanych
      } catch (error) {
        console.error('Error while adding product to observed:', error);
        
      }
    } else if (!user || !user.id) {
    }
  };
  return (
    <Wrapper>
      <Field as="h1"><span>Model:</span> {product.model}</Field>
      <ImageContainer>
        {productImages.map((imageUrl, index) => (
          <StyledImage key={index} src={imageUrl} alt={`Product ${index}`} />
        ))}
      </ImageContainer>
      <DetailsContainer>
        <Field><span>Cena:</span> {product.price} zł</Field>
        <Field><span>Rozmiar:</span> {product.size}</Field>
        <Field><span>Kolor:</span> {product.color}</Field>
        <Field><span>Opis:</span> {product.description}</Field>
        <Field><span>Status:</span> {product.isVerified ? 'Produkt zweryfikowany' : 'Produkt niezweryfikowany'}</Field>
        {productUser && (
  <ClickableField onClick={navigateToUserProfile}>
    Opublikowane przez: {productUser.username}
  </ClickableField>
)}
      </DetailsContainer>
      <ButtonContainer>
        <Button onClick={handleAddToObserved}>
          {isObserved ? 'Zaobserwowano' : 'Obserwuj produkt'}
        </Button>
        <Button onClick={handleBuyNow}>Kup teraz</Button>
        </ButtonContainer>
        <ProductChatRoom/>
    </Wrapper>
  );
};

export default ProductDetails;
