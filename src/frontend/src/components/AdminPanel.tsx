import React, { useState, useEffect } from 'react';

import { API_URL } from '../data/mockData';

import {
  Package2,
  Users,
  ShoppingCart,
  TrendingUp,
  Plus,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  X
} from 'lucide-react';

interface Order {
  id: number;
  created_at: string;
  users: {
    id: number;
    first_name: string;
    last_name: string;
    phone: string;
    address: string;
  };
  order_items: Array<{
    id: number;
    order_id: number;
    type_item: string;
    item_id: number;
    quantity: number;
    price: number;
  }>;
  total_price: number;
  status: 'pending' | 'delivered' | 'cancelled';
}

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'products'>('dashboard');
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const ordersRes = await fetch(API_URL + '/orders');
      const ordersData = await ordersRes.json();
      setOrders(ordersData.data);
    };
    fetchOrders();
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleDeliverOrder = async (orderId: number) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, status: 'delivered' as const } : order
      )
    );

    await fetch(API_URL + '/orders/' + orderId, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: 'delivered' }),
    });
  };

  const handleCancelOrder = (orderId: number) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, status: 'cancelled' as const } : order
      )
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Pendiente';
      case 'delivered': return 'Entregado';
      case 'cancelled': return 'Cancelado';
      default: return status;
    }
  };

  const pendingOrders = orders.filter(order => order.status === 'pending');
  const totalRevenue = orders
    .filter(order => order.status === 'delivered')
    .reduce((sum, order) => sum + order.total_price, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>

      <div className="absolute inset-4 bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="flex h-full">
          {/* Sidebar */}
          <div className="w-64 bg-gray-50 border-r">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">Panel de Admin</h2>
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <X size={24} />
              </button>
            </div>

            <nav className="p-4 space-y-2">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${activeTab === 'dashboard'
                    ? 'bg-sky-100 text-sky-700'
                    : 'text-gray-600 hover:bg-gray-100'
                  }`}
              >
                <TrendingUp size={20} />
                <span>Dashboard</span>
              </button>

              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${activeTab === 'orders'
                    ? 'bg-sky-100 text-sky-700'
                    : 'text-gray-600 hover:bg-gray-100'
                  }`}
              >
                <ShoppingCart size={20} />
                <span>Pedidos</span>
                {pendingOrders.length > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
                    {pendingOrders.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('products')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${activeTab === 'products'
                    ? 'bg-sky-100 text-sky-700'
                    : 'text-gray-600 hover:bg-gray-100'
                  }`}
              >
                <Package2 size={20} />
                <span>Productos</span>
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto">
            {activeTab === 'dashboard' && (
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white border rounded-lg p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Pedidos Pendientes</p>
                        <p className="text-3xl font-bold text-yellow-600">{pendingOrders.length}</p>
                      </div>
                      <ShoppingCart size={32} className="text-yellow-500" />
                    </div>
                  </div>

                  <div className="bg-white border rounded-lg p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Total Vendido</p>
                        <p className="text-3xl font-bold text-green-600">{formatPrice(totalRevenue)}</p>
                      </div>
                      <TrendingUp size={32} className="text-green-500" />
                    </div>
                  </div>

                  <div className="bg-white border rounded-lg p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Total Pedidos</p>
                        <p className="text-3xl font-bold text-sky-600">{orders.length}</p>
                      </div>
                      <Package2 size={32} className="text-sky-500" />
                    </div>
                  </div>
                </div>

                <div className="bg-white border rounded-lg p-6">
                  <h4 className="text-lg font-semibold mb-4">Pedidos Recientes</h4>
                  <div className="space-y-3">
                    {orders.slice(0, 5).map(order => (
                      <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-semibold">Pedido #{order.id}</p>
                          <p className="text-sm text-gray-600">{order.users.first_name} {order.users.last_name} - {formatDate(order.created_at)}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{formatPrice(order.total_price)}</p>
                          <span className={`inline-block px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                            {getStatusText(order.status)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">Gestión de Pedidos</h3>
                </div>

                <div className="bg-white border rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Pedido
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Cliente
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Items
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Total
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Estado
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Acciones
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {orders.map(order => (
                          <tr key={order.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div>
                                <div className="text-sm font-medium text-gray-900">#{order.id}</div>
                                <div className="text-sm text-gray-500">{formatDate(order.created_at)}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{order.users.first_name} {order.users.last_name}</div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm text-gray-900">
                                {order.order_items.map((item, index) => (
                                  <div key={index} className="mb-1">
                                    {item.type_item} (x{item.quantity})
                                  </div>
                                ))}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-bold text-gray-900">{formatPrice(order.total_price)}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                                {getStatusText(order.status)}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              {order.status === 'pending' && (
                                <div className="flex space-x-2">
                                  <button
                                    onClick={() => handleDeliverOrder(order.id)}
                                    className="text-green-600 hover:text-green-900 transition-colors duration-200"
                                    title="Marcar como entregado"
                                  >
                                    <CheckCircle size={18} />
                                  </button>
                                  <button
                                    onClick={() => handleCancelOrder(order.id)}
                                    className="text-red-600 hover:text-red-900 transition-colors duration-200"
                                    title="Cancelar pedido"
                                  >
                                    <X size={18} />
                                  </button>
                                </div>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'products' && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">Gestión de Productos</h3>
                  <button className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200">
                    <Plus size={20} />
                    <span>Agregar Producto</span>
                  </button>
                </div>

                <div className="bg-white border rounded-lg p-6">
                  <p className="text-gray-600 text-center py-8">
                    Funcionalidad de gestión de productos en desarrollo.
                    <br />
                    Aquí podrás agregar, editar y eliminar vuelos, hoteles, paquetes y autos.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;