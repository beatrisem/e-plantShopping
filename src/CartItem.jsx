import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
    const cart = useSelector(state => state.cart.items); // Get cart items from Redux
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
        // Convert cost to a number before multiplication
        return total + (Number(item.cost.slice(1)) * item.quantity); // Remove $ and convert to number
      }, 0);
};
  // Handle "Continue Shopping" button click
  const handleContinueShopping = () => {
    onContinueShopping(); // Call the function passed from the parent component
  };

  // Increment item quantity
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 })); // Increment quantity
  };

  // Decrement item quantity
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name)); // If quantity reaches 0, remove the item
    }
  };

  // Remove item from cart
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const calculateTotalCost = (item) => {
    // Convert item cost to number, multiply by quantity, and format to 2 decimal places
    return item.quantity * Number(item.cost.slice(1)); 
};

  // Calculate total quantity
  const calculateTotalQuantity = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <h3>Total Quantity: {calculateTotalQuantity()}</h3>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">Cost: {item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total:{calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className="total_cart_amount"></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={handleContinueShopping}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={() => alert('Functionality to be added for future reference')}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;