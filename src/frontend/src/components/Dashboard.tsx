import React, { useState, useMemo } from 'react';
import { Search, Car, Shield, Plane, MapPin, Utensils } from 'lucide-react';
import Header from './Header';
import ProductCard from './ProductCard';
import ServiceCard from './ServiceCard';
import ShoppingCart from './ShoppingCart';
import RobotAssistant from './RobotAssistant';
import UserProfile from './UserProfile';
import AdminPanel from './AdminPanel';
import SalesPanel from './SalesPanel';
import { mockProducts, mockServices } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Todos');
  const [activeTab, setActiveTab] = useState('packages');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [showSalesPanel, setShowSalesPanel] = useState(false);

  const filteredProducts = useMemo(() => {
    let filtered = mockProducts;

    if (searchQuery.trim()) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.destination.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedFilter !== 'Todos') {
      filtered = filtered.filter(product => product.category === selectedFilter);
    }

    return filtered;
  }, [searchQuery, selectedFilter]);

  const filteredServices = useMemo(() => {
    let filtered = mockServices;

    if (searchQuery.trim()) {
      filtered = filtered.filter(service =>
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedFilter !== 'Todos') {
      if (selectedFilter === 'Transfers') {
        filtered = filtered.filter(service => service.type === 'transfer');
      } else if (selectedFilter === 'Autos') {
        filtered = filtered.filter(service => service.type === 'car_rental');
      } else if (selectedFilter === 'Seguros') {
        filtered = filtered.filter(service => service.type === 'insurance');
      } else if (selectedFilter === 'Excursiones') {
        filtered = filtered.filter(service => service.type === 'excursion');
      } else if (selectedFilter === 'Gastronomía') {
        filtered = filtered.filter(service => service.type === 'meal');
      }
    }

    return filtered;
  }, [searchQuery, selectedFilter]);

  const serviceCategories = [
    { key: 'transfer', label: 'Transfers', icon: Plane, count: mockServices.filter(s => s.type === 'transfer').length },
    { key: 'car_rental', label: 'Autos', icon: Car, count: mockServices.filter(s => s.type === 'car_rental').length },
    { key: 'insurance', label: 'Seguros', icon: Shield, count: mockServices.filter(s => s.type === 'insurance').length },
    { key: 'excursion', label: 'Excursiones', icon: MapPin, count: mockServices.filter(s => s.type === 'excursion').length },
    { key: 'meal', label: 'Gastronomía', icon: Utensils, count: mockServices.filter(s => s.type === 'meal').length }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Header
        onSearch={setSearchQuery}
        onFilter={setSelectedFilter}
        onCartClick={() => setIsCartOpen(true)}
        onUserClick={() => setShowUserProfile(true)}
        onAdminClick={user?.role === 'admin' ? () => setShowAdminPanel(true) : undefined}
        onSalesClick={(user?.role === 'sales' || user?.role === 'admin') ? () => setShowSalesPanel(true) : undefined}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Reservá viajes de la forma más rápida y eficiente
          </h1>
          <p className="text-xl md:text-2xl text-blue-200 mb-8 max-w-4xl mx-auto">
            Paquetes con salidas confirmadas. Grupales, más de un millón de hoteles, 
            circuitos por el mundo y más...
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center space-x-2 bg-blue-700 px-4 py-2 rounded-full">
              <span>✈️</span>
              <span>Vuelos, Trenes y Buses</span>
            </div>
            <div className="flex items-center space-x-2 bg-blue-700 px-4 py-2 rounded-full">
              <span>🏨</span>
              <span>Alojamiento</span>
            </div>
            <div className="flex items-center space-x-2 bg-blue-700 px-4 py-2 rounded-full">
              <span>🎯</span>
              <span>Vuelo + Alojamiento</span>
            </div>
            <div className="flex items-center space-x-2 bg-blue-700 px-4 py-2 rounded-full">
              <span>🗺️</span>
              <span>Circuitos y Paquetes</span>
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Bar */}
      <section className="bg-white py-8 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-8 overflow-x-auto">
            {[
              { name: 'BRASIL', icon: '🇧🇷' },
              { name: 'MÉXICO', icon: '🇲🇽' },
              { name: 'CUBA', icon: '🇨🇺' },
              { name: 'CARIBE', icon: '🏝️' },
              { name: 'EUROPA', icon: '🇪🇺' },
              { name: 'ESTADOS UNIDOS', icon: '🇺🇸' }
            ].map((dest) => (
              <button
                key={dest.name}
                onClick={() => setSearchQuery(dest.name)}
                className="flex flex-col items-center space-y-2 p-4 hover:bg-gray-50 rounded-lg transition-colors duration-200 min-w-max"
              >
                <div className="text-3xl">{dest.icon}</div>
                <span className="text-sm font-medium text-gray-700">{dest.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex space-x-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab('packages')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors duration-200 whitespace-nowrap ${
                activeTab === 'packages'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Paquetes de Viaje ({mockProducts.length})
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors duration-200 whitespace-nowrap ${
                activeTab === 'services'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Servicios Adicionales ({mockServices.length})
            </button>
          </div>
        </div>
      </section>

      {/* Services Categories (only show when services tab is active) */}
      {activeTab === 'services' && (
        <section className="bg-gray-50 py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {serviceCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.key}
                    onClick={() => setSelectedFilter(category.label)}
                    className="flex flex-col items-center space-y-3 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105"
                  >
                    <div className="p-3 bg-blue-100 rounded-full">
                      <Icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="text-center">
                      <h3 className="font-semibold text-gray-800">{category.label}</h3>
                      <p className="text-sm text-gray-500">{category.count} opciones</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {activeTab === 'packages' ? 'Paquetes Destacados' : 'Servicios Adicionales'}
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {activeTab === 'packages' 
                ? 'Descubre nuestras ofertas especiales y vive experiencias inolvidables'
                : 'Complementa tu viaje con nuestros servicios adicionales'
              }
            </p>
          </div>

          {/* Search Results Info */}
          {(searchQuery || selectedFilter !== 'Todos') && (
            <div className="mb-8 text-center">
              <p className="text-gray-600">
                {activeTab === 'packages' 
                  ? `${filteredProducts.length} paquete${filteredProducts.length !== 1 ? 's' : ''} encontrado${filteredProducts.length !== 1 ? 's' : ''}`
                  : `${filteredServices.length} servicio${filteredServices.length !== 1 ? 's' : ''} encontrado${filteredServices.length !== 1 ? 's' : ''}`
                }
                {searchQuery && ` para "${searchQuery}"`}
                {selectedFilter !== 'Todos' && ` en ${selectedFilter}`}
              </p>
            </div>
          )}

          {/* Content Grid */}
          {activeTab === 'packages' ? (
            filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No se encontraron paquetes
                </h3>
                <p className="text-gray-500">
                  Intenta con otros términos de búsqueda o filtros
                </p>
              </div>
            )
          ) : (
            filteredServices.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredServices.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No se encontraron servicios
                </h3>
                <p className="text-gray-500">
                  Intenta con otros términos de búsqueda o filtros
                </p>
              </div>
            )
          )}
        </div>
      </section>

      {/* Modals */}
      <ShoppingCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <UserProfile isOpen={showUserProfile} onClose={() => setShowUserProfile(false)} />
      {user?.role === 'admin' && (
        <AdminPanel isOpen={showAdminPanel} onClose={() => setShowAdminPanel(false)} />
      )}
      {(user?.role === 'sales' || user?.role === 'admin') && (
        <SalesPanel isOpen={showSalesPanel} onClose={() => setShowSalesPanel(false)} />
      )}

      {/* Robot Assistant */}
      <RobotAssistant />
    </div>
  );
};

export default Dashboard;