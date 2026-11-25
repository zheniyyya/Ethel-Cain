import { useEffect, useState } from 'react';
import { CartContext } from './cart.js';

const STORAGE_KEY = 'cart';

function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch (error) {
    console.warn('Could not read the cart', error);
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.warn('Could not save the cart', error);
    }
  }, [items]);

  const addItem = (album, format) => {
    const key = `${album.id}-${format}`;

    setItems((current) => {
      const existing = current.find((item) => item.key === key);

      if (existing) {
        return current.map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }

      return [
        ...current,
        {
          key,
          title: album.title,
          cover: album.cover,
          format,
          price: album.prices[format],
          quantity: 1,
        },
      ];
    });
  };

  const changeQuantity = (key, delta) => {
    setItems((current) =>
      current
        .map((item) => (item.key === key ? { ...item, quantity: item.quantity + delta } : item))
        .filter((item) => item.quantity > 0),
    );
  };

  const removeItem = (key) => {
    setItems((current) => current.filter((item) => item.key !== key));
  };

  const clear = () => setItems([]);

  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, count, total, addItem, changeQuantity, removeItem, clear }}>
      {children}
    </CartContext.Provider>
  );
}
