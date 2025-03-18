import CategorySection from '@/components/CategorySection';
import DealsSection from '@/components/DealsSection';
import ProductSection from '@/components/ProductSection';

// Mock data for different product sections
const freshProduce = [
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
];

const dairyProducts = [
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
];

const pantryItems = [
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

export default function Home() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative bg-green-700">
        <div className="absolute inset-0">
          <img
            className="h-full w-full object-cover"
            src="/images/hero/grocery-hero.jpg"
            alt="Fresh Groceries"
          />
          <div className="absolute inset-0 bg-green-700 mix-blend-multiply" />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Fresh Groceries Delivered
          </h1>
          <p className="mt-6 text-xl text-gray-100 max-w-3xl">
            Shop for fresh produce, dairy, pantry items, and more. Get the best deals on groceries delivered to your doorstep.
          </p>
          <div className="mt-10">
            <a
              href="/products"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
            >
              Shop Now
            </a>
          </div>
        </div>
      </div>

      {/* Category Section */}
      <CategorySection />

      {/* Deals Section */}
      <DealsSection />

      {/* Fresh Produce Section */}
      <ProductSection
        title="Fresh Produce"
        products={freshProduce}
        category="fruits-vegetables"
      />

      {/* Dairy & Eggs Section */}
      <ProductSection
        title="Dairy & Eggs"
        products={dairyProducts}
        category="dairy-eggs"
      />

      {/* Pantry Section */}
      <ProductSection
        title="Pantry Essentials"
        products={pantryItems}
        category="pantry"
      />
    </div>
  );
}
