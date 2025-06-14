import React, { useEffect, useState } from 'react';
import { X, Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import { Airport, Brand, Car, CartItem, Hotel, Package, City, Flight } from '../types';

import { API_URL } from '../data/mockData';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (itemId: number, amount: number) => void;
  onRemoveItem: (itemId: number) => void;
}

const Cart: React.FC<CartProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
}) => {
  const [cities, setCities] = useState<City[]>([]);
  const [airports, setAirports] = useState<Airport[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [cars, setCars] = useState<Car[]>([]);
  const [flights, setFlights] = useState<Flight[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const flightsRes = await fetch(API_URL + '/flights')
      const flightsData = await flightsRes.json()
      setFlights(flightsData.data)

      const hotelsRes = await fetch(API_URL + '/hotels')
      const hotelsData = await hotelsRes.json()
      setHotels(hotelsData.data)

      const packagesRes = await fetch(API_URL + '/packages')
      const packagesData = await packagesRes.json()
      setPackages(packagesData.data)

      const carsRes = await fetch(API_URL + '/cars')
      const carsData = await carsRes.json()
      setCars(carsData.data)

      const citiesRes = await fetch(API_URL + '/cities')
      const citiesData = await citiesRes.json()
      setCities(citiesData.data)

      const airportsRes = await fetch(API_URL + '/airports')
      const airportsData = await airportsRes.json()
      setAirports(airportsData.data)

      const brandsRes = await fetch(API_URL + '/brands')
      const brandsData = await brandsRes.json()
      setBrands(brandsData.data)
    }
    fetchData()
  }, [])

  const getProductDetails = (item: CartItem) => {
    let product: any = null;
    let name = '';
    let price = 0;
    
    switch (item.type_item) {
      case 'flight':
        product = flights.find(f => f.id === item.item_id);
        console.log(product)
        if (product) {
          const originCity = `${product.origin_city}, ${product.origin_country}`
          const destinyCity = `${product.destination_city}, ${product.destination_country}`
          name = `Vuelo ${originCity} → ${destinyCity}`;
          price = product.price;
        }
        break;
      case 'hotel':
        product = hotels.find(h => h.id === item.item_id);
        if (product) {
          name = product.name;
          price = product.price_per_night;
        }
        break;
      case 'package':
        product = packages.find(p => p.id === item.item_id);
        if (product) {
          name = product.name;
          price = product.total_price;
        }
        break;
      case 'car':
        product = cars.find(c => c.id === item.item_id);
        if (product) {
          const brand = brands.find(b => b.id === product.brand_id);
          name = `${brand?.name} ${product.model}`;
          price = product.price_per_day;
        }
        break;
    }
    
    return { product, name, price };
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => {
      const { price } = getProductDetails(item);
      return total + (price * item.amount);
    }, 0);
  };

  const getItemIcon = (type: string) => {
    switch (type) {
      case 'flight': return '✈️';
      case 'hotel': return '🏨';
      case 'package': return '📦';
      case 'car': return '🚗';
      default: return '📦';
    }
  };

  const checkout = async () => {
    const order = await fetch(API_URL + '/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: 9
      })
    })

    const orderData = await order.json()

    const ccItems = items.map(item => {
      const { price } = getProductDetails(item);
      return {
        item_id: item.id,
        price,
        quantity: item.amount,
        type_item: typeof item?.class === 'string' ? 'flight' : typeof item?.price_per_night === 'number' ? 'hotel' : typeof item?.includes_flight === 'boolean' ? 'package' : 'car' ,
      }
    })

    for(const item of ccItems) {
      await fetch(API_URL + '/orders/' + orderData.data.id + '/order-items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
      })
    }

    window.location.href = API_URL + '/orders/' + orderData.data.id + '/pay'
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <ShoppingCart className="mr-2" size={24} />
              Carrito de Compras
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <X size={24} />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <ShoppingCart size={64} className="mb-4 opacity-30" />
                <p className="text-lg font-medium">Tu carrito está vacío</p>
                <p className="text-sm">Agrega productos para comenzar</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => {
                  const { name, price } = getProductDetails(item);
                  
                  return (
                    <div
                      key={item.id}
                      className="bg-gray-50 rounded-lg p-4 transition-all duration-200 hover:shadow-md"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1">
                          <span className="text-2xl">{getItemIcon(item.type_item)}</span>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{name}</h3>
                            <p className="text-sm text-gray-600 capitalize">{item.type_item === 'flight' ? 'Vuelo' : item.type_item === 'hotel' ? 'Hotel' : item.type_item === 'package' ? 'Paquete' : item.type_item === 'car' ? 'Auto' : 'Producto'}</p>
                            <p className="text-lg font-bold text-sky-600 mt-1">
                              {formatPrice(price)}
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="p-1 hover:bg-red-100 rounded-full text-red-500 transition-colors duration-200"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => onUpdateQuantity(item.id, Math.max(1, item.amount - 1))}
                            className="p-1 hover:bg-gray-200 rounded-full transition-colors duration-200"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-8 text-center font-semibold">{item.amount}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.amount + 1)}
                            className="p-1 hover:bg-gray-200 rounded-full transition-colors duration-200"
                          >
                            <Plus size={16} />
                          </button>
                        </div>

                        <div className="text-right">
                          <p className="text-sm text-gray-600">Subtotal</p>
                          <p className="font-bold text-gray-900">
                            {formatPrice(price * item.amount)}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t p-6 bg-gray-50">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-2xl font-bold text-sky-600">
                  {formatPrice(getTotalPrice())}
                </span>
              </div>
              
              <button
                onClick={() => checkout()}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                Proceder al Pago
              </button>
              
              <p className="text-xs text-gray-500 text-center mt-2">
                Envío gratuito en todos los paquetes
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;