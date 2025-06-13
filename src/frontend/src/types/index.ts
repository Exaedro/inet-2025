export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
  created_at?: string;
  is_admin?: boolean; // This will be derived from business logic, not stored in DB
}

export interface City {
  id: number;
  name: string;
  country: string;
}

export interface Airport {
  id: number;
  name: string;
  code: string;
  city_id: number;
}

export interface Airline {
  id: number;
  name: string;
}

export interface Brand {
  id: number;
  name: string;
}

export interface Flight {
  id: number;
  origin_id: number;
  destiny_id: number;
  out_date: string;
  back_date: string;
  airline_id: number;
  price: number;
  duration: string;
  class: string;
  available_seats: number;
}

export interface Hotel {
  id: number;
  name: string;
  city_id: number;
  address: string;
  stars: number;
  price_per_night: number;
  available_rooms: number;
}

export interface Service {
  id: number;
  name: string;
}

export interface HotelService {
  hotel_id: number;
  service_id: number;
}

export interface Package {
  id: number;
  name: string;
  description: string;
  city_destiny_id: number;
  total_price: number;
  includes_flight: boolean;
  includes_hotel: boolean;
  includes_car: boolean;
}

export interface Car {
  id: number;
  brand_id: number;
  model: string;
  city_id: number;
  price_per_day: number;
  disponibility: boolean;
}

export interface CartItem {
  id: number;
  cart_id: number;
  type_item: string; // 'flight' | 'hotel' | 'package' | 'car'
  item_id: number;
  amount: number;
}

export interface Cart {
  id: number;
  user_id: number;
  created_at: string;
}

export type ProductType = 'flight' | 'hotel' | 'package' | 'car';