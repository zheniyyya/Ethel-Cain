import { useEffect, useState } from 'react';
import { CartContext } from './cart.js';

const CART_KEY = 'cart';
const SOLD_KEY = 'sold';

const isCart = (value) =>
  Array.isArray(value) &&
  value.every((item) => typeof item.key === 'string' && typeof item.variant === 'string');

const isSold = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);

function load(key, fallback, isValid) {
  try {
    const saved = JSON.parse(localStorage.getItem(key));
    return isValid(saved) ? saved : fallback;
  } catch (error) {
    console.warn(`Could not read "${key}" from storage`, error);
    return fallback;
  }
}

function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Could not save "${key}" to storage`, error);
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => load(CART_KEY, [], isCart));
  const [sold, setSold] = useState(() => load(SOLD_KEY, {}, isSold));

  useEffect(() => save(CART_KEY, items), [items]);
  useEffect(() => save(SOLD_KEY, sold), [sold]);

  const quantityOf = (key) => items.find((item) => item.key === key)?.quantity ?? 0;
  const soldOf = (key) => sold[key] ?? 0;

  const addItem = (product) => {
    setItems((current) => {
      const existing = current.find((item) => item.key === product.key);

      if (!existing) return [...current, { ...product, quantity: 1 }];

      return current.map((item) =>
        item.key === product.key
          ? { ...item, quantity: Math.min(item.quantity + 1, item.max ?? Infinity) }
          : item,
      );
    });
  };

  const changeQuantity = (key, delta) => {
    setItems((current) =>
      current
        .map((item) =>
          item.key === key
            ? { ...item, quantity: Math.min(item.quantity + delta, item.max ?? Infinity) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeItem = (key) => {
    setItems((current) => current.filter((item) => item.key !== key));
  };

  const checkout = () => {
    setSold((current) => {
      const next = { ...current };
      items.forEach((item) => {
        next[item.key] = (next[item.key] ?? 0) + item.quantity;
      });
      return next;
    });
    setItems([]);
  };

  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        count,
        total,
        quantityOf,
        soldOf,
        addItem,
        changeQuantity,
        removeItem,
        checkout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
