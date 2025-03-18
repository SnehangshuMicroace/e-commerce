import React from 'react';
import Link from 'next/link';

const categories = [
  { id: 1, name: 'Fruits & Vegetables', href: '/category/fruits-vegetables' },
  { id: 2, name: 'Dairy & Eggs', href: '/category/dairy-eggs' },
  { id: 3, name: 'Meat & Fish', href: '/category/meat-fish' },
  { id: 4, name: 'Bread & Bakery', href: '/category/bread-bakery' },
  { id: 5, name: 'Pantry', href: '/category/pantry' },
  { id: 6, name: 'Beverages', href: '/category/beverages' },
  { id: 7, name: 'Snacks', href: '/category/snacks' },
  { id: 8, name: 'Household', href: '/category/household' },
];

const CategorySection = () => {
  return (
    <section className="py-8 px-4">
      <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={category.href}
            className="flex items-center justify-center p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow text-center text-gray-700 hover:text-green-600"
          >
            <span className="text-sm font-medium">{category.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategorySection; 