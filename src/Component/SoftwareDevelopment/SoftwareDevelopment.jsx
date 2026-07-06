import React from "react";
import { motion } from "framer-motion";
import
{
  ArrowRight,
  Code,
  Globe,
  Server,
  Smartphone,
  Database,
  Cloud,
  Users,
  ChevronDown,
} from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { useNavigate, Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { useTheme } from "../../context/ThemeContext";
import { addToCart } from "../../Component/Redux/cart/cartSlice";
import { useDispatch } from "react-redux";
import
{
  Play,
  Target,
  Instagram,
  Facebook,
  Twitter,
  TrendingUp,
  Star,
  Award,
} from "lucide-react";
// High-quality images for visual appeal (Unsplash free stock - perfect for software dev theme)
const images = {
  hero: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80", // Modern coding team
  team: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80", // Collaborative dev team
  codeWorkspace:
    "https://images.unsplash.com/photo-1555066931-bf19c9cb1085?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80", // Clean code on multiple screens
  cloudDevops:
    "https://images.unsplash.com/photo-1563986768609-620da13593e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80", // Cloud infrastructure visualization
  mobileApps:
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80", // Mobile app screens mockup
  growthChart:
    "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80", // Business growth analytics
  caseStudyDashboard:
    "https://images.unsplash.com/photo-1551288049-b1f4d7c0e309?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80", // Analytics dashboard for case studies
};

const features = [
  { icon: Play, label: "16 REELS", desc: "Per Month" },
  {
    icon: Users,
    label: "30 TOTAL POSTS",
    desc: "Single Image / Carousel / Reels",
  },
  { icon: Target, label: "STORY SHOUTOUT", desc: "Reach More. Grow Faster." },
  { icon: TrendingUp, label: "100 FOLLOWERS GROWTH", desc: "Per Month" },
  {
    icon: Star,
    label: "OVERALL ENGAGEMENT & SALES",
    desc: "Strategy + Growth",
  },
  { icon: Award, label: "STORY HIGHLIGHT", desc: "Cover Design + Theme" },
];

const platforms = [
  {
    name: "Instagram",
    icon: Instagram,
    color: "bg-gradient-to-br from-purple-500 to-pink-500",
  },
  { name: "Facebook", icon: Facebook, color: "bg-blue-600" },
  // { name: "Pinterest", icon: Pinterest, color: "bg-red-600" },
];

const services = [
  {
    icon: Code,
    title: "Custom Software Development",
    desc: "Develop software applications according to the changing needs of your business and customers. We build fully functional, feature-rich, and scalable software that solves business challenges and supports growth.",
  },
  {
    icon: Globe,
    title: "Web Development Services",
    desc: "Grow your business with custom web development solutions that match your business requirements. Secure, scalable, and high-performance web applications that integrate perfectly with your ecosystem.",
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps Solutions",
    desc: "Automation and cloud technologies help businesses manage operations efficiently. Streamline workflows, improve collaboration, and accelerate development while maintaining high performance.",
  },
  {
    icon: Users,
    title: "Dedicated Development Team",
    desc: "Hire a dedicated team of experienced developers, architects, and project managers who understand your business needs and deliver real solutions.",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    desc: "Build Android and iOS mobile applications (native & cross-platform) with smooth functionality, better performance, and excellent user experience.",
  },
  {
    icon: Database,
    title: "Staff Augmentation",
    desc: "Flexible IT staff augmentation services to scale your development team according to project needs. Fill technical gaps, speed up development, and ensure successful completion.",
  },
];

const industries = [
  "Fintech & Insurance",
  "Education",
  "Retail & eCommerce",
  "Energy & Utilities",
  "Logistics & Distribution",
  "Healthcare",
  "Travel & Hospitality",
  "Media & Entertainment",
  "Public Sector",
  "Technology",
];

const techStack = {
  backend: ["Node.js", "Java", ".NET", "PHP", "Ruby on Rails"],
  frontend: ["React", "Angular", "Vue.js"],
  database: ["MySQL", "PostgreSQL", "MongoDB", "SQL Server", "Oracle"],
  mobile: ["iOS", "Android", "Flutter", "React Native"],
  cloud: ["AWS", "Google Cloud", "Azure", "Docker", "Kubernetes"],
  testing: ["Selenium", "Postman", "Apache JMeter", "BrowserStack"],
};

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

export default function SoftwareDevelopment()
{
  const { isDark } = useTheme();
  const dispatch = useDispatch();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [packages, setPackages] = useState([]);
  const [loadingPackages, setLoadingPackages] = useState(true);
  const [packagesError, setPackagesError] = useState("");
  const navigate = useNavigate();

  useEffect(() =>
  {
    const handleScroll = () =>
    {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() =>
  {
    const fetchPackages = async () =>
    {
      setLoadingPackages(true);
      setPackagesError("");

      try
      {
        const res = await axios.get(
          "http://localhost:8000/api/productforsells",
        );
        setPackages(res.data?.data || res.data || []);
      } catch (error)
      {
        console.error("Failed to load packages", error);
        setPackagesError("Unable to load packages. Please try again later.");
      } finally
      {
        setLoadingPackages(false);
      }
    };

    fetchPackages();
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
        <title>Custom Software Development Company | AI Knots IT Bhopal</title>
        <meta
          name="description"
          content="We build custom software solutions, enterprise software & SaaS products tailored to your business needs."
        />
        <meta
          name="keywords"
          content="software development company, custom software development, enterprise software development, SaaS development company"
        />
      </Helmet>
      <div
        className={`relative overflow-hidden ${isDark ? "bg-gradient-to-b from-gray-950 via-black to-gray-950 text-white" : "bg-gradient-to-b from-gray-50 via-white to-gray-50 text-gray-900"}`}
      >
        {/* Hero Section with Photo */}
        <section className="relative min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-24 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={images.hero}
              alt="Modern software development team collaborating"
              className={`w-full h-full object-cover transition-all duration-700 ${isDark ? "brightness-80 contrast-110" : "brightness-80 contrast-110"}`}
              loading="lazy"
            />

            {/* Gradient Overlay - Optimized for both themes */}
            <div
              className={`absolute inset-0 bg-gradient-to-t ${isDark ? "from-black/90 via-black/85 to-black/80" : "from-black/80 via-black/70 to-black/60"}`}
            />
          </div>

          {/* Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="relative z-10 max-w-7xl mx-auto text-center"
          >
            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-black mb-8 tracking-tight leading-tight text-white"
            >
              Software Development Company India
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className={`text-2xl md:text-3xl font-bold mb-6 ${isDark ? "text-[#ede1d8]" : "text-[#9F714E]"}`}
            >
              Expand your business globally by outsourcing your technology
              requirements to a trusted partner.
            </motion.p>

            <motion.p
              variants={fadeInUp}
              className={`text-lg md:text-xl mb-12 max-w-5xl mx-auto leading-relaxed ${isDark ? "text-gray-300" : "text-gray-200"
                }`}
            >
              We provide high-quality{" "}
              <>
                <HashLink smooth
                  to="/software#software-development-services" className={serviceLink}>
                  software development services
                </HashLink>{" "}
              </>
              to businesses by building secure, scalable, and high-performance software solutions with excellent{" "}
              <Link to="/uidesign" className={serviceLink}>
                user experience
              </Link>.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              {/* Primary Button */}
              <button
                onClick={() => navigate("/contact")}
                className="px-12 py-6 bg-[#3d220e] text-white rounded-full text-xl md:text-2xl font-bold 
                  active:scale-95 transition-all duration-300 
                  flex items-center gap-3 group"
              >
                Get in Touch{" "}
                <ArrowRight className="w-7 h-7 group-hover:translate-x-2 transition-transform" />
              </button>

              {/* Secondary Button */}
              <button
                onClick={() => navigate("/portfolio")}
                className={`px-12 py-6 border-2 border-[#3d220e] text-white rounded-full text-xl md:text-2xl font-bold transition-all duration-300 ${isDark ? "hover:bg-[#5a3a1c] hover:border-[#3d220e]" : "hover:bg-[#3d220e] hover:border-[#3d220e]"}`}
              >
                View Portfolio →
              </button>
            </motion.div>
          </motion.div>
        </section>

        {/* Empower Section with Team Photo */}
        <section
          className={`py-24 px-4 sm:px-6 lg:px-8 ${isDark ? "bg-black/50 text-[#9F714E]" : "bg-white/50 text-[#71553f]"}`}
        >
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-black mb-10 text-center"
            >
              Empower Your Business with Modern Software Development
            </motion.h2>

            <motion.img
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              src={images.team}
              alt="Dedicated software development team collaborating"
              className={`rounded-2xl shadow-2xl mx-auto max-w-4xl w-full object-cover mb-12 ${isDark ? "border border-[#8B6B4A]/30" : "border border-gray-200"}`}
            />

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`text-xl mb-12 max-w-5xl mx-auto leading-relaxed text-center ${isDark ? "text-gray-300" : "text-[#704d34]"}`}
            >
              Access a skilled team of{" "}
              <Link to="/software" >
                developers
              </Link>{" "}
              who can transform your business and help you adapt to evolving{" "}
              <Link to="/technology" className={serviceLink}>
                technologies
              </Link>
              .

              <br />
              <br />

              By partnering with AI Knots, businesses can gain a strong competitive advantage.
              Our team delivers reliable and efficient{" "}
              <>
                <HashLink smooth
                  to="/software#software-development-services" className={serviceLink}>
                  software development services
                </HashLink>{" "}
              </>{" "}
              that help increase productivity and business growth.

              <br />
              <br />

              We offer a wide range of services including{" "}
              <Link to="/uidesign" className={serviceLink}>
                software design
              </Link>
              ,{" "}
              <Link to="/software" >
                custom development
              </Link>
              , software testing, legacy system migration,
              {" "}
              <>
                <HashLink smooth
                  to="/software#our-development-process" className={serviceLink}>
                  product development
                </HashLink>{" "}
              </>
              , and many more
              solutions tailored to business requirements.
            </motion.p>

            <div className="grid md:grid-cols-4 gap-8 mb-16">
              {["50+", "3+", "10+", "10+"].map((num, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`rounded-2xl p-10 text-center transition-all ${isDark ? "bg-gray-900/70 border border-[#8B6B4A]/30 hover:border-[#3D220E]" : "bg-white border border-gray-200 hover:border-[#3D220E] shadow-md"}`}
                >
                  <div className="text-6xl md:text-7xl font-black text-[#3D220E] mb-4">
                    {num}
                  </div>
                  <p className="text-xl font-medium">
                    {i === 0 && "Completed Projects"}
                    {i === 1 && "Years of Experience"}
                    {i === 2 && "Global Customers"}
                    {i === 3 && "Countries Clients Served"}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Grid with Code Workspace Photo */}
        <section
          id="software-development-services"
          className={`py-24 px-4 sm:px-6 lg:px-8 ${isDark ? "bg-black/50" : "bg-gray-50 text-[#462206]"}`}
        >
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-black text-center mb-12"
            >
              Our Software Development{" "}
              <span className="text-[#3D220E]">Services</span>
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={`backdrop-blur-sm rounded-2xl p-10 hover:shadow-2xl transition-all group ${isDark ? "bg-gray-900/70 border border-[#8B6B4A]/30 hover:border-[#8B6B4A]/60 hover:shadow-[#8B6B4A]/20" : "bg-white border border-gray-200 hover:border-[#8B6B4A]/60 hover:shadow-gray-200 shadow-md"}`}
                >
                  <service.icon className="w-16 h-16 text-[#3D220E] mb-8 mx-auto group-hover:scale-110 transition-transform" />
                  <h3
                    className={`text-2xl md:text-3xl font-bold mb-6 text-center ${isDark ? "text-white" : "text-[#462206]"}`}
                  >
                    {service.title}
                  </h3>
                  <p
                    className={`text-lg leading-relaxed text-center ${isDark ? "text-gray-300" : "text-[#462206]"}`}
                  >
                    {service.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies with Analytics Photo */}
        <section
          className={`py-24 px-4 sm:px-6 lg:px-8 ${isDark ? "bg-black/50" : "bg-white/50 text-[#462206]"}`}
        >
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black text-center mb-12"
            >
              Software Development{" "}
              <span className="text-[#3D220E]">Case Studies</span>
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Media Distribution & Aggregation Platform",
                  desc: "Interactive media distribution platform integrating social media channels, managing advertising campaigns, and collecting data into a single system.",
                },
                {
                  title: "Online Forex Trading Solution",
                  desc: "Secure forex trading platform with real-time currency exchange, competitive rates, flexible payments, and strong financial security.",
                },
                {
                  title: "Smart City Application",
                  desc: "IoT-connected smart city management system for monitoring environmental data, energy usage, lighting, flood detection, and air quality.",
                },
              ].map((study, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 }}
                  className={`border rounded-2xl p-10 transition-all ${isDark ? "bg-gray-900/70 border-[#8B6B4A]/30 hover:border-[#8B6B4A]/60" : "bg-white border-gray-200 hover:border-[#8B6B4A]/60 shadow-md"}`}
                >
                  <h3
                    className={`text-2xl font-bold mb-6 ${isDark ? "text-[#3D220E]" : "text-[#3D220E]"}`}
                  >
                    {study.title}
                  </h3>
                  <p
                    className={`leading-relaxed ${isDark ? "text-gray-300" : "text-[#9F714E]"}`}
                  >
                    {study.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Industries + Tech Stack with Cloud Photo */}
        <section
          className={`py-24 px-4 sm:px-6 lg:px-8 ${isDark ? "bg-black/50 text-[#9F714E]" : "bg-gray-50 text-[#462206]"}`}
        >
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black text-center mb-12"
            >
              Industries We Work With
            </motion.h2>

            <div className="mb-20">
              <h2
                className={`text-3xl md:text-4xl font-bold text-center mb-12 ${isDark ? "bg-black/50 text-[#9F714E]" : "bg-gray-50 text-[#462206]"}`}
              >
                Industries We Serve
              </h2>

              <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
                {industries.map((ind, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04 }}
                    whileHover={{
                      scale: 1.08,
                      y: -4,
                      transition: { duration: 0.2 },
                    }}
                    className={`px-8 py-4 rounded-2xl text-base md:text-lg font-medium cursor-pointer transition-all duration-300 shadow-md ${isDark
                      ? "bg-zinc-900 border border-[#8B6B4A]/40 text-gray-200 hover:border-[#3D220E] hover:bg-[#3D220E]/60 hover:shadow-[#8B6B4A]/20"
                      : "bg-white border border-gray-200 text-gray-800 hover:border-[#3D220E] hover:bg-[#F5EDE4] hover:shadow-lg hover:shadow-[#E8D9C2]/40"
                      }`}
                  >
                    {ind}
                  </motion.span>
                ))}
              </div>
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black text-center mb-12"
            >
              Technology{" "}
              <span className="text-[#9F714E] : text-black">Stack</span>
            </motion.h2>

            <section
              className={`py-24 px-4 sm:px-6 lg:px-8 ${isDark ? "bg-zinc-950" : "bg-gradient-to-br from-red-50 to-white"}`}
            >
              <div className="max-w-7xl mx-auto">
                <motion.h2
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-4xl md:text-6xl font-black text-center mb-16 text-[#3D220E]"
                >
                  Our Premium Digital Marketing Packages
                </motion.h2>

                {loadingPackages ? (
                  <div className="text-center py-20 text-lg font-medium text-[#3D220E]">
                    Loading packages...
                  </div>
                ) : packagesError ? (
                  <div className="text-center py-20 text-lg font-medium text-[#8B6B4A]">
                    {packagesError}
                  </div>
                ) : packages.length === 0 ? (
                  <div className="text-center py-20 text-lg font-medium text-[#3D220E]">
                    No packages available right now.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {packages.map((pkg, idx) =>
                    {
                      const descriptionLines = pkg.description
                        ? pkg.description.split(/\r?\n/).filter(Boolean)
                        : [];

                      const packageTitle =
                        pkg.category?.name || pkg.productname || "Digital Marketing Package";

                      const packagePrice = pkg.price ?? 0;
                      const packageDuration = pkg.duration || "Contact for details";

                      // Image fallback (change URL as needed)
                      const imageUrl = pkg.images || pkg.imageUrl ||
                        "https://via.placeholder.com/600x400/3D220E/white?text=Package+Image";

                      return (
                        <motion.div
                          key={pkg._id || `${pkg.productname}-${idx}`}
                          initial={{ opacity: 0, y: 50 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.08 }}
                          className={`rounded-3xl overflow-hidden shadow-xl border border-[#E8D9C2] ${isDark ? "bg-gray-950" : "bg-white"}`}
                        >
                          {/* Image Section - Added Here */}
                          <div className="relative h-56 overflow-hidden">
                            <img
                              src={imageUrl}
                              alt={packageTitle}
                              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                              onError={(e) =>
                              {
                                e.target.src = "https://via.placeholder.com/600x400/3D220E/white?text=Package";
                              }}
                            />
                            {/* Optional overlay gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          </div>

                          {/* Header with Price */}
                          <div className="bg-gradient-to-br from-[#3D220E] to-[#5A351A] text-white p-8 text-center -mt-1">
                            <h3 className="text-2xl font-black leading-tight">
                              {packageTitle}
                            </h3>
                            <div className="text-5xl font-black mt-4">
                              ₹{packagePrice}
                            </div>
                            <p className="text-sm opacity-90">
                              {packageDuration}
                            </p>
                          </div>

                          <div className="p-8 space-y-4 text-lg">
                            {descriptionLines.length > 0 ? (
                              descriptionLines.map((line, lineIndex) => (
                                <div key={lineIndex}>✅ {line.trim()}</div>
                              ))
                            ) : (
                              <div>✅ Contact us for full package details.</div>
                            )}
                          </div>

                          <div className="flex flex-col gap-4 p-8 pt-0 md:flex-row">
                            <button
                              onClick={() => navigate(`/productforsells/${pkg._id}`)}
                              className="w-full bg-[#3D220E] hover:bg-[#5A351A] text-white py-4 rounded-2xl font-bold transition-all"
                            >
                              Details
                            </button>
                            <button
                              onClick={() =>
                                dispatch(
                                  addToCart({
                                    id: pkg._id || `${pkg.productname}-${idx}`,
                                    name: pkg.productname || packageTitle,
                                    price: packagePrice,
                                    type: pkg.type || "custom",
                                    duration: packageDuration,
                                  })
                                )
                              }
                              className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-bold transition-all"
                            >
                              Add to Cart
                            </button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>
            </section>
            {/* <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Object.entries(techStack).map(([category, techs], idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`border rounded-2xl p-8 ${isDark ? "bg-gray-900/70 border-[#8B6B4A]/30" : "bg-white border-gray-200 shadow-md"}`}
                >
                  <h3
                    className={`text-2xl font-bold mb-6 capitalize ${isDark ? "text-[#ede1d8]" : "text-[#9F714E]"}`}
                  >
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {techs.map((tech, i) => (
                      <span
                        key={i}
                        className={`px-4 py-2 rounded-full text-sm ${isDark ? "bg-black/50 border text-[#ede1d8] border-[#8B6B4A]/30" : "bg-gray-100 text-[#9F714E] border border-gray-300"}`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div> */}
          </div>
        </section>

        {/* Why Sections with Code Photo */}
        <section
          className={`py-24 px-4 sm:px-6 lg:px-8 ${isDark ? "bg-black/50" : "bg-white/50"}`}
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 items-stretch">
              {/* Column 1 */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className={`p-8 rounded-2xl border flex flex-col h-full transition-all duration-300 hover:shadow-xl ${isDark
                  ? "bg-zinc-900 border-[#8B6B4A]/40 hover:border-[#3D220E]"
                  : "bg-white border-[#E8D9C2] hover:border-[#3D220E] hover:shadow-gray-200"
                  }`}
              >
                <h2
                  className={`text-3xl md:text-4xl font-black mb-8 ${isDark ? "text-[#9F714E]" : "text-[#9F714E]"}`}
                >
                  Why Software Outsourcing?
                </h2>

                <ul className="space-y-4 text-lg flex-1">
                  {[
                    "Reduced software development costs",
                    "Access to skilled developers",
                    "Faster development process",
                    "Access to modern technologies",
                    "Flexible and scalable development teams",
                    "Reduced operational risks",
                  ].map((point, i) => (
                    <motion.li
                      key={i}
                      variants={fadeInUp}
                      className="flex items-start gap-4"
                    >
                      <ArrowRight className="w-6 h-6 text-[#3D220E] flex-shrink-0 mt-1" />
                      <span>{point}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Column 2 */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className={`p-8 rounded-2xl border flex flex-col h-full transition-all duration-300 hover:shadow-xl ${isDark
                  ? "bg-zinc-900 border-[#8B6B4A]/40 hover:border-[#3D220E]"
                  : "bg-white border-[#E8D9C2] hover:border-[#3D220E] hover:shadow-inner-gray-200"
                  }`}
              >
                <h2
                  className={`text-3xl md:text-4xl font-black mb-8 ${isDark ? "text-[#9F714E]" : "text-[#9F714E]"}`}
                >
                  Why Choose India for Software Development?
                </h2>

                <ul className="space-y-4 text-lg flex-1">
                  {[
                    "Cost-effective development solutions",
                    "Highly skilled developer community",
                    "Flexible business models",
                    "24/7 development support for global clients",
                    "Access to the latest technologies",
                    "Faster project delivery",
                  ].map((point, i) => (
                    <motion.li
                      key={i}
                      variants={fadeInUp}
                      className="flex items-start gap-4"
                    >
                      <ArrowRight className="w-6 h-6 text-[#3D220E] flex-shrink-0 mt-1" />
                      <span>{point}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Column 3 */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className={`p-8 rounded-2xl border flex flex-col h-full transition-all duration-300 hover:shadow-xl ${isDark
                  ? "bg-zinc-900 border-[#8B6B4A]/40 hover:border-[#3D220E]"
                  : "bg-white border-[#E8D9C2] hover:border-[#3D220E] hover:shadow-gray-200"
                  }`}
              >
                <h2
                  className={`text-3xl md:text-4xl font-black mb-8 ${isDark ? "text-[#9F714E]" : "text-[#9F714E]"}`}
                >
                  Why Choose AI Knots?
                </h2>

                <ul className="space-y-4 text-lg flex-1">
                  {[
                    "Clear Communication",
                    "Scalable Teams",
                    "Efficient Project Management",
                    "Strong Industry Experience",
                    "Business-Friendly Hiring Models",
                  ].map((point, i) => (
                    <motion.li
                      key={i}
                      variants={fadeInUp}
                      className="flex items-start gap-4"
                    >
                      <ArrowRight className="w-6 h-6 text-[#3D220E] flex-shrink-0 mt-1" />
                      <span>{point}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Development Process + Final CTA with Growth Photo */}
        <section
          id="our-development-process"
          className={`py-24 px-4 sm:px-6 lg:px-8 ${isDark ? "" : "bg-gray-50"}`}
        >
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black text-center mb-12"
            >
              Our Development <span className="text-[#9F714E]">Process</span>
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-8 mb-20">
              {[
                "Requirement Analysis",
                "Agile Development",
                "Testing and Delivery",
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className={`border rounded-2xl p-10 text-center transition-all ${isDark ? "bg-gray-900/70 border-[#8B6B4A]/30 hover:border-[#3D220E]" : "bg-white border-gray-200 hover:border-[#3D220E] hover:shadow-gray-200"}`}
                >
                  <div className="text-5xl font-black text-[#9F714E] mb-6">{`0${i + 1}`}</div>
                  <h3
                    className={`text-2xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}
                  >
                    {step}
                  </h3>
                  <p
                    className={`text-[#704c32] ${isDark ? "text-[#826047]" : "text-[#826047]"}`}
                  >
                    {step === "Requirement Analysis" &&
                      "We understand your business needs and define the project roadmap."}
                    {step === "Agile Development" &&
                      "Our developers follow agile methods with regular updates and feedback cycles."}
                    {step === "Testing and Delivery" &&
                      "We conduct thorough testing before deploying the final product to ensure performance and security."}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Final CTA */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <motion.img
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                src={images.growthChart}
                alt="Business growth through software solutions"
                className={`rounded-2xl shadow-2xl mx-auto max-w-4xl w-full object-cover mb-12 ${isDark ? "border border-[#8B6B4A]/30" : "border border-gray-200"}`}
              />

              <motion.h2
                variants={fadeInUp}
                className={`text-4xl md:text-6xl font-black mb-10 ${isDark ? "text-[#9F714E]" : "text-[#9F714E] text-[#462206]"}`}
              >
                Hire a Dedicated Software Development Team
              </motion.h2>

              <motion.p
                variants={fadeInUp}
                className={`text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed ${isDark ? "text-[#826047]" : "text-[#826047]"}`}
              >
                Get access to experienced developers who can build powerful web
                and mobile applications tailored to your business needs.
              </motion.p>
            </motion.div>
          </div>
        </section>

        <section
          className={`py-24 px-4 sm:px-6 lg:px-8 ${isDark ? "bg-gradient-to-br from-[#3D220E]/20 to-black" : "bg-[#F5EDE4]"}`}
        >
          <div className="max-w-5xl mx-auto text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-14 py-7 bg-[#3d220e] text-white rounded-full text-2xl md:text-3xl font-black shadow-2xl shadow-[#3D220E]/50 hover:shadow-[#3D220E]/70 transition-all flex items-center gap-4 mx-auto"
            >
              <button onClick={() => navigate("/contact")}>Contact Us</button>
              <ArrowRight className="w-auto h-8" />
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

            <div className="space-y-8">
              {[
                {
                  q: "What is the cost of software development?",
                  a: "The cost depends on the complexity, features, and timeline of the project.",
                },
                {
                  q: "Do you offer custom software development?",
                  a: "Yes, we specialize in building custom software solutions based on business needs.",
                },
                {
                  q: "Can I hire a dedicated development team?",
                  a: "Yes, we offer dedicated developer hiring models for businesses.",
                },
                {
                  q: "Do you provide maintenance and support?",
                  a: "Yes, we provide post-development support and maintenance services.",
                },
                {
                  q: "Which industries do you work with?",
                  a: "We serve industries such as healthcare, education, fintech, retail, logistics, and many others.",
                },
              ].map((faq, idx) => (
                <details
                  key={idx}
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

                    <ChevronDown className="w-5 h-5 flex-shrink-0 transition-transform duration-300 group-open:rotate-180 text-[#8B6B4A]" />
                  </summary>

                  <p
                    className={`mt-4 ${isDark ? "text-gray-400" : "text-gray-600"
                      }`}
                  >
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
