export interface Authority {
  authority: string;
}
export interface User {
    id: number
    email: string
    login: string
    username: string
    firstName: string
    lastName: string
    phoneNumber: string
    authorities: Authority[];
    nonExpired: boolean;
    browserMode: 'LIGHT' | 'DARK';
  }
  export interface UserProfile {
    id: number
    username: string
    email: string
    firstName: string
    lastName: string
    phoneNumber: string
    // inne właściwości, które są zwracane przez API i są istotne w tym kontekście
  }
  export interface Question {
    email: string;
    subject: string;
    body: string;
  }

export interface QuestionWithId {
    id: number;
    email: string;
    subject: string;
    body: string;
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
    name: string
}
export interface Product {
  id: number;
  category: Category[];
  manufacturer: Manufacturer[];
  price: number;
  size: string;
  posted_by_user_id: number;
  color: string;
  description: string;
  isVerified: string;
  model: string;
  availability: string;
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
  name: string;
}
export interface ManufacturerListProps {
  onManufacturerSelect: (manufacturerId: number) => void;
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
  orderDate: string;
  provider: string;
  status: string;
  product: Product;
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
  