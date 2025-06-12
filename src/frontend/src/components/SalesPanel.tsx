import React, { useState } from 'react';
import { Package, CheckCircle, XCircle, Clock, User, Mail, Calendar, MapPin } from 'lucide-react';
import { Order } from '../types';
import { mockOrders } from '../data/mockData';

interface SalesPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const SalesPanel: React.FC<SalesPanelProps> = ({ isOpen, onClose }) => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

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

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { 
            ...order, 
            status: newStatus,
            deliveredAt: newStatus === 'delivered' ? new Date() : order.deliveredAt
          }
        : order
    ));
    
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({
        ...selectedOrder,
        status: newStatus,
        deliveredAt: newStatus === 'delivered' ? new Date() : selectedOrder.deliveredAt
      });
    }
  };

  const filteredOrders = orders.filter(order => 
    filterStatus === 'all' || order.status === filterStatus
  );

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'processing':
        return <Package className="h-4 w-4" />;
      case 'delivered':
        return <CheckCircle className="h-4 w-4" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4" />;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="absolute right-0 top-0 h-full w-full max-w-6xl bg-white shadow-xl">
        <div className="flex h-full">
          {/* Orders List */}
          <div className="w-1/2 border-r border-gray-200 flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Package className="h-6 w-6" />
                  <h2 className="text-xl font-bold">Panel de Ventas</h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-blue-800 rounded-lg transition-colors duration-200"
                >
                  <XCircle className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Filters */}
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <div className="flex space-x-2 overflow-x-auto">
                {[
                  { key: 'all', label: 'Todos', count: orders.length },
                  { key: 'pending', label: 'Pendientes', count: orders.filter(o => o.status === 'pending').length },
                  { key: 'processing', label: 'Procesando', count: orders.filter(o => o.status === 'processing').length },
                  { key: 'delivered', label: 'Entregados', count: orders.filter(o => o.status === 'delivered').length },
                  { key: 'cancelled', label: 'Cancelados', count: orders.filter(o => o.status === 'cancelled').length }
                ].map((filter) => (
                  <button
                    key={filter.key}
                    onClick={() => setFilterStatus(filter.key)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                      filterStatus === filter.key
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {filter.label} ({filter.count})
                  </button>
                ))}
              </div>
            </div>

            {/* Orders List */}
            <div className="flex-1 overflow-y-auto">
              {filteredOrders.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No hay pedidos para mostrar</p>
                </div>
              ) : (
                <div className="space-y-2 p-4">
                  {filteredOrders.map((order) => (
                    <div
                      key={order.id}
                      onClick={() => setSelectedOrder(order)}
                      className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                        selectedOrder?.id === order.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-800">{order.id}</h3>
                          <p className="text-sm text-gray-600">{order.customerName}</p>
                        </div>
                        <div className="text-right">
                          <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                            {getStatusIcon(order.status)}
                            <span>{statusLabels[order.status]}</span>
                          </div>
                          <p className="text-sm font-bold text-blue-600 mt-1">
                            US${order.total.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>{order.items.length} paquete{order.items.length !== 1 ? 's' : ''}</span>
                        <span>{order.createdAt.toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Order Details */}
          <div className="w-1/2 flex flex-col">
            {selectedOrder ? (
              <>
                {/* Order Header */}
                <div className="p-6 border-b border-gray-200 bg-gray-50">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800">{selectedOrder.id}</h3>
                      <p className="text-gray-600">Creado el {selectedOrder.createdAt.toLocaleDateString()}</p>
                    </div>
                    <div className={`inline-flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium ${statusColors[selectedOrder.status]}`}>
                      {getStatusIcon(selectedOrder.status)}
                      <span>{statusLabels[selectedOrder.status]}</span>
                    </div>
                  </div>

                  {/* Customer Info */}
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <h4 className="font-semibold text-gray-800 mb-3">Información del Cliente</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-700">{selectedOrder.customerName}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-700">{selectedOrder.customerEmail}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="flex-1 overflow-y-auto p-6">
                  <h4 className="font-semibold text-gray-800 mb-4">Paquetes Solicitados</h4>
                  <div className="space-y-4">
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                        <div className="flex items-start space-x-4">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h5 className="font-semibold text-gray-800">{item.product.name}</h5>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                              <div className="flex items-center space-x-1">
                                <MapPin className="h-3 w-3" />
                                <span>{item.product.destination}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-3 w-3" />
                                <span>{item.product.duration} días</span>
                              </div>
                            </div>
                            <div className="flex justify-between items-center mt-2">
                              <span className="text-sm text-gray-600">
                                Cantidad: {item.quantity}
                              </span>
                              <span className="font-semibold text-blue-600">
                                US${(item.product.price * item.quantity).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Total */}
                  <div className="bg-gray-50 rounded-lg p-4 mt-6 border border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-800">Total del Pedido:</span>
                      <span className="text-2xl font-bold text-blue-600">
                        US${selectedOrder.total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="p-6 border-t border-gray-200 bg-gray-50">
                  <h4 className="font-semibold text-gray-800 mb-3">Acciones</h4>
                  <div className="flex space-x-3">
                    {selectedOrder.status === 'pending' && (
                      <button
                        onClick={() => handleStatusChange(selectedOrder.id, 'processing')}
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                      >
                        <Package className="h-4 w-4" />
                        <span>Procesar Pedido</span>
                      </button>
                    )}
                    
                    {selectedOrder.status === 'processing' && (
                      <button
                        onClick={() => handleStatusChange(selectedOrder.id, 'delivered')}
                        className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                      >
                        <CheckCircle className="h-4 w-4" />
                        <span>Marcar como Entregado</span>
                      </button>
                    )}
                    
                    {(selectedOrder.status === 'pending' || selectedOrder.status === 'processing') && (
                      <button
                        onClick={() => handleStatusChange(selectedOrder.id, 'cancelled')}
                        className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                      >
                        <XCircle className="h-4 w-4" />
                        <span>Cancelar Pedido</span>
                      </button>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Selecciona un pedido para ver los detalles</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesPanel;