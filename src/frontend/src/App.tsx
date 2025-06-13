import { useState, useEffect } from 'react';
import Header from './components/Header';
import ProductGrid from './components/ProductGrid';
import Cart from './components/Cart';
import AuthModal from './components/AuthModal';
import AdminPanel from './components/AdminPanel';
import { User, CartItem, ProductType, Flight, Hotel, Package, Car, Airport, City, Brand } from './types';

import { API_URL } from './data/mockData';

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentProductType, setCurrentProductType] = useState<ProductType>('flight');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<(Flight | Hotel | Package | Car)[]>([]);

  const [products, setProducts] = useState<(Flight | Hotel | Package | Car)[]>([]);
  const [airports, setAirports] = useState<Airport[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);

  // Get current products based on selected type
  const getCurrentProducts = async (): Promise<(Flight | Hotel | Package | Car)[]> => {
    switch (currentProductType) {
      case 'flight': {
        const flightsRes = await fetch(API_URL + '/flights');
        const flightsData = await flightsRes.json();
        return flightsData.data || [];
      }
      case 'hotel': {
        const hotelsRes = await fetch(API_URL + '/hotels');
        const hotelsData = await hotelsRes.json();
        return hotelsData.data || [];
      }
      case 'package': {
        const packagesRes = await fetch(API_URL + '/packages');
        const packagesData = await packagesRes.json();
        return packagesData.data || [];
      }
      case 'car': {
        const carsRes = await fetch(API_URL + '/cars');
        const carsData = await carsRes.json();
        return carsData.data || [];
      }
      default:
        return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setProducts(await getCurrentProducts());

      const airportsRes = await fetch(API_URL + '/airports');
      const airportsData = await airportsRes.json();
      setAirports(airportsData);

      const citiesRes = await fetch(API_URL + '/cities');
      const citiesData = await citiesRes.json();
      setCities(citiesData);

      const brandsRes = await fetch(API_URL + '/brands');
      const brandsData = await brandsRes.json();
      setBrands(brandsData);
    };
    fetchData();
  }, [currentProductType]);
  
  // Filtrar productos según la búsqueda y el tipo
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredProducts(products);
      return;
    }

    const filtered = products.filter(product => {
      const searchLower = searchQuery.toLowerCase();

      switch (currentProductType) {
        case 'flight':
          const flight = product as Flight;
          const originAirport = airports.find(a => a.id === flight.origin_id);
          const destinyAirport = airports.find(a => a.id === flight.destiny_id);
          const originCity = cities.find(c => c.id === originAirport?.city_id);
          const destinyCity = cities.find(c => c.id === destinyAirport?.city_id);
          return (
            originCity?.name.toLowerCase().includes(searchLower) ||
            destinyCity?.name.toLowerCase().includes(searchLower) ||
            flight.class.toLowerCase().includes(searchLower)
          );

        case 'hotel':
          const hotel = product as Hotel;
          const hotelCity = cities.find(c => c.id === hotel.city_id);
          return (
            hotel.name.toLowerCase().includes(searchLower) ||
            hotelCity?.name.toLowerCase().includes(searchLower) ||
            hotel.address.toLowerCase().includes(searchLower)
          );

        case 'package':
          const pkg = product as Package;
          const pkgCity = cities.find(c => c.id === pkg.city_destiny_id);
          return (
            pkg.name.toLowerCase().includes(searchLower) ||
            pkg.description.toLowerCase().includes(searchLower) ||
            pkgCity?.name.toLowerCase().includes(searchLower)
          );

        case 'car':
          const car = product as Car;
          const carCity = cities.find(c => c.id === car.city_id);
          const brand = brands.find(b => b.id === car.brand_id);
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
    // Cambia la sección y limpia la búsqueda. El useEffect de productos se ejecutará automáticamente.
    setCurrentProductType(type);
    setSearchQuery('');
    // Opcional: Limpiar productos filtrados para evitar parpadeos
    setFilteredProducts([]);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleAuthClick = () => {
    setIsAuthOpen(true);
  };

  const getProductTypeForGrid = (): 'flight' | 'hotel' | 'package' | 'car' => {
    switch (currentProductType) {
      case 'flight':
        return 'flight';
      case 'hotel':
        return 'hotel';
      case 'package':
        return 'package';
      case 'car':
        return 'car';
      default:
        return 'flight';
    }
  };

  const getPageTitle = () => {
    switch (currentProductType) {
      case 'flight':
        return 'Descubre los mejores vuelos';
      case 'hotel':
        return 'Encuentra tu hotel ideal';
      case 'package':
        return 'Paquetes de viaje únicos';
      case 'car':
        return 'Alquila el auto perfecto';
      default:
        return 'Planifica tu viaje perfecto';
    }
  };

  const getPageSubtitle = () => {
    switch (currentProductType) {
      case 'flight':
        return 'Conectamos tus destinos favoritos con las mejores aerolíneas';
      case 'hotel':
        return 'Alojamientos excepcionales para cada tipo de viajero';
      case 'package':
        return 'Experiencias completas diseñadas para crear recuerdos inolvidables';
      case 'car':
        return 'Libertad total para explorar cada rincón de tu destino';
      default:
        return 'Todo lo que necesitas para una experiencia de viaje inolvidable';
    }
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-yellow-50">
      <Header
        cartItemsCount={cartItems.reduce((acc, item) => acc + item.amount, 0)}
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

        <ProductGrid
          products={products}
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