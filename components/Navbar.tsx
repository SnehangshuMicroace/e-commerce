'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Menu, X, Search, User } from 'lucide-react';
import useCartStore from '@/store/cart';

const categories = [
  { id: 'fruits-vegetables', name: 'Fruits & Vegetables' },
  { id: 'dairy-eggs', name: 'Dairy & Eggs' },
  { id: 'meat-fish', name: 'Meat & Fish' },
  { id: 'bread-bakery', name: 'Bread & Bakery' },
  { id: 'pantry', name: 'Pantry' },
  { id: 'beverages', name: 'Beverages' },
  { id: 'snacks', name: 'Snacks' },
  { id: 'household', name: 'Household' }
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartItems = useCartStore((state) => state.items);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-2xl font-bold text-green-600">
                E-Store
              </Link>
            </div>
            
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Link
                href="/categories"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-green-600"
              >
                Categories
              </Link>
              <Link
                href="/deals"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-green-600"
              >
                Deals
              </Link>
            </div>
          </div>

          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center space-x-4">
              <Link href="/search" className="text-gray-600 hover:text-gray-900">
                <Search className="h-6 w-6" />
              </Link>
              <Link href="/cart" className="text-gray-600 hover:text-gray-900 relative">
                <ShoppingCart className="h-6 w-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
              <Link href="/account" className="text-gray-600 hover:text-gray-900">
                <User className="h-6 w-6" />
              </Link>
            </div>
            
            <button
              type="button"
              className="md:hidden ml-4 inline-flex items-center justify-center p-2 rounded-md text-gray-900 hover:text-green-600 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              href="/categories"
              className="block pl-3 pr-4 py-2 text-base font-medium text-gray-900 hover:text-green-600 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Categories
            </Link>
            <Link
              href="/deals"
              className="block pl-3 pr-4 py-2 text-base font-medium text-gray-900 hover:text-green-600 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Deals
            </Link>
            <div className="border-t border-gray-200 pt-2">
              <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Categories
              </div>
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/category/${category.id}`}
                  className="block pl-3 pr-4 py-2 text-base font-medium text-gray-900 hover:text-green-600 hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 