import React from 'react';
import { X, Plus, Minus, ShoppingBag, CreditCard, MapPin, Calendar, Users, Star, Car, Shield, Plane, Clock, Utensils } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({ isOpen, onClose }) => {
  const { items, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();
  const { user } = useAuth();

  const handleCheckout = () => {
    if (items.length === 0) return;
    
    // Create order
    const order = {
      id: `ORD${Date.now()}`,
      customerId: user?.id || '',
      customerName: user?.name || '',
      customerEmail: user?.email || '',
      items: [...items],
      total: totalPrice,
      status: 'pending' as const,
      createdAt: new Date()
    };

    // In a real app, this would be sent to an API
    console.log('Creating order:', order);
    
    clearCart();
    alert('¡Pedido realizado con éxito! Te enviaremos un email de confirmación.');
    onClose();
  };

  const getServiceIcon = (type: string) => {
    switch (type) {
      case 'transfer':
        return <Plane className="h-4 w-4" />;
      case 'car_rental':
        return <Car className="h-4 w-4" />;
      case 'insurance':
        return <Shield className="h-4 w-4" />;
      case 'excursion':
        return <MapPin className="h-4 w-4" />;
      case 'meal':
        return <Utensils className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getServiceTypeLabel = (type: string) => {
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      {/* Cart Panel */}
      <div className="absolute right-0 top-0 h-full w-full max-w-lg bg-white shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <div className="flex items-center space-x-3">
              <ShoppingBag className="h-6 w-6" />
              <h2 className="text-xl font-bold">Carrito de Compras</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-blue-800 rounded-lg transition-colors duration-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="text-center py-16">
                <ShoppingBag className="h-20 w-20 text-gray-300 mx-auto mb-6" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Tu carrito está vacío</h3>
                <p className="text-gray-500">Agrega algunos paquetes increíbles para comenzar tu aventura</p>
              </div>
            ) : (
              <div className="space-y-6">
                {items.map((item, index) => {
                  const isProduct = item.type === 'product';
                  const itemData = isProduct ? item.product : item.service;
                  const itemId = itemData?.id || '';
                  
                  if (!itemData) return null;

                  return (
                    <div key={`${item.type}-${itemId}-${index}`} className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-5 shadow-md border border-blue-100">
                      <div className="flex items-start space-x-4">
                        <div className="relative">
                          <img
                            src={itemData.image}
                            alt={itemData.name}
                            className="w-20 h-20 object-cover rounded-lg shadow-sm"
                          />
                          <div className="absolute -top-2 -right-2 bg-yellow-400 text-blue-800 text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                            {item.quantity}
                          </div>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="text-lg font-bold text-gray-800 line-clamp-2">
                                {itemData.name}
                              </h3>
                              {!isProduct && (
                                <div className="flex items-center space-x-1 text-blue-600 text-sm mt-1">
                                  {getServiceIcon(item.service?.type || '')}
                                  <span>{getServiceTypeLabel(item.service?.type || '')}</span>
                                </div>
                              )}
                            </div>
                            <button
                              onClick={() => removeFromCart(itemId, item.type)}
                              className="p-1 text-red-500 hover:bg-red-50 rounded-full transition-colors duration-200"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>

                          {/* Package/Service Details */}
                          <div className="space-y-2 mb-3">
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center space-x-2 text-gray-600">
                                <MapPin className="h-4 w-4" />
                                <span>
                                  {isProduct 
                                    ? item.product?.destination 
                                    : item.service?.destination || 'Disponible'
                                  }
                                </span>
                              </div>
                              <div className="flex items-center space-x-1 text-yellow-500">
                                <Star className="h-4 w-4 fill-current" />
                                <span className="text-sm font-medium">4.8</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              {isProduct && (
                                <>
                                  <div className="flex items-center space-x-1">
                                    <Calendar className="h-4 w-4" />
                                    <span>{item.product?.duration} días</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <Users className="h-4 w-4" />
                                    <span>Por persona</span>
                                  </div>
                                </>
                              )}
                              {!isProduct && item.service?.duration && (
                                <div className="flex items-center space-x-1">
                                  <Calendar className="h-4 w-4" />
                                  <span>{item.service.duration} día{item.service.duration !== 1 ? 's' : ''}</span>
                                </div>
                              )}
                            </div>

                            {/* Features */}
                            <div className="bg-white rounded-lg p-3 border border-blue-100">
                              <h4 className="text-sm font-semibold text-gray-700 mb-2">
                                {isProduct ? 'El paquete incluye:' : 'El servicio incluye:'}
                              </h4>
                              <div className="grid grid-cols-2 gap-1">
                                {itemData.features.map((feature, featureIndex) => (
                                  <div key={featureIndex} className="flex items-center space-x-1 text-xs text-gray-600">
                                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                                    <span>{feature}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Category Badge */}
                            <div className="flex justify-between items-center">
                              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                                {isProduct ? item.product?.category : item.service?.category}
                              </span>
                              <span className="text-xs text-gray-500">
                                Código: {isProduct ? item.product?.code : item.service?.code}
                              </span>
                            </div>
                          </div>
                          
                          {/* Quantity Controls and Price */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3 bg-white rounded-lg p-1 border border-gray-200">
                              <button
                                onClick={() => updateQuantity(itemId, item.type, item.quantity - 1)}
                                className="p-1 hover:bg-gray-100 rounded text-gray-600"
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="px-3 py-1 font-semibold text-blue-600">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(itemId, item.type, item.quantity + 1)}
                                className="p-1 hover:bg-gray-100 rounded text-gray-600"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                            
                            <div className="text-right">
                              <div className="text-sm text-gray-500">Subtotal</div>
                              <div className="text-xl font-bold text-blue-600">
                                US${(itemData.price * item.quantity).toLocaleString()}
                              </div>
                            </div>
                          </div>
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
            <div className="border-t border-gray-200 p-6 bg-gradient-to-r from-gray-50 to-white">
              <div className="space-y-4">
                {/* Summary */}
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} items):</span>
                    <span className="font-semibold">US${totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Impuestos:</span>
                    <span className="font-semibold">Incluidos</span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-800">Total:</span>
                    <span className="text-2xl font-bold text-blue-600">
                      US${totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>
                
                <button
                  onClick={handleCheckout}
                  className="w-full flex items-center justify-center space-x-2 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <CreditCard className="h-5 w-5" />
                  <span>Proceder al Pago</span>
                </button>
                
                <button
                  onClick={clearCart}
                  className="w-full py-2 text-gray-500 hover:text-red-500 text-sm transition-colors duration-200"
                >
                  Vaciar Carrito
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;