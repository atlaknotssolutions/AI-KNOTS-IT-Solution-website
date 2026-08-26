import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { useNavigate, Link } from "react-router-dom";
import
{
  ShoppingCart,
  Search,
  Filter,
  CreditCard,
  Percent,
  Heart,
  Bell,
  FileText,
  Package,
  Star,
  Mail,
  Users,
  Smartphone,
  Monitor,
  Apple,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { HashLink } from "react-router-hash-link";

// Placeholder images (replace with your own branded/project shots)
const images = {
  hero: "https://www.orangemantra.com/wp-content/uploads/2025/05/case-study.webp",
  projects:
    "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
  platforms:
    "https://images.unsplash.com/photo-1551650975-60cb5d043c8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const modules = [
  {
    icon: Users,
    title: "User Management",
    desc: "Manage users, roles, activities, and transactions securely.",
  },
  {
    icon: Search,
    title: "Front End Search",
    desc: "Smart, fast product search to boost user experience & conversions.",
  },
  {
    icon: Filter,
    title: "Product Filters",
    desc: "Advanced filtering by category, brand, price — SEO friendly.",
  },
  {
    icon: CreditCard,
    title: "Payment Gateway",
    desc: "Secure, encrypted integrations for smooth transactions.",
  },
  {
    icon: Percent,
    title: "Discount Coupons",
    desc: "Attract new buyers and encourage repeat purchases.",
  },
  {
    icon: Heart,
    title: "Wishlist",
    desc: "Save products for later — improves retention.",
  },
  {
    icon: ShoppingCart,
    title: "Shopping Cart",
    desc: "Seamless cart & checkout experience.",
  },
  {
    icon: Bell,
    title: "Email/SMS Notifications",
    desc: "Automated updates, offers, and order alerts.",
  },
  {
    icon: FileText,
    title: "Billing & Reporting",
    desc: "Accurate invoices, subscriptions, and reports.",
  },
  {
    icon: Package,
    title: "Inventory Management",
    desc: "Real-time stock tracking & low-stock alerts.",
  },
  {
    icon: Star,
    title: "User Comments & Ratings",
    desc: "Build trust with reviews and social proof.",
  },
  {
    icon: Mail,
    title: "Newsletters",
    desc: "Engage customers with updates and personalized offers.",
  },
];

const platforms = [
  {
    icon: Monitor,
    title: "Web Application",
    desc: "Smooth communication between customers, sellers, and admin — with support features.",
  },
  {
    icon: Smartphone,
    title: "Android Application",
    desc: "Boost visibility, engagement, promotions, and in-app revenue.",
  },
  {
    icon: Apple,
    title: "iOS Application",
    desc: "Premium UX, top security, and intuitive interface for loyal users.",
  },
];

const faqs = [
  {
    q: "What services does AI Knots IT Solution provide?",
    a: "We offer software development, website development, mobile apps, and full digital marketing (SEO, SEM, SMM, content).",
  },
  {
    q: "Is there any other brand owned by AI Knots IT Solution?",
    a: "No, we operate as a single focused brand delivering quality IT services.",
  },
  {
    q: "Where is the company situated?",
    a: "AI Knots IT Solution is based in India. Contact us for full details.",
  },
  {
    q: "Where do you provide services?",
    a: "Globally — we serve clients across industries worldwide.",
  },
  {
    q: "How to make payments?",
    a: "Via NEFT/IMPS or cheque. Details shared during project onboarding.",
  },
  {
    q: "When was AI Knots IT Solution established?",
    a: "[Add your actual year here]",
  },
  {
    q: "What is the advance payment percentage?",
    a: "Minimum 40% of project cost (may vary based on scope).",
  },
  {
    q: "Who are the founders?",
    a: "[Add real founder names/details here for trust]",
  },
];

export default function EcommerceDevelopment()
{
  const { isDark } = useTheme();
  const [openFaq, setOpenFaq] = useState(null);
  const navigate = useNavigate();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() =>
  {
    const handleScroll = () =>
    {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () =>
  {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

    const serviceLink =
    "font-bold text-[#8B6B4A] hover:text-[#6B4F2A] transition-colors duration-200";

  return (
    <>
      <Helmet>
        <title>Ecommerce Website Development | Atla IKS</title>
        <meta
          name="description"
          content="Build secure ecommerce websites with custom online store development services"
        />
        <meta
          name="keywords"
          content="Ecommerce Website Development, Ecommerce Company, Online Store"
        />
      </Helmet>

      <div
        className={`relative overflow-hidden ${isDark ? "bg-gradient-to-b from-gray-950 via-black to-gray-950 text-white" : "bg-gradient-to-b from-[#f9efe1] via-white to-[#f4e9d8] text-[#3d220e]"}`}
      >
        {/* Hero */}
        <section className="relative min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={images.hero}
              alt="Modern ecommerce dashboard"
              className="w-full h-full object-cover"
              loading="lazy"
            />

            <div
              className={`absolute inset-0 transition-all duration-700 ${isDark
                ? "bg-gradient-to-b from-black/70 via-black/80 to-black/85"
                : "bg-gradient-to-b from-black/75 via-black/85 to-black/90"
                }`}
            />
          </div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="relative z-10 max-w-7xl mx-auto text-center"
          >
            <motion.h1
              variants={fadeInUp}
              className={`text-5xl md:text-7xl font-black mb-6 tracking-tight leading-tight text-white`}
            >
              Build High-Converting{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B6B4A] to-[#f9e8c8]">
                E-Commerce Stores
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className={`text-2xl md:text-4xl font-bold mb-8 text-[#f9e8c8]`}
            >
              Don't Settle for Average — Convert Visitors to Customers
            </motion.p>

            <motion.p
              variants={fadeInUp}
              className={`text-lg md:text-xl mb-12 max-w-4xl mx-auto leading-relaxed text-gray-200`}
            >
              At{" "}
              <span className="text-[#8B6B4A] font-semibold">
                AI Knots IT Solution
              </span>
              , we craft fast, secure, scalable, and fully customized{" "}
              <Link
                to="/websitedesigndevelopment"
                className={serviceLink}
              >
                eCommerce websites
              </Link>{" "}
              &{" "}
              <Link
                to="/software"
                className={serviceLink}
              >
                software
              </Link>{" "}
              that drive real{" "}
              <HashLink
                smooth
                to="/ecommercedevelopment#modules"
                className={serviceLink}
              >
                sales growth
              </HashLink>
              .
            </motion.p>

            <motion.ul
              variants={fadeInUp}
              className="flex flex-wrap justify-center gap-6 mb-12 text-lg text-white font-bold"
            >
              {[
                "Conversion-driven design",
                "Advanced integrations",
                "Omnichannel experience",
                "100% customized",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-[#8B6B4A]" /> {item}
                </li>
              ))}
            </motion.ul>
          </motion.div>
        </section>

        {/* Platforms */}
        <section
          className={`py-24 px-4 sm:px-6 lg:px-8 ${isDark ? "bg-black/50" : "bg-white"}`}
        >
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center mb-16"
            >
              <motion.h2
                variants={fadeInUp}
                className={`text-4xl md:text-6xl font-black mb-6 ${isDark ? "text-white" : "text-[#3d220e]"}`}
              >
                Seamless Experience Across{" "}
                <span className="text-[#8B6B4A]">All Platforms</span>
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className={`text-xl md:text-2xl max-w-4xl mx-auto ${isDark ? "text-gray-300" : "text-[#5c4635]"}`}
              >
                Give your customers the same powerful shopping experience — web,
                Android, or iOS.
              </motion.p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {platforms.map((plat, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  className={`rounded-2xl p-10 text-center hover:border-[#8B6B4A] hover:shadow-2xl transition-all group ${isDark ? "bg-gradient-to-br from-gray-900 to-black border border-[#8B6B4A]/40" : "bg-white border border-[#e8d9c2] shadow-lg"}`}
                >
                  <plat.icon className={`w-16 h-16 text-[#8B6B4A] mb-6 mx-auto group-hover:scale-110 transition-transform`} />
                  <h3 className={`text-3xl font-black mb-4 ${isDark ? "text-white" : "text-[#3d220e]"}`}>{plat.title}</h3>
                  <p className={`text-lg ${isDark ? "text-gray-300" : "text-[#5c4635]"}`}>
                    {plat.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Modules */}
        <section id="modules" className={`py-24 px-4 sm:px-6 lg:px-8 ${isDark ? "bg-black/70" : "bg-[#f4e9d8]"}`}>
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`text-4xl md:text-6xl font-black text-center mb-12 ${isDark ? "text-white" : "text-[#3d220e]"}`}
            >
              Powerful <span className="text-[#8B6B4A]">E-Commerce Modules</span>
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {modules.map((mod, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className={`backdrop-blur-sm rounded-2xl p-8 hover:border-[#8B6B4A] hover:shadow-2xl transition-all group flex flex-col items-center text-center ${isDark ? "bg-gray-900/70 border border-[#8B6B4A]/40" : "bg-white border border-[#e8d9c2] shadow-lg"}`}
                >
                  <mod.icon className={`w-12 h-12 text-[#8B6B4A] mb-6 group-hover:scale-110 transition-transform`} />
                  <h3 className={`text-2xl font-bold mb-4 ${isDark ? "text-white" : "text-[#3d220e]"}`}>{mod.title}</h3>
                  <p className={isDark ? "text-gray-300" : "text-[#5c4635]"}>
                    {mod.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Placeholder */}
        <section
          className={`py-24 px-4 sm:px-6 lg:px-8 ${isDark ? "bg-gradient-to-b from-black to-gray-950" : "bg-gradient-to-b from-white to-[#f9efe1]"}`}
        >
          <div className="max-w-7xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`text-4xl md:text-6xl font-black mb-8 ${isDark ? "text-white" : "text-[#3d220e]"}`}
            >
              Our Recent{" "}
              <span className="text-[#8B6B4A]">E-Commerce Projects</span>
            </motion.h2>

            <motion.img
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              src={images.projects}
              alt="Ecommerce project showcase"
              className={`rounded-2xl shadow-2xl mx-auto max-w-5xl w-full object-cover border border-[#e8d9c2] dark:border-[#8B6B4A]/30`}
              loading="lazy"
            />
          </div>
        </section>

        {/* CTA */}
        <section
          className={`py-24 px-4 sm:px-6 lg:px-8 ${isDark ? "bg-black/70" : "bg-white"}`}
        >
          <div className="max-w-5xl mx-auto text-center">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className={`text-4xl md:text-6xl font-black mb-8 ${isDark ? "text-white" : "text-[#3d220e]"}`}
            >
              Ready to Launch Your{" "}
              <span className="text-[#8B6B4A]">High-Performing</span> E-Commerce
              Store?
            </motion.h2>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className={`text-xl md:text-2xl mb-12 ${isDark ? "text-gray-300" : "text-[#5c4635]"}`}
            >
              Get free expert consultancy — let's build a store that turns
              visitors into loyal customers.
            </motion.p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/contact")}
              className="px-14 py-7 bg-gradient-to-r from-[#3d220e] to-[#5c4635] text-white rounded-full text-2xl md:text-3xl font-black shadow-2xl hover:shadow-[#8B6B4A]/50 transition-all flex items-center gap-3 mx-auto"
            >
              Get Started Today
              <ArrowRight className="w-8 h-8" />
            </motion.button>
          </div>
        </section>

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
              Frequently Asked <span className="text-[#8B6B4A]">Questions</span>
            </motion.h2>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={`rounded-xl p-6 border ${isDark
                    ? "bg-gray-900 border-gray-800"
                    : "bg-white border-gray-100"
                    }`}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className={`w-full text-left flex justify-between items-center gap-4 ${isDark ? "text-white" : "text-[#573010]"
                      }`}
                  >
                    <span className="font-semibold text-lg">{faq.q}</span>

                    <ChevronDown
                      className={`w-5 h-5 transition-transform duration-300 flex-shrink-0 ${openFaq === idx ? "rotate-180" : ""
                        }`}
                    />
                  </button>

                  {openFaq === idx && (
                    <p
                      className={`mt-4 ${isDark ? "text-gray-400" : "text-gray-600"
                        }`}
                    >
                      {faq.a}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}