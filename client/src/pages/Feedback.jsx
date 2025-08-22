const testimonials = [
  {
    name: "Aman Gupta",
    gender: "Male",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "OnlineCompilerCode made coding so much easier! No installations, just code and run instantly.",
    rating: 5,
  },
  {
    name: "Rohit Kumar",
    gender: "Male",
    img: "https://randomuser.me/api/portraits/men/41.jpg",
    text: "Great platform, but I’d love to see more languages supported in the future.",
    rating: 4,
  },
  {
    name: "Meena Patel",
    gender: "Female",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "I love the real-time preview feature. It feels like coding on a professional IDE.",
    rating: 5,
  },
  {
    name: "Aarav Singh",
    gender: "Male",
    img: "https://randomuser.me/api/portraits/men/57.jpg",
    text: "Super smooth experience. Perfect for quick testing and practicing algorithms.",
    rating: 4,
  },
  {
    name: "Priya Verma",
    gender: "Female",
    img: "https://randomuser.me/api/portraits/women/65.jpg",
    text: "Great for beginners. The autocompletion saves a lot of time while learning.",
    rating: 4,
  },
  {
    name: "Karan Mehta",
    gender: "Male",
    img: "https://randomuser.me/api/portraits/men/75.jpg",
    text: "Found it very useful for my college projects. Easy to use and fast.",
    rating: 5,
  },
];

export default function FeedbackSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-16">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-green-600 mb-12">
        🚀 What Users Say
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition"
          >
            {/* User Info */}
            <div className="flex items-center gap-4 mb-4">
              <img
                src={t.img}
                alt={t.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-gray-800">{t.name}</h3>
                <p className="text-gray-500 text-sm">{t.gender}</p>
              </div>
            </div>

            {/* Feedback */}
            <p className="text-gray-700 mb-4">{t.text}</p>

            {/* Rating */}
            <div className="flex text-yellow-500 text-lg">
              {Array.from({ length: 5 }).map((_, idx) => (
                <span key={idx}>
                  {idx < t.rating ? "★" : "☆"}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
