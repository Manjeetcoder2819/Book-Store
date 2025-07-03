"use client";

import Image from 'next/image';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function Book({ book }) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(book, 1); // Always add 1 from this component
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000); // Reset after 2 seconds
  };

  return (
    <div className="group relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white">
      <Link href={`/book/${book.id}`} className="block">
        <div className="relative w-full h-80">
          <Image
            src={book.images[0]}
            alt={`Cover of ${book.title}`}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-500 ease-in-out group-hover:scale-110"
          />
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Content appears on hover */}
          <div className="absolute inset-0 p-4 flex flex-col text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div>
              <h2 className="text-lg font-bold truncate">{book.title}</h2>
              <p className="text-sm text-gray-300 mt-1">{book.author}</p>
            </div>
            <div className="flex-grow"></div>
            <div className="flex justify-between items-center">
              <p className="text-xl font-extrabold">${book.price.toFixed(2)}</p>
              <button 
                onClick={handleAddToCart} 
                className={`px-4 py-2 rounded-md font-semibold transition-all duration-300 ease-in-out text-sm ${isAdded ? 'bg-green-500' : 'bg-blue-600 hover:bg-blue-700'}`}
                disabled={isAdded}
              >
                {isAdded ? 'Added!' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
