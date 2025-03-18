import ProductCard from '@/components/ProductCard';

// Mock data for all products
const products = [
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
  },
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
  },
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
];

const categories = ['All', 'Fruits & Vegetables', 'Dairy & Eggs', 'Pantry'];

export default function ProductsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">All Products</h1>
        <div className="flex space-x-4">
          {categories.map((category) => (
            <button
              key={category}
              className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
} 