import React, { useState } from 'react';
import { User, Package, Calendar, MapPin, Clock, CheckCircle, XCircle, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { mockOrders } from '../data/mockData';

interface UserProfileProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  
  // Filter orders for current user
  const userOrders = mockOrders.filter(order => order.customerId === user?.id);

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800'
  };

  const statusLabels = {
    pending: 'Pendiente',
    processing: 'Procesando',
    delivered: 'Entregado',
    cancelled: 'Cancelado'
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'processing':
        return <Package className="h-4 w-4" />;
      case 'delivered':
        return <CheckCircle className="h-4 w-4" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="absolute right-0 top-0 h-full w-full max-w-2xl bg-white shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <div className="flex items-center space-x-3">
              <User className="h-6 w-6" />
              <h2 className="text-xl font-bold">Mi Perfil</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-blue-800 rounded-lg transition-colors duration-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex-1 py-3 px-4 text-sm font-medium transition-colors duration-200 ${
                activeTab === 'profile'
                  ? 'border-b-2 border-blue-500 text-blue-600 bg-blue-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Información Personal
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`flex-1 py-3 px-4 text-sm font-medium transition-colors duration-200 ${
                activeTab === 'orders'
                  ? 'border-b-2 border-blue-500 text-blue-600 bg-blue-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Mis Pedidos ({userOrders.length})
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {activeTab === 'profile' ? (
              <div className="space-y-6">
                {/* Profile Info */}
                <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border border-blue-100">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                      <User className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800">{user?.name}</h3>
                      <p className="text-gray-600">{user?.email}</p>
                      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full mt-2">
                        {user?.role === 'customer' ? 'Cliente' : user?.role === 'sales' ? 'Ventas' : 'Administrador'}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <h4 className="font-semibold text-gray-800 mb-2">Información de Contacto</h4>
                      <div className="space-y-2 text-sm">
                        <p><span className="font-medium">Email:</span> {user?.email}</p>
                        <p><span className="font-medium">Teléfono:</span> +54 11 1234-5678</p>
                        <p><span className="font-medium">Dirección:</span> Buenos Aires, Argentina</p>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <h4 className="font-semibold text-gray-800 mb-2">Estadísticas</h4>
                      <div className="space-y-2 text-sm">
                        <p><span className="font-medium">Pedidos realizados:</span> {userOrders.length}</p>
                        <p><span className="font-medium">Total gastado:</span> US${userOrders.reduce((sum, order) => sum + order.total, 0).toLocaleString()}</p>
                        <p><span className="font-medium">Miembro desde:</span> {user?.createdAt.toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Preferences */}
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-4">Preferencias de Viaje</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['Playa', 'Ciudad', 'Aventura', 'Relax', 'Cultura', 'Gastronomía', 'Naturaleza', 'Historia'].map((pref) => (
                      <div key={pref} className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                        <span className="text-sm text-gray-700">{pref}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {userOrders.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">No tienes pedidos aún</h3>
                    <p className="text-gray-500">¡Explora nuestros increíbles paquetes de viaje!</p>
                  </div>
                ) : (
                  userOrders.map((order) => (
                    <div key={order.id} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-bold text-gray-800">{order.id}</h3>
                          <p className="text-gray-600">Pedido realizado el {order.createdAt.toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                          <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${statusColors[order.status]}`}>
                            {getStatusIcon(order.status)}
                            <span>{statusLabels[order.status]}</span>
                          </div>
                          <p className="text-lg font-bold text-blue-600 mt-1">
                            US${order.total.toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="w-12 h-12 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-800">{item.product.name}</h4>
                              <div className="flex items-center space-x-4 text-sm text-gray-600">
                                <div className="flex items-center space-x-1">
                                  <MapPin className="h-3 w-3" />
                                  <span>{item.product.destination}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Calendar className="h-3 w-3" />
                                  <span>{item.product.duration} días</span>
                                </div>
                                <span>Cantidad: {item.quantity}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-gray-800">
                                US${(item.product.price * item.quantity).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {order.status === 'pending' && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="flex space-x-3">
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                              Modificar Pedido
                            </button>
                            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200">
                              Cancelar Pedido
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;