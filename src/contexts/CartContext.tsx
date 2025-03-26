import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase/config';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  total: number;
  totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Load cart from Firestore when user logs in
  useEffect(() => {
    const loadCart = async () => {
      if (!user) {
        setItems([]);
        setLoading(false);
        return;
      }

      try {
        const cartRef = doc(db, 'carts', user.uid);
        const cartDoc = await getDoc(cartRef);
        
        if (cartDoc.exists()) {
          setItems(cartDoc.data().items || []);
        } else {
          // Create new cart document if it doesn't exist
          await setDoc(cartRef, { items: [] });
          setItems([]);
        }
      } catch (error) {
        console.error('Error loading cart:', error);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, [user]);

  // Save cart to Firestore when items change
  useEffect(() => {
    const saveCart = async () => {
      if (!user || loading) return;

      try {
        const cartRef = doc(db, 'carts', user.uid);
        await updateDoc(cartRef, { items });
      } catch (error) {
        console.error('Error saving cart:', error);
      }
    };

    saveCart();
  }, [items, user, loading]);

  const addItem = (newItem: CartItem) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.id === newItem.id);
      
      if (existingItem) {
        return currentItems.map(item =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
      }
      
      return [...currentItems, newItem];
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    
    setItems(currentItems =>
      currentItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (id: string) => {
    setItems(currentItems => currentItems.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const value = {
    items,
    addItem,
    updateQuantity,
    removeFromCart,
    clearCart,
    total,
    totalItems,
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