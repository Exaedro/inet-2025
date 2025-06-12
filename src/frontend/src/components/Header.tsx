import React, { useState } from 'react';
import { ShoppingCart, User, Search, Filter, LogOut, Settings, Package } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

interface HeaderProps {
  onSearch: (query: string) => void;
  onFilter: (filter: string) => void;
  onCartClick: () => void;
  onUserClick: () => void;
  onAdminClick?: () => void;
  onSalesClick?: () => void;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  onSearch, 
  onFilter, 
  onCartClick, 
  onUserClick,
  onAdminClick,
  onSalesClick,
  activeTab,
  onTabChange
}) => {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const getFilters = () => {
    if (activeTab === 'services') {
      return [
        'Todos',
        'Transfers',
        'Autos',
        'Seguros',
        'Excursiones',
        'Gastronomía'
      ];
    }
    return [
      'Todos',
      'Playa',
      'Ciudad',
      'Grupal',
      'All Inclusive',
      'Crucero'
    ];
  };

  const filters = getFilters();

  return (
    <header className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white shadow-lg">
      {/* Top Bar */}
      <div className="bg-blue-800 text-sm py-2 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex space-x-4">
            <span>📞 +54 11 4000-0000</span>
            <span>📧 info@beachtravel.com</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>Moneda: USD</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-yellow-400 p-2 rounded-lg">
              <svg width="32" height="32" viewBox="0 0 32 32" className="text-blue-800">
                <path fill="currentColor" d="M16 2L2 12v18h28V12L16 2z"/>
                <circle cx="16" cy="20" r="6" fill="white"/>
                <circle cx="16" cy="20" r="3" fill="currentColor"/>
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold">Beach Travel</h1>
              <p className="text-sm text-blue-200">Tu aventura comienza aquí</p>
            </div>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder={activeTab === 'services' ? "Buscar servicios..." : "Buscar destinos, paquetes..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 pr-4 text-gray-900 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            <button
              type="submit"
              className="ml-2 px-6 py-2 bg-yellow-400 text-blue-800 font-semibold rounded-full hover:bg-yellow-300 transition-colors duration-200"
            >
              Buscar
            </button>
          </form>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <button
              onClick={onCartClick}
              className="relative p-2 hover:bg-blue-700 rounded-lg transition-colors duration-200"
            >
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-400 text-blue-800 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 p-2 hover:bg-blue-700 rounded-lg transition-colors duration-200"
              >
                <User className="h-6 w-6" />
                <span className="hidden md:inline">{user?.name}</span>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                  <button
                    onClick={() => {
                      onUserClick();
                      setShowUserMenu(false);
                    }}
                    className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    <User className="h-4 w-4" />
                    <span>Mi Perfil</span>
                  </button>
                  
                  {user?.role === 'admin' && onAdminClick && (
                    <button
                      onClick={() => {
                        onAdminClick();
                        setShowUserMenu(false);
                      }}
                      className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      <Settings className="h-4 w-4" />
                      <span>Panel Admin</span>
                    </button>
                  )}
                  
                  {(user?.role === 'sales' || user?.role === 'admin') && onSalesClick && (
                    <button
                      onClick={() => {
                        onSalesClick();
                        setShowUserMenu(false);
                      }}
                      className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      <Package className="h-4 w-4" />
                      <span>Panel de Ventas</span>
                    </button>
                  )}
                  
                  <hr className="my-1" />
                  <button
                    onClick={logout}
                    className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 w-full text-left"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Cerrar Sesión</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-blue-700 py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 overflow-x-auto">
            <Filter className="h-4 w-4 flex-shrink-0" />
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => onFilter(filter)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-200"
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;