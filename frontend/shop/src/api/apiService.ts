import AxiosApi from '../axios.config'; // Zaimportuj swoją instancję Axios
import { ProductData } from '../assets/types';
export const fetchCategories = async () => {
  try {
    const response = await AxiosApi.get('/category/find/All');
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

// Funkcja do pobierania wszystkich użytkowników
export const fetchAllUsers = async () => {
  try {
    const response = await AxiosApi.get('/user/find/All');
    return response.data;
  } catch (error) {
    console.error('Error fetching all users:', error);
    throw error;
  }
};

//preferencje
export const changeBrowserMode = async (userId: number) => {
  try {
    const response = await AxiosApi.post(`/user/changeBrowserMode/${userId}`, {
      headers: {
        'Content-Type': `application/json`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error changing browser mode:', error);
    throw error;
  }
};


//uprawnienia
export const giveAdminRole = async (userId: number) => {
  try {
    const response = await AxiosApi.post(`/user/giveAdminRole/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error giving admin role:', error);
    throw error;
  }
};

//user expired
export const deleteUserById = async (userId: number) => {
  try {
    const response = await AxiosApi.post(`/user/delete/${userId}` );
    return response.data; // Zakładając, że odpowiedź zawiera aktualny status `nonExpired`
  } catch (error) {
    console.error('Error updating user status:', error);
    throw error;
  }
};

//manufacturers
export const fetchManufacturers = async () => {
  try {
    const response = await AxiosApi.get('/manufacturer/find/All');
    return response.data;
  } catch (error) {
    console.error('Error fetching manufacturers:', error);
    throw error;
  }
};

//products
export const fetchProducts = async () => {
  try {
    const response = await AxiosApi.get('/product/find/All');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
export const deleteProductById = async (productId: number) => {
  try {
    const response = await AxiosApi.delete(`product/delete/${productId}`);
    return response.data; // Zakładając, że odpowiedź potwierdza usunięcie
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

export const setProductVerification = async (productId: number) => {
  try {
    const response = await AxiosApi.post(`product/setVerification/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error setting product verification:', error);
    throw error;
  }
};
export const fetchProductsByManufacturer = async (manufacturerId: number) => {
  try {
    const response = await AxiosApi.get(`/find/AllByManufacturer/${manufacturerId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products by manufacturer:', error);
    throw error;
  }
};
export const fetchProductsByCategory = async (categoryId: number) => {
  try {
    const response = await AxiosApi.get(`/product/find/AllByCategory/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products by category:', error);
    throw error;
  }
};

export const fetchAllByCategoryAndManufacturer = async (categoryId: number, manufacturerId: number) => {
  try {
    const response = await AxiosApi.get(`/product/find/AllByCategoryAndManufacturer/${categoryId}/${manufacturerId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products by category and manufacturer:', error);
    throw error;
  }
};

export const fetchProductById = async (id: number) => {
  try {
    const response = await AxiosApi.get(`/product/find/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    throw error;
  }
};
export const fetchAllProductsByUser = async (userId: number) => {
  try {
    const response = await AxiosApi.get(`/product/find/AllByUser/${userId}`);
    return response.data; // Zakładając, że odpowiedź zawiera listę produktów
  } catch (error) {
    console.error('Error fetching products by user:', error);
    throw error;
  }
};
export const fetchUserByPostedProductId = async (productId: number) => {
  try {
    const response = await AxiosApi.get(`/product/findUserByPostedProductId/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user by posted product ID:', error);
    throw error;
  }
};
export const fetchUserById = async (userId: number) => {
  try {
    const response = await AxiosApi.get(`/user/find/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw error;
  }
};
//address
export const addAddressForUser = async (userId: number, addressData: any) => {
  try {
    const response = await AxiosApi.post(`/address/add/${userId}`, addressData, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
    return response.data;
  } catch (error) {
    console.error('Error adding address for user:', error);
    throw error;
  }
};
export const fetchAddressByUserId = async (userId: number) => {
  try {
    const response = await AxiosApi.get(`/address/find/ByUserId/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching address by user ID:', error);
    throw error;
  }
};
//order
export const createOrder = async (userId: number, productId: number, provider: string, shipPrice: number) => {
  try {
    const response = await AxiosApi.post(`/order/create/${userId}/${productId}/${provider}`, shipPrice, {
      headers: {
        'Content-Type': `application/json`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

export const findOrderByUserIdAndProductId = async (userId: number, productId: number) => {
  try {
    const response = await AxiosApi.get(`/order/findByBuyerIdAndProductId/${userId}/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error finding order by user ID and product ID:', error);
    throw error;
  }
};
//questions
export const addQuestion = async (email: string, subject: string, body: string) => {
  try {
    const response = await AxiosApi.post('/question/add', { email, subject, body }, {
      headers: {
        'Content-Type': `application/json`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error adding question:', error);
    throw error;
  }
};
export const fetchAllQuestions = async () => {
  try {
    const response = await AxiosApi.get('/question/find/All');
    return response.data;
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw error;
  }
};
export const sendAnswer = async (questionId: number, body: { body: string }) => {
  try {
    const response = await AxiosApi.post(`question/sendAnswer/${questionId}`, body, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error sending answer:', error);
    throw error;
  }
};
//order
export const fetchAllOrders = async () => {
  try {
    const response = await AxiosApi.get('/order/findAll');
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};
export const fetchOrdersByBuyerId = async (buyerId: number) => {
  try {
    const response = await AxiosApi.get(`/order/findAllByBuyerId/${buyerId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching orders by buyer ID:', error);
    throw error;
  }
};
export const fetchSalesBySellerId = async (sellerId: number) => {
  try {
    const response = await AxiosApi.get(`/order/findAllBySellerId/${sellerId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching sales by seller ID:', error);
    throw error;
  }
};
export const changeOrderStatusToOnDelivery = async (orderId: number) => {
  try {
    const response = await AxiosApi.post(`/order/changeStatusToOnDelivery/${orderId}`, {
      headers: {
        'Content-Type': `application/json`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error changing order status to on delivery:', error);
    throw error;
  }
};
export const changeOrderStatusToDelivered = async (orderId: number) => {
  try {
    const response = await AxiosApi.post(`/order/changeStatusToDelivered/${orderId}`, {
      headers: {
        'Content-Type': `application/json`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error changing order status to delivered:', error);
    throw error;
  }
};

//payment
export const processPayment = async (orderId: number, paymentMethod: string) => {
  try { 
    const response = await AxiosApi.post(`/order/pay/${orderId}`, paymentMethod, {
      headers: {
        'Content-Type': `application/json`
      }
    });  
    return response.data;
  } catch (error) {
    console.error('Error processing payment:', error);
    throw error;
  }
};

//addProduct with images
export const addProduct = async (
  userId: number, 
  categoryId: number, 
  manufacturerId: number, 
  productData: ProductData,
  files: File[]
): Promise<any> => {
  try {
    const formData = new FormData();
    formData.append('model', productData.model);
    formData.append('price', productData.price.toString()); 
    formData.append('description', productData.description);
    formData.append('size', productData.size);
    formData.append('color', productData.color);

    // Dodaj pliki
    files.forEach((file) => {
      formData.append('files', file);
    });

    const response = await AxiosApi.post(`product/save/${userId}/${categoryId}/${manufacturerId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};
//images
export const fetchProductImagesNames = async (productId: number) => {
  try {
    const response = await AxiosApi.get(`/productImage/find/AllByProduct/${productId}`);
    return response.data; // Zakładam, że odpowiedź zawiera listę obrazów
  } catch (error) {
    console.error('Error fetching product images:', error);
    throw error;
  }
};
export const loadProductImage = async (fileName: string): Promise<string> => {
  try {
    const response = await AxiosApi.get(`/productImage/find/Image/${fileName}`, {
      responseType: 'blob' // Jeśli obraz jest zwracany jako blob
    });
    return URL.createObjectURL(response.data); // Tworzy URL do obrazu
  } catch (error) {
    console.error('Error loading image:', error);
    throw error;
  }
};

//observed product
export const addProductToObserved = async (userId: number, productId: number) => {
  try {
    const response = await AxiosApi.post(`/user/addProductToObserved/${userId}/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error adding product to observed:', error);
    throw error;
  }
};

export const fetchAllObservedProducts = async (userId: number) => {
  try {
    const response = await AxiosApi.get(`/user/find/AllObservedProducts/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all observed products:', error);
    throw error;
  }
};

export const deleteProductFromObserved = async (userId: number, productId: number) => {
  try {
    const response = await AxiosApi.delete(`user/deleteProductFromObserved/${userId}/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting product from observed:', error);
    throw error;
  }
};

export const addUserRatingByOrderId = async (senderId: number, orderId: number, stars: number) => {
  try {
    const response = await AxiosApi.post(`/rating/addUserRatingByOrderId/${senderId}/${orderId}`, stars, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error adding user rating:', error);
    throw error;
  }
};

export const fetchAverageUserRating = async (userId: number) => {
  try {
    const response = await AxiosApi.get(`/rating/averageUserRating/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching average user rating:', error);
    throw error;
  }
};