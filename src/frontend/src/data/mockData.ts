import { Product, Order, Service } from '../types';

export const mockProducts: Product[] = [
  {
    id: '1',
    code: 'BAHIA001',
    name: 'Escapada Salvador de Bahía',
    description: 'Paquete completo con vuelos, alojamiento y actividades en las hermosas playas de Salvador de Bahía',
    price: 780,
    category: 'Playa',
    destination: 'Brasil',
    duration: 7,
    image: 'https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&w=800',
    features: ['2 vuelos', '7 noches', 'Alojamiento con desayuno', '2 transfers'],
    available: true
  },
  {
    id: '2',
    code: 'RIO001',
    name: 'Escapada Río de Janeiro',
    description: 'Descubre la ciudad maravillosa con este paquete que incluye Cristo Redentor y Pan de Azúcar',
    price: 677,
    category: 'Ciudad',
    destination: 'Brasil',
    duration: 5,
    image: 'https://images.pexels.com/photos/351448/pexels-photo-351448.jpeg?auto=compress&cs=tinysrgb&w=800',
    features: ['2 vuelos', '5 noches', 'Alojamiento con desayuno', '2 transfers'],
    available: true
  },
  {
    id: '3',
    code: 'CUBA001',
    name: 'Cuba Grupal Acompañada 2025',
    description: 'Viaje grupal con acompañante especializado para conocer la auténtica Cuba',
    price: 2305,
    category: 'Grupal',
    destination: 'Cuba',
    duration: 10,
    image: 'https://images.pexels.com/photos/2064826/pexels-photo-2064826.jpeg?auto=compress&cs=tinysrgb&w=800',
    features: ['1 vuelo', '10 noches', 'Acompañada doble', 'Asegurada 2025'],
    available: true
  },
  {
    id: '4',
    code: 'MACEIO001',
    name: 'Maceió Premium',
    description: 'Relájate en las paradisíacas playas de Maceió con todo incluido',
    price: 2586,
    category: 'All Inclusive',
    destination: 'Brasil',
    duration: 7,
    image: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=800',
    features: ['2 vuelos', '7 noches', 'All inclusive', 'Salidas confirmadas'],
    available: true
  },
  {
    id: '5',
    code: 'CARIBE001',
    name: 'Caribe Multiculturas',
    description: 'Tour por múltiples islas del Caribe en un crucero de lujo',
    price: 1850,
    category: 'Crucero',
    destination: 'Caribe',
    duration: 8,
    image: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=800',
    features: ['Crucero', '8 días', 'Múltiples destinos', 'Todo incluido'],
    available: true
  },
  {
    id: '6',
    code: 'MEXICO001',
    name: 'México Playa del Carmen',
    description: 'Vive la experiencia maya en las costas del Caribe mexicano',
    price: 1245,
    category: 'Playa',
    destination: 'México',
    duration: 6,
    image: 'https://images.pexels.com/photos/2952849/pexels-photo-2952849.jpeg?auto=compress&cs=tinysrgb&w=800',
    features: ['2 vuelos', '6 noches', 'Resort 4 estrellas', 'Excursiones'],
    available: true
  }
];

export const mockServices: Service[] = [
  // Airport Transfers
  {
    id: 's1',
    code: 'TRANS001',
    name: 'Transfer Aeropuerto VIP',
    description: 'Servicio de transfer privado desde/hacia el aeropuerto con vehículo de lujo',
    price: 85,
    type: 'transfer',
    category: 'VIP',
    image: 'https://images.pexels.com/photos/1118448/pexels-photo-1118448.jpeg?auto=compress&cs=tinysrgb&w=800',
    features: ['Vehículo de lujo', 'Conductor profesional', 'Agua y snacks', 'WiFi gratuito'],
    available: true,
    destination: 'Todos'
  },
  {
    id: 's2',
    code: 'TRANS002',
    name: 'Transfer Aeropuerto Compartido',
    description: 'Servicio de transfer compartido económico desde/hacia el aeropuerto',
    price: 25,
    type: 'transfer',
    category: 'Económico',
    image: 'https://images.pexels.com/photos/1118448/pexels-photo-1118448.jpeg?auto=compress&cs=tinysrgb&w=800',
    features: ['Servicio compartido', 'Puntualidad garantizada', 'Equipaje incluido'],
    available: true,
    destination: 'Todos'
  },
  {
    id: 's3',
    code: 'TRANS003',
    name: 'Transfer Aeropuerto Familiar',
    description: 'Transfer privado para familias con espacio para equipaje y comodidades',
    price: 65,
    type: 'transfer',
    category: 'Familiar',
    image: 'https://images.pexels.com/photos/1118448/pexels-photo-1118448.jpeg?auto=compress&cs=tinysrgb&w=800',
    features: ['Vehículo amplio', 'Sillas para niños', 'Equipaje extra', 'Conductor bilingüe'],
    available: true,
    destination: 'Todos'
  },

  // Car Rentals
  {
    id: 's4',
    code: 'CAR001',
    name: 'Auto Económico - 7 días',
    description: 'Alquiler de auto económico por 7 días con seguro básico incluido',
    price: 280,
    type: 'car_rental',
    category: 'Económico',
    duration: 7,
    image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=800',
    features: ['Seguro básico', 'Kilometraje ilimitado', 'Asistencia 24/7', 'GPS incluido'],
    available: true,
    destination: 'Todos'
  },
  {
    id: 's5',
    code: 'CAR002',
    name: 'SUV Premium - 7 días',
    description: 'Alquiler de SUV premium por 7 días con seguro completo',
    price: 520,
    type: 'car_rental',
    category: 'Premium',
    duration: 7,
    image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=800',
    features: ['Seguro completo', 'Vehículo 4x4', 'Conductor adicional', 'Combustible incluido'],
    available: true,
    destination: 'Todos'
  },
  {
    id: 's6',
    code: 'CAR003',
    name: 'Convertible Lujo - 3 días',
    description: 'Alquiler de convertible de lujo para una experiencia única',
    price: 450,
    type: 'car_rental',
    category: 'Lujo',
    duration: 3,
    image: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=800',
    features: ['Vehículo convertible', 'Seguro premium', 'Servicio de conserjería', 'Entrega en hotel'],
    available: true,
    destination: 'Todos'
  },

  // Insurance
  {
    id: 's7',
    code: 'SEG001',
    name: 'Seguro de Viaje Básico',
    description: 'Cobertura básica para gastos médicos y cancelación de viaje',
    price: 45,
    type: 'insurance',
    category: 'Básico',
    image: 'https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=800',
    features: ['Gastos médicos hasta $50,000', 'Cancelación de viaje', 'Equipaje perdido', 'Asistencia 24/7'],
    available: true,
    destination: 'Todos'
  },
  {
    id: 's8',
    code: 'SEG002',
    name: 'Seguro de Viaje Premium',
    description: 'Cobertura completa con protección extendida y servicios adicionales',
    price: 95,
    type: 'insurance',
    category: 'Premium',
    image: 'https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=800',
    features: ['Gastos médicos hasta $150,000', 'Cancelación por cualquier motivo', 'Deportes extremos', 'Repatriación'],
    available: true,
    destination: 'Todos'
  },
  {
    id: 's9',
    code: 'SEG003',
    name: 'Seguro Familiar Completo',
    description: 'Seguro familiar con cobertura para toda la familia',
    price: 180,
    type: 'insurance',
    category: 'Familiar',
    image: 'https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=800',
    features: ['Cobertura familiar completa', 'Gastos médicos hasta $200,000', 'Protección de menores', 'Asistencia especializada'],
    available: true,
    destination: 'Todos'
  },

  // Excursions
  {
    id: 's10',
    code: 'EXC001',
    name: 'City Tour Completo',
    description: 'Tour completo por los principales atractivos de la ciudad',
    price: 120,
    type: 'excursion',
    category: 'Cultural',
    duration: 1,
    image: 'https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg?auto=compress&cs=tinysrgb&w=800',
    features: ['Guía profesional', 'Transporte incluido', 'Entradas a museos', 'Almuerzo típico'],
    available: true,
    destination: 'Todos'
  },
  {
    id: 's11',
    code: 'EXC002',
    name: 'Aventura en la Naturaleza',
    description: 'Excursión de aventura con actividades al aire libre',
    price: 180,
    type: 'excursion',
    category: 'Aventura',
    duration: 1,
    image: 'https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg?auto=compress&cs=tinysrgb&w=800',
    features: ['Actividades extremas', 'Equipo incluido', 'Instructor certificado', 'Seguro de actividad'],
    available: true,
    destination: 'Todos'
  },

  // Meals
  {
    id: 's12',
    code: 'MEAL001',
    name: 'Cena Romántica',
    description: 'Cena romántica en restaurante exclusivo con vista al mar',
    price: 150,
    type: 'meal',
    category: 'Romántico',
    image: 'https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?auto=compress&cs=tinysrgb&w=800',
    features: ['Mesa privada', 'Menú degustación', 'Vino incluido', 'Música en vivo'],
    available: true,
    destination: 'Todos'
  }
];

export const mockOrders: Order[] = [
  {
    id: 'ORD001',
    customerId: '1',
    customerName: 'Juan Cliente',
    customerEmail: 'cliente@demo.com',
    items: [
      { product: mockProducts[0], quantity: 1, type: 'product' },
      { service: mockServices[0], quantity: 2, type: 'service' }
    ],
    total: 950,
    status: 'pending',
    createdAt: new Date('2025-01-10')
  },
  {
    id: 'ORD002',
    customerId: '1',
    customerName: 'Juan Cliente',
    customerEmail: 'cliente@demo.com',
    items: [
      { product: mockProducts[2], quantity: 1, type: 'product' },
      { service: mockServices[6], quantity: 1, type: 'service' }
    ],
    total: 2350,
    status: 'processing',
    createdAt: new Date('2025-01-12')
  }
];