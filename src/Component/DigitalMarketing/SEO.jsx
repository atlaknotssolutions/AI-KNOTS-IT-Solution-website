import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import SEOImage from "../../assets/Images/SEO.webp"; // ← Changed name
import
{
  ArrowRight,
  Search,
  Globe,
  MapPin,
  FileText,
  Zap,
  CheckCircle,
  ChevronDown,
} from "lucide-react";
import { HashLink } from "react-router-hash-link";

const images = {
  dashboard:
    "https://media.whatagraph.com/Data_bloo_s_Google_Search_Console_report_template_6972d36596.png",
  team: SEOImage, // ← Updated here
  serp: "https://www.wordstream.com/wp-content/uploads/2008/12/organic-results-on-the-serp.png",
  localSEO:
    "https://zenbrief.com/wp-content/uploads/2022/07/How-To-Use-Google-Business-Profile-For-Local-SEO_-Complete-Guide-to-GBP-ex-GMB.png",
  ecommerce:
    "https://www.webhopers.com/wp-content/uploads/2024/06/Top-10-SEO-Strategies-for-eCommerce-Websites-4.png",
};

const seoServices = [
  {
    icon: Zap,
    title: "Technical SEO Audit",
    desc: "Detailed website audit to identify technical problems affecting rankings and performance.",
  },
  {
    icon: FileText,
    title: "On-Page SEO",
    desc: "Optimize structure, content, meta tags, headings, and internal links for better understanding by search engines.",
  },
  {
    icon: Link,
    title: "Off-Page SEO",
    desc: "Build authority through high-quality backlinks, brand mentions, and trusted references.",
  },
  {
    icon: MapPin,
    title: "Local SEO",
    desc: "Rank in local search results and Google Maps to attract nearby customers.",
  },
  {
    icon: Search,
    title: "Keyword Research & Strategy",
    desc: "Identify high-value keywords your potential customers search for and build strong strategies.",
  },
  {
    icon: Globe,
    title: "E-commerce SEO",
    desc: "Optimize product pages, categories, and technical elements to increase visibility and sales.",
  },
];

const packages = [
  {
    name: "Basic Plan",
    desc: "Best for startups and small businesses",
    features: [
      "Initial SEO analysis",
      "On-page optimization",
      "Keyword research",
      "Local SEO setup",
      "Off-page SEO",
      "Monthly reporting",
    ],
  },
  {
    name: "Advance Plan",
    desc: "Best for growing businesses",
    features: [
      "SEO audit and strategy",
      "On-page optimization",
      "Keyword targeting",
      "Local SEO optimization",
      "Content marketing",
      "Off-page SEO",
      "Monthly reporting",
      "Customer support",
    ],
  },
  {
    name: "Pro Plan",
    desc: "Best for competitive industries",
    features: [
      "Complete SEO strategy",
      "On-page + technical SEO",
      "Keyword research and targeting",
      "Local SEO optimization",
      "Content marketing",
      "High-quality backlinks",
      "Premium SEO reports",
      "Dedicated support",
    ],
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function SEO()
{
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState(null);
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains("dark"),
  );
  const [showScrollTop, setShowScrollTop] = useState(false);

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
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const accentClass = "text-[#8B6B4A]";
  const headingClass = isDark ? "text-white" : "text-gray-900";
  const bodyClass = isDark ? "text-gray-300" : "text-gray-700";

  const cardClass = isDark
    ? "bg-gray-900/70 backdrop-blur-sm border border-gray-800 hover:border-[#8B6B4A]/60 hover:shadow-[#8B6B4A]/30"
    : "bg-white border border-gray-200 hover:border-[#8B6B4A]/60 hover:shadow-2xl";

  const faqs = [
    {
      q: "How long does it take to see results from SEO?",
      a: "Usually, you start seeing initial improvements in 3-6 months. Significant results typically appear in 6-12 months depending on competition.",
    },
    {
      q: "Do you provide monthly SEO reports?",
      a: "Yes, we provide detailed monthly reports with rankings, traffic, and performance insights so you can track your ROI.",
    },
    {
      q: "What is the cost of SEO services?",
      a: "Our SEO packages start from ₹15,000/month. Pricing depends on your website size, competition, and goals.",
    },
    {
      q: "Do you work on Local SEO?",
      a: "Yes, we specialize in Local SEO including Google Business Profile optimization, local citations, and map ranking.",
    },
    {
      q: "Can you guarantee #1 ranking on Google?",
      a: "No ethical SEO company can guarantee #1 position. We guarantee transparent work and consistent growth in rankings and traffic.",
    },
    {
      q: "Do you provide SEO for e-commerce websites?",
      a: "Yes, we have extensive experience in e-commerce SEO including product page optimization, schema markup, and category optimization.",
    },
  ];

  const serviceLink =
    "font-bold text-[#8B6B4A] hover:text-[#6B4F2A] transition-colors duration-200";

  return (
    <>
      <Helmet>
        <title>SEO Services Company in India | AI KNOTS IT SOLUTION</title>
        <meta
          name="description"
          content="Improve Google rankings with professional SEO services including local SEO, on-page SEO, technical SEO & e-commerce SEO."
        />
        <meta
          name="keywords"
          content="SEO Company in India, Best SEO Services, Local SEO, Technical SEO, Digital Marketing Bhopal"
        />
      </Helmet>

      <div
        className={`min-h-screen overflow-hidden transition-colors duration-700
      ${isDark ? "bg-black text-white" : "bg-white text-gray-900"}`}
      >
        {/* HERO SECTION */}
        <section className="relative min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 overflow-hidden bg-black">
          <div className="absolute inset-0">
            <img
              src={images.serp}
              alt="Google SERP organic results"
              className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
          </div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="relative z-10 max-w-7xl mx-auto text-center"
          >
            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-tight text-white"
            >
              Best SEO Company in India That Drives Traffic & Generates{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#8B6B4A] via-[#8B6B4A] to-white">
                Real Leads
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl mb-12 max-w-5xl mx-auto leading-relaxed text-white/90"
            >
              At AI KNOTS IT SOLUTION, we are not just another{" "}
              <Link
                to="/digital-marketing"
                className={serviceLink}
              >
                digital marketing agency
              </Link>
              . We are a team that truly understands how{" "}
              <HashLink
                smooth
                to="/seo#services"
                className={serviceLink}
              >
                search engines
              </HashLink>{" "}
              work and how businesses grow{" "}
              <HashLink
                smooth
                to="/seo#results"
                className={serviceLink}
              >
                online
              </HashLink>
              .
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <button
                onClick={() => navigate("/contact")}
                className="group px-10 py-5 bg-gradient-to-r from-[#8B6B4A] to-[#8B6B4A] hover:from-[#8B6B4A] hover:to-[#8B6B4A] rounded-full text-xl font-bold shadow-xl shadow-[#8B6B4A]/50 transition-all flex items-center gap-3 text-white"
              >
                Let's Talk Growth
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => navigate("/contact")}
                className="px-10 py-5 border-2 border-[#8B6B4A] rounded-full text-xl font-semibold transition-all text-[#8B6B4A] hover:bg-[#8B6B4A]/10"
              >
                Free SEO Audit →
              </button>
            </motion.div>
          </motion.div>
        </section>

        {/* ====================== RESULTS FOCUS ====================== */}
        <section
          id="results"
          className={`py-20 px-4 sm:px-6 lg:px-8 ${isDark ? "bg-gray-950" : "bg-gray-50"}`}
        >
          <div className="max-w-7xl mx-auto text-center">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className={`text-4xl md:text-5xl font-black mb-10 ${headingClass}`}
            >
              Many promise "Rank #1 on Google." But the real question is: Will
              those rankings bring you{" "}
              <span className={accentClass}>real customers</span>?
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className={`text-xl mb-12 max-w-4xl mx-auto ${bodyClass}`}
            >
              That's where we work differently. We focus on results that
              actually help your business grow:
            </motion.p>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                "More qualified website traffic",
                "More inquiries and calls",
                "More real customers and sales",
              ].map((point, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className={`rounded-3xl p-8 transition-all ${cardClass}`}
                >
                  <CheckCircle
                    className={`w-12 h-12 mx-auto mb-6 ${accentClass}`}
                  />
                  <p className="text-xl font-semibold">{point}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ====================== SEO SERVICES ====================== */}
        <section
          id="services"
          className={`py-20 px-4 sm:px-6 lg:px-8 ${isDark ? "bg-black" : "bg-white"}`}
        >
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`text-4xl md:text-5xl font-black text-center mb-16 ${headingClass}`}
            >
              Our SEO Services –{" "}
              <span className={accentClass}>Designed to Deliver Results</span>
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {seoServices.map((service, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={`rounded-3xl p-8 transition-all group ${cardClass}`}
                >
                  <service.icon
                    className={`w-14 h-14 mb-6 mx-auto transition-transform group-hover:scale-110 ${accentClass}`}
                  />
                  <h3
                    className={`text-2xl font-bold mb-4 text-center ${headingClass}`}
                  >
                    {service.title}
                  </h3>
                  <p className={`text-center ${bodyClass}`}>{service.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ====================== ADVANTAGES + DASHBOARD ====================== */}
        <section
          id="advantages"
          className={`py-20 px-4 sm:px-6 lg:px-8 ${isDark ? "bg-gradient-to-b from-black to-gray-950" : "bg-gray-50"}`}
        >
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <h2
                className={`text-4xl md:text-5xl font-black mb-8 ${headingClass}`}
              >
                Advantages of SEO for Your Business
              </h2>
              <p className={`text-lg mb-8 leading-relaxed ${bodyClass}`}>
                <HashLink
                  smooth
                  to="/seo#advantages"
                  className={serviceLink}
                >
                  Search Engine Optimization
                </HashLink>{" "}
                helps businesses build a strong{" "}
                <Link
                  to="/websitedesigndevelopment"
                  className={serviceLink}
                >
                  online presence
                </Link>{" "}
                and reach customers who are actively searching for their{" "}
                <HashLink
                  smooth
                  to="/seo#results"
                  className={serviceLink}
                >
                  products or services
                </HashLink>
                .
              </p>
              <ul className="space-y-4 text-lg">
                {[
                  "Higher visibility on search engines",
                  "Increased website traffic",
                  "Stronger brand awareness",
                  "Higher conversion rates",
                  "Long-term business growth",
                ].map((adv, i) => (
                  <motion.li
                    key={i}
                    variants={fadeInUp}
                    className="flex items-center gap-4"
                  >
                    <CheckCircle
                      className={`w-6 h-6 flex-shrink-0 ${accentClass}`}
                    />
                    {adv}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.img
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              src={images.dashboard}
              alt="SEO analytics dashboard"
              className={`rounded-3xl shadow-2xl w-full object-cover border ${isDark ? "border-red-900/30" : "border-gray-200"}`}
            />
          </div>
        </section>

        {/* ====================== WHY CHOOSE US ====================== */}
        <section
          className={`py-20 px-4 sm:px-6 lg:px-8 ${isDark ? "bg-black" : "bg-white"}`}
        >
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <motion.img
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              src={images.team}
              alt="SEO team collaborating"
              className={`rounded-3xl shadow-2xl w-full object-cover border ${isDark ? "border-red-900/30" : "border-gray-200"} order-2 md:order-1`}
            />

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="order-1 md:order-2"
            >
              <h2
                className={`text-4xl md:text-5xl font-black mb-8 ${headingClass}`}
              >
                Why Choose AI KNOTS IT SOLUTION for SEO?
              </h2>

              <div className="space-y-8">
                {[
                  {
                    title: "White Hat SEO Practices",
                    desc: "We follow ethical and search-engine-approved techniques that deliver long-term results.",
                  },
                  {
                    title: "Transparent Reporting",
                    desc: "Weekly and monthly SEO reports so you can clearly track rankings and traffic growth.",
                  },
                  {
                    title: "Dedicated SEO Team",
                    desc: "Specialists, content writers, and developers working together for your website performance.",
                  },
                  {
                    title: "Proven SEO Experience",
                    desc: "We stay updated with the latest algorithm changes to keep your business ahead.",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    variants={fadeInUp}
                    className="flex items-start gap-5"
                  >
                    <div
                      className={`text-4xl font-black ${accentClass} opacity-70`}
                    >
                      {`0${i + 1}`}
                    </div>

                    <div>
                      <h4 className={`text-2xl font-bold mb-2 ${headingClass}`}>
                        {item.title}
                      </h4>

                      <p className={bodyClass}>
                        {item.desc ===
                          "We follow ethical and search-engine-approved techniques that deliver long-term results." ? (
                          <>
                            We follow ethical and{" "}
                            <HashLink
                              smooth
                              to="/seo#services"
                              className={serviceLink}
                            >
                              search-engine-approved techniques
                            </HashLink>{" "}
                            that deliver long-term results.
                          </>
                        ) : item.desc ===
                          "Weekly and monthly SEO reports so you can clearly track rankings and traffic growth." ? (
                          <>
                            Weekly and monthly{" "}
                            <HashLink
                              smooth
                              to="/seo#packages"
                              className={serviceLink}
                            >
                              SEO reports
                            </HashLink>{" "}
                            so you can clearly track rankings and{" "}
                            <HashLink
                              smooth
                              to="/seo#results"
                              className={serviceLink}
                            >
                              traffic growth
                            </HashLink>
                            .
                          </>
                        ) : item.desc ===
                          "Specialists, content writers, and developers working together for your website performance." ? (
                          <>
                            Specialists,{" "}
                            <Link
                              to="/contentwritingbranding"
                              className={serviceLink}
                            >
                              content writers
                            </Link>
                            , and{" "}
                            <Link
                              to="/software"
                              className={serviceLink}
                            >
                              developers
                            </Link>{" "}
                            working together for your{" "}
                            <Link
                              to="/websitedesigndevelopment"
                              className={serviceLink}
                            >
                              website performance
                            </Link>
                            .
                          </>
                        ) : item.desc ===
                          "We stay updated with the latest algorithm changes to keep your business ahead." ? (
                          <>
                            We stay updated with the latest{" "}
                            <HashLink
                              smooth
                              to="/seo#services"
                              className={serviceLink}
                            >
                              algorithm changes
                            </HashLink>{" "}
                            to keep your{" "}
                            <HashLink
                              smooth
                              to="/seo#consultation"
                              className={serviceLink}
                            >
                              business ahead
                            </HashLink>
                            .
                          </>
                        ) : (
                          item.desc
                        )}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ====================== SEO PACKAGES ====================== */}
        <section
          id="packages"
          className={`py-20 px-4 sm:px-6 lg:px-8 ${isDark ? "bg-gray-950" : "bg-gray-50"}`}
        >
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`text-4xl md:text-5xl font-black text-center mb-16 ${headingClass}`}
            >
              Our SEO <span className={accentClass}>Packages</span>
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-8">
              {packages.map((pkg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 }}
                  className={`rounded-3xl p-8 text-center transition-all ${cardClass} ${idx === 1 ? "scale-105 border-red-500 shadow-xl" : ""
                    }`}
                >
                  <h3 className={`text-3xl font-black mb-3 ${accentClass}`}>
                    {pkg.name}
                  </h3>
                  <p className={`mb-6 ${bodyClass}`}>{pkg.desc}</p>
                  <ul className="space-y-3 text-left">
                    {pkg.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <CheckCircle
                          className={`w-5 h-5 flex-shrink-0 ${accentClass}`}
                        />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ====================== FINAL CTA SECTION ====================== */}
        <section
          id="consultation"
          className={`py-20 px-4 sm:px-6 lg:px-8 ${isDark ? "bg-black" : "bg-gray-50"}`}
        >
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
            <div>
              <motion.img
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                src={images.localSEO}
                alt="Local SEO Google Business Profile"
                className={`rounded-3xl shadow-2xl w-full object-cover border mb-8 ${isDark ? "border-red-900/30" : "border-gray-200"}`}
              />
              <motion.img
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                src={images.ecommerce}
                alt="E-commerce SEO"
                className={`rounded-3xl shadow-2xl w-full object-cover border ${isDark ? "border-red-900/30" : "border-gray-200"}`}
              />
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="flex flex-col justify-center"
            >
              <h2
                className={`text-4xl md:text-6xl font-black mb-8 ${headingClass}`}
              >
                Let's Talk About <span className={accentClass}>Growth</span> Not Just
                Rankings
              </h2>

              <p className={`text-xl mb-10 leading-relaxed ${bodyClass}`}>
                Ranking on{" "}
                <HashLink
                  smooth
                  to="/seo#services"
                  className={serviceLink}
                >
                  search engines
                </HashLink>{" "}
                is important, but real success happens when those rankings bring{" "}
                <HashLink
                  smooth
                  to="/seo#results"
                  className={serviceLink}
                >
                  customers
                </HashLink>{" "}
                who are genuinely interested in your{" "}
                <Link
                  to="/service"
                  className={serviceLink}
                >
                  services
                </Link>
                .
              </p>

              <p className={`text-lg mb-12 ${bodyClass}`}>
                At AI KNOTS IT SOLUTION, we focus on attracting the right{" "}
                <HashLink
                  smooth
                  to="/seo#results"
                  className={serviceLink}
                >
                  visitors
                </HashLink>{" "}
                who convert into{" "}
                <HashLink
                  smooth
                  to="/seo#advantages"
                  className={serviceLink}
                >
                  leads
                </HashLink>{" "}
                and sales.{" "}
                <Link
                  to="/contact"
                  className={serviceLink}
                >
                  Connect with us today
                </Link>{" "}
                and start growing your{" "}
                <HashLink
                  smooth
                  to="/seo#consultation"
                  className={serviceLink}
                >
                  business online
                </HashLink>
                .
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/contact")}
                className="px-12 py-6 bg-[#8B6B4A] rounded-full text-2xl font-bold shadow-2xl transition-all w-fit text-white"
              >
                Get Your Free Consultation →
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* ====================== FAQ SECTION ====================== */}
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

        {/* Scroll to Top Button */}
        <button
          onClick={scrollToTop}
          className={`fixed bottom-8 right-8 z-50 p-4 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 ${showScrollTop
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-20 pointer-events-none"
            }`}
          aria-label="Scroll back to top"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      </div>
    </>
  );
}
