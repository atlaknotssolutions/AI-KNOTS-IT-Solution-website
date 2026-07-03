import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import backgroundimage from "../../assets/Images/ERPbackground.webp";
import { Helmet } from "react-helmet-async";
import { useNavigate, Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

const images = {
  hero: backgroundimage,
  team: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
  dashboard: "https://www.redefinesolutions.com/resources/assets/library/erp-development-1.png",
  process: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
};

const industries = [
  "Advertising and Media",
  "Construction & Builders",
  "Education",
  "Finance and Insurance",
  "Medical & Healthcare",
  "E-Commerce",
  "Entertainment",
  "Real Estate",
  "Hospitality",
  "Engineering Services",
  "Health and Wellness",
  "Technology",
  "Heating & Cooling",
  "Auto Mechanics",
  "Oil and Gas",
  "Landscaping",
  "Property Management",
  "Business Consulting",
  "Home Renovation",
  "Beauty",
];

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

export default function ERPDevelopment()
{
  const { isDark } = useTheme();
  const [showScrollTop, setShowScrollTop] = useState(false);
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

  const scrollToTop = () =>
  {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const serviceLink =
    "font-bold text-[#8B6B4A] hover:text-[#6B4F2A] transition-colors duration-200";

  return (
    <>
      <Helmet>
        <title>ERP Development Company India | Atla IKS</title>
        <meta
          name="description"
          content="ERP software development for workflow automation, operations & business growth."
        />
        <meta
          name="keywords"
          content="ERP Development Company, ERP Software, Business Automation"
        />
      </Helmet>

      <div
        className={`min-h-screen overflow-hidden transition-colors duration-700 
      ${isDark
            ? "bg-gradient-to-b from-gray-950 via-black to-gray-950 text-white"
            : "bg-gradient-to-b from-[#f9efe1] via-white to-[#f4e9d8] text-[#3d220e]"
          }`}
      >
        {/* ====================== HERO SECTION ====================== */}
        <section className="relative min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-24 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={images.hero}
              alt="ERP software dashboard showing business growth"
              className="w-full h-full object-cover brightness-75 contrast-110 dark:brightness-50 dark:contrast-125 transition-all duration-700"
              loading="lazy"
            />
            <div
              className={`absolute inset-0 bg-gradient-to-t 
                ${isDark ? "from-black/90 via-black/85 to-black/80" : "from-black/80 via-black/70 to-black/60"}`}
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
              className="text-5xl md:text-7xl font-black mb-8 tracking-tight leading-tight text-white"
            >
              Powerful ERP Solutions That{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B6B4A] to-[#f9e8c8]">
                Streamline, Scale & Succeed
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold mb-6 text-[#f9e8c8]"
            >
              Drive Business Efficiency With ERP Solutions
            </motion.p>

            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl mb-12 max-w-5xl mx-auto leading-relaxed text-gray-200"
            >
              Partner with the Leading ERP software development company in India
            </motion.p>

            <motion.div variants={fadeInUp} className="flex justify-center">
              <button
                onClick={() => navigate("/contact")}
                className="px-12 py-6 bg-gradient-to-r from-[#3d220e] to-[#5c4635] 
                   hover:from-[#5c4635] hover:to-[#3d220e] text-white 
                   rounded-full text-xl md:text-2xl font-bold 
                   shadow-xl hover:shadow-2xl hover:scale-105 
                   transition-all duration-300 flex items-center gap-3 group"
              >
                Free Consultation
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </motion.div>
        </section>

        {/* ====================== FUEL BUSINESS SUCCESS ====================== */}
        <section className={`py-24 px-4 sm:px-6 lg:px-8 ${isDark ? "bg-black/50" : "bg-white"}`}>
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`text-4xl md:text-6xl font-black text-center mb-12 ${isDark ? "text-white" : "text-[#3d220e]"}`}
            >
              Fuel Business Success with Top ERP Software Development Services in India
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {["Be Unique", "Be Scalable", "Be Future-Ready"].map((title, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className={`border rounded-2xl p-10 text-center hover:shadow-2xl transition-all group ${isDark
                    ? "bg-gradient-to-br from-gray-900 to-black border-[#8B6B4A]/40 hover:border-[#8B6B4A]"
                    : "bg-white shadow-md border-[#e8d9c2] hover:border-[#8B6B4A]"
                    }`}
                >
                  <h3 className={`text-4xl font-black mb-6 ${isDark ? "text-[#f9e8c8]" : "text-[#8B6B4A]"} group-hover:scale-105 transition-transform`}>
                    {title}
                  </h3>
                  <p className={`text-lg leading-relaxed ${isDark ? "text-gray-300" : "text-[#5c4635]"}`}>
                    {title === "Be Unique" && "Get ERP solutions tailored precisely to your business workflows"}
                    {title === "Be Scalable" && "Enable growth with flexible and integrated systems"}
                    {title === "Be Future-Ready" && "Streamline operations through advanced technologies"}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className={`text-xl max-w-5xl mx-auto leading-relaxed text-center mb-12 ${isDark ? "text-gray-300" : "text-[#5c4635]"
                }`}
            >
              With years of experience, AI Knots IT Solution is a full-service{" "}
              <HashLink
                smooth
                to="/erpdevelopment#services"
                className={serviceLink}
              >
                ERP software development company
              </HashLink>{" "}
              in{" "}
              <Link
                to="/contact"
                className={serviceLink}
              >
                India
              </Link>
              , delivering intelligent, scalable, and logical{" "}
              <Link
                to="/software"
                className={serviceLink}
              >
                enterprise solutions
              </Link>
              . As a trusted{" "}
              <HashLink
                smooth
                to="/erpdevelopment#services"
                className={serviceLink}
              >
                custom ERP software development company
              </HashLink>
              , we focus on creating efficient and powerful{" "}
              <HashLink
                smooth
                to="/erpdevelopment#services"
                className={serviceLink}
              >
                ERP software
              </HashLink>{" "}
              that helps businesses{" "}
              <HashLink
                smooth
                to="/erpdevelopment#process"
                className={serviceLink}
              >
                automate processes
              </HashLink>
              , enhance{" "}
              <HashLink
                smooth
                to="/erpdevelopment#process"
                className={serviceLink}
              >
                decision-making
              </HashLink>
              , and drive{" "}
              <HashLink
                smooth
                to="/erpdevelopment#industries"
                className={serviceLink}
              >
                productivity
              </HashLink>
              .
            </motion.p>
          </div>
        </section>

        {/* ====================== COMPLETE SUITE OF ERP SERVICES ====================== */}
        <section id="services" className={`py-24 px-4 sm:px-6 lg:px-8 ${isDark ? "bg-black/70" : "bg-[#f4e9d8]"}`}>
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`text-4xl md:text-6xl font-black text-center mb-16 ${isDark ? "text-white" : "text-[#3d220e]"}`}
            >
              A Complete Suite of{" "}
              <span className="text-[#8B6B4A]">ERP Software Services</span>
            </motion.h2>

            <motion.img
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              src={images.dashboard}
              alt="Powerful ERP dashboard showing real-time business insights"
              className="rounded-2xl shadow-2xl mx-auto max-w-4xl w-full object-cover mb-12"
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Custom ERP Software Development",
                  desc: "We deliver tailored ERP solutions that streamline operations, built by a trusted ERP software development company in India.",
                },
                {
                  title: "Enterprise ERP Software",
                  desc: "CRM-integrated ERP systems to streamline enterprise processes and keep all teams connected efficiently.",
                },
                {
                  title: "ERP Development Consultation",
                  desc: "We help strategize, design, test, and deploy robust ERP software tailored to your enterprise needs.",
                },
                {
                  title: "Custom Dashboard Design",
                  desc: "Build custom ERP software dashboards to ensure comprehensible data and smooth access for smarter decisions.",
                },
                {
                  title: "ERP Data Migration",
                  desc: "Secure, fast ERP data migration across systems with expert support.",
                },
                {
                  title: "ERP Application Development",
                  desc: "Feature-rich ERP apps to streamline tasks efficiently.",
                },
              ].map((service, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={`rounded-2xl p-10 transition-all ${isDark
                    ? "bg-gray-900/70 border border-[#8B6B4A]/40 hover:border-[#8B6B4A]"
                    : "bg-white border border-[#e8d9c2] shadow-lg hover:border-[#8B6B4A]"
                    }`}
                >
                  <h3 className={`text-2xl font-bold mb-6 text-center ${isDark ? "text-[#f9e8c8]" : "text-[#8B6B4A]"}`}>
                    {service.title}
                  </h3>
                  <p className={`text-lg leading-relaxed text-center ${isDark ? "text-gray-300" : "text-[#5c4635]"}`}>
                    {service.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ====================== THE PROCESS ====================== */}
        <section id="process" className={`py-24 px-4 sm:px-6 lg:px-8 ${isDark ? "bg-black/50" : "bg-white"}`}>
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`text-4xl md:text-5xl font-black text-center mb-12 ${isDark ? "text-white" : "text-[#3d220e]"}`}
            >
              The Process Behind <span className="text-[#8B6B4A]">Smarter Systems</span>
            </motion.h2>

            <motion.img
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              src={images.process}
              alt="ERP software development process workflow"
              className="rounded-2xl shadow-2xl mx-auto max-w-4xl w-full object-cover mb-12"
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { step: "01", title: "Client Meeting", desc: "We collect essential insights to deliver ERP software tailored to your needs." },
                { step: "02", title: "Designing Phase", desc: "We design system architecture and documentation." },
                { step: "03", title: "Development Phase", desc: "Our experts begin ERP software development using advanced coding practices." },
                { step: "04", title: "Quality Assurance", desc: "Ensures defect-free delivery and high standards." },
                { step: "05", title: "Deployment Phase", desc: "Smooth deployment of custom ERP software." },
                { step: "06", title: "Support & Maintenance", desc: "Ongoing updates, support, and enhancements." },
              ].map((phase, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 }}
                  className={`border rounded-2xl p-8 hover:border-[#8B6B4A] transition-all min-h-[280px] ${isDark ? "bg-gray-900 border-[#8B6B4A]/40" : "bg-white border-[#e8d9c2] shadow-md"
                    }`}
                >
                  <div className="text-5xl font-black mb-6 text-[#8B6B4A]">{phase.step}</div>
                  <h3 className={`text-2xl font-bold mb-4 ${isDark ? "text-white" : "text-[#3d220e]"}`}>{phase.title}</h3>
                  <p className={`text-base leading-relaxed ${isDark ? "text-gray-300" : "text-[#5c4635]"}`}>{phase.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ====================== INDUSTRIES WE SERVE ====================== */}
        <section id="industries" className={`py-24 px-4 sm:px-6 lg:px-8 ${isDark ? "bg-black/70" : "bg-white"}`}>
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`text-4xl md:text-5xl font-black text-center mb-12 ${isDark ? "text-white" : "text-[#3d220e]"}`}
            >
              Industries We <span className="text-[#8B6B4A]">Serve</span>
            </motion.h2>

            <div className="flex flex-wrap justify-center gap-4">
              {industries.map((ind, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03 }}
                  className={`px-6 py-3 border rounded-full text-sm md:text-base transition-all ${isDark
                    ? "bg-gray-900 border-[#8B6B4A]/40 hover:border-[#8B6B4A] text-gray-200"
                    : "bg-white border-[#e8d9c2] text-[#3d220e] hover:border-[#8B6B4A]"
                    }`}
                >
                  {ind}
                </motion.span>
              ))}
            </div>
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
              Frequently Asked Questions<span className="text-[#8B6B4A]"> – ERP Software Development</span>
            </motion.h2>

            <div className="space-y-4">
              {[
                {
                  q: "What is ERP software and why does my business need it?",
                  a: "ERP (Enterprise Resource Planning) software helps businesses manage multiple operations such as finance, HR, inventory, sales, and customer management in one centralized system.",
                },
                {
                  q: "What industries can benefit from ERP software developed by AI Knots IT Solutions?",
                  a: "ERP software can benefit many industries including education, healthcare, manufacturing, real estate, finance, retail, and e-commerce.",
                },
                {
                  q: "How much does custom ERP software development cost?",
                  a: "The cost of ERP software development depends on features, integrations, and business requirements.",
                },
                {
                  q: "How long does it take to develop ERP software?",
                  a: "ERP development timelines depend on the project complexity and features required.",
                },
                {
                  q: "Does AI Knots IT Solutions provide ERP maintenance and support?",
                  a: "Yes. We provide ongoing ERP support, maintenance, updates, and system optimization after deployment.",
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
      </div>
    </>
  );
}