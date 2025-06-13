import { useState, useEffect } from 'react';
import { City, Flight, Hotel, Package, Car, User, Airline, Airport, Brand, Service } from '../types';


export const API_URL = 'http://localhost:3000/api'


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
]