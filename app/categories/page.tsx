import React from 'react';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  unit: string;
  discount?: number;
}

type CategoryId = 'fruits-vegetables' | 'dairy-eggs' | 'meat-fish' | 'bread-bakery' | 'pantry' | 'beverages' | 'snacks' | 'household';

// Mock data for all products by category
const productsByCategory: Record<CategoryId, Product[]> = {
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
  ],
  'meat-fish': [],
  'bread-bakery': [],
  'beverages': [],
  'snacks': [],
  'household': []
};

const categories = [
  { id: 'fruits-vegetables' as CategoryId, name: 'Fruits & Vegetables' },
  { id: 'dairy-eggs' as CategoryId, name: 'Dairy & Eggs' },
  { id: 'meat-fish' as CategoryId, name: 'Meat & Fish' },
  { id: 'bread-bakery' as CategoryId, name: 'Bread & Bakery' },
  { id: 'pantry' as CategoryId, name: 'Pantry' },
  { id: 'beverages' as CategoryId, name: 'Beverages' },
  { id: 'snacks' as CategoryId, name: 'Snacks' },
  { id: 'household' as CategoryId, name: 'Household' }
];

export default function CategoriesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">All Categories</h1>
      
      <div className="space-y-12">
        {categories.map((category) => (
          <section key={category.id} className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-900">{category.name}</h2>
              <Link
                href={`/category/${category.id}`}
                className="text-green-600 hover:text-green-700 font-medium"
              >
                View All
              </Link>
            </div>
            
            {productsByCategory[category.id]?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {productsByCategory[category.id].map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No products available in this category yet.</p>
            )}
          </section>
        ))}
      </div>
    </div>
  );
} 