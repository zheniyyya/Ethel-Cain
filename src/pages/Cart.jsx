import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/cart.js';
import { formatPrice } from '../utils/formatPrice.js';

function Cart() {
  const { items, total, changeQuantity, removeItem, checkout } = useCart();
  const [ordered, setOrdered] = useState(false);

  const placeOrder = () => {
    checkout();
    setOrdered(true);
  };

  if (ordered) {
    return (
      <section className="cart">
        <h1>Thank you!</h1>
        <p>Your order has been placed. This is a demo shop, so no payment was taken.</p>
        <Link to="/shop" className="button">
          Back to the shop
        </Link>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="cart">
        <h1>Cart</h1>
        <p>Your cart is empty.</p>
        <Link to="/shop" className="button">
          Go to the shop
        </Link>
      </section>
    );
  }

  return (
    <section className="cart">
      <h1>Cart</h1>

      <ul className="cart__list">
        {items.map((item) => (
          <li key={item.key} className="cart__item">
            <img src={item.image} alt="" />
            <div className="cart__details">
              <h2>{item.title}</h2>
              <p>
                {item.variant} · {formatPrice(item.price)}
              </p>
            </div>

            <div className="cart__quantity">
              <button
                type="button"
                aria-label={`Decrease quantity of ${item.title}`}
                onClick={() => changeQuantity(item.key, -1)}
              >
                −
              </button>
              <span>{item.quantity}</span>
              <button
                type="button"
                aria-label={`Increase quantity of ${item.title}`}
                disabled={item.max !== undefined && item.quantity >= item.max}
                onClick={() => changeQuantity(item.key, 1)}
              >
                +
              </button>
            </div>

            <p className="cart__subtotal">{formatPrice(item.price * item.quantity)}</p>
            <button
              type="button"
              className="cart__remove"
              aria-label={`Remove ${item.title}`}
              onClick={() => removeItem(item.key)}
            >
              ×
            </button>
          </li>
        ))}
      </ul>

      <div className="cart__summary">
        <p className="cart__total">
          Total <strong>{formatPrice(total)}</strong>
        </p>
        <button type="button" className="button" onClick={placeOrder}>
          Place order
        </button>
      </div>
    </section>
  );
}

export default Cart;
