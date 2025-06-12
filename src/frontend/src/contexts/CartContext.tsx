import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Product, Service } from '../types';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  addServiceToCart: (service: Service, quantity?: number) => void;
  removeFromCart: (id: string, type: 'product' | 'service') => void;
  updateQuantity: (id: string, type: 'product' | 'service', quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setItems(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => 
        item.type === 'product' && item.product?.id === product.id
      );
      
      if (existingItem) {
        return prevItems.map(item =>
          item.type === 'product' && item.product?.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      
      return [...prevItems, { product, quantity, type: 'product' }];
    });
  };

  const addServiceToCart = (service: Service, quantity: number = 1) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => 
        item.type === 'service' && item.service?.id === service.id
      );
      
      if (existingItem) {
        return prevItems.map(item =>
          item.type === 'service' && item.service?.id === service.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      
      return [...prevItems, { service, quantity, type: 'service' }];
    });
  };

  const removeFromCart = (id: string, type: 'product' | 'service') => {
    setItems(prevItems => prevItems.filter(item => {
      if (type === 'product') {
        return !(item.type === 'product' && item.product?.id === id);
      } else {
        return !(item.type === 'service' && item.service?.id === id);
      }
    }));
  };

  const updateQuantity = (id: string, type: 'product' | 'service', quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id, type);
      return;
    }
    
    setItems(prevItems =>
      prevItems.map(item => {
        if (type === 'product' && item.type === 'product' && item.product?.id === id) {
          return { ...item, quantity };
        } else if (type === 'service' && item.type === 'service' && item.service?.id === id) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => {
    const price = item.type === 'product' ? item.product?.price || 0 : item.service?.price || 0;
    return sum + (price * item.quantity);
  }, 0);

  const value: CartContextType = {
    items,
    addToCart,
    addServiceToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};