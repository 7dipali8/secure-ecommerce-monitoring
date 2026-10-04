import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('shopnest_local_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();
  const { addToast } = useToast();

  // Recalculate total item count
  useEffect(() => {
    const count = cartItems.reduce((sum, item) => sum + (Number(item.quantity) || 1), 0);
    setTotalItems(count);
    localStorage.setItem('shopnest_local_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const fetchCart = useCallback(async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    try {
      const response = await api.get('/cart');
      const items = Array.isArray(response.data?.items)
        ? response.data.items
        : Array.isArray(response.data)
          ? response.data
          : [];

      setCartItems(items);
    } catch (error) {
      console.warn('Backend cart API offline. Using local cart state:', error.message);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = async (productId, quantity = 1, productDetails = null) => {
    if (isAuthenticated) {
      try {
        await api.post("/cart", {
          productId: Number(productId),
          quantity: Number(quantity),
        });

        await fetchCart();
        addToast("Added to cart!", "success");
        return { success: true };
      } catch (err) {
        console.warn("Backend cart sync failed. Using local cart state:", err.message);
      }
    }

    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => String(item.productId) === String(productId)
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + Number(quantity),
        };
        return updated;
      }

      return [
        ...prev,
        {
          id: Date.now(),
          productId: Number(productId),
          quantity: Number(quantity),
          addedAt: new Date().toISOString(),
          ...(productDetails || {}),
        },
      ];
    });

    addToast("Added to cart!", "success");
    return { success: true };
  };
	const updateQuantity = async (productId, delta) => {
  const item = cartItems.find(
    (entry) => String(entry.productId) === String(productId)
  );

  if (!item) return;

  const newQuantity = Number(item.quantity) + Number(delta);

  if (isAuthenticated) {
    try {
      if (newQuantity <= 0) {
        await api.delete(`/cart/${item.id}`);
      } else {
        await api.patch(`/cart/${item.id}`, {
          quantity: newQuantity,
        });
      }

      await fetchCart();
      return;
    } catch (err) {
      console.error('Cart update failed:', err);
      addToast('Could not update your cart. Please try again.', 'error');
      return;
    }
  }

  setCartItems((prev) =>
    prev
      .map((entry) => {
        if (String(entry.productId) !== String(productId)) {
          return entry;
        }

        return newQuantity > 0
          ? { ...entry, quantity: newQuantity }
          : null;
      })
      .filter(Boolean)
  );
};

  const clearCart = () => {
    setCartItems([]);
    setTotalItems(0);
    localStorage.removeItem('shopnest_local_cart');
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalItems,
        loading,
        fetchCart,
        addToCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
