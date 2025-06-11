
import { Link } from "react-router-dom";
import { Code } from "lucide-react";

const features = [
  {
    icon: <Code size={48} className="text-indigo-600" />,
    title: "Smart Code Editor",
    description: "Write code effortlessly with intelligent autocomplete and error detection.",
    to: "/editor",
  },
];

const CompileCode = () => {
  return (
    <div className="min-h-screen  p-4 sm:p-8 md:p-12 lg:p-16 flex flex-col items-center">
      {/* Heading */}
      <h1 className="text-3xl sm:text-xl md:text-5xl font-extrabold text-indigo-700 mb-6 tracking-tight drop-shadow-lg text-center md:text-left">
        Experience Next-Level Coding with CompileCode
      </h1>

      {/* Subheading */}
      <p className="max-w-2xl mx-auto md:mx-0 text-gray-700 mb-10 text-base sm:text-lg md:text-lg leading-relaxed text-center md:text-left">
        Your all-in-one online code editor with cloud compilation, live terminal, and powerful collaboration tools designed to boost your productivity and creativity. Enjoy a seamless workflow where coding, testing, and sharing happen instantly — empowering you to build innovative software efficiently, no matter where you are.
      </p>

      {/* Main card: text left, image right */}
      <div className=" backdrop-blur-md rounded-3xl shadow-2xl w-full max-w-7xl p-6 sm:p-10 lg:p-16">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-12 md:gap-16">
          {/* Text Content (Left) */}
          <div className="flex-1 text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-7 max-w-2xl mx-auto md:mx-0">
              {features.map(({ icon, title, description, to }) => (
                <ActionCard key={title} icon={icon} title={title} description={description} to={to} />
              ))}
            </div>
          </div>

          {/* Image (Right) */}
          <div className="flex-1 w-full max-w-md md:max-w-none">
            <img
              src="/Code.webp" // Your image path here
              alt="AI-powered code editor"
              className="rounded-3xl shadow-xl w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <section className="max-w-6xl mt-20 px-4 sm:px-6 md:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-pink-700 mb-12 drop-shadow-md">
          Why Developers Love CompileCode
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
          <FeatureCard emoji="🚀" title="Blazing Fast Performance" color="text-indigo-700">
            Experience near-instantaneous code compilation and real-time feedback with our highly optimized cloud infrastructure. Whether you’re working on small scripts or complex projects, our platform ensures your code runs quickly, so you can spend less time waiting and more time creating amazing applications.
          </FeatureCard>

          <FeatureCard emoji="🤝" title="Seamless Collaboration" color="text-indigo-700">
            Collaborate effortlessly with teammates or mentors in real-time. Share your workspace instantly, leave comments, review code together, and resolve issues on the fly. CompileCode’s integrated collaboration tools break down barriers and help you build better software faster with your team.
          </FeatureCard>

          <FeatureCard emoji="🔒" title="Privacy & Security" color="text-indigo-700">
            Your source code is your intellectual property — we keep it safe. CompileCode encrypts your data during transit and at rest, ensuring only you and your trusted collaborators can access it. Our platform complies with industry standards for security, giving you peace of mind while you focus on coding.
          </FeatureCard>
        </div>
      </section>
    </div>
  );
};

const ActionCard = ({ icon, title, description, to }) => (
  <Link
    to={to}
    className="rounded-3xl shadow-md p-6 sm:p-8 w-full hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 transition duration-300 flex flex-col items-center text-center"
  >
    <div className="mb-5">{icon}</div>
    <h3 className="text-xl sm:text-2xl font-semibold mb-3 text-indigo-800">{title}</h3>
    <p className="text-sm sm:text-base leading-relaxed">{description}</p>
  </Link>
);

const FeatureCard = ({ emoji, title, color, children }) => (
  <div className="flex-1 max-w-md  rounded-2xl shadow-lg p-8 hover:shadow-2xl transition duration-300">
    <div className="text-6xl mb-6">{emoji}</div>
    <h3 className={`text-2xl font-semibold mb-4 ${color}`}>{title}</h3>
    <p className=" leading-relaxed">{children}</p>
  </div>
);

export default CompileCode;
