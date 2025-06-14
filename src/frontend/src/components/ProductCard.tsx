import React, { useEffect, useState } from 'react';
import { MapPin, Clock, Star, Users, Plane, Hotel as HotelIcon, Package2, Car } from 'lucide-react';
import { Flight, Hotel, Package, Car as CarType } from '../types';
import { City, Airline, Airport, Brand } from '../types';

import { API_URL } from '../data/mockData';


interface ProductCardProps {
  product: Flight | Hotel | Package | CarType;
  type: 'flight' | 'hotel' | 'package' | 'car';
  onAddToCart: (product: any, type: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, type, onAddToCart }) => {
  const [cities, setCities] = useState<City[]>([]);
  const [airlines, setAirlines] = useState<Airline[]>([]);
  const [airports, setAirports] = useState<Airport[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const citiesRes = await fetch(API_URL + '/cities')
      const citiesData = await citiesRes.json()
      setCities(citiesData.data)

      const airlinesRes = await fetch(API_URL + '/airlines')
      const airlinesData = await airlinesRes.json()
      setAirlines(airlinesData.data)

      const airportsRes = await fetch(API_URL + '/airports')
      const airportsData = await airportsRes.json()
      setAirports(airportsData.data)

      const brandsRes = await fetch(API_URL + '/brands')
      const brandsData = await brandsRes.json()
      setBrands(brandsData.data)
    }
    fetchData()
  }, [type]);

  const getDestinationName = (cityId: number) => {
    const city = cities.find(c => c.id === cityId);
    return city ? `${city.name}, ${city.country}` : 'Destino desconocido';
  };

  const getAirlineName = (airlineId: number) => {
    const airline = airlines.find(a => a.id === airlineId);
    return airline ? airline.name : 'Aerolínea desconocida';
  };

  const getBrandName = (brandId: number) => {
    const brand = brands.find(b => b.id === brandId);
    return brand ? brand.name : 'Marca desconocida';
  };

  const getAirportCity = (airportId: number) => {
    /**
     * El aeropuerto correspondiente al ID dado. Puede ser null si no se encuentra
     * en la lista de aeropuertos.
     * @type {(import('../types').Airport | null)}
     */
    const airport = airports.find(a => a.id === airportId);
    if (airport) {
      const city = cities.find(c => c.id === airport.city_id);
      return city ? city.name : 'Ciudad desconocida';
    }
    return 'Ciudad desconocida';
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const renderFlightCard = (flight: Flight) => (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:scale-105">
      <div className="relative">
        <div className="bg-gradient-to-r from-sky-500 to-blue-600 p-4">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center space-x-2">
              <Plane size={20} />
              <span className="font-semibold">{flight.airline_name}</span>
            </div>
            <span className="bg-white/20 px-2 py-1 rounded-full text-sm">{flight.class}</span>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-sky-400/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-gray-600">
            <MapPin size={16} className="inline mr-1" />
            {`${flight.origin_city}, ${flight.origin_country}`} → {`${flight.destination_city}, ${flight.destination_country}`}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Clock size={16} className="mr-1" />
            {flight.duration}
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-gray-600">Salida: {flight.out_date}</p>
            <p className="text-sm text-gray-600">Regreso: {flight.back_date}</p>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Users size={16} className="mr-1" />
            {flight.available_seats} asientos
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-sky-600">
            {formatPrice(flight.price)}
          </div>
          <button
            onClick={() => onAddToCart(flight, 'flight')}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg transition-colors duration-200 font-semibold"
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );

  const renderHotelCard = (hotel: Hotel) => (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:scale-105">
      <div className="relative">
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-4">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center space-x-2">
              <HotelIcon size={20} />
              <span className="font-semibold">{hotel.name}</span>
            </div>
            <div className="flex items-center">
              {[...Array(hotel.stars)].map((_, i) => (
                <Star key={i} size={16} fill="currentColor" />
              ))}
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-teal-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <div className="p-6">
        <div className="mb-4">
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <MapPin size={16} className="mr-1" />
            {hotel.city_name}
          </div>
          <p className="text-sm text-gray-600">{hotel.address}</p>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Users size={16} className="mr-1" />
            {hotel.available_rooms} habitaciones disponibles
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-emerald-600">
              {formatPrice(hotel.price_per_night)}
            </div>
            <div className="text-sm text-gray-600">por noche</div>
          </div>
          <button
            onClick={() => onAddToCart(hotel, 'hotel')}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg transition-colors duration-200 font-semibold"
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );

  const renderPackageCard = (pkg: Package) => (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:scale-105">
      <div className="relative">
        <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-4">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center space-x-2">
              <Package2 size={20} />
              <span className="font-semibold">{pkg.name}</span>
            </div>
            <span className="bg-white/20 px-2 py-1 rounded-full text-xs">PAQUETE</span>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <div className="p-6">
        <div className="mb-4">
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <MapPin size={16} className="mr-1" />
            {getDestinationName(pkg.city_destiny_id)}
          </div>
          <p className="text-sm text-gray-600">{pkg.description}</p>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {pkg.includes_flight && (
            <span className="bg-sky-100 text-sky-700 px-2 py-1 rounded-full text-xs">✈️ Vuelo</span>
          )}
          {pkg.includes_hotel && (
            <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-xs">🏨 Hotel</span>
          )}
          {pkg.includes_car && (
            <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs">🚗 Auto</span>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-purple-600">
            {formatPrice(pkg.total_price)}
          </div>
          <button
            onClick={() => onAddToCart(pkg, 'package')}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg transition-colors duration-200 font-semibold"
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );

  const renderCarCard = (car: CarType) => (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:scale-105">
      <div className="relative">
        <div className="bg-gradient-to-r from-orange-500 to-red-600 p-4">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center space-x-2">
              <Car size={20} />
              <span className="font-semibold">{getBrandName(car.brand_id)} {car.model}</span>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs ${
              car.disponibility 
                ? 'bg-green-500/20 text-green-100' 
                : 'bg-red-500/20 text-red-100'
            }`}>
              {car.disponibility ? 'Disponible' : 'No disponible'}
            </span>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <div className="p-6">
        <div className="mb-4">
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <MapPin size={16} className="mr-1" />
            {getDestinationName(car.city_id)}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-orange-600">
              {formatPrice(car.price_per_day)}
            </div>
            <div className="text-sm text-gray-600">por día</div>
          </div>
          <button
            onClick={() => onAddToCart(car, 'car')}
            disabled={!car.disponibility}
            className={`px-6 py-2 rounded-lg transition-colors duration-200 font-semibold ${
              car.disponibility
                ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {car.disponibility ? 'Agregar' : 'No disponible'}
          </button>
        </div>
      </div>
    </div>
  );

  switch (type) {
    case 'flight':
      return renderFlightCard(product as Flight);
    case 'hotel':
      return renderHotelCard(product as Hotel);
    case 'package':
      return renderPackageCard(product as Package);
    case 'car':
      return renderCarCard(product as CarType);
    default:
      return null;
  }
};

export default ProductCard;