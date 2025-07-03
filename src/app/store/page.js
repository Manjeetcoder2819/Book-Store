"use client";

import { useState, useMemo } from 'react';
import Book from '@/components/Book';
import { useSearchParams } from 'next/navigation';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { allBooks } from '@/data/books';
import { FiSearch, FiX } from 'react-icons/fi';
import Image from 'next/image';

const categories = [...new Set(allBooks.map(book => book.category))];
const maxPrice = Math.ceil(Math.max(...allBooks.map(book => book.price)));

const HeroSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    fade: true,
  };

  const slides = [
    { img: '/banner-sale.jpg', title: 'Summer Reading Sale', subtitle: 'Get 20% off on selected titles!' },
    { img: '/banner-bestsellers.jpg', title: 'New York Times Bestsellers', subtitle: 'Discover the most popular books right now.' },
    { img: '/banner-free-shipping.jpg', title: 'Free Shipping', subtitle: 'On all orders over $50.' },
  ];

  return (
    <div className="mb-12 rounded-lg overflow-hidden shadow-2xl">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative h-64 md:h-80">
            <Image src={slide.img} layout="fill" objectFit="cover" alt={slide.title} />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white text-center p-4">
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">{slide.title}</h2>
              <p className="mt-2 text-lg md:text-xl">{slide.subtitle}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default function StorePage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState(maxPrice);
  const [sortOrder, setSortOrder] = useState('relevance');

  const filteredAndSortedBooks = useMemo(() => {
    let books = allBooks
      .filter(book => book.title.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter(book => selectedCategory === 'all' || book.category === selectedCategory)
      .filter(book => book.price <= priceRange);

    switch (sortOrder) {
      case 'price-asc':
        books.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        books.sort((a, b) => b.price - a.price);
        break;
      case 'title-asc':
        books.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'title-desc':
        books.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default: // relevance
        break;
    }

    return books;
  }, [searchTerm, selectedCategory, priceRange, sortOrder]);

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <HeroSlider />
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="w-full md:w-1/4 lg:w-1/5">
            <div className="bg-white p-6 rounded-lg shadow-lg sticky top-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Filters</h2>
              
              {/* Search Filter */}
              <div className="relative mb-6">
                <input 
                  type="text" 
                  placeholder="Search by title..." 
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <FiSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
                {searchTerm && <FiX onClick={() => setSearchTerm('')} className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-700" />}
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-lg font-semibold mb-2 text-gray-700">Category</label>
                <select 
                  value={selectedCategory}
                  onChange={e => setSelectedCategory(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="all">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                  ))}
                </select>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <label className="block text-lg font-semibold mb-2 text-gray-700">Max Price</label>
                <input 
                  type="range" 
                  min="0" 
                  max={maxPrice} 
                  value={priceRange}
                  onChange={e => setPriceRange(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="text-center mt-2 text-gray-600 font-medium">Up to ${priceRange}</div>
              </div>

              {/* Sort Order */}
              <div>
                <label className="block text-lg font-semibold mb-2 text-gray-700">Sort By</label>
                <select 
                  value={sortOrder}
                  onChange={e => setSortOrder(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="relevance">Relevance</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="title-asc">Title: A-Z</option>
                  <option value="title-desc">Title: Z-A</option>
                </select>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <main className="w-full md:w-3/4 lg:w-4/5">
            <div className="bg-white p-4 rounded-lg shadow-lg mb-6 flex justify-between items-center">
              <h1 className="text-xl font-bold text-gray-800">Showing {filteredAndSortedBooks.length} results</h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredAndSortedBooks.length > 0 ? (
                filteredAndSortedBooks.map(book => (
                  <Book key={book.id} book={book} />
                ))
              ) : (
                <div className="col-span-full text-center py-16">
                  <h2 className="text-2xl font-semibold text-gray-700">No books found</h2>
                  <p className="text-gray-500 mt-2">Try adjusting your filters to find what you're looking for.</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
