import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach(item => {
      const numericCost = parseFloat(item.cost.substring(1));
      total += numericCost * item.quantity;
    });
    return total.toFixed(2);
  };

  const handleContinueShopping = (e) => {
    if (onContinueShopping) {
      onContinueShopping(e);
    }
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const calculateTotalCost = (item) => {
    const numericCost = parseFloat(item.cost.substring(1));
    return (numericCost * item.quantity).toFixed(2);
  };

  const handleCheckoutShopping = () => {
    alert('Coming Soon');
  };

  return (
    <div className="cart-container" style={{ padding: '30px', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      {cart.length === 0 ? (
        <p style={{ textAlign: 'center', fontSize: '18px', color: '#666' }}>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map(item => (
            <div className="cart-item" key={item.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #ddd', padding: '15px 0' }}>
              <img className="cart-item-image" src={item.image} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '5px' }} />
              <div className="cart-item-details" style={{ flex: 1, marginLeft: '20px' }}>
                <div className="cart-item-name" style={{ fontWeight: 'bold' }}>{item.name}</div>
                <div className="cart-item-cost">Unit Price: {item.cost}</div>
              </div>
              <div className="cart-item-quantity" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)} style={{ padding: '5px 10px' }}>-</button>
                <span>{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)} style={{ padding: '5px 10px' }}>+</button>
              </div>
              <div className="cart-item-total" style={{ margin: '0 20px', fontWeight: 'bold' }}>
                Subtotal: ${calculateTotalCost(item)}
              </div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)} style={{ backgroundColor: '#f44336', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer' }}>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
      <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'space-between' }}>
        <button className="get-started-button" onClick={handleContinueShopping}>Continue Shopping</button>
        <button className="get-started-button" onClick={handleCheckoutShopping} style={{ backgroundColor: '#ff9800' }}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;