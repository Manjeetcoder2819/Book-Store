"use client";

import { useState } from 'react';
import dynamic from 'next/dynamic';

const OrderMap = dynamic(() => import('@/components/OrderMap'), { ssr: false });

const exampleOrders = {
  '12345': {
    status: 'Processing',
    location: { lat: 34.0522, lng: -118.2437, status: 'Warehouse, Ahemdabad' },
  },
  '67890': {
    status: 'Shipped',
    location: { lat: 39.9526, lng: -75.1652, status: 'In transit, near pune 📦' },
  },
  '11223': {
    status: 'Out for Delivery',
    location: { lat: 40.7128, lng: -74.0060, status: 'Out for delivery in nagpur city 🚗' },
  },
  '44556': {
    status: 'Delivered',
    location: { lat: 41.8781, lng: -87.6298, status: 'Delivered to your address ✅' },
  },

};

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState(null);

  const handleTrackOrder = (e) => {
    e.preventDefault();
    const order = exampleOrders[orderId];
    if (order) {
      setOrder(order);
    } else {
      setOrder({ status: 'Not Found', location: null });
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-10">Track Your Order</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Form Section */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Enter Order Details</h2>
          <form onSubmit={handleTrackOrder}>
            <label htmlFor="orderId" className="block text-sm font-medium text-gray-700">Order ID</label>
            <input
              type="text"
              id="orderId"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
            <button type="submit" className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors">Track Order</button>
          </form>
        </div>

        {/* Map and Status Section */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Order Location</h2>
          {order ? (
            <div>
              <p className="mb-1"><strong>Order ID:</strong> {orderId}</p>
              <p className="mb-4"><strong>Status:</strong> {order.status}</p>
              <div className="h-96 w-full bg-gray-200 rounded-md">
                {order.location ? (
                  <OrderMap location={order.location} />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">Order not found or location unavailable.</div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-96 bg-gray-100 rounded-md">
              <p className="text-gray-500">Enter an order ID to see its location.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
