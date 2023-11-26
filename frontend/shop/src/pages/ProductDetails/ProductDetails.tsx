// ProductDetails.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../../api/apiService';
import { Product } from '../../assets/types';
import Button from '../../components/atoms/Button/Button';
import { useNavigate } from 'react-router-dom';
import { Wrapper, DetailsContainer, Field} from './ProductDetails.styles';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProductDetails = async () => {
      if (id) {
        try {
          const productDetails = await fetchProductById(parseInt(id));
          setProduct(productDetails);
        } catch (error) {
          console.error('Error fetching product details:', error);
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

  return (
    <Wrapper>
      <Field as="h1"><span>Model:</span> {product.model}</Field>
      <DetailsContainer>
        <Field><span>Cena:</span> {product.price} zł</Field>
        <Field><span>Rozmiar:</span> {product.size}</Field>
        <Field><span>Kolor:</span> {product.color}</Field>
        <Field><span>Opis:</span> {product.description}</Field>
        <Field><span>Status:</span> {product.is_verified ? 'Produkt zweryfikowany' : 'Produkt niezweryfikowany'}</Field>
      </DetailsContainer>
      <Button onClick={handleBuyNow}>Kup teraz</Button>
    </Wrapper>
  );
};

export default ProductDetails;
