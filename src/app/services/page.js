const services = [
  {
    icon: '🚚',
    title: 'Worldwide Shipping',
    description: 'We ship books to readers all over the globe. No matter where you are, your next great read is just a click away. All orders are tracked and insured.'
  },
  {
    icon: '🎁',
    title: 'Gift Wrapping',
    description: 'Sending a book as a gift? Let us wrap it for you! We offer beautiful, high-quality gift wrapping options for any occasion. Add a personalized note for a special touch.'
  },
  {
    icon: '🎤',
    title: 'Author Events',
    description: 'Meet your favorite authors! We regularly host book signings, readings, and Q&A sessions. Check our events calendar to see who is visiting next.'
  },
  {
    icon: '💡',
    title: 'Personalized Recommendations',
    description: 'Not sure what to read next? Our expert booksellers are here to help. Get personalized recommendations based on your favorite genres, authors, and reading history.'
  }
];

export default function ServicesPage() {
  return (
    <div className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-4">Our Services</h1>
        <p className="text-center text-lg text-gray-600 mb-12">We're more than just a bookstore. We offer a range of services to enhance your reading experience.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow">
              <div className="text-5xl mb-4">{service.icon}</div>
              <h2 className="text-2xl font-bold mb-2">{service.title}</h2>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
