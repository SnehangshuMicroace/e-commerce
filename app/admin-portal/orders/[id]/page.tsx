'use client';

import { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import toast from 'react-hot-toast';
import Link from 'next/link';

interface Order {
  id: string;
  userId: string;
  items: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
  }[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

export default function OrderDetailsPage({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<Order | null>(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchOrder();
  }, [params.id]);

  const fetchOrder = async () => {
    try {
      const docRef = doc(db, 'orders', params.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setOrder({
          id: docSnap.id,
          ...docSnap.data(),
        } as Order);
      } else {
        toast.error('Order not found');
      }
    } catch (error) {
      console.error('Error fetching order:', error);
      toast.error('Failed to fetch order details');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (newStatus: Order['status']) => {
    if (!order) return;

    setUpdating(true);
    try {
      await updateDoc(doc(db, 'orders', order.id), {
        status: newStatus,
      });
      setOrder(prev => prev ? { ...prev, status: newStatus } : null);
      toast.success('Order status updated successfully');
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Failed to update order status');
    } finally {
      setUpdating(false);
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (timestamp: Order['createdAt']) => {
    return new Date(timestamp.seconds * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900">Order not found</h2>
        <Link
          href="/admin-portal/orders"
          className="mt-4 inline-flex items-center text-green-600 hover:text-green-900"
        >
          Back to Orders
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Order Details</h1>
          <p className="mt-2 text-sm text-gray-700">
            Order ID: {order.id}
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link
            href="/admin-portal/orders"
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Back to Orders
          </Link>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Order Information */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Order Information</h2>
          <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-gray-500">Order Date</dt>
              <dd className="mt-1 text-sm text-gray-900">{formatDate(order.createdAt)}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Order Status</dt>
              <dd className="mt-1">
                <span
                  className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Total Amount</dt>
              <dd className="mt-1 text-sm text-gray-900">${order.total.toFixed(2)}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Customer ID</dt>
              <dd className="mt-1 text-sm text-gray-900">{order.userId}</dd>
            </div>
          </dl>
        </div>

        {/* Shipping Information */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Shipping Information</h2>
          <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Name</dt>
              <dd className="mt-1 text-sm text-gray-900">{order.shippingAddress.name}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Address</dt>
              <dd className="mt-1 text-sm text-gray-900">{order.shippingAddress.address}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">City</dt>
              <dd className="mt-1 text-sm text-gray-900">{order.shippingAddress.city}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">State</dt>
              <dd className="mt-1 text-sm text-gray-900">{order.shippingAddress.state}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">ZIP Code</dt>
              <dd className="mt-1 text-sm text-gray-900">{order.shippingAddress.zipCode}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Country</dt>
              <dd className="mt-1 text-sm text-gray-900">{order.shippingAddress.country}</dd>
            </div>
          </dl>
        </div>

        {/* Order Items */}
        <div className="bg-white shadow rounded-lg p-6 lg:col-span-2">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Order Items</h2>
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                    Product
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Price
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Quantity
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {order.items.map((item, index) => (
                  <tr key={index}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                      {item.name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      ${item.price.toFixed(2)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {item.quantity}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Status Update */}
        <div className="bg-white shadow rounded-lg p-6 lg:col-span-2">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Update Order Status</h2>
          <div className="flex space-x-4">
            <button
              onClick={() => handleStatusUpdate('processing')}
              disabled={updating || order.status === 'processing'}
              className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                order.status === 'processing'
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            >
              Mark as Processing
            </button>
            <button
              onClick={() => handleStatusUpdate('shipped')}
              disabled={updating || order.status === 'shipped'}
              className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                order.status === 'shipped'
                  ? 'bg-purple-400 cursor-not-allowed'
                  : 'bg-purple-600 hover:bg-purple-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500`}
            >
              Mark as Shipped
            </button>
            <button
              onClick={() => handleStatusUpdate('delivered')}
              disabled={updating || order.status === 'delivered'}
              className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                order.status === 'delivered'
                  ? 'bg-green-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
            >
              Mark as Delivered
            </button>
            <button
              onClick={() => handleStatusUpdate('cancelled')}
              disabled={updating || order.status === 'cancelled'}
              className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                order.status === 'cancelled'
                  ? 'bg-red-400 cursor-not-allowed'
                  : 'bg-red-600 hover:bg-red-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500`}
            >
              Cancel Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 