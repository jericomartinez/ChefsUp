'use client';

import { useState } from 'react';
import Image from 'next/image';
import Header from '@/app/components/Header';

const chefs = [
  {
    id: 1,
    name: 'Homestyle Ramen by Aiko',
    prepTime: '30 – 40 mins',
    deliveryFee: '$1.99 Delivery Fee',
    rating: 9.7,
    promo: 'Buy One, Get One',
    img: '/placeholder1.jpg'
  },
  {
    id: 2,
    name: 'Vegan Bento by Mira',
    prepTime: '35 – 45 mins',
    deliveryFee: '$0 Delivery Fee Over $25',
    rating: 9.3,
    promo: 'Buy 1, get 1 free',
    img: '/placeholder2.jpg'
  },
  {
    id: 3,
    name: 'Sushi Rolls by Kenji',
    prepTime: '40 – 55 mins',
    deliveryFee: '$1.49 Delivery Fee',
    rating: 9.5,
    promo: 'Limited Offer',
    img: '/placeholder3.jpg'
  },
];

const nationalFaves = [
  {
    id: 4,
    name: 'Pizza by Sofia',
    prepTime: '25 – 35 mins',
    deliveryFee: '$0.99 Delivery Fee',
    rating: 9.9,
    img: '/placeholder4.jpg'
  },
  {
    id: 5,
    name: 'Fried Chicken by Ray',
    prepTime: '30 – 40 mins',
    deliveryFee: '$0.79 Delivery Fee',
    rating: 9.4,
    img: '/placeholder5.jpg'
  },
  {
    id: 6,
    name: 'Classic Italian by Marco',
    prepTime: '30 – 40 mins',
    deliveryFee: '$0.79 Delivery Fee',
    rating: 9.3,
    img: '/placeholder6.jpg'
  },
];

export default function ChefsUpPage() {
  const [search, setSearch] = useState('');
  const handleSearchChange = (value: string) => setSearch(value);

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <Header search={search} onSearchChange={handleSearchChange} />

      {/* Featured Section */}
      <div className="px-6 mt-6">
        <h2 className="text-xl font-semibold mb-3">Featured Home Chefs</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {chefs.map((chef) => (
            <div
              key={chef.id}
              className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition"
            >
              <div className="relative w-full h-44">
                <Image
                  src={chef.img}
                  alt={chef.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 left-2 bg-yellow-400 text-xs px-2 py-1 rounded-md font-semibold">
                  {chef.promo}
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold">{chef.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{chef.prepTime}</p>
                <p className="text-sm text-gray-600">{chef.deliveryFee}</p>

                <div className="mt-2 flex items-center gap-2">
                  <span className="text-orange-500 text-lg">★</span>
                  <span className="font-semibold">{chef.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* National Faves Section */}
      <div className="px-6 mt-10 mb-10">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Popular on ChefsUp</h2>
          <button className="text-orange-500 text-sm font-semibold">View All</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-4">
          {nationalFaves.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition"
            >
              <div className="relative w-full h-44">
                <Image
                  src={item.img}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{item.prepTime}</p>
                <p className="text-sm text-gray-600">{item.deliveryFee}</p>

                <div className="mt-2 flex items-center gap-2">
                  <span className="text-orange-500 text-lg">★</span>
                  <span className="font-semibold">{item.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
