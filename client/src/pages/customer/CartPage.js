import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { FiTrash2, FiPlus, FiMinus } from 'react-icons/fi';

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-3xl font-serif font-bold mb-4">Your cart is empty</h2>
          <button onClick={() => navigate('/menu')} className="btn-primary">Browse Menu</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-custom max-w-4xl">
        <h1 className="text-4xl font-serif font-bold mb-8">Shopping Cart</h1>
        <div className="space-y-4">
          {cartItems.map(item => (
            <div key={item._id} className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
              <img src={item.image || 'https://via.placeholder.com/100'} alt={item.name} className="w-24 h-24 object-cover rounded" />
              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => updateQuantity(item._id, item.quantity - 1)} className="p-2 hover:bg-gray-100 rounded">
                  <FiMinus />
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className="p-2 hover:bg-gray-100 rounded">
                  <FiPlus />
                </button>
              </div>
              <button onClick={() => removeFromCart(item._id)} className="p-2 text-red-500 hover:bg-red-50 rounded">
                <FiTrash2 />
              </button>
            </div>
          ))}
        </div>
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between text-2xl font-bold mb-6">
            <span>Total:</span>
            <span>${getCartTotal().toFixed(2)}</span>
          </div>
          <button onClick={() => navigate('/checkout')} className="btn-primary w-full">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
