"use client";

import { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

export default function PaymentPage() {
  const { cart, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('online');
  const [onlinePaymentOption, setOnlinePaymentOption] = useState('card');
  const [status, setStatus] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Placing order...');

    const orderData = {
      customer: customerDetails,
      items: cart,
      total: totalPrice,
      paymentMethod: paymentMethod === 'online' ? `Online (${onlinePaymentOption})` : 'Cash on Delivery',
    };

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        setStatus('Order placed successfully! Redirecting...');
        clearCart();
        setTimeout(() => {
          router.push('/');
        }, 2000);
      } else {
        setStatus('Failed to place order. Please try again.');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      setStatus('An error occurred. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-10">Checkout</h1>
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-semibold mb-6">Customer Details</h2>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input type="text" name="name" id="name" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" onChange={handleInputChange} value={customerDetails.name} />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <input type="email" name="email" id="email" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" onChange={handleInputChange} value={customerDetails.email} />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Shipping Address</label>
              <input type="text" name="address" id="address" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" onChange={handleInputChange} value={customerDetails.address} />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                <input type="text" name="city" id="city" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" onChange={handleInputChange} value={customerDetails.city} />
              </div>
              <div>
                <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">Postal Code</label>
                <input type="text" name="postalCode" id="postalCode" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" onChange={handleInputChange} value={customerDetails.postal_code} />
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-semibold mt-10 mb-6">Payment Method</h2>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center cursor-pointer" onClick={() => setPaymentMethod('online')}>
                <input type="radio" name="paymentMethod" value="online" checked={paymentMethod === 'online'} className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500" readOnly />
                <label className="ml-3 block text-sm font-medium text-gray-700">Pay Online</label>
              </div>
              {paymentMethod === 'online' && (
                <div className="mt-4 pl-7 space-y-4">
                  <div className="flex items-center"><input type="radio" id="card" name="onlineOption" value="card" checked={onlinePaymentOption === 'card'} onChange={() => setOnlinePaymentOption('card')} className="h-4 w-4" /><label htmlFor="card" className="ml-2">Debit/Credit Card</label></div>
                  <div className="flex items-center"><input type="radio" id="upi" name="onlineOption" value="upi" checked={onlinePaymentOption === 'upi'} onChange={() => setOnlinePaymentOption('upi')} className="h-4 w-4" /><label htmlFor="upi" className="ml-2">UPI</label></div>
                  <div className="flex items-center"><input type="radio" id="qr" name="onlineOption" value="qr" checked={onlinePaymentOption === 'qr'} onChange={() => setOnlinePaymentOption('qr')} className="h-4 w-4" /><label htmlFor="qr" className="ml-2">QR Code</label></div>
                  {onlinePaymentOption === 'card' && <div className="pt-4 space-y-4"><input placeholder="Card Number" className="w-full p-2 border rounded" /><div className="flex space-x-4"><input placeholder="MM/YY" className="w-1/2 p-2 border rounded" /><input placeholder="CVV" className="w-1/2 p-2 border rounded" /></div></div>}
                  {onlinePaymentOption === 'upi' && <div className="pt-4"><input placeholder="Enter UPI ID" className="w-full p-2 border rounded" /></div>}
                  {onlinePaymentOption === 'qr' && <div className="pt-4 flex justify-center"><Image src="/qr-code.png" alt="QR Code" width={150} height={150} /></div>}
                </div>
              )}
            </div>
            <div className="flex items-center p-4 border rounded-lg cursor-pointer" onClick={() => setPaymentMethod('cod')}>
              <input type="radio" name="paymentMethod" value="cod" checked={paymentMethod === 'cod'} className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500" readOnly />
              <label className="ml-3 block text-sm font-medium text-gray-700">Pay on Delivery (Cash)</label>
            </div>
          </div>

          <div className="mt-10">
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105" disabled={status === 'Placing order...'}>
              {status === 'Placing order...' ? 'Processing...' : 'Place Order'}
            </button>
            {status && status !== 'Placing order...' && <p className="text-center mt-4">{status}</p>}
          </div>
        </form>
      </div>
    </div>
  );
}
