import React, { useState, useEffect } from 'react';
import './Cart.css';
import { useCart } from './DataContext';

function Cart() {
  const { cart, removeFromCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false); // State to track order placement

  const calculateTotalPrice = () => {
    return cart.reduce((total, book) => total + book.saleInfo.retailPrice.amount, 0);
  };

  useEffect(() => {
    // Additional actions when the cart items change
  }, [cart , removeFromCart]);

  const handleSubmit = () => {
    // Perform any necessary actions when the "Submit" button is clicked
    setOrderPlaced(true); // Set orderPlaced to true to display the message
  };

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      <ul>
        {cart.map((book) => (
          <li key={book.id}>
            <span>{book.volumeInfo.title}</span>
            <span>${book.saleInfo.retailPrice.amount}</span>
            <button onClick={() => removeFromCart(book.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <p>Total: ${calculateTotalPrice()}</p>

      {orderPlaced ? (
        <div className="order-message">
          <p>Your order has been placed.</p>
          <p>You can rent the book for 15 days.</p>
        </div>
      ) : (
        <button onClick={handleSubmit} className="submit-button">
          Submit
        </button>
      )}

      <div className="return-button">
        <a href="/book">Return to Previous Page</a>
      </div>
    </div>
  );
}

export default Cart;
