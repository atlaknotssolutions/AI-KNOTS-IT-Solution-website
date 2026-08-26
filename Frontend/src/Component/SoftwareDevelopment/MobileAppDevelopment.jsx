import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle, ArrowUp, ChevronDown } from "lucide-react";
import { Helmet } from "react-helmet-async";

// Import your local image
import mobileProcess from "../../assets/Images/mobile.webp";
import mobileProcess2 from "../../assets/Images/mobilebackground.webp";

import { useNavigate, Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

// ==================== FAQ ITEM COMPONENT ====================
const FAQItem = ({ question, answer, isDark }) =>
{
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`border rounded-3xl overflow-hidden transition-all ${isDark ? "border-[#8B6B4A]/30" : "border-[#e8d9c2]"
        }`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-8 py-6 text-left flex justify-between items-center gap-4 hover:bg-[#f9efe1] dark:hover:bg-gray-900 transition-colors ${isDark ? "text-white" : "text-[#3d220e]"
          }`}
      >
        <span className="text-lg font-semibold pr-4">{question}</span>
        <ArrowUp
          className={`w-6 h-6 transition-transform flex-shrink-0 ${isOpen ? "rotate-180" : ""
            } text-[#8B6B4A]`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div
              className={`px-8 pb-8 text-lg leading-relaxed ${isDark ? "text-gray-300" : "text-[#5c4635]"
                }`}
            >
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
// ===========================================================

const images = {
  hero: mobileProcess2,
  android:
    "https://5.imimg.com/data5/SELLER/Default/2023/6/319348400/QV/RD/AY/16593403/android-application-development.png",
  ios: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
  hybrid:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv7l5I3d21aHtnR8sp3MeranJqvzmUlp6-eg&s",
  process: mobileProcess,
  team: mobileProcess,
};

const services = [
  {
    title: "Android Application Development",
    desc: "We harness the full power of the Android ecosystem using Kotlin and Java to create fast, secure, and feature-rich applications. Our expert team focuses on modern Material Design, offline capabilities, push notifications, and seamless integration with Google services.",
  },
  {
    title: "IOS Application Development",
    desc: "We develop premium native iOS applications using Swift and SwiftUI for iPhone, iPad, and Apple Watch. Our apps are optimized for the latest iOS versions with beautiful interfaces and flawless performance.",
  },
  {
    title: "Hybrid & Cross-Platform Development",
    desc: "Using React Native and Flutter, we build high-performance hybrid apps that work seamlessly on both Android and iOS from a single codebase — saving time and cost while maintaining near-native experience.",
  },
];

const benefits = [
  "Enhance customer engagement with personalized experiences",
  "Expand your market reach across Android and iOS platforms",
  "Streamline internal business processes and operations",
  "Increase sales and revenue through in-app purchases",
  "Build stronger brand loyalty and customer retention",
  "Gain valuable insights with in-app analytics",
];

const cities = [
  "Bhopal",
  "Indore",
  "Delhi",
  "Pune",
  "Jaipur",
  "Gurgaon",
  "Noida",
  "Mumbai",
  "Hyderabad",
  "Bangalore",
];

const industries = [
  "Finance & Banking",
  "Manufacturing",
  "Legal & Law Firms",
  "Technology & IT",
  "Transportation & Automotive",
  "eCommerce & Retail",
  "Healthcare & Medical",
  "Education & EdTech",
  "Real Estate",
  "Tourism & Hospitality",
  "Event Management",
  "Non-Profit Organizations",
  "Agriculture",
  "Many More...",
];

const faqs = [
  {
    question: "How much does mobile app development cost in Bhopal?",
    answer:
      "The cost typically ranges from ₹1.5 Lakh to ₹15 Lakh+ depending on the complexity, features, and platform (Android, iOS, or both). We provide transparent pricing with no hidden costs after a detailed requirement discussion.",
  },
  {
    question: "How long does it take to develop a mobile app?",
    answer:
      "A simple app takes 8-12 weeks, while a complex app with backend, admin panel, and advanced features usually takes 3 to 6 months. We follow an agile methodology with regular updates.",
  },
  {
    question: "Do you develop both Android and iOS apps?",
    answer:
      "Yes. We provide native Android (Kotlin/Java), native iOS (Swift/SwiftUI), and cross-platform solutions using React Native and Flutter.",
  },
  {
    question: "Will you provide app maintenance and support after launch?",
    answer:
      "Absolutely. We offer 3-12 months of free maintenance and long-term support contracts, including updates, bug fixes, performance optimization, and new feature enhancements.",
  },
  {
    question: "Do you help with publishing apps on Google Play Store and Apple App Store?",
    answer:
      "Yes. We manage the complete publishing process, including developer account setup, app assets, screenshots, privacy policy, store listing optimization, and final submission.",
  },
  {
    question: "What industries do you develop mobile applications for?",
    answer:
      "We develop mobile applications for Healthcare, Education, E-commerce, Finance, Real Estate, Logistics, Travel, Agriculture, Manufacturing, Event Management, and many other industries.",
  },
  {
    question: "Can you integrate payment gateways and admin panels into mobile apps?",
    answer:
      "Yes. We integrate secure payment gateways such as Razorpay, Stripe, Paytm, and more. We also build powerful web-based admin panels to manage users, content, reports, and app activities.",
  },
  {
    question: "Why should I choose AI Knots IT Solution for mobile app development?",
    answer:
      "AI Knots IT Solution combines technical expertise, modern technologies, user-focused design, and agile development practices to deliver secure, scalable, and high-performance mobile applications with reliable post-launch support.",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 1 },
  visible: { transition: { staggerChildren: 0.15 } },
};

export default function MobileAppDevelopment()
{
  const navigate = useNavigate();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains("dark"),
  );

  // Dark mode observer
  useEffect(() =>
  {
    const observer = new MutationObserver(() =>
    {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  // Scroll handler
  useEffect(() =>
  {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () =>
  {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const serviceLink =
    "font-bold text-[#8B6B4A] hover:text-[#6B4F2A] transition-colors duration-200";

  return (
    <>
      <Helmet>
        <title>Mobile App Development Company in Bhopal | AI Knots IT</title>
        <meta
          name="description"
          content="Android & iOS app development services — from concept to launch. Get a custom mobile app built for your business."
        />
        <meta
          name="keywords"
          content="mobile app development company, android app development, iOS app development, app development services"
        />
      </Helmet>

      <div
        className={`relative min-h-screen overflow-x-hidden transition-colors duration-500
      ${isDark ? "bg-black text-white" : "bg-[#f9efe1] text-[#3d220e]"}`}
      >
        {/* Background Gradient */}
        <div
          className={`absolute inset-0 z-0 ${isDark
            ? "bg-gradient-to-b from-black via-gray-950 to-black"
            : "bg-gradient-to-b from-[#f9efe1] via-[#f4e9d8] to-[#e8d9c2]"
            }`}
        />

        <div className="relative z-10 max-w-full mx-auto px-5 sm:px-8 lg:px-10 pb-16">
          {/* Hero Section */}
          <section className="relative min-h-[75vh] md:min-h-[80vh] flex items-center justify-center py-12 overflow-hidden w-full">
            <div className="absolute inset-0">
              <img
                src={images.hero}
                alt="Professional mobile app development team working in Bhopal"
                className="w-full h-full object-cover brightness-70 contrast-110 dark:brightness-45 dark:contrast-125 transition-all duration-700"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/70 to-black/60 dark:from-black/90 dark:via-black/85 dark:to-black/75" />
            </div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="relative z-10 w-full text-center px-4 sm:px-6 lg:px-8"
            >
              <motion.h1
                variants={fadeInUp}
                className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-none text-white"
              >
                Mobile Application{" "}
                <span className="text-[#8B6B4A]">Development</span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-3xl md:text-4xl font-bold mb-8 text-[#f9e8c8]"
              >
                Premium App Development Services in Bhopal
              </motion.p>

              <motion.p
                variants={fadeInUp}
                className="text-lg md:text-xl leading-relaxed mb-12 max-w-4xl mx-auto text-gray-200 dark:text-gray-300"
              >
                At AI Knots, we transform innovative ideas into powerful,
                user-friendly{" "}
                <HashLink
                  smooth
                  to="/mobiledevelopment#services"
                  className={serviceLink}
                >
                  mobile applications
                </HashLink>
                . Our expert team in{" "}
                <HashLink
                  smooth
                  to="/mobiledevelopment#cities"
                  className={serviceLink}
                >
                  Bhopal
                </HashLink>{" "}
                delivers high-performance{" "}
                <Link
                  to="/software"
                  className={serviceLink}
                >
                  Android
                </Link>
                ,{" "}
                <Link
                  to="/software"
                  className={serviceLink}
                >
                  iOS
                </Link>
                , and{" "}
                <HashLink
                  smooth
                  to="/mobiledevelopment#services"
                  className={serviceLink}
                >
                  cross-platform apps
                </HashLink>{" "}
                that drive real{" "}
                <HashLink
                  smooth
                  to="/mobiledevelopment#benefits"
                  className={serviceLink}
                >
                  business growth
                </HashLink>
                .
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-6 justify-center"
              >
                <button
                  onClick={() => navigate("/contact")}
                  className="px-12 py-6 bg-gradient-to-r from-[#3d220e] to-[#5c4635] hover:from-[#5c4635] hover:to-[#3d220e] text-white rounded-full text-xl font-bold shadow-xl transition-all duration-300 flex items-center gap-3 group"
                >
                  Get Free Consultation
                  <ArrowRight className="w-7 h-7 group-hover:translate-x-2 transition-transform" />
                </button>

                <button
                  onClick={() => navigate("/portfolio")}
                  className="px-12 py-6 border-2 border-[#8B6B4A] text-white hover:bg-[#8B6B4A] hover:text-white rounded-full text-xl font-bold transition-all duration-300"
                >
                  View Our Portfolio →
                </button>
              </motion.div>
            </motion.div>
          </section>

          {/* Services Section */}
          <section
            id="services"
            className={`py-20 px-4 sm:px-6 lg:px-8 rounded-3xl mt-8 mb-12
  ${isDark
                ? "bg-black/70 border border-[#8B6B4A]/30"
                : "bg-white shadow-2xl border border-[#e8d9c2]"
              }`}
          >
            <div className="max-w-7xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`max-w-5xl mx-auto text-4xl md:text-6xl font-black text-center mb-6 ${isDark ? "text-white" : "text-[#3d220e]"
                  }`}
              >
                Our Mobile App{" "}
                <span className="text-[#8B6B4A]">Development Services</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`text-xl text-center mb-16 max-w-4xl mx-auto ${isDark ? "text-gray-300" : "text-[#5c4635]"
                  }`}
              >
                With years of experience and a passion for innovation,{" "}
                <strong>AI KNOTS IT Solution</strong> offers comprehensive{" "}
                <HashLink smooth to="/mobiledevelopment#services" className={serviceLink}>
                  mobile app development solutions
                </HashLink>{" "}
                tailored to your unique{" "}
                <HashLink smooth to="/mobiledevelopment#industries" className={serviceLink}>
                  business requirements
                </HashLink>
                .
              </motion.p>

              <div className="grid md:grid-cols-3 gap-8">
                {services.map((service, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className={`group relative overflow-hidden rounded-3xl p-10 border transition-all hover:-translate-y-2
          ${isDark
                        ? "bg-gray-950 border-[#8B6B4A]/30 hover:border-[#8B6B4A]"
                        : "bg-white border-[#e8d9c2] hover:border-[#8B6B4A] shadow-lg"
                      }`}
                  >
                    <div className="relative z-10">
                      <h3
                        className={`text-2xl md:text-3xl font-bold mb-6 text-center ${isDark ? "text-[#8B6B4A]" : "text-[#8B6B4A]"
                          }`}
                      >
                        <Link to="/software" className={serviceLink}>
                          {service.title}
                        </Link>
                      </h3>

                      <p
                        className={`text-lg leading-relaxed text-center ${isDark ? "text-gray-300" : "text-[#5c4635]"
                          }`}
                      >
                        {service.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Benefits */}
              <motion.div
                id="benefits"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-16 text-center"
              >
                <h3
                  className={`text-3xl font-bold mb-10 ${isDark ? "text-white" : "text-[#3d220e]"
                    }`}
                >
                  Benefits of Our{" "}
                  <HashLink smooth to="/mobiledevelopment#services" className={serviceLink}>
                    Mobile App Development Services
                  </HashLink>
                </h3>

                <div className="flex flex-wrap justify-center gap-6">
                  {benefits.map((benefit, i) => (
                    <motion.div
                      key={i}
                      className={`px-8 py-5 rounded-2xl text-lg font-medium border transition-all hover:scale-105
            ${isDark
                          ? "bg-gray-900 border-[#8B6B4A]/30 hover:border-[#8B6B4A]"
                          : "bg-white border-[#e8d9c2] hover:border-[#8B6B4A] shadow-sm"
                        }`}
                    >
                      {benefit}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>
          {/* Development Process */}
          <section className="py-20 px-4">
            <div className="max-w-7xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`text-4xl md:text-5xl font-black text-center mb-8 ${isDark ? "text-white" : "text-[#3d220e]"}`}
              >
                Our Proven App Development{" "}
                <span className="text-[#8B6B4A]">Process</span>
              </motion.h2>

              <motion.img
                src={images.process}
                alt="Detailed mobile app development process roadmap illustration"
                className="rounded-3xl mx-auto mb-16 shadow-2xl border border-[#e8d9c2] dark:border-[#8B6B4A]/30 max-w-5xl w-full object-cover"
                loading="lazy"
              />

              <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
                {[
                  {
                    step: "Discovery & Planning",
                    points: [
                      "Understanding your business goals",
                      "Market research & competitor analysis",
                      "Feature prioritization",
                      "Project roadmap",
                    ],
                  },
                  {
                    step: "UI/UX Design",
                    points: [
                      "Wireframing & prototypes",
                      "Visual design",
                      "User experience optimization",
                      "Feedback & iteration",
                    ],
                  },
                  {
                    step: "Development",
                    points: [
                      "Frontend & backend development",
                      "API integration",
                      "Clean & scalable code",
                      "Regular testing",
                    ],
                  },
                  {
                    step: "Testing & QA",
                    points: [
                      "Manual & automated testing",
                      "Performance & security checks",
                      "Bug fixing",
                      "Cross-device compatibility",
                    ],
                  },
                  {
                    step: "Launch & Maintenance",
                    points: [
                      "App Store deployment",
                      "Post-launch monitoring",
                      "Regular updates",
                      "Ongoing support",
                    ],
                  },
                ].map((phase, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className={`border rounded-3xl p-8 transition-all hover:border-[#8B6B4A] min-h-[300px]
                    ${isDark ? "bg-gray-950 border-[#8B6B4A]/30" : "bg-white border-[#e8d9c2] shadow-md"}`}
                  >
                    <div className="text-5xl font-black text-[#8B6B4A] mb-6">{`0${idx + 1}`}</div>
                    <h3
                      className={`text-2xl font-bold mb-6 ${isDark ? "text-white" : "text-[#3d220e]"}`}
                    >
                      {phase.step}
                    </h3>
                    <ul
                      className={`space-y-3 text-sm ${isDark ? "text-gray-300" : "text-[#5c4635]"}`}
                    >
                      {phase.points.map((point, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-[#8B6B4A] flex-shrink-0 mt-1" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Industries & Cities */}
          <section
            id="industries"
            className={`py-20 px-4 rounded-3xl mt-8 mb-12
          ${isDark ? "bg-gray-950 border border-[#8B6B4A]/30" : "bg-white shadow-2xl border border-[#e8d9c2]"}`}
          >
            <div className="max-w-7xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`text-4xl md:text-5xl font-black text-center mb-12 ${isDark ? "text-white" : "text-[#3d220e]"}`}
              >
                Tailored Solutions for{" "}
                <span className="text-[#8B6B4A]">Diverse Industries</span>
              </motion.h2>

              <div className="flex flex-wrap justify-center gap-4 mb-20">
                {industries.map((ind, i) => (
                  <motion.span
                    key={i}
                    className={`px-6 py-3 rounded-full text-sm md:text-base border transition-all hover:scale-105
                    ${isDark ? "bg-gray-900 border-[#8B6B4A]/30 hover:border-[#8B6B4A] text-gray-200" : "bg-white border-[#e8d9c2] hover:border-[#8B6B4A] text-[#3d220e]"}`}
                  >
                    {ind}
                  </motion.span>
                ))}
              </div>

              <motion.h2
                id="cities"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`text-4xl md:text-5xl font-black text-center mb-12 ${isDark ? "text-white" : "text-[#3d220e]"}`}
              >
                Serving Businesses Across Major{" "}
                <span className="text-[#8B6B4A]">Cities in India</span>
              </motion.h2>

              <div className="flex flex-wrap justify-center gap-6">
                {cities.map((city, i) => (
                  <motion.div
                    key={i}
                    className={`px-10 py-5 rounded-2xl font-bold text-xl border transition-all hover:border-[#8B6B4A] hover:scale-105
                    ${isDark ? "bg-gray-900 border-[#8B6B4A]/30 text-white" : "bg-white border-[#e8d9c2] text-[#3d220e] shadow-sm"}`}
                  >
                    {city}
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section
            className={`py-20 px-4 rounded-3xl
          ${isDark ? "bg-gray-950 border border-[#8B6B4A]/30" : "bg-white border border-[#e8d9c2] shadow-2xl"}`}
          >
            <div className="max-w-5xl mx-auto text-center">
              <motion.h2
                className={`text-4xl md:text-6xl font-black mb-10 ${isDark ? "text-white" : "text-[#3d220e]"}`}
              >
                Ready to Bring Your App Idea to Life?
              </motion.h2>

              <motion.p
                className={`text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed ${isDark ? "text-gray-300" : "text-[#5c4635]"
                  }`}
              >
                Whether you need a native{" "}
                <Link to="/software" className={serviceLink}>
                  Android/iOS app
                </Link>{" "}
                or a powerful{" "}
                <HashLink
                  smooth
                  to="/mobiledevelopment#services"
                  className={serviceLink}
                >
                  cross-platform solution
                </HashLink>
                , our expert team in{" "}
                <HashLink
                  smooth
                  to="/mobiledevelopment#cities"
                  className={serviceLink}
                >
                  Bhopal
                </HashLink>{" "}
                is ready to deliver a{" "}
                <HashLink
                  smooth
                  to="/mobiledevelopment#benefits"
                  className={serviceLink}
                >
                  mobile application
                </HashLink>{" "}
                that exceeds your expectations.
              </motion.p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/contact")}
                className="px-14 py-7 bg-gradient-to-r from-[#3d220e] to-[#5c4635] text-white rounded-full text-2xl md:text-3xl font-bold shadow-2xl hover:shadow-[#8B6B4A]/50 transition-all"
              >
                Start Your Project Today →
              </motion.button>
            </div>
          </section>

          {/* FAQ Section */}
          <section
            id="faq"
            className={`py-20 px-4 rounded-3xl mt-12
            ${isDark ? "bg-gray-950 border border-[#8B6B4A]/30" : "bg-white shadow-2xl border border-[#e8d9c2]"}`}
          >
            <div className="max-w-4xl mx-auto px-6">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`text-4xl md:text-5xl font-bold text-center mb-12 ${isDark ? "text-white" : "text-[#573010]"
                  }`}
              >
                Frequently Asked <span className="text-[#8B6B4A]">Questions</span>
              </motion.h2>

              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <details
                    key={idx}
                    className={`group rounded-xl p-6 border ${isDark
                      ? "bg-gray-900 border-gray-800"
                      : "bg-white border-gray-100"
                      }`}
                  >
                    <summary
                      className={`font-semibold text-lg cursor-pointer flex justify-between ${isDark ? "text-white" : "text-[#573010]"
                        }`}
                    >
                      {faq.question}
                      <ChevronDown className="w-5 h-5 transition-transform duration-300 group-open:rotate-180" />
                    </summary>

                    <p className={`mt-4 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}