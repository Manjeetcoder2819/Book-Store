"use client";

import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/store', label: 'Store' },
    { href: '/services', label: 'Services' },
    { href: '/contact', label: 'Contact' },
    { href: '/payment', label: 'Payment' },
    { href: '/track', label: 'Track Order' },
  ];

  return (
    <header className="bg-gray-800 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold hover:text-gray-300 transition-colors">
          My Bookstore
        </Link>
        <nav className="hidden md:flex items-center space-x-4">
          <div className="relative" onMouseEnter={() => setIsCategoryOpen(true)} onMouseLeave={() => setIsCategoryOpen(false)}>
            <button className="px-3 py-2 rounded hover:bg-gray-700 transition-colors flex items-center">
              Categories <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            {isCategoryOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-20">
                <Link href="/store?category=fiction" className="block px-4 py-2 text-sm text-white hover:bg-gray-700">Fiction</Link>
                <Link href="/store?category=scifi" className="block px-4 py-2 text-sm text-white hover:bg-gray-700">Science Fiction</Link>
                <Link href="/store?category=mystery" className="block px-4 py-2 text-sm text-white hover:bg-gray-700">Mystery</Link>
                <Link href="/store?category=fantasy" className="block px-4 py-2 text-sm text-white hover:bg-gray-700">Fantasy</Link>
              </div>
            )}
          </div>
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} className="px-3 py-2 rounded hover:bg-gray-700 transition-colors">
              {link.label}
            </Link>
          ))}
          <Link href="/cart" className="relative p-2">
            <svg className="w-6 h-6 text-gray-600 hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{totalItems}</span>
            )}
          </Link>
        </nav>
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}></path>
            </svg>
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800">
          <nav className="flex flex-col items-center space-y-2 px-4 pb-4">
            <Link href="/contact" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Contact</Link>
            <Link href="/services" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Services</Link>
            <Link href="/cart" className="block w-full text-center px-3 py-2 rounded hover:bg-gray-700 transition-colors" onClick={() => setIsMenuOpen(false)}>Cart ({totalItems})</Link>
            <div className="w-full text-center px-3 py-2">Categories:</div>
            <Link href="/store?category=fiction" className="block w-full text-center px-3 py-2 rounded hover:bg-gray-700 transition-colors pl-8" onClick={() => setIsMenuOpen(false)}>- Fiction</Link>
            <Link href="/store?category=scifi" className="block w-full text-center px-3 py-2 rounded hover:bg-gray-700 transition-colors pl-8" onClick={() => setIsMenuOpen(false)}>- Science Fiction</Link>
            <Link href="/store?category=mystery" className="block w-full text-center px-3 py-2 rounded hover:bg-gray-700 transition-colors pl-8" onClick={() => setIsMenuOpen(false)}>- Mystery</Link>
            <Link href="/store?category=fantasy" className="block w-full text-center px-3 py-2 rounded hover:bg-gray-700 transition-colors pl-8" onClick={() => setIsMenuOpen(false)}>- Fantasy</Link>
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} className="block w-full text-center px-3 py-2 rounded hover:bg-gray-700 transition-colors" onClick={() => setIsMenuOpen(false)}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
