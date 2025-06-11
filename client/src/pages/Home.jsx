import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BiSolidChevronDown } from "react-icons/bi";
import Loading from "../components/Loading";

const Home = () => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);

  const faqList = [
    {
      question: "🤖 Which programming languages does CompileCode support?",
      answer:
        "CompileCode supports a wide range of popular programming languages including Python, JavaScript, C++, Java, and many others.",
    },
    {
      question: "💻 Do I need to install anything?",
      answer:
        "No, there’s absolutely no need to install anything! CompileCode is completely web-based and works directly in your browser.",
    },
    {
      question: "☁️ Can I save my projects?",
      answer:
        "Yes! CompileCode allows you to save your code projects securely in the cloud by creating an account.",
    },
    {
      question: "🎁 Is CompileCode free to use?",
      answer:
        "Absolutely! CompileCode offers a robust free tier with all essential features, and affordable upgrades for premium features.",
    },
  ];

  const features = [
    {
      title: "✅ Real-time Preview",
      desc: "Instantly see output as you write code—no need to refresh or re-run manually.",
    },
    {
      title: "✅ Intelligent Autocompletion",
      desc: "Smart suggestions tailored to your language and context. Great for beginners and pros alike.",
    },
    {
      title: "✅ Multi-Language Support",
      desc: "Easily switch between Python, JS, Java, C++, etc. Ideal for full-stack or competitive coding.",
    },
    {
      title: "✅ Cloud Integration",
      desc: "Save and sync all projects in the cloud. Continue from anywhere on any device.",
    },
  ];

  return (
    <div className="min-h-screen text-gray-900">
      {/* Hero Section */}
      <section className="flex flex-col-reverse lg:flex-row items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-16 gap-12">
        <div className="w-full lg:w-1/2 space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
            <span className="text-green-600">CompileCode</span>
            <br />
            Power Up Your Coding Experience
          </h1>
          <p className="text-gray-700 text-base md:text-lg">
            Write and run code in your favorite languages with a lightning-fast,
            developer-first editor that features real-time previews, intelligent
            autocompletion, and seamless integrations — all in one sleek platform.
          </p>
          <p className="text-gray-600 text-sm md:text-base">
            Whether you're coding in Python, C++, Java, or JavaScript —
            CompileCode is built to support your workflow and boost your productivity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/compileCode"
              className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition font-medium text-center"
            >
              Start Coding Now
            </Link>
            <Link
              to="/watchDemo"
              className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition font-medium text-center"
            >
              Watch Demo
            </Link>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            No installation required. Runs in your browser.
          </p>
        </div>

        <div className="w-full lg:w-1/2 relative min-h-[250px] sm:min-h-[300px] flex items-center justify-center">
          {!isImageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <Loading />
            </div>
          )}
          <img
            src="/vscode.png"
            alt="VS Code editor preview"
            onLoad={() => setIsImageLoaded(true)}
            className={`w-full max-w-md sm:max-w-lg lg:max-w-none rounded-xl shadow-2xl border border-gray-200 transition-opacity duration-500 ${
              isImageLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>
      </section>

      {/* About Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-20 flex flex-col lg:flex-row items-center gap-12">
        <div className="w-full lg:w-1/2 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-green-600">
            About CompileCode
          </h2>
          <p className="text-gray-700 text-base leading-relaxed">
            At <strong>CompileCode</strong>, we believe that coding should be
            intuitive, accessible, and seamless—whether you're just starting your
            journey or you're an experienced developer.
          </p>
          <p className="text-gray-700 text-base leading-relaxed">
            Built with modern developers in mind, CompileCode eliminates the hassle
            of switching tools or installing compilers.
          </p>
          <p className="text-gray-700 text-base leading-relaxed">
            With features like <strong>real-time previews</strong>,{" "}
            <strong>intelligent autocompletion</strong>, and{" "}
            <strong>cloud project storage</strong>, we ensure your workflow stays
            uninterrupted.
          </p>
          <p className="text-gray-700 text-base leading-relaxed">
            We're constantly rolling out new features based on your feedback—
            collaborative coding, version control, and new language support.
          </p>
          <p className="text-gray-700 text-base leading-relaxed">
            Whether you're a student, solo developer, or a remote team—CompileCode
            brings you the tools and speed you need to ship faster and smarter.
          </p>
          <p className="text-gray-600 text-sm">
            Ready to code the future?{" "}
            <Link to="/dashboard" className="text-green-600 font-medium hover:underline">
              Try CompileCode now
            </Link>{" "}
            — it's fast, free, and forever developer-friendly.
          </p>
        </div>
        <div className="w-full lg:w-1/2">
          <img
            src="/About.avif"
            alt="Coding illustration"
            className={`w-full max-w-md sm:max-w-lg lg:max-w-none rounded-xl shadow-2xl border border-gray-200 transition-opacity duration-500 ${
              isImageLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>
      </section>

      {/* Features Section */}
      <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-16 flex flex-col lg:flex-row items-center gap-12">
        <div className="w-full lg:w-1/2 space-y-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-green-600">
            Features of CompileCode
          </h2>
          <div className="space-y-6">
            {features.map((f, i) => (
              <div key={i}>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1">
                  {f.title}
                </h3>
                <p className="text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <img
            src="/vscode.png"
            alt="CompileCode Features"
            className={`w-full max-w-md sm:max-w-lg lg:max-w-none rounded-xl shadow-2xl border border-gray-200 transition-opacity duration-500 ${
              isImageLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-16 bg-green-50 rounded-xl shadow-inner">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-green-700 mb-12">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto space-y-6">
          {faqList.map(({ question, answer }, idx) => (
            <div
              key={idx}
              className="bg-white p-5 sm:p-6 rounded-lg shadow-md cursor-pointer transition duration-200"
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-semibold text-green-800 mb-0">
                  {question}
                </h3>
                <div
                  className={`text-green-600 text-xl transform transition-transform duration-300 ${
                    openIndex === idx ? "rotate-180" : ""
                  }`}
                >
                  <BiSolidChevronDown />
                </div>
              </div>
              {openIndex === idx && (
                <p className="mt-3 text-gray-600 text-sm sm:text-base">
                  {answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
