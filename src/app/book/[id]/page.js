"use client";

import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { allBooks } from '@/data/books';
import { useParams } from 'next/navigation';

export default function BookDetailPage() {
  const params = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedStyle, setSelectedStyle] = useState('Hardcover');
  const [activeTab, setActiveTab] = useState('description');
  
  // State for reviews
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ user: '', rating: 5, comment: '' });

  const book = allBooks.find(b => b.id.toString() === params.id);
  const [mainImage, setMainImage] = useState(book ? book.images[0] : '');

  useEffect(() => {
    if (book) {
      setMainImage(book.images[0]);
      setSelectedStyle(book.styles[0]);
      setReviews(book.reviews || []);
    }
  }, [book]);

  if (!book) {
    return <div className="container mx-auto text-center py-20">Book not found.</div>;
  }

  const handleAddToCart = () => {
    const itemToAdd = { ...book, selectedStyle };
    addToCart(itemToAdd, quantity);
    alert(`${quantity} of ${book.title} (${selectedStyle}) added to cart!`);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (newReview.user && newReview.comment) {
      setReviews([...reviews, newReview]);
      setNewReview({ user: '', rating: 5, comment: '' }); // Reset form
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image and Video Section */}
        <div>
          <div className="relative w-full h-96 bg-gray-200 rounded-lg mb-4">
            <Image src={mainImage} alt={book.title} layout="fill" objectFit="contain" />
          </div>
          <div className="flex space-x-2 overflow-x-auto">
            {book.images.map((img, index) => (
              <div key={index} className="relative w-24 h-24 cursor-pointer border-2 border-transparent hover:border-blue-500" onClick={() => setMainImage(img)}>
                <Image src={img} alt={`${book.title} thumbnail ${index + 1}`} layout="fill" objectFit="cover" className="rounded" />
              </div>
            ))}
          </div>
          <div className="mt-8">
            <video key={book.video} controls className="w-full rounded-lg">
              <source src={book.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        {/* Book Details Section */}
        <div>
          <h1 className="text-4xl font-bold mb-2">{book.title}</h1>
          <p className="text-xl text-gray-600 mb-4">by {book.author}</p>
          <p className="text-3xl font-bold text-blue-600 mb-6">${book.price.toFixed(2)}</p>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Style:</h3>
            <div className="flex space-x-2">
              {book.styles.map(style => (
                <button key={style} onClick={() => setSelectedStyle(style)} className={`px-4 py-2 rounded-lg border ${selectedStyle === style ? 'bg-blue-600 text-white' : 'bg-white text-gray-800'}`}>{style}</button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value, 10))} className="w-20 p-2 border rounded-md" />
            <button onClick={handleAddToCart} className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-bold">Add to Cart</button>
          </div>
        </div>
      </div>

      {/* Tabbed Section */}
      <div className="mt-16">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button onClick={() => setActiveTab('description')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg ${activeTab === 'description' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
              Description
            </button>
            <button onClick={() => setActiveTab('features')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg ${activeTab === 'features' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
              Features & Benefits
            </button>
            <button onClick={() => setActiveTab('reviews')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg ${activeTab === 'reviews' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
              Reviews
            </button>
          </nav>
        </div>

        <div className="mt-8">
          {activeTab === 'description' && <p>{book.description}</p>}
          {activeTab === 'features' && (
            <div>
              <h3 className="text-2xl font-bold mb-4">Features</h3>
              <ul className="list-disc list-inside mb-6">
                {book.features.map((feature, i) => <li key={i}>{feature}</li>)}
              </ul>
              <h3 className="text-2xl font-bold mb-4">Benefits</h3>
              <ul className="list-disc list-inside">
                {book.benefits.map((benefit, i) => <li key={i}>{benefit}</li>)}
              </ul>
            </div>
          )}
          {activeTab === 'reviews' && (
            <div>
              <h3 className="text-2xl font-bold mb-4">Customer Reviews</h3>
              {reviews.map((review, i) => (
                <div key={i} className="border-b py-4">
                  <p className="font-bold">{review.user} - {'⭐'.repeat(review.rating)}</p>
                  <p className="text-gray-600 mt-1">{review.comment}</p>
                </div>
              ))}
              <form onSubmit={handleReviewSubmit} className="mt-8">
                <h4 className="text-xl font-bold mb-4">Leave a Review</h4>
                <input type="text" placeholder="Your Name" value={newReview.user} onChange={e => setNewReview({...newReview, user: e.target.value})} className="w-full p-2 border rounded-md mb-4" required />
                <textarea placeholder="Your Review" value={newReview.comment} onChange={e => setNewReview({...newReview, comment: e.target.value})} className="w-full p-2 border rounded-md mb-4" required />
                <select value={newReview.rating} onChange={e => setNewReview({...newReview, rating: parseInt(e.target.value)})} className="w-full p-2 border rounded-md mb-4">
                  <option value={5}>5 Stars</option>
                  <option value={4}>4 Stars</option>
                  <option value={3}>3 Stars</option>
                  <option value={2}>2 Stars</option>
                  <option value={1}>1 Star</option>
                </select>
                <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">Submit Review</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
