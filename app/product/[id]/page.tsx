'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import useCartStore from '@/store/cart';
import toast from 'react-hot-toast';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

interface ProductPageProps {
  params: {
    id: string;
  };
}

// Temporary product data - will be replaced with Firebase data
const products: Product[] = [
  {
    id: 1,
    name: 'Fresh Apples',
    price: 2.99,
    image: '/images/apples.jpg',
    description: 'Fresh and juicy apples from local farms.',
    category: 'Fruits'
  },
  // Add more products as needed
];

export default function ProductPage({ params }: ProductPageProps) {
  const productId = parseInt(params.id, 10);
  const product = products.find(p => p.id === productId);
  const addToCart = useCartStore((state) => state.addItem);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Product not found</h1>
          <Link href="/" className="text-green-600 hover:text-green-700 mt-4 inline-block">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      image: product.image
    });
    toast.success('Added to cart!', {
      duration: 2000,
      position: 'bottom-right',
      style: {
        background: '#10B981',
        color: '#fff',
      },
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/" className="inline-flex items-center text-green-600 hover:text-green-700 mb-8">
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative h-96">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover rounded-lg"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
          <p className="text-2xl font-semibold text-green-600 mb-4">${product.price.toFixed(2)}</p>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <button
            onClick={handleAddToCart}
            className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
} 