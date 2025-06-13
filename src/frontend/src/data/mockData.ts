import { City, Flight, Hotel, Package, Car, User, Airline, Airport, Brand, Service } from '../types';

export const mockUsers: User[] = [
  { 
    id: 1, 
    first_name: 'Juan', 
    last_name: 'Pérez', 
    email: 'juan@email.com', 
    created_at: '2025-01-01T10:00:00Z',
    is_admin: false 
  },
  { 
    id: 2, 
    first_name: 'María', 
    last_name: 'García', 
    email: 'maria@email.com', 
    created_at: '2025-01-01T10:00:00Z',
    is_admin: true 
  },
  { 
    id: 3, 
    first_name: 'Carlos', 
    last_name: 'López', 
    email: 'carlos@email.com', 
    created_at: '2025-01-01T10:00:00Z',
    is_admin: false 
  },
];

export const mockCities: City[] = [
  { id: 1, name: 'Buenos Aires', country: 'Argentina' },
  { id: 2, name: 'San Carlos de Bariloche', country: 'Argentina' },
  { id: 3, name: 'Mendoza', country: 'Argentina' },
  { id: 4, name: 'Córdoba', country: 'Argentina' },
  { id: 5, name: 'Mar del Plata', country: 'Argentina' },
];

export const mockAirlines: Airline[] = [
  { id: 1, name: 'Aerolíneas Argentinas' },
  { id: 2, name: 'LATAM' },
  { id: 3, name: 'Flybondi' },
  { id: 4, name: 'JetSmart' },
];

export const mockAirports: Airport[] = [
  { id: 1, name: 'Aeropuerto Internacional Ezeiza', code: 'EZE', city_id: 1 },
  { id: 2, name: 'Aeropuerto Jorge Newbery', code: 'AEP', city_id: 1 },
  { id: 3, name: 'Aeropuerto San Carlos de Bariloche', code: 'BRC', city_id: 2 },
  { id: 4, name: 'Aeropuerto Governor Francisco Gabrielli', code: 'MDZ', city_id: 3 },
  { id: 5, name: 'Aeropuerto Córdoba', code: 'COR', city_id: 4 },
];

export const mockBrands: Brand[] = [
  { id: 1, name: 'Toyota' },
  { id: 2, name: 'Ford' },
  { id: 3, name: 'Chevrolet' },
  { id: 4, name: 'Volkswagen' },
];

export const mockServices: Service[] = [
  { id: 1, name: 'WiFi gratuito' },
  { id: 2, name: 'Desayuno incluido' },
  { id: 3, name: 'Piscina' },
  { id: 4, name: 'Gimnasio' },
  { id: 5, name: 'Spa' },
  { id: 6, name: 'Estacionamiento' },
];

export const mockFlights: Flight[] = [
  {
    id: 1,
    origin_id: 1, // EZE
    destiny_id: 3, // BRC
    out_date: '2025-07-01',
    back_date: '2025-07-08',
    airline_id: 1,
    price: 75000,
    duration: '02:30:00',
    class: 'Económica',
    available_seats: 50
  },
  {
    id: 2,
    origin_id: 1, // EZE
    destiny_id: 4, // MDZ
    out_date: '2025-08-15',
    back_date: '2025-08-22',
    airline_id: 2,
    price: 65000,
    duration: '01:45:00',
    class: 'Económica',
    available_seats: 35
  },
  {
    id: 3,
    origin_id: 3, // BRC
    destiny_id: 1, // EZE
    out_date: '2025-07-10',
    back_date: '2025-07-17',
    airline_id: 3,
    price: 45000,
    duration: '02:15:00',
    class: 'Premium',
    available_seats: 25
  }
];

export const mockHotels: Hotel[] = [
  {
    id: 1,
    nombre: 'Hotel Llao Llao',
    city_id: 2,
    address: 'Av. Ezequiel Bustillo, Km 25',
    stars: 5,
    price_per_night: 85000,
    available_rooms: 8
  },
  {
    id: 2,
    nombre: 'Sheraton Mendoza Hotel',
    city_id: 3,
    address: 'Primitivo de la Reta 989',
    stars: 5,
    price_per_night: 65000,
    available_rooms: 12
  },
  {
    id: 3,
    nombre: 'Design Suites Bariloche',
    city_id: 2,
    address: 'Av. Bustillo Km 2.5',
    stars: 4,
    price_per_night: 45000,
    available_rooms: 15
  }
];

export const mockPackages: Package[] = [
  {
    id: 1,
    name: 'Bariloche Aventura',
    description: 'Vuelo + hotel 7 noches en Bariloche con actividades incluidas',
    city_destiny_id: 2,
    total_price: 250000,
    includes_flight: true,
    includes_hotel: true,
    includes_car: false
  },
  {
    id: 2,
    name: 'Mendoza Vinos',
    description: 'Vuelo + hotel 5 noches en Mendoza con tours de bodegas',
    city_destiny_id: 3,
    total_price: 180000,
    includes_flight: true,
    includes_hotel: true,
    includes_car: true
  },
  {
    id: 3,
    name: 'Buenos Aires Cultural',
    description: 'Hotel 4 noches en Buenos Aires con city tour',
    city_destiny_id: 1,
    total_price: 120000,
    includes_flight: false,
    includes_hotel: true,
    includes_car: false
  }
];

export const mockCars: Car[] = [
  {
    id: 1,
    brand_id: 1,
    model: 'Corolla',
    city_id: 1,
    price_per_day: 15000,
    disponibility: true
  },
  {
    id: 2,
    brand_id: 2,
    model: 'Focus',
    city_id: 2,
    price_per_day: 12000,
    disponibility: true
  },
  {
    id: 3,
    brand_id: 3,
    model: 'Onix',
    city_id: 3,
    price_per_day: 10000,
    disponibility: false
  }
];