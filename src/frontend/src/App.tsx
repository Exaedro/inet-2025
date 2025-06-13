import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ProductGrid from './components/ProductGrid';
import Cart from './components/Cart';
import AuthModal from './components/AuthModal';
import AdminPanel from './components/AdminPanel';
import { User, CartItem, ProductType, Flight, Hotel, Package, Car } from './types';
import { 
  mockFlights, 
  mockHotels, 
  mockPackages, 
  mockCars,
  mockCities,
  mockAirports,
  mockBrands
} from './data/mockData';

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentProductType, setCurrentProductType] = useState<ProductType>('flights');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<(Flight | Hotel | Package | Car)[]>([]);

  // Get current products based on selected type
  const getCurrentProducts = (): (Flight | Hotel | Package | Car)[] => {
    switch (currentProductType) {
      case 'flights':
        return mockFlights;
      case 'hotels':
        return mockHotels;
      case 'packages':
        return mockPackages;
      case 'cars':
        return mockCars;
      default:
        return [];
    }
  };

  // Filter products based on search query
  useEffect(() => {
    const products = getCurrentProducts();
    
    if (!searchQuery.trim()) {
      setFilteredProducts(products);
      return;
    }

    const filtered = products.filter(product => {
      const searchLower = searchQuery.toLowerCase();
      
      switch (currentProductType) {
        case 'flights':
          const flight = product as Flight;
          const originAirport = mockAirports.find(a => a.id === flight.origin_id);
          const destinyAirport = mockAirports.find(a => a.id === flight.destiny_id);
          const originCity = mockCities.find(c => c.id === originAirport?.city_id);
          const destinyCity = mockCities.find(c => c.id === destinyAirport?.city_id);
          return (
            originCity?.name.toLowerCase().includes(searchLower) ||
            destinyCity?.name.toLowerCase().includes(searchLower) ||
            flight.class.toLowerCase().includes(searchLower)
          );
        
        case 'hotels':
          const hotel = product as Hotel;
          const hotelCity = mockCities.find(c => c.id === hotel.city_id);
          return (
            hotel.nombre.toLowerCase().includes(searchLower) ||
            hotelCity?.name.toLowerCase().includes(searchLower) ||
            hotel.address.toLowerCase().includes(searchLower)
          );
        
        case 'packages':
          const pkg = product as Package;
          const pkgCity = mockCities.find(c => c.id === pkg.city_destiny_id);
          return (
            pkg.name.toLowerCase().includes(searchLower) ||
            pkg.description.toLowerCase().includes(searchLower) ||
            pkgCity?.name.toLowerCase().includes(searchLower)
          );
        
        case 'cars':
          const car = product as Car;
          const carCity = mockCities.find(c => c.id === car.city_id);
          const brand = mockBrands.find(b => b.id === car.brand_id);
          return (
            car.model.toLowerCase().includes(searchLower) ||
            brand?.name.toLowerCase().includes(searchLower) ||
            carCity?.name.toLowerCase().includes(searchLower)
          );
        
        default:
          return false;
      }
    });
    
    setFilteredProducts(filtered);
  }, [searchQuery, currentProductType]);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCartItems([]);
  };

  const handleAddToCart = (product: any, type: string) => {
    if (!currentUser) {
      setIsAuthOpen(true);
      return;
    }

    const existingItem = cartItems.find(
      item => item.item_id === product.id && item.type_item === type
    );

    if (existingItem) {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === existingItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        )
      );
    } else {
      const newItem: CartItem = {
        id: cartItems.length + 1,
        cart_id: 1,
        type_item: type,
        item_id: product.id,
        amount: 1,
      };
      setCartItems(prevItems => [...prevItems, newItem]);
    }
  };

  const handleUpdateQuantity = (itemId: number, amount: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, amount } : item
      )
    );
  };

  const handleRemoveItem = (itemId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const handleCheckout = () => {
    alert('¡Gracias por tu compra! Tu pedido ha sido procesado.');
    setCartItems([]);
    setIsCartOpen(false);
  };

  const handleProductTypeChange = (type: ProductType) => {
    setCurrentProductType(type);
    setSearchQuery('');
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleAuthClick = () => {
    setIsAuthOpen(true);
  };

  const getProductTypeForGrid = (): 'flight' | 'hotel' | 'package' | 'car' => {
    switch (currentProductType) {
      case 'flights':
        return 'flight';
      case 'hotels':
        return 'hotel';
      case 'packages':
        return 'package';
      case 'cars':
        return 'car';
      default:
        return 'flight';
    }
  };

  const getPageTitle = () => {
    switch (currentProductType) {
      case 'flights':
        return 'Descubre los mejores vuelos';
      case 'hotels':
        return 'Encuentra tu hotel ideal';
      case 'packages':
        return 'Paquetes de viaje únicos';
      case 'cars':
        return 'Alquila el auto perfecto';
      default:
        return 'Planifica tu viaje perfecto';
    }
  };

  const getPageSubtitle = () => {
    switch (currentProductType) {
      case 'flights':
        return 'Conectamos tus destinos favoritos con las mejores aerolíneas';
      case 'hotels':
        return 'Alojamientos excepcionales para cada tipo de viajero';
      case 'packages':
        return 'Experiencias completas diseñadas para crear recuerdos inolvidables';
      case 'cars':
        return 'Libertad total para explorar cada rincón de tu destino';
      default:
        return 'Todo lo que necesitas para una experiencia de viaje inolvidable';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-yellow-50">
      <Header
        cartItemsCount={cartItems.length}
        onCartClick={() => setIsCartOpen(true)}
        onAuthClick={handleAuthClick}
        currentUser={currentUser}
        onLogout={handleLogout}
        onProductTypeChange={handleProductTypeChange}
        currentProductType={currentProductType}
        onSearch={handleSearch}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            {getPageTitle()}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            {getPageSubtitle()}
          </p>
          
          {/* Admin Panel Button for Admin Users */}
          {currentUser?.is_admin && (
            <button
              onClick={() => setIsAdminPanelOpen(true)}
              className="mb-8 bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Abrir Panel de Administración
            </button>
          )}
          
          <div className="flex justify-center">
            <div className="bg-white rounded-2xl p-2 shadow-lg">
              <div className="flex flex-wrap gap-2">
                <span className="bg-sky-100 text-sky-700 px-4 py-2 rounded-xl text-sm font-medium">
                  🏖️ Destinos de playa
                </span>
                <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-xl text-sm font-medium">
                  ☀️ Experiencias únicas
                </span>
                <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-xl text-sm font-medium">
                  🌊 Aventuras inolvidables
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <ProductGrid
          products={filteredProducts}
          productType={getProductTypeForGrid()}
          onAddToCart={handleAddToCart}
        />
      </main>

      {/* Modals and Components */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLogin={handleLogin}
      />

      <AdminPanel
        isOpen={isAdminPanelOpen}
        onClose={() => setIsAdminPanelOpen(false)}
      />
    </div>
  );
}

export default App;