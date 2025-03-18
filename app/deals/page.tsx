import React from 'react';
import ProductCard from '@/components/ProductCard';

// Mock data for deals
const deals = [
  {
    id: 1,
    name: 'Fresh Apples',
    price: 2.99,
    originalPrice: 3.99,
    image: '/images/products/apples.jpg',
    category: 'fruits',
    unit: '1 lb',
    discount: 25
  },
  {
    id: 2,
    name: 'Organic Bananas',
    price: 1.99,
    originalPrice: 2.49,
    image: '/images/products/bananas.jpg',
    category: 'fruits',
    unit: '1 lb',
    discount: 20
  },
  {
    id: 3,
    name: 'Fresh Spinach',
    price: 3.49,
    originalPrice: 4.99,
    image: '/images/products/spinach.jpg',
    category: 'vegetables',
    unit: '1 bunch',
    discount: 30
  },
  {
    id: 4,
    name: 'Carrots',
    price: 1.49,
    originalPrice: 2.49,
    image: '/images/products/carrots.jpg',
    category: 'vegetables',
    unit: '1 lb',
    discount: 40
  },
  {
    id: 5,
    name: 'Whole Milk',
    price: 3.99,
    originalPrice: 4.99,
    image: '/images/products/milk.jpg',
    category: 'dairy',
    unit: '1 gallon',
    discount: 20
  },
  {
    id: 6,
    name: 'Greek Yogurt',
    price: 4.99,
    originalPrice: 6.99,
    image: '/images/products/yogurt.jpg',
    category: 'dairy',
    unit: '16 oz',
    discount: 28
  },
  {
    id: 7,
    name: 'Cheddar Cheese',
    price: 5.99,
    originalPrice: 7.99,
    image: '/images/products/cheese.jpg',
    category: 'dairy',
    unit: '8 oz',
    discount: 25
  },
  {
    id: 8,
    name: 'Large Eggs',
    price: 4.99,
    originalPrice: 6.99,
    image: '/images/products/eggs.jpg',
    category: 'dairy',
    unit: '12 count',
    discount: 28
  }
];

export default function DealsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Today's Deals</h1>
        <p className="text-lg text-gray-600">Save big on your favorite products</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {deals.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
} 