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
  originalPrice?: number;
  image: string;
  category: string;
  unit: string;
  discount?: number;
  description: string;
  details: string[];
}

// Mock data for products
const products: Record<number, Product> = {
  1: {
    id: 1,
    name: 'Fresh Apples',
    price: 2.99,
    originalPrice: 3.99,
    image: '/images/products/apples.jpg',
    category: 'fruits',
    unit: '1 lb',
    discount: 25,
    description: 'Fresh, crisp apples perfect for snacking or baking. Our apples are carefully selected for their quality and taste.',
    details: [
      'Freshly harvested from local farms',
      'Available in various varieties',
      'Perfect for eating fresh or cooking',
      'Rich in fiber and vitamins'
    ]
  },
  2: {
    id: 2,
    name: 'Organic Bananas',
    price: 1.99,
    image: '/images/products/bananas.jpg',
    category: 'fruits',
    unit: '1 lb',
    description: 'Organic bananas that are naturally sweet and perfect for your daily nutrition needs.',
    details: [
      'Certified organic',
      'Perfect ripeness',
      'Great source of potassium',
      'Ideal for smoothies and snacks'
    ]
  },
  3: {
    id: 3,
    name: 'Fresh Spinach',
    price: 3.49,
    image: '/images/products/spinach.jpg',
    category: 'vegetables',
    unit: '1 bunch',
    description: 'Fresh, crisp spinach leaves perfect for salads or cooking. Packed with nutrients and vitamins.',
    details: [
      'Freshly harvested',
      'Rich in iron and vitamins',
      'Perfect for salads and cooking',
      'Organic options available'
    ]
  },
  4: {
    id: 4,
    name: 'Carrots',
    price: 1.49,
    image: '/images/products/carrots.jpg',
    category: 'vegetables',
    unit: '1 lb',
    description: 'Sweet and crunchy carrots that are perfect for snacking or cooking.',
    details: [
      'Fresh and crisp',
      'High in vitamin A',
      'Perfect for snacking',
      'Great for cooking'
    ]
  },
  5: {
    id: 5,
    name: 'Whole Milk',
    price: 3.99,
    image: '/images/products/milk.jpg',
    category: 'dairy',
    unit: '1 gallon',
    description: 'Fresh whole milk from local dairy farms. Perfect for drinking, cooking, or making dairy products.',
    details: [
      'Fresh from local farms',
      'High in calcium and vitamin D',
      'Perfect for drinking and cooking',
      'Available in various sizes'
    ]
  },
  6: {
    id: 6,
    name: 'Greek Yogurt',
    price: 4.99,
    image: '/images/products/yogurt.jpg',
    category: 'dairy',
    unit: '16 oz',
    description: 'Creamy Greek yogurt made with traditional methods. High in protein and perfect for breakfast or snacks.',
    details: [
      'High in protein',
      'Creamy texture',
      'Perfect for breakfast',
      'Great for smoothies'
    ]
  },
  7: {
    id: 7,
    name: 'Cheddar Cheese',
    price: 5.99,
    image: '/images/products/cheese.jpg',
    category: 'dairy',
    unit: '8 oz',
    description: 'Sharp cheddar cheese aged to perfection. Perfect for sandwiches, cooking, or snacking.',
    details: [
      'Aged to perfection',
      'Sharp and flavorful',
      'Perfect for cooking',
      'Great for sandwiches'
    ]
  },
  8: {
    id: 8,
    name: 'Large Eggs',
    price: 4.99,
    image: '/images/products/eggs.jpg',
    category: 'dairy',
    unit: '12 count',
    description: 'Farm-fresh large eggs perfect for breakfast, baking, or cooking.',
    details: [
      'Farm fresh',
      'High in protein',
      'Perfect for breakfast',
      'Great for baking'
    ]
  },
  9: {
    id: 9,
    name: 'Organic Rice',
    price: 6.99,
    image: '/images/products/rice.jpg',
    category: 'pantry',
    unit: '2 lb',
    description: 'Organic long-grain rice perfect for everyday cooking. Grown sustainably and packed with nutrients.',
    details: [
      'Certified organic',
      'Long grain variety',
      'Perfect for everyday cooking',
      'Sustainably grown'
    ]
  },
  10: {
    id: 10,
    name: 'Pasta',
    price: 2.99,
    image: '/images/products/pasta.jpg',
    category: 'pantry',
    unit: '16 oz',
    description: 'Classic Italian pasta made with durum wheat. Perfect for your favorite pasta dishes.',
    details: [
      'Made with durum wheat',
      'Classic Italian style',
      'Perfect for various dishes',
      'Quick cooking'
    ]
  },
  11: {
    id: 11,
    name: 'Olive Oil',
    price: 8.99,
    image: '/images/products/olive-oil.jpg',
    category: 'pantry',
    unit: '16 oz',
    description: 'Extra virgin olive oil perfect for cooking, dressing, or dipping. Imported from Italy.',
    details: [
      'Extra virgin quality',
      'Imported from Italy',
      'Perfect for cooking',
      'Great for dressings'
    ]
  },
  12: {
    id: 12,
    name: 'Canned Tomatoes',
    price: 1.99,
    image: '/images/products/tomatoes.jpg',
    category: 'pantry',
    unit: '14.5 oz',
    description: 'Whole peeled tomatoes perfect for sauces, soups, and stews. Packed at the peak of freshness.',
    details: [
      'Whole peeled',
      'Packed at peak freshness',
      'Perfect for sauces',
      'Great for soups'
    ]
  }
};

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const productId = parseInt(params.id, 10);
  const product = products[productId];
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
      <Link 
        href="/" 
        className="inline-flex items-center text-green-600 hover:text-green-700 mb-8"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Home
      </Link>

      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
        {/* Product Image */}
        <div className="relative h-96 lg:h-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover rounded-lg"
          />
        </div>

        {/* Product Info */}
        <div className="mt-10 lg:mt-0">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          
          <div className="mt-4">
            <div className="flex items-center">
              <p className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
              {product.originalPrice && (
                <>
                  <p className="ml-2 text-lg text-gray-500 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </p>
                  {product.discount && (
                    <span className="ml-2 text-sm text-green-600">
                      {product.discount}% OFF
                    </span>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="mt-6">
            <p className="text-gray-700">{product.description}</p>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900">Product Details</h2>
            <ul className="mt-4 space-y-2">
              {product.details.map((detail, index) => (
                <li key={index} className="flex items-center text-gray-600">
                  <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
                  {detail}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <button
              type="button"
              onClick={handleAddToCart}
              className="w-full bg-green-600 text-white py-3 px-6 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 