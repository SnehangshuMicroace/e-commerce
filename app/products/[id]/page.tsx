'use client';

import Image from 'next/image';
import useCartStore from '@/store/cart';

// Mock data for product details
const product = {
  id: '1',
  name: 'Wireless Headphones',
  price: 99.99,
  image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop',
  description: 'High-quality wireless headphones with noise cancellation',
  category: 'Electronics',
  features: [
    'Active noise cancellation',
    '40-hour battery life',
    'Bluetooth 5.0',
    'Built-in microphone',
    'Touch controls',
  ],
  specifications: {
    'Brand': 'AudioTech',
    'Model': 'WH-1000XM4',
    'Color': 'Black',
    'Weight': '250g',
    'Warranty': '2 years',
  },
};

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
        {/* Product Image */}
        <div className="relative h-96 lg:h-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>

        {/* Product Info */}
        <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.name}</h1>
          <div className="mt-3">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">${product.price}</p>
          </div>

          <div className="mt-6">
            <h3 className="sr-only">Description</h3>
            <div className="space-y-6 text-base text-gray-700">
              {product.description}
            </div>
          </div>

          <div className="mt-8 flex">
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
            >
              Add to cart
            </button>
          </div>

          {/* Features */}
          <div className="mt-10">
            <h3 className="text-sm font-medium text-gray-900">Features</h3>
            <div className="mt-4">
              <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                {product.features.map((feature) => (
                  <li key={feature} className="text-gray-400">
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Specifications */}
          <div className="mt-10">
            <h3 className="text-sm font-medium text-gray-900">Specifications</h3>
            <div className="mt-4">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key}>
                    <dt className="text-sm font-medium text-gray-900">{key}</dt>
                    <dd className="mt-1 text-sm text-gray-500">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 