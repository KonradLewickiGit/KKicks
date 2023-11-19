export interface User {
    email: string
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
  