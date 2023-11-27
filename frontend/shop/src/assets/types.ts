export interface User {
    id: number
    email: string
    login: string
    username: string
    firstName: string
    lastName: string
    phoneNumber: string
  }
  export interface LoginData {
    email: string
    password: string
  } 
  export interface RegisterData {
    login: string
    password: string
    email: string
    firstName: string
    lastName: string
    phoneNumber: string
  }  
  export interface Category {
    id: number
    categoryName: string
}
export interface Product {
  id: number;
  category: {
    id: number;
    categoryName: string;
  };
  manufacturer: {
    id: number;
    manufacturerName: string;
  };
  price: number;
  size: string;
  posted_by_user_id: number;
  color: string;
  description: string;
  is_verified: boolean;
  model: string;
}
export interface ProductData {
  model: string;
  price: number;
  description: string;
  size: string;
  color: string;
}
export interface Manufacturer {
  id: number;
  manufacturerName: string;
}
export interface Adres {
  city: string;
  zipCode: string;
  street: string;
  buildingNumber: string;
  apartmentNumber: string;
}
export interface Order {
  price: number;
  id: number;
  order_date: string;
  provider: string;
  status: boolean;
}

export interface PaymentResponse {
  id: number;
  isApproved: boolean;
  paymentDate: string;
  paymentMethod: string;
  price: number;
  status: string;
}

export interface ApiContextType {
    user: User | null
    signIn: (formData: LoginData) => Promise<void>
    signOut: () => void
    signUp: (formData: LoginData) => Promise<void>
    error: string | null
  }
  export interface ErrorObject {
    username?: {
      message: string
    }
    password?: {
      message: string
    }
    email?: {
      message: string
    }
    firstName?: {
      message: string
    }
    lastName?: {
      message: string
    }
    phoneNumber?: {
      message: string
    }
  }
  