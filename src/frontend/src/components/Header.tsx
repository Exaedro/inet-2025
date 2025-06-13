import React, { useState } from 'react';
import { Search, ShoppingCart, User, Menu, X, Plane, Hotel, Package, Car } from 'lucide-react';
import { ProductType } from '../types';

interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
  onAuthClick: () => void;
  currentUser: any;
  onLogout: () => void;
  onProductTypeChange: (type: ProductType) => void;
  currentProductType: ProductType;
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  cartItemsCount,
  onCartClick,
  onAuthClick,
  currentUser,
  onLogout,
  onProductTypeChange,
  currentProductType,
  onSearch
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const productTypes = [
    { key: 'flight' as ProductType, label: 'Vuelos', icon: Plane },
    { key: 'hotel' as ProductType, label: 'Hoteles', icon: Hotel },
    { key: 'package' as ProductType, label: 'Paquetes', icon: Package },
    { key: 'car' as ProductType, label: 'Autos', icon: Car },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-sky-500 to-yellow-500 bg-clip-text text-transparent">
                TravelCart
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {productTypes.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => onProductTypeChange(key)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
                  currentProductType === key
                    ? 'bg-sky-100 text-sky-700'
                    : 'text-gray-600 hover:text-sky-600 hover:bg-sky-50'
                }`}
              >
                <Icon size={18} />
                <span>{label}</span>
              </button>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Buscar destinos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                />
              </div>
            </form>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <button
              onClick={onCartClick}
              className="relative p-2 text-gray-600 hover:text-sky-600 transition-colors duration-200"
            >
              <ShoppingCart size={24} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* User Menu */}
            <div className="relative">
              {currentUser ? (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-700 hidden sm:block">{currentUser.name}</span>
                  <button
                    onClick={onLogout}
                    className="bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600 transition-colors duration-200"
                  >
                    Salir
                  </button>
                </div>
              ) : (
                <button
                  onClick={onAuthClick}
                  className="flex items-center space-x-2 bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600 transition-colors duration-200"
                >
                  <User size={18} />
                  <span>Ingresar</span>
                </button>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-600"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Buscar destinos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  />
                </div>
              </form>

              {/* Mobile Navigation */}
              {productTypes.map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => {
                    onProductTypeChange(key);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
                    currentProductType === key
                      ? 'bg-sky-100 text-sky-700'
                      : 'text-gray-600 hover:text-sky-600 hover:bg-sky-50'
                  }`}
                >
                  <Icon size={18} />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;