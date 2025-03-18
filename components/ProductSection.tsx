import React from 'react';
import Image from 'next/image';
import ProductCard from './ProductCard';

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

interface ProductSectionProps {
  title: string;
  products: Product[];
  category: string;
}

const ProductSection: React.FC<ProductSectionProps> = ({ title, products, category }) => {
  return (
    <section className="py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        <a href={`/category/${category}`} className="text-blue-600 hover:text-blue-800">
          View All
        </a>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductSection; 