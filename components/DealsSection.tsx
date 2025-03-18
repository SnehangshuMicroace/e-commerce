import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const deals = [
  {
    id: 1,
    title: 'Fresh Produce Sale',
    description: 'Up to 50% off on selected fruits and vegetables',
    image: '/images/deals/fresh-produce.jpg',
    discount: '50% OFF',
    validUntil: '2024-03-25',
    href: '/deals/fresh-produce'
  },
  {
    id: 2,
    title: 'Dairy Specials',
    description: 'Buy 2 Get 1 Free on all dairy products',
    image: '/images/deals/dairy.jpg',
    discount: 'B2G1',
    validUntil: '2024-03-23',
    href: '/deals/dairy'
  },
  {
    id: 3,
    title: 'Pantry Essentials',
    description: '25% off on all pantry items',
    image: '/images/deals/pantry.jpg',
    discount: '25% OFF',
    validUntil: '2024-03-24',
    href: '/deals/pantry'
  }
];

const DealsSection = () => {
  return (
    <section className="py-8 px-4">
      <h2 className="text-2xl font-bold mb-6">Special Deals</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {deals.map((deal) => (
          <Link
            key={deal.id}
            href={deal.href}
            className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="relative h-48">
              <Image
                src={deal.image}
                alt={deal.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {deal.discount}
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{deal.title}</h3>
              <p className="text-gray-600 mb-2">{deal.description}</p>
              <p className="text-sm text-gray-500">Valid until {new Date(deal.validUntil).toLocaleDateString()}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default DealsSection; 