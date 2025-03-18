import React from 'react';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';

// Mock data for all products by category
const productsByCategory = {
  'fruits-vegetables': [
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
      image: '/images/products/bananas.jpg',
      category: 'fruits',
      unit: '1 lb'
    },
    {
      id: 3,
      name: 'Fresh Spinach',
      price: 3.49,
      image: '/images/products/spinach.jpg',
      category: 'vegetables',
      unit: '1 bunch'
    },
    {
      id: 4,
      name: 'Carrots',
      price: 1.49,
      image: '/images/products/carrots.jpg',
      category: 'vegetables',
      unit: '1 lb'
    }
  ],
  'dairy-eggs': [
    {
      id: 5,
      name: 'Whole Milk',
      price: 3.99,
      image: '/images/products/milk.jpg',
      category: 'dairy',
      unit: '1 gallon'
    },
    {
      id: 6,
      name: 'Greek Yogurt',
      price: 4.99,
      image: '/images/products/yogurt.jpg',
      category: 'dairy',
      unit: '16 oz'
    },
    {
      id: 7,
      name: 'Cheddar Cheese',
      price: 5.99,
      image: '/images/products/cheese.jpg',
      category: 'dairy',
      unit: '8 oz'
    },
    {
      id: 8,
      name: 'Large Eggs',
      price: 4.99,
      image: '/images/products/eggs.jpg',
      category: 'dairy',
      unit: '12 count'
    }
  ],
  'pantry': [
    {
      id: 9,
      name: 'Organic Rice',
      price: 6.99,
      image: '/images/products/rice.jpg',
      category: 'pantry',
      unit: '2 lb'
    },
    {
      id: 10,
      name: 'Pasta',
      price: 2.99,
      image: '/images/products/pasta.jpg',
      category: 'pantry',
      unit: '16 oz'
    },
    {
      id: 11,
      name: 'Olive Oil',
      price: 8.99,
      image: '/images/products/olive-oil.jpg',
      category: 'pantry',
      unit: '16 oz'
    },
    {
      id: 12,
      name: 'Canned Tomatoes',
      price: 1.99,
      image: '/images/products/tomatoes.jpg',
      category: 'pantry',
      unit: '14.5 oz'
    }
  ]
};

const categories = {
  'fruits-vegetables': 'Fruits & Vegetables',
  'dairy-eggs': 'Dairy & Eggs',
  'meat-fish': 'Meat & Fish',
  'bread-bakery': 'Bread & Bakery',
  'pantry': 'Pantry',
  'beverages': 'Beverages',
  'snacks': 'Snacks',
  'household': 'Household'
};

interface CategoryPageProps {
  params: {
    id: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const categoryId = params.id;
  const categoryName = categories[categoryId as keyof typeof categories] || 'Category';
  const products = productsByCategory[categoryId as keyof typeof productsByCategory] || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <Link 
          href="/categories" 
          className="text-green-600 hover:text-green-700 font-medium mb-4 inline-block"
        >
          ← Back to Categories
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">{categoryName}</h1>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No products available in this category yet.</p>
      )}
    </div>
  );
} 