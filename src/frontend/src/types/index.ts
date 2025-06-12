export interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'sales' | 'admin';
  createdAt: Date;
}

export interface Product {
  id: string;
  code: string;
  name: string;
  description: string;
  price: number;
  category: string;
  destination: string;
  duration: number;
  image: string;
  features: string[];
  available: boolean;
}

export interface Service {
  id: string;
  code: string;
  name: string;
  description: string;
  price: number;
  type: 'transfer' | 'car_rental' | 'insurance' | 'excursion' | 'meal';
  category: string;
  duration?: number;
  image: string;
  features: string[];
  available: boolean;
  destination?: string;
}

export interface CartItem {
  product?: Product;
  service?: Service;
  quantity: number;
  type: 'product' | 'service';
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'delivered' | 'cancelled';
  createdAt: Date;
  deliveredAt?: Date;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}