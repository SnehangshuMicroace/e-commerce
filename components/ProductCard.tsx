import React from 'react';
import Image from 'next/image';
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

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product.id}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="relative h-48">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.discount && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm">
              {product.discount}% OFF
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-600 transition-colors duration-300">
            {product.name}
          </h3>
          <div className="mt-2 flex items-center">
            <p className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
            {product.originalPrice && (
              <p className="ml-2 text-sm text-gray-500 line-through">
                ${product.originalPrice.toFixed(2)}
              </p>
            )}
          </div>
          <p className="mt-1 text-sm text-gray-500">{product.unit}</p>
        </div>
      </div>
    </Link>
  );
} 