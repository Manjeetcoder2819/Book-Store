"use client";

import Book from '@/components/Book';
import Link from 'next/link';
import Image from 'next/image';
import { allBooks } from '@/data/books';
import { FiBookOpen, FiTruck, FiAward } from 'react-icons/fi';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const featuredBooks = allBooks.slice(0, 4);
const newArrivals = allBooks.slice(4, 8);

const FeatureCard = ({ icon, title, children }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300">
    <div className="text-blue-600 inline-block mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
    <p className="text-gray-600">{children}</p>
  </div>
);

// Custom Arrow Components for Slider
const NextArrow = ({ onClick }) => (
  <button
    className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10 bg-black/50 text-white p-3 rounded-full hover:bg-black/75 transition-all duration-300 hidden md:block"
    onClick={onClick}
  >
    <FaChevronRight size={24} />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10 bg-black/50 text-white p-3 rounded-full hover:bg-black/75 transition-all duration-300 hidden md:block"
    onClick={onClick}
  >
    <FaChevronLeft size={24} />
  </button>
);

// Hero Slider Component
const HeroSlider = () => {
  const slides = [
    {
      img: 'https://images.pexels.com/photos/3952084/pexels-photo-3952084.jpeg',
      title: 'Find Your Book',
      subtitle: 'Explore a universe of stories, from timeless classics to modern masterpieces.'
    },
    {
      img: 'https://images.pexels.com/photos/2228580/pexels-photo-2228580.jpeg',
      title: 'Unlock New Worlds',
      subtitle: 'Every book is a new journey waiting to be discovered.'
    },
    {
      img: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg',
      title: 'Your Next Adventure Awaits',
      subtitle: 'Get lost in a story that will stay with you forever.'
    },
    {
      img: 'https://images.pexels.com/photos/3747488/pexels-photo-3747488.jpeg',
      title: 'Fuel Your Imagination',
      subtitle: 'Expand your mind and see the world from a new perspective.'
    }
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000, // Slower transition for a smoother fade
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // Changed to 3s for better readability
    fade: true,
    cssEase: 'linear',
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    appendDots: dots => (
      <div style={{ bottom: '25px' }}>
        <ul style={{ margin: '0px' }}> {dots} </ul>
      </div>
    ),
  };

  return (
    <section className="relative h-[500px] md:h-[600px] text-white mb-16 overflow-hidden rounded-lg shadow-2xl">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index}>
            <div className="relative h-[500px] md:h-[600px]">
              <Image
                src={slide.img}
                alt={slide.title}
                layout="fill"
                objectFit="cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}>
                  {slide.title}
                </h1>
                <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto font-light" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.6)' }}>
                  {slide.subtitle}
                </p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default function HomePage() {
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <HeroSlider />

      {/* Featured Books Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Featured Books</h2>
          <p className="text-lg text-gray-600 mt-2">Handpicked by our expert curators</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredBooks.map(book => (
            <Book key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Why Shop With Us?</h2>
            <p className="text-lg text-gray-600 mt-2">An unparalleled book-buying experience.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard icon={<FiBookOpen size={40} />} title="Curated Collections">
              Discover hidden gems and must-reads selected by our passionate team of book lovers.
            </FeatureCard>
            <FeatureCard icon={<FiTruck size={40} />} title="Fast & Reliable Shipping">
              Get your books delivered to your doorstep quickly and safely, no matter where you are.
            </FeatureCard>
            <FeatureCard icon={<FiAward size={40} />} title="Member Rewards">
              Join our community to enjoy exclusive discounts, early access to new titles, and special offers.
            </FeatureCard>
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">New Arrivals</h2>
          <p className="text-lg text-gray-600 mt-2">The latest and greatest additions to our collection</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {newArrivals.map(book => (
            <Book key={book.id} book={book} />
          ))}
        </div>
      </section>
    </div>
  );
}
