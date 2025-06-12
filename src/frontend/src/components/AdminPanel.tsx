import React, { useState } from 'react';
import { Package, Plus, Edit, Trash2, Save, X, Upload } from 'lucide-react';
import { Product } from '../types';
import { mockProducts } from '../data/mockData';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<Partial<Product>>({
    code: '',
    name: '',
    description: '',
    price: 0,
    category: 'Playa',
    destination: '',
    duration: 1,
    image: '',
    features: [],
    available: true
  });

  const categories = ['Playa', 'Ciudad', 'Grupal', 'All Inclusive', 'Crucero'];
  const destinations = ['Brasil', 'México', 'Cuba', 'Caribe', 'Europa', 'Estados Unidos'];

  const handleSave = () => {
    if (isCreating) {
      const newProduct: Product = {
        ...formData as Product,
        id: Date.now().toString(),
        features: formData.features || []
      };
      setProducts([...products, newProduct]);
    } else if (editingProduct) {
      setProducts(products.map(p => 
        p.id === editingProduct.id 
          ? { ...formData as Product, id: editingProduct.id }
          : p
      ));
    }
    
    setEditingProduct(null);
    setIsCreating(false);
    setFormData({
      code: '',
      name: '',
      description: '',
      price: 0,
      category: 'Playa',
      destination: '',
      duration: 1,
      image: '',
      features: [],
      available: true
    });
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData(product);
    setIsCreating(false);
  };

  const handleDelete = (productId: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      setProducts(products.filter(p => p.id !== productId));
    }
  };

  const handleCreate = () => {
    setIsCreating(true);
    setEditingProduct(null);
    setFormData({
      code: '',
      name: '',
      description: '',
      price: 0,
      category: 'Playa',
      destination: '',
      duration: 1,
      image: '',
      features: [],
      available: true
    });
  };

  const addFeature = () => {
    const feature = prompt('Ingresa una característica del paquete:');
    if (feature) {
      setFormData({
        ...formData,
        features: [...(formData.features || []), feature]
      });
    }
  };

  const removeFeature = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features?.filter((_, i) => i !== index) || []
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="absolute right-0 top-0 h-full w-full max-w-4xl bg-white shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <div className="flex items-center space-x-3">
              <Package className="h-6 w-6" />
              <h2 className="text-xl font-bold">Panel de Administración</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-blue-800 rounded-lg transition-colors duration-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {/* Action Buttons */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Gestión de Productos</h3>
              <button
                onClick={handleCreate}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
                <Plus className="h-4 w-4" />
                <span>Nuevo Producto</span>
              </button>
            </div>

            {/* Product Form */}
            {(isCreating || editingProduct) && (
              <div className="bg-gray-50 rounded-lg p-6 mb-6 border border-gray-200">
                <h4 className="text-lg font-semibold mb-4">
                  {isCreating ? 'Crear Nuevo Producto' : 'Editar Producto'}
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Código del Producto
                    </label>
                    <input
                      type="text"
                      value={formData.code || ''}
                      onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Ej: BAHIA001"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre del Paquete
                    </label>
                    <input
                      type="text"
                      value={formData.name || ''}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Ej: Escapada Salvador de Bahía"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Descripción
                    </label>
                    <textarea
                      value={formData.description || ''}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Descripción detallada del paquete..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Precio (USD)
                    </label>
                    <input
                      type="number"
                      value={formData.price || 0}
                      onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="780"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Duración (días)
                    </label>
                    <input
                      type="number"
                      value={formData.duration || 1}
                      onChange={(e) => setFormData({ ...formData, duration: Number(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="7"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Categoría
                    </label>
                    <select
                      value={formData.category || ''}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Destino
                    </label>
                    <select
                      value={formData.destination || ''}
                      onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Seleccionar destino</option>
                      {destinations.map(dest => (
                        <option key={dest} value={dest}>{dest}</option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      URL de la Imagen
                    </label>
                    <input
                      type="url"
                      value={formData.image || ''}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://images.pexels.com/..."
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Características del Paquete
                    </label>
                    <div className="space-y-2">
                      {formData.features?.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <span className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-lg">
                            {feature}
                          </span>
                          <button
                            onClick={() => removeFeature(index)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={addFeature}
                        className="w-full px-3 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors duration-200"
                      >
                        + Agregar Característica
                      </button>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.available || false}
                        onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-gray-700">Producto disponible</span>
                    </label>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={() => {
                      setEditingProduct(null);
                      setIsCreating(false);
                    }}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    <Save className="h-4 w-4" />
                    <span>Guardar</span>
                  </button>
                </div>
              </div>
            )}

            {/* Products List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-gray-800 line-clamp-2">{product.name}</h4>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        product.available 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {product.available ? 'Disponible' : 'No disponible'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Código: {product.code}</p>
                    <p className="text-lg font-bold text-blue-600 mb-3">US${product.price.toLocaleString()}</p>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">{product.category}</span>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;