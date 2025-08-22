export default function StatsSection() {
  const stats = [
    { value: "24k+", label: "Coders Empowered" },
    { value: "50+", label: "Languages Supported" },
    { value: "10k+", label: "Daily Code Runs" },
    { value: "95%", label: "User Satisfaction" },
  ];

  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-6 sm:px-12 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
        {stats.map((stat, i) => (
          <div key={i} className="flex flex-col items-center">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-green-600">
              {stat.value}
            </h3>
            <p className="text-gray-700 mt-2 text-sm sm:text-base">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
