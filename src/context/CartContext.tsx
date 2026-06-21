import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  matchId: string;
  matchTitle: string;
  category: 1 | 2 | 3;
  price: number;
  quantity: number;
  image: string;
  dateStr: string;
  venueStr: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeFromCart: (matchId: string, category: 1 | 2 | 3) => void;
  updateQuantity: (matchId: string, category: 1 | 2 | 3, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  processingFee: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('fifa_tickets_cart');
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    } catch (e) {
      console.error('Error loading cart from localStorage', e);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('fifa_tickets_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Error saving cart to localStorage', e);
    }
  }, [cartItems]);

  const addToCart = (item: Omit<CartItem, 'quantity'>, quantity: number = 1) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (i) => i.matchId === item.matchId && i.category === item.category
      );

      if (existingItemIndex > -1) {
        const newItems = [...prevItems];
        newItems[existingItemIndex].quantity += quantity;
        return newItems;
      } else {
        return [...prevItems, { ...item, quantity }];
      }
    });

    // Simple custom event to trigger animations or toast alerts
    const event = new CustomEvent('cart-item-added');
    window.dispatchEvent(event);
  };

  const removeFromCart = (matchId: string, category: 1 | 2 | 3) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => !(item.matchId === matchId && item.category === category))
    );
  };

  const updateQuantity = (matchId: string, category: 1 | 2 | 3, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(matchId, category);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.matchId === matchId && item.category === category
          ? { ...item, quantity: Math.min(quantity, 10) } // Cap at 10 tickets per transaction
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  // 3.5% processing fee or $15 minimum
  const processingFee = cartSubtotal > 0 ? Math.max(15, Math.round(cartSubtotal * 0.035)) : 0;
  const cartTotal = cartSubtotal + processingFee;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        processingFee,
        cartTotal,
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
