import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart, removeItem, incrementQuantity, decrementQuantity } from '../Store/cartSlice';
import './Cart.css';
import { CDN_URL } from '../utils/constant';
import { showToast } from '../utils/useToast';

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((store) => store.cart);
  const { items, totalItems, totalPrice } = cart;

  const handleClearCart = () => {
    dispatch(clearCart());
    showToast('Cart cleared!', 'success');
  };

  const handleRemove = (id) => {
    dispatch(removeItem(id));
    showToast('Item removed from cart', 'error');
  };

  const handleIncrement = (id) => {
    dispatch(incrementQuantity(id));
    showToast('Quantity increased', 'success');
  };

  const handleDecrement = (id) => {
    const item = items.find(i => i.id === id);
    if (item && item.quantity > 1) {
      dispatch(decrementQuantity(id));
      showToast('Quantity decreased', 'success');
    } else {
      // This will remove the item if the quantity is 1
      dispatch(decrementQuantity(id));
      showToast('Item removed from cart', 'error');
    }
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">Cart</h2>
      <button
        className="cart-clear-btn"
        onClick={handleClearCart}
        disabled={items.length === 0}
      >
        Clear Cart
      </button>
      <div className="cart-summary">
        <span>Total Items: {totalItems}</span>
        <span>Total Price: ₹{totalPrice.toFixed(2)}</span>
      </div>
      <ul className="cart-items-list">
        {items.length === 0 ? (
          <li className="cart-empty">Your cart is empty.</li>
        ) : (
          items.map((item) => (
            <li
              className="cart-item flex flex-col md:flex-row items-center gap-4 bg-white rounded-lg shadow p-4 mb-4"
              key={item.id}
            >
              {item.imageId && (
                <img
                  src={CDN_URL + item.imageId}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg border border-gray-200"
                />
              )}
              <div className="flex-1 w-full">
                <div className="font-semibold text-lg text-gray-800 mb-1">{item.name}</div>
                {item.description && (
                  <div className="text-gray-500 text-sm mb-2 line-clamp-2">{item.description}</div>
                )}
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-green-600 font-bold">₹{item.price.toFixed(2)}</span>
                  <div className="flex items-center gap-2">
                    <button
                      className="cart-qty-btn bg-purple-600 hover:bg-purple-700 text-white w-8 h-8 rounded-full"
                      onClick={() => handleDecrement(item.id)}
                    >
                      -
                    </button>
                    <span className="cart-qty text-purple-700 font-bold text-lg">{item.quantity}</span>
                    <button
                      className="cart-qty-btn bg-purple-600 hover:bg-purple-700 text-white w-8 h-8 rounded-full"
                      onClick={() => handleIncrement(item.id)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="text-blue-600 font-medium mb-2">
                  Total: ₹{(item.price * item.quantity).toFixed(2)}
                </div>
                <button
                  className="cart-remove-btn bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded font-semibold"
                  onClick={() => handleRemove(item.id)}
                >
                  Remove
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Cart;