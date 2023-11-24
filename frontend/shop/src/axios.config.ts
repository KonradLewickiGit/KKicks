import axios from 'axios';

// Tworzenie instancji Axios z podstawowym URL
const AxiosApi = axios.create({
  baseURL: 'http://localhost:8080',
});

// Interceptor do dodawania nagłówka autoryzacyjnego do każdego żądania
AxiosApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.authorization = `Bearer ${token}`;
      config.headers['Content-Type'] = `application/json`
    }
    console.log('Starting Request', JSON.stringify(config, null, 2));

    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
  
);

AxiosApi.interceptors.response.use(
  (response) => {
    // Logowanie szczegółów odpowiedzi
    console.log('Response:', JSON.stringify(response, null, 2));
    return response;
  },
  (error) => {
    // Logowanie błędów odpowiedzi
    console.error('Response Error:', error);
    return Promise.reject(error);
  }
);
export default AxiosApi;
