import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase/config';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description?: string;
  rating?: number;
  addedAt: Date;
}

interface WishlistContextType {
  items: WishlistItem[];
  addItem: (item: WishlistItem) => void;
  removeItem: (id: string) => void;
  clearWishlist: () => void;
  isInWishlist: (id: string) => boolean;
  totalItems: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Load wishlist from Firestore when user logs in
  useEffect(() => {
    const loadWishlist = async () => {
      if (!user) {
        setItems([]);
        setLoading(false);
        return;
      }

      try {
        const wishlistRef = doc(db, 'wishlists', user.uid);
        const wishlistDoc = await getDoc(wishlistRef);
        
        if (wishlistDoc.exists()) {
          // Convert Firestore timestamps to Date objects
          const itemsWithDates = (wishlistDoc.data().items || []).map((item: any) => ({
            ...item,
            addedAt: item.addedAt ? item.addedAt.toDate() : new Date()
          }));
          setItems(itemsWithDates);
        } else {
          // Create new wishlist document if it doesn't exist
          await setDoc(wishlistRef, { items: [] });
          setItems([]);
        }
      } catch (error) {
        console.error('Error loading wishlist:', error);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    loadWishlist();
  }, [user]);

  // Save wishlist to Firestore when items change
  useEffect(() => {
    const saveWishlist = async () => {
      if (!user || loading) return;

      try {
        const wishlistRef = doc(db, 'wishlists', user.uid);
        await updateDoc(wishlistRef, { items });
      } catch (error) {
        console.error('Error saving wishlist:', error);
      }
    };

    saveWishlist();
  }, [items, user, loading]);

  const addItem = (newItem: WishlistItem) => {
    // Check if the item is already in the wishlist
    if (isInWishlist(newItem.id)) return;
    
    // Add the item with current date
    setItems(currentItems => [
      ...currentItems, 
      { ...newItem, addedAt: new Date() }
    ]);
  };

  const removeItem = (id: string) => {
    setItems(currentItems => currentItems.filter(item => item.id !== id));
  };

  const clearWishlist = () => {
    setItems([]);
  };

  const isInWishlist = (id: string) => {
    return items.some(item => item.id === id);
  };

  const totalItems = items.length;

  const value = {
    items,
    addItem,
    removeItem,
    clearWishlist,
    isInWishlist,
    totalItems,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}; 