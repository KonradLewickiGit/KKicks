import AxiosApi from '../axios.config'; // Zaimportuj swoją instancję Axios

export const fetchCategories = async () => {
  try {
    const response = await AxiosApi.get('/category/find/All');
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const fetchProducts = async () => {
  try {
    const response = await AxiosApi.get('/product/find/All');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
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
    const response = await AxiosApi.get(`/find/AllByCategory/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products by category:', error);
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
    const response = await AxiosApi.get(`/find/ByUserId/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching address by user ID:', error);
    throw error;
  }
};
//order
export const createOrder = async (userId: number, productId: number, provider: any) => {
  try {
    const response = await AxiosApi.post(`/order/create/${userId}/${productId}`, provider);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};