import React, { useState, useEffect } from 'react';
import { Product} from '../../../assets/types';
import { fetchProductsByCategory, fetchProductImagesNames, loadProductImage, fetchAllByCategoryAndManufacturer } from '../../../api/apiService';
import { useParams, useNavigate } from 'react-router-dom';
import { ProductListWrapper, ProductItem} from '../ProductList/ProductList.styles';
import { StyledImage } from '../../atoms/Image/Image.styled';
import { LayoutWrapper, ProductListContentWrapper, ManufacturerListWrapper } from './ProdoctsByCategory';
import ManufacturerList from '../ManufacturerList/ManufacturerList';

const ProductsByCategory: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [productImages, setProductImages] = useState<{ [key: number]: string }>({});
    const [selectedManufacturerId, setSelectedManufacturerId] = useState<number | null>(null);
    const navigate = useNavigate();
    const { categoryId } = useParams();

    
    useEffect(() => {
      const loadProducts = async () => {
        try {
          let fetchedProducts;
          if (categoryId) {
            const categoryIdNum = parseInt(categoryId);
    
            if (selectedManufacturerId) {
              fetchedProducts = await fetchAllByCategoryAndManufacturer(categoryIdNum, selectedManufacturerId);
            } else {
              fetchedProducts = await fetchProductsByCategory(categoryIdNum);
            }
    
            setProducts(fetchedProducts);
  
            for (const product of fetchedProducts) {
              const imageNames = await fetchProductImagesNames(product.id);
              if (imageNames.length > 0) {
                const imageUrl = await loadProductImage(imageNames[0].path);
                setProductImages(prevImages => ({ ...prevImages, [product.id]: imageUrl }));
              }
            }
          }
          } catch (error) {
            console.error('Error fetching products by category:', error);
          }
        };
  
        if (categoryId) {
          loadProducts();
        }
      }, [categoryId, selectedManufacturerId]);
  
    const handleProductClick = (id: number) => {
      navigate(`/productdetails/${id}`);
    };

    const handleManufacturerSelect = (manufacturerId: number) => {
      setSelectedManufacturerId(manufacturerId);
    };
    
    return (
      <LayoutWrapper>
      <ManufacturerListWrapper>
        <ManufacturerList onManufacturerSelect={handleManufacturerSelect} />
      </ManufacturerListWrapper>
      <ProductListContentWrapper>
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
      </ProductListContentWrapper>
    </LayoutWrapper>
    );
  };

export default ProductsByCategory;
