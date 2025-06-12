import React from 'react';
import { Clock, Shield, Car, Plane, MapPin, Star, Calendar } from 'lucide-react';
import { Service } from '../types';
import { useCart } from '../contexts/CartContext';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const { addServiceToCart } = useCart();

  const handleAddToCart = () => {
    addServiceToCart(service);
  };

  const getServiceIcon = (type: Service['type']) => {
    switch (type) {
      case 'transfer':
        return <Plane className="h-5 w-5" />;
      case 'car_rental':
        return <Car className="h-5 w-5" />;
      case 'insurance':
        return <Shield className="h-5 w-5" />;
      case 'excursion':
        return <MapPin className="h-5 w-5" />;
      case 'meal':
        return <Clock className="h-5 w-5" />;
      default:
        return <Star className="h-5 w-5" />;
    }
  };

  const getServiceTypeLabel = (type: Service['type']) => {
    switch (type) {
      case 'transfer':
        return 'Transfer';
      case 'car_rental':
        return 'Alquiler de Auto';
      case 'insurance':
        return 'Seguro';
      case 'excursion':
        return 'Excursión';
      case 'meal':
        return 'Gastronomía';
      default:
        return 'Servicio';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'vip':
      case 'lujo':
      case 'premium':
        return 'bg-purple-100 text-purple-800';
      case 'económico':
      case 'básico':
        return 'bg-green-100 text-green-800';
      case 'familiar':
        return 'bg-blue-100 text-blue-800';
      case 'romántico':
        return 'bg-pink-100 text-pink-800';
      case 'aventura':
        return 'bg-orange-100 text-orange-800';
      case 'cultural':
        return 'bg-indigo-100 text-indigo-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group">
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 flex items-center space-x-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
          {getServiceIcon(service.type)}
          <span className="text-sm font-medium text-gray-700">
            {getServiceTypeLabel(service.type)}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-sm font-bold ${getCategoryColor(service.category)}`}>
            {service.category}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-800 line-clamp-2">
            {service.name}
          </h3>
          <div className="flex items-center space-x-1 text-yellow-500">
            <Star className="h-4 w-4 fill-current" />
            <span className="text-sm font-medium">4.9</span>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {service.description}
        </p>

        {/* Features */}
        <div className="flex flex-wrap gap-2 mb-4">
          {service.features.slice(0, 3).map((feature, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
            >
              {feature}
            </span>
          ))}
        </div>

        {/* Details */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-1">
            <MapPin className="h-4 w-4" />
            <span>{service.destination || 'Disponible'}</span>
          </div>
          {service.duration && (
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{service.duration} día{service.duration !== 1 ? 's' : ''}</span>
            </div>
          )}
        </div>

        {/* Price and Action */}
        <div className="flex items-center justify-between">
          <div className="text-left">
            <div className="text-sm text-gray-500">Desde</div>
            <div className="text-2xl font-bold text-blue-600">
              US${service.price.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500">
              {service.type === 'insurance' ? 'por persona' : 'por servicio'}
            </div>
          </div>
          
          <button
            onClick={handleAddToCart}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-full hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;