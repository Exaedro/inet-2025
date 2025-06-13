import React from 'react';
import { X, Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import { CartItem } from '../types';
import { mockFlights, mockHotels, mockPackages, mockCars, mockCities, mockAirports, mockBrands } from '../data/mockData';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (itemId: number, amount: number) => void;
  onRemoveItem: (itemId: number) => void;
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}) => {
  const getProductDetails = (item: CartItem) => {
    let product: any = null;
    let name = '';
    let price = 0;
    
    switch (item.type_item) {
      case 'flight':
        product = mockFlights.find(f => f.id === item.item_id);
        if (product) {
          const originAirport = mockAirports.find(a => a.id === product.origin_id);
          const destinyAirport = mockAirports.find(a => a.id === product.destiny_id);
          const originCity = mockCities.find(c => c.id === originAirport?.city_id);
          const destinyCity = mockCities.find(c => c.id === destinyAirport?.city_id);
          name = `Vuelo ${originCity?.name} → ${destinyCity?.name}`;
          price = product.price;
        }
        break;
      case 'hotel':
        product = mockHotels.find(h => h.id === item.item_id);
        if (product) {
          name = product.nombre;
          price = product.price_per_night;
        }
        break;
      case 'package':
        product = mockPackages.find(p => p.id === item.item_id);
        if (product) {
          name = product.name;
          price = product.total_price;
        }
        break;
      case 'car':
        product = mockCars.find(c => c.id === item.item_id);
        if (product) {
          const brand = mockBrands.find(b => b.id === product.brand_id);
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
                            <p className="text-sm text-gray-600 capitalize">{item.type_item}</p>
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
                onClick={onCheckout}
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