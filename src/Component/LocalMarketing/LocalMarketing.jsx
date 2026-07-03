import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { useNavigate, Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import axios from "axios";

import
{
  ArrowRight,
  ChevronDown,
  Phone,
  MapPin,
  Users,
  TrendingUp,
  CheckCircle,
} from "lucide-react";

import PortfolioAtlaknotsitsolutions from "../../assets/PortfolioAtlaknotsitsolutions.pdf";

// Carousel Images
const carouselImages = [
  "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1600&q=90",
  "https://blog.hootsuite.com/wp-content/uploads/2024/04/whatsapp-marketing-6.png",
  "https://www.crossml.com/wp-content/uploads/2024/11/heat-map-smarter-retail-store.png-1024x760.jpg",
];

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const faqData = [
  {
    q: "What does AI Knots do in local marketing?",
    a: "We help businesses grow locally through GMB, local SEO, WhatsApp, and SMS marketing.",
  },
  {
    q: "Is local marketing useful for small businesses?",
    a: "Yes, it helps attract nearby customers and increase sales.",
  },
  {
    q: "How soon can I see results?",
    a: "You can start seeing calls and inquiries within a few days.",
  },
  {
    q: "Do you manage Google My Business?",
    a: "Yes, we optimize and manage your GMB profile.",
  },
  {
    q: "Can you generate local leads?",
    a: "Yes, we run targeted campaigns to generate nearby customer leads.",
  },
  {
    q: "Is WhatsApp marketing effective?",
    a: "Yes, it has high open rates and direct customer engagement.",
  },
  {
    q: "Do I need a website for local marketing?",
    a: "Not necessary, but it helps improve results.",
  },
  {
    q: "Do you provide reports?",
    a: "Yes, we provide clear performance reports.",
  },
  {
    q: "Can you target specific areas in Bhopal?",
    a: "Yes, we can target specific locations and areas.",
  },
  {
    q: "How can I get started?",
    a: "Just contact us and we’ll create a local marketing plan.",
  },
];

export default function LocalMarketing()
{
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains("dark"),
  );
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openIndex, setOpenIndex] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    category: "Local Marketing",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) =>
  {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try
    {
      const apiUrl = `${import.meta.env.VITE_API_URL}/api/query/create`;
      await axios.post(apiUrl, formData);

      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
        category: "Local Marketing",
      });

      setTimeout(() =>
      {
        setIsModalOpen(false);
        setSuccess(false);
      }, 2500);
    } catch (err)
    {
      setError(
        err.response?.data?.message || err.message || "Something went wrong",
      );
    } finally
    {
      setLoading(false);
    }
  };

  // Theme Observer
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

  // Scroll Listener
  useEffect(() =>
  {
    const handleScroll = () =>
    {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Carousel Auto-slide
  useEffect(() =>
  {
    const interval = setInterval(() =>
    {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const toggleFAQ = (index) =>
  {
    setOpenIndex(openIndex === index ? null : index);
  };

  const scrollToTop = () =>
  {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Consistent Theme Classes
  const accentClass = "text-accent";
  const headingClass = isDark ? "text-white" : "text-gray-900";
  const bodyClass = isDark ? "text-gray-300" : "text-gray-700";

  const cardClass = isDark
    ? "bg-gray-900/80 backdrop-blur-xl border border-gray-700/80 hover:border-accent/70 hover:shadow-2xl transition-all duration-500"
    : "bg-white border border-gray-100 hover:border-accent/30 hover:shadow-2xl transition-all duration-500";

  const premiumButton = `px-12 py-7 rounded-2xl text-xl font-bold transition-all flex items-center gap-3 group shadow-xl w-full btn-accent`;

  const serviceLink =
    "font-bold text-[#8B6B4A] hover:text-[#6B4F2A] transition-colors duration-200";

  return (
    <>
      <Helmet>
        <title>Local Marketing Services Bhopal | Atla IKS</title>
        <meta
          name="description"
          content="Improve business visibility with local marketing and local SEO services in Bhopal."
        />
        <meta
          name="keywords"
          content="Local Marketing Services, Local SEO, GBP Optimization, WhatsApp Marketing Bhopal"
        />
      </Helmet>

      <div
        className={`min-h-screen transition-colors duration-700 overflow-hidden
      ${isDark ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900"}`}
      >
        {/* ====================== HERO CAROUSEL ====================== */}
        <section id="about" className="relative h-[90vh] overflow-hidden">
          {carouselImages.map((img, index) => (
            <motion.div
              key={index}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: index === currentSlide ? 1 : 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            >
              <img
                src={img}
                alt="Local marketing in Bhopal"
                className="w-full h-full object-cover brightness-50"
              />
              <div
                className={`absolute inset-0 bg-gradient-to-b ${isDark ? "from-black/70 via-gray-950/90 to-gray-950" : "from-black/60 via-black/80 to-black"} flex items-center justify-center`}
              >
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={staggerContainer}
                  className="text-center px-6 max-w-6xl z-10"
                >
                  <motion.h1
                    variants={fadeInUp}
                    className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-[#e3e3e3] via-[#f9e8c8] to-[#e3e3e3] bg-clip-text text-transparent"
                  >
                    Best Local Marketing Company in Bhopal
                  </motion.h1>

                  <motion.p
                    variants={fadeInUp}
                    className="text-3xl md:text-4xl font-bold text-accent mb-8"
                  >
                    Top Local Marketing Agency in Bhopal for Real Business Growth
                  </motion.p>

                  <motion.p
                    variants={fadeInUp}
                    className={`text-xl md:text-2xl text-center max-w-5xl mx-auto mb-10 leading-relaxed ${isDark ? "text-gray-300" : "text-white/90"
                      }`}
                  >
                    Our Expert Solutions for:{" "}
                    <HashLink
                      smooth
                      to="/localmarketing#services"
                      className={serviceLink}
                    >
                      Google My Business
                    </HashLink>{" "}
                    |{" "}
                    <Link
                      to="/seo"
                      className={serviceLink}
                    >
                      Local SEO
                    </Link>{" "}
                    |{" "}
                    <HashLink
                      smooth
                      to="/localmarketing#services"
                      className={serviceLink}
                    >
                      WhatsApp Marketing
                    </HashLink>{" "}
                    |{" "}
                    <HashLink
                      smooth
                      to="/localmarketing#services"
                      className={serviceLink}
                    >
                      SMS Marketing
                    </HashLink>{" "}
                    |{" "}
                    <HashLink
                      smooth
                      to="/localmarketing#offer"
                      className={serviceLink}
                    >
                      Lead Generation
                    </HashLink>{" "}
                    |{" "}
                    <Link
                      to="/contentwritingbranding"
                      className={serviceLink}
                    >
                      Brand Awareness
                    </Link>
                  </motion.p>
                  <motion.div
                    variants={fadeInUp}
                    className="flex flex-col sm:flex-row gap-6 justify-center"
                  >
                    <a
                      href={PortfolioAtlaknotsitsolutions}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                    >
                      <button
                        className={`px-10 py-6 border-2 border-primary/70 rounded-2xl text-xl md:text-2xl font-bold transition-all
                      ${isDark ? "text-accent hover:bg-[#3d220e]/40 hover:border-accent" : "text-accent hover:bg-muted"}`}
                      >
                        Download Offer Brochure Now
                      </button>
                    </a>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          ))}

          {/* Carousel Dots */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex space-x-4 z-20">
            {carouselImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`w-4 h-4 rounded-full transition-all ${i === currentSlide
                  ? "bg-[#9F714E] scale-150 shadow-lg shadow-red-600/50"
                  : isDark
                    ? "bg-gray-600 hover:bg-[#9F714E]"
                    : "bg-gray-400 hover:bg-[#9F714E]"
                  }`}
              />
            ))}
          </div>
        </section>

        <main className="max-w-7xl mx-auto px-6 py-20 space-y-32">
          {/* About Section */}
          <motion.section
            id="about"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center"
          >
            <motion.h2
              variants={fadeInUp}
              className={`text-5xl md:text-6xl font-black mb-10 ${headingClass}`}
            >
              Best Local Marketing Agency in Bhopal
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className={`text-2xl max-w-5xl mx-auto leading-relaxed mb-6 ${bodyClass}`}
            >
              Local Reach, Real Results
            </motion.p>

            <motion.p
              variants={fadeInUp}
              className={`text-xl max-w-5xl mx-auto leading-relaxed ${bodyClass}`}
            >
              AI Knots is a leading{" "}
              <HashLink
                smooth
                to="/localmarketing#services"
                className={serviceLink}
              >
                local marketing agency
              </HashLink>{" "}
              in{" "}
              <Link
                to="/contact"
                className={serviceLink}
              >
                Bhopal
              </Link>
              , helping businesses connect with nearby customers and grow faster. We
              specialize in{" "}
              <HashLink
                smooth
                to="/localmarketing#services"
                className={serviceLink}
              >
                Google My Business optimization
              </HashLink>
              ,{" "}
              <Link
                to="/seo"
                className={serviceLink}
              >
                local SEO
              </Link>
              , WhatsApp campaigns, SMS marketing, and hyperlocal advertising to bring
              more calls, visits, and{" "}
              <HashLink
                smooth
                to="/localmarketing#offer"
                className={serviceLink}
              >
                leads
              </HashLink>{" "}
              to your business. Recognized as one of the best local marketing companies
              in Bhopal, we create strategies that make your business visible in your
              area and turn local searches into real customers.
            </motion.p>

            <div className="mt-12 grid md:grid-cols-3 gap-8">
              {[
                "Got more local calls after GMB optimization.",
                "Best local marketing service in Bhopal for small business.",
                "Good results with WhatsApp and SMS campaigns.",
              ].map((review, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className={`rounded-2xl p-8 transition-all ${cardClass}`}
                >
                  <p className={`text-lg italic ${bodyClass}`}>“{review}”</p>
                  <div className="mt-4 flex justify-center gap-1 text-3xl">
                    {Array(5)
                      .fill(0)
                      .map((_, idx) => (
                        <span
                          key={idx}
                          className="text-yellow-400 drop-shadow-sm"
                        >
                          ★
                        </span>
                      ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Why Choose Us */}
          <motion.section
            id="services"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <h2
              className={`text-5xl md:text-6xl font-black text-center mb-16 ${headingClass}`}
            >
              Why We’re the Top Local Marketing Agency in Bhopal
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: MapPin,
                  title: "Smart Local Strategies",
                  desc: "We target customers near your business using location-based marketing and local SEO.",
                },
                {
                  icon: Users,
                  title: "Real Customer Engagement",
                  desc: "From WhatsApp to SMS, we connect directly with your audience and increase response rates.",
                },
                {
                  icon: TrendingUp,
                  title: "Results That Matter",
                  desc: "More calls, more store visits, and more leads — that’s our focus.",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className={`rounded-3xl p-10 text-center transition-all group ${cardClass}`}
                >
                  <item.icon
                    className={`w-16 h-16 mx-auto mb-6 transition-transform group-hover:scale-110 ${accentClass}`}
                  />
                  <h3
                    className={`text-3xl font-bold mb-5 ${isDark ? "text-[#8B6B4A]" : "text-[#8B6B4A]"}`}
                  >
                    {item.title}
                  </h3>
                  <p className={bodyClass}>{item.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                "Location-Based Targeting : Reach customers in your city, area, or specific locations.",
                "Expert Local Marketing Team : We understand the Bhopal market and customer behavior.",
                "Customized Marketing Plans : Every business gets a strategy based on its location and audience.",
                "Transparent Reporting : Track calls, leads, and campaign performance easily.",
                "All Local Marketing Solutions in One Place: From GMB to WhatsApp marketing, everything under one roof.",
                "High-Quality Local Leads : We focus on real customers, not just traffic.",
                "Quick Support : Fast response and dedicated support for your campaigns.",
                "Affordable for Small Businesses : Budget-friendly plans for startups and local shops.",
              ].map((point, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className={`rounded-2xl p-6 transition-all ${cardClass}`}
                >
                  <CheckCircle className={`w-6 h-6 mb-3 ${accentClass}`} />
                  <p className={bodyClass}>{point}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Stats */}
          <motion.section
            id="stats"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center"
          >
            <h2 className={`text-5xl font-black mb-12 ${headingClass}`}>
              Let Our Numbers Speak
            </h2>
            <div className="grid md:grid-cols-5 gap-8">
              {[
                { num: "2+", label: "Years of Experience" },
                { num: "79+", label: "Clients Served" },
                { num: "30+", label: "Projects Completed" },
                { num: "85%+", label: "Client Retention Rate" },
                { num: "10+", label: "Team Members" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className={`rounded-3xl p-8 transition-all ${cardClass}`}
                >
                  <p className={`text-5xl font-black ${accentClass}`}>
                    {stat.num}
                  </p>
                  <p className={`text-xl mt-4 ${bodyClass}`}>{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* CTA Section */}
          <motion.section
            id="offer"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center py-20"
          >
            <h2 className={`text-6xl font-black mb-10 ${headingClass}`}>
              Unlock Your Special Offer – Just Fill the Form Today
            </h2>
            <div className={`max-w-md mx-auto rounded-3xl p-10 ${cardClass}`}>
              <button
                onClick={() => setIsModalOpen(true)}
                className={premiumButton}
              >
                Request a Call Back <Phone className="w-6 h-6" />
              </button>
            </div>
          </motion.section>

          {/* Industries */}
          <motion.section
            id="industries"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <h2
              className={`text-5xl font-black text-center mb-12 ${headingClass}`}
            >
              Industries We Serve
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                "Retail Shops",
                "Home Services",
                "Clinics and Healthcare",
                "Real Estate",
                "Coaching Institutes",
                "Restaurants and Cafes",
              ].map((ind, i) => (
                <motion.span
                  key={i}
                  variants={fadeInUp}
                  className={`px-6 py-4 rounded-2xl text-lg font-medium transition-all ${cardClass}`}
                >
                  {ind}
                </motion.span>
              ))}
            </div>
          </motion.section>

          {/* FAQ */}
          <section
            id="faq"
            className={`py-20 ${isDark ? "bg-gray-950" : "bg-gray-50"}`}
          >
            <div className="max-w-4xl mx-auto px-6">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`text-4xl md:text-5xl font-bold text-center mb-12 ${isDark ? "text-white" : "text-[#573010]"
                  }`}
              >
                Frequently Asked <span className="text-[#8B6B4A]">Questions (FAQs)</span>
              </motion.h2>

              <div className="space-y-4">
                {faqData.map((faq, index) => (
                  <details
                    key={index}
                    className={`group rounded-xl p-6 border ${isDark
                      ? "bg-gray-900 border-gray-800"
                      : "bg-white border-gray-100"
                      }`}
                  >
                    <summary
                      className={`font-semibold text-lg cursor-pointer flex justify-between items-center gap-4 ${isDark ? "text-white" : "text-[#573010]"
                        }`}
                    >
                      {faq.q}
                      <ChevronDown className="w-5 h-5 transition-transform duration-300 group-open:rotate-180 flex-shrink-0" />
                    </summary>

                    <p className={`mt-4 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                      {faq.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        </main>

        {/* ====================== CONTACT MODAL ====================== */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className={`w-full max-w-lg rounded-3xl p-8 shadow-2xl ${isDark ? "bg-gray-900" : "bg-white"}`}
              >
                <h3
                  className={`text-3xl font-bold mb-6 text-center ${headingClass}`}
                >
                  Get Your Free Local Marketing Consultation
                </h3>

                {success ? (
                  <div className="text-center py-12 text-green-500">
                    <CheckCircle className="w-16 h-16 mx-auto mb-4" />
                    <p className="text-xl font-medium">
                      Thank you! We will contact you soon.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Full Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={`w-full px-5 py-4 rounded-2xl border focus:outline-none focus:border-red-500 ${isDark ? "bg-gray-800 text-white" : "bg-white"}`}
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={`w-full px-5 py-4 rounded-2xl border focus:outline-none focus:border-red-500 ${isDark ? "bg-gray-800 text-white" : "bg-white"}`}
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className={`w-full px-5 py-4 rounded-2xl border focus:outline-none focus:border-red-500 ${isDark ? "bg-gray-800 text-white" : "bg-white"}`}
                    />
                    <textarea
                      name="message"
                      placeholder="Tell us about your business (optional)"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className={`w-full px-5 py-4 rounded-2xl border focus:outline-none focus:border-red-500 ${isDark ? "bg-gray-800 text-white" : "bg-white"}`}
                    />

                    {error && (
                      <p className="text-accent text-sm text-center">{error}</p>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className={premiumButton}
                    >
                      {loading ? "Submitting..." : "Submit Request"}
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="w-full py-4 text-gray-500 hover:text-gray-700 transition-colors font-medium"
                    >
                      Cancel
                    </button>
                  </form>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
