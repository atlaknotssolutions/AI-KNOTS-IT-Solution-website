import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "../context/ThemeContext";
import { useNavigate, Link } from "react-router-dom";
import DOMPurify from "dompurify";
import { Helmet } from "react-helmet-async";
import { HashLink } from "react-router-hash-link";
import
{
  Code2,
  Database,
  Cloud,
  Zap,
  Building2,
  ArrowRight,
  Sparkles,
  ChevronRight,
  Newspaper,
  Calendar,
  Clock,
  TrendingUp,
  Eye,
  MessageCircle,
  Cpu,
  Globe,
  Heart,
  X,
  Loader2,
} from "lucide-react";

import
{
  fetchCategories,
  fetchProducts,
  setSelectedCategory,
  incrementPostView,
  togglePostLike,
  sendCommentOtp,
  verifyCommentOtp,
  postComment,
} from "./technologyslice/technologySlice";
import Toast from "../Component/common/Toast";

const Technology = () =>
{
  const { isDark } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categories, selectedCategory, newsItems, loading, error } =
    useSelector((state) => state.technology);

  const [scrollY, setScrollY] = useState(0);
  // Engagement States
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [pendingSlug, setPendingSlug] = useState(null);
  const [pendingAction, setPendingAction] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [userInfo, setUserInfo] = useState({ name: "", email: "", phone: "" });
  const [step, setStep] = useState("form");
  const [otp, setOtp] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [loadingAction, setLoadingAction] = useState(false);

  const [updatedItems, setUpdatedItems] = useState({});
  const [userLikes, setUserLikes] = useState(new Set());
  const [toast, setToast] = useState({
    show: false,
    type: "success",
    title: "",
    message: "",
  });

  const showToast = (type, title, message) =>
  {
    setToast({ show: true, type, title, message });
    setTimeout(() =>
    {
      setToast({ show: false, type: "success", title: "", message: "" });
    }, 3000);
  };

  // Load saved data
  useEffect(() =>
  {
    const savedUser = localStorage.getItem("verifiedUser");
    if (savedUser)
    {
      try
      {
        const parsed = JSON.parse(savedUser);
        if (parsed?.email)
        {
          setUserInfo({
            name: parsed.name || parsed.user || "",
            email: parsed.email || "",
            phone: parsed.phone || "",
          });
          setIsVerified(true);
        }
      } catch (error)
      {
        console.warn("Failed to parse verifiedUser", error);
      }
    }

    const savedLikes = localStorage.getItem("userLikesTech");
    if (savedLikes) setUserLikes(new Set(JSON.parse(savedLikes)));
  }, []);

  useEffect(() =>
  {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() =>
  {
    const categoryId = selectedCategory?._id || null;
    dispatch(fetchProducts(categoryId));
  }, [dispatch, selectedCategory]);

  useEffect(() =>
  {
    const handleScroll = () =>
    {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredNewsItems = useMemo(() =>
  {
    if (!newsItems || newsItems.length === 0) return [];

    if (!selectedCategory?._id || selectedCategory?.name === "All")
    {
      return newsItems;
    }

    return newsItems.filter((item) =>
    {
      const itemCat = (item.category || item.categoryName || "")
        .trim()
        .toLowerCase();
      const selCat = (selectedCategory.name || "").trim().toLowerCase();
      const idMatch =
        item.categoryId === selectedCategory._id ||
        item.category_id === selectedCategory._id ||
        item.categoryId?._id === selectedCategory._id;

      return itemCat === selCat || idMatch;
    });
  }, [newsItems, selectedCategory]);

  const getIconForCategory = (category) =>
  {
    const cat = (category || "").toLowerCase();
    if (cat.includes("ai") || cat.includes("artificial intelligence"))
      return <Cpu className="w-5 h-5" />;
    if (cat.includes("hardware")) return <Zap className="w-5 h-5" />;
    if (cat.includes("company") || cat.includes("update"))
      return <Building2 className="w-5 h-5" />;
    if (cat.includes("industry") || cat.includes("news"))
      return <Newspaper className="w-5 h-5" />;
    if (cat.includes("software") || cat.includes("developer"))
      return <Code2 className="w-5 h-5" />;
    return <Globe className="w-5 h-5" />;
  };

  // ====================== HANDLE ACTIONS ======================
  const getCommentCount = (item) =>
  {
    const slug = item.slug || item._id;
    return (
      updatedItems[slug]?.commentsCount ??
      updatedItems[slug]?.comments?.length ??
      item.comments?.length ??
      item.commentsCount ??
      item.totalComments ??
      0
    );
  };

  const performLike = async (item) =>
  {
    const slug = item.slug || item._id;
    const result = await dispatch(togglePostLike({ slug, email: userInfo.email }));
    if (result.error)
    {
      showToast("error", "Like Failed", result.payload || "Unable to update like.");
      return;
    }

    const payload = result.payload?.data || result.payload || {};
    const previousLiked = Boolean(updatedItems[slug]?.liked ?? userLikes.has(slug));
    const newLiked =
      typeof payload.liked === "boolean" ? payload.liked : !previousLiked;
    const currentLikes =
      updatedItems[slug]?.likes ??
      item.likes ??
      0;
    const nextLikes =
      payload.likes ??
      payload.totalLikes ??
      Math.max(0, currentLikes + (newLiked ? 1 : -1));

    setUpdatedItems((prev) => ({
      ...prev,
      [slug]: {
        ...(prev[slug] || {}),
        likes: nextLikes,
        liked: newLiked,
      },
    }));

    const newLikes = new Set(userLikes);
    if (newLiked)
    {
      newLikes.add(slug);
    } else
    {
      newLikes.delete(slug);
    }
    setUserLikes(newLikes);
    localStorage.setItem("userLikesTech", JSON.stringify([...newLikes]));
  };

  const handleAction = async (action, item) =>
  {
    const slug = item.slug || item._id;

    if (action === "read")
    {
      navigate(`/technology/${slug}`);
      return;
    }
    if (action === "view")
    {
      dispatch(incrementPostView(slug));
      return;
    }

    if (!isVerified)
    {
      setPendingSlug(slug);
      setPendingAction(action);
      setShowVerifyModal(true);
      setStep("form");
      setUserInfo({ name: "", email: "", phone: "" });
      return;
    }

    if (action === "like")
    {
      setPendingAction(null);
      await performLike(item);
    } else if (action === "comment")
    {
      setPendingSlug(slug);
      setPendingAction("comment");
      setCommentText("");
      setShowCommentModal(true);
    }
  };

  const sendOtp = async () =>
  {
    if (!userInfo.name || !userInfo.email || !userInfo.phone)
    {
      showToast("warning", "Required Fields Missing", "Name, Email and Phone are required.");
      return;
    }
    setLoadingAction(true);
    const result = await dispatch(
      sendCommentOtp({
        slug: pendingSlug,
        name: userInfo.name,
        email: userInfo.email,
        phone: userInfo.phone,
      }),
    );
    setLoadingAction(false);

    if (result.error)
    {
      showToast("error", "OTP Failed", result.payload || "Failed to send OTP.");
      return;
    }

    setStep("otp");
  };

  const verifyOtp = async () =>
  {
    if (!otp.trim())
    {
      showToast("warning", "OTP Required", "Please enter the OTP first.");
      return;
    }

    setLoadingAction(true);
    const result = await dispatch(
      verifyCommentOtp({
        slug: pendingSlug,
        email: userInfo.email,
        otp: otp.trim(),
      }),
    );
    setLoadingAction(false);

    if (result.error)
    {
      showToast("error", "Verification Failed", result.payload || "Invalid OTP.");
      return;
    }

    setIsVerified(true);
    localStorage.setItem(
      "verifiedUser",
      JSON.stringify({ ...userInfo, verifiedAt: new Date().toISOString() }),
    );
    setShowVerifyModal(false);

    const actionAfterVerify = pendingAction;
    setPendingAction(null);

    if (actionAfterVerify === "like")
    {
      const pendingItem = newsItems.find(
        (item) => (item.slug || item._id) === pendingSlug
      );
      if (pendingItem)
      {
        await performLike(pendingItem);
      }
      return;
    }

    setTimeout(() => setShowCommentModal(true), 300);
  };

  const submitComment = async () =>
  {
    if (!commentText.trim())
    {
      showToast("warning", "Comment Required", "Please write a comment.");
      return;
    }

    setLoadingAction(true);
    const result = await dispatch(
      postComment({
        slug: pendingSlug,
        email: userInfo.email,
        comment: commentText.trim(),
      }),
    );

    if (!result.error)
    {
      const payload = result.payload?.data || result.payload || {};
      const currentItem = filteredNewsItems.find(
        (item) => (item.slug || item._id) === pendingSlug
      );
      const currentComments =
        updatedItems[pendingSlug]?.comments ||
        currentItem?.comments ||
        [];
      const payloadComments = payload.comments;
      const nextComments = Array.isArray(payloadComments)
        ? payloadComments
        : [
            ...currentComments,
            payload.comment || {
              comment: commentText.trim(),
              user: {
                name: userInfo.name,
                email: userInfo.email,
              },
              createdAt: new Date().toISOString(),
            },
          ];

      setUpdatedItems((prev) => ({
        ...prev,
        [pendingSlug]: {
          ...(prev[pendingSlug] || {}),
          comments: nextComments,
          commentsCount:
            payload.commentsCount ??
            payload.totalComments ??
            nextComments.length,
        },
      }));
      setShowCommentModal(false);
      setCommentText("");
      showToast("success", "Comment Posted", "Your comment has been published successfully.");
    } else
    {
      showToast("error", "Comment Failed", result.payload || "Failed to post comment.");
    }
    setLoadingAction(false);
  };

  // ====================== THEME CLASSES ======================
  const cardClass = isDark
    ? "bg-gray-900 border border-[#8B6B4A]/25 hover:border-[#8B6B4A]/60 hover:shadow-xl hover:shadow-[#8B6B4A]/20"
    : "bg-white border border-[#E8D9C2] shadow-lg hover:shadow-2xl hover:shadow-[#E8D9C2]/50";

  const headingClass = isDark ? "text-white" : "text-[#3D220E]";
  const bodyClass = isDark ? "text-gray-300" : "text-[#5C4635]";
  const accentClass = "text-[#8B6B4A]";

  const serviceLink =
    "font-bold text-[#8B6B4A] hover:text-[#6B4F2A] transition-colors duration-200";

  return (
    <>
      <Helmet>
        <title>Technology Solutions Company | Atla IKS</title>
        <meta
          name="description"
          content="Explore software, cloud, AI & advanced technology solutions for businesses."
        />
        <meta
          name="keywords"
          content="Technology Solutions Company	IT Services, Tech Solutions"
        />
      </Helmet>
      <div
        className={`min-h-screen overflow-x-hidden relative transition-colors duration-700
      ${isDark ? "bg-black text-white" : "bg-gray-50 text-gray-900"}`}
      >
        <Toast {...toast} isDark={isDark} />
        {/* Hero Section */}
        <section
          className="relative py-32 md:py-40 overflow-hidden"
          style={{
            backgroundImage: isDark
              ? "linear-gradient(135deg, #000000 0%, rgba(87,48,16,0.25) 45%, #000000 100%)"
              : "linear-gradient(135deg, #f7efe2 0%, #f3e4cf 45%, #ffffff 100%)",
          }}
        >
          <div className="absolute inset-0 opacity-30">
            <div
              className="absolute top-20 left-10 w-64 h-64 rounded-2xl overflow-hidden transform hover:scale-110 transition-transform duration-700 animate-float"
              style={{
                transform: `translateY(${scrollY * 0.3}px) rotate(${scrollY * 0.05}deg)`,
                animationDelay: "0s",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=400&fit=crop"
                alt="Technology"
                className="w-full h-full object-cover"
              />
              <div
                className={`absolute inset-0 ${isDark ? "bg-gradient-to-br from-[#9d6231]/40 to-black/60" : "bg-gradient-to-br from-[#9d6231]/30 to-white/60"} mix-blend-multiply`}
              ></div>
            </div>
            <div
              className="absolute top-40 right-20 w-72 h-72 rounded-2xl overflow-hidden transform hover:scale-110 transition-transform duration-700 animate-float-delayed"
              style={{
                transform: `translateY(${scrollY * 0.2}px) rotate(${-scrollY * 0.03}deg)`,
                animationDelay: "1s",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=400&fit=crop"
                alt="Coding"
                className="w-full h-full object-cover"
              />
              <div
                className={`absolute inset-0 ${isDark ? "bg-gradient-to-br from-[#8B6B4A]/40 to-black/60" : "bg-gradient-to-br from-[#9d6231]/30 to-white/60"} mix-blend-multiply`}
              ></div>
            </div>
            <div
              className="absolute bottom-32 left-1/3 w-80 h-80 rounded-2xl overflow-hidden transform hover:scale-110 transition-transform duration-700 animate-float"
              style={{
                transform: `translateY(${scrollY * 0.25}px) rotate(${scrollY * 0.04}deg)`,
                animationDelay: "2s",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400&h=400&fit=crop"
                alt="Analytics"
                className="w-full h-full object-cover"
              />
              <div
                className={`absolute inset-0 ${isDark ? "bg-gradient-to-br from-[#573010]/40 to-black/60" : "bg-gradient-to-br from-[#9d6231]/30 to-white/60"} mix-blend-multiply`}
              ></div>
            </div>
          </div>

          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-2 h-2 bg-primary rounded-full animate-ping"></div>
            <div
              className="absolute top-40 right-40 w-3 h-3 bg-accent rounded-full animate-pulse"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div
              className="absolute bottom-40 left-1/4 w-2 h-2 bg-primary rounded-full animate-ping"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute top-60 right-1/3 w-3 h-3 bg-accent rounded-full animate-pulse"
              style={{ animationDelay: "1.5s" }}
            ></div>
          </div>

          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-20 w-72 h-72 bg-accent rounded-full blur-3xl animate-pulse"></div>
            <div
              className="absolute bottom-20 right-20 w-96 h-96 bg-primary rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
          </div>

          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          ></div>

          <div className="container mx-auto px-6 lg:px-8 relative z-10 text-center">
            <div
              className={`inline-flex items-center gap-2 mb-6 px-6 py-2 rounded-full backdrop-blur-sm animate-fade-in
            ${isDark ? "bg-[#8B6B4A]/20 border border-[#8B6B4A]/30" : "bg-[#8B6B4A]/10 border border-[#8B6B4A]/20"}`}
            >
              <Sparkles className="w-4 h-4 text-[#8B6B4A] animate-pulse" />
              <span className="text-[#8B6B4A] font-semibold text-sm tracking-wider">
                TECHNOLOGY EXCELLENCE
              </span>
            </div>
            <h1
              className={`text-5xl md:text-6xl lg:text-7xl font-extrabold mb-8 tracking-tight animate-slide-up
            ${isDark ? "bg-gradient-to-r from-white via-[#8B6B4A] to-white bg-clip-text text-transparent" : "text-gray-900"}`}
            >
              Cutting-Edge Technology Solutions
            </h1>
            <p
              className={`text-lg md:text-xl max-w-3xl mx-auto mb-12 text-gray-600 leading-relaxed animate-slide-up ${bodyClass}`}
              style={{ animationDelay: "0.2s" }}
            >
              We craft{" "}
              <Link
                to="/software"
                className={serviceLink}
              >
                high-performance
              </Link>
              , scalable, and secure{" "}
              <Link
                to="/software"
                className={serviceLink}
              >
                digital products
              </Link>{" "}
              that drive real{" "}
              <HashLink
                smooth
                to="/technology#articles"
                className={serviceLink}
              >
                business growth
              </HashLink>{" "}
              with precision and{" "}
              <Link
                to="/ai-mlservice"
                className={serviceLink}
              >
                innovation
              </Link>
              .
            </p>
            <div
              className="flex flex-wrap justify-center gap-6 animate-slide-up"
              style={{ animationDelay: "0.4s" }}
            >
              <button
                className="group relative bg-gradient-to-r from-[#573010] to-[#8B6B4A] text-white font-bold px-10 py-5 rounded-lg shadow-2xl shadow-[#573010]/30 hover:shadow-[#573010]/50 transform hover:scale-105 transition-all duration-300 overflow-hidden"
                onClick={() => navigate("/service")}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Explore Services{" "}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              <button
                className={`group relative border-2 font-bold px-10 py-5 rounded-lg hover:scale-105 transition-all duration-300
              ${isDark ? "border-primary text-white hover:bg-primary/90" : "border-primary text-primary hover:bg-primary hover:text-white"}`}
                onClick={() => navigate("/contact")}
              >
                <span className="flex items-center gap-2">
                  Contact Us{" "}
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* Tech News Section */}
        <section
          id="articles"
          className={`py-24 relative overflow-hidden ${isDark ? "bg-black" : "bg-white"}`}
        >
          <div className="container mx-auto px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12">
              <div
                className={`inline-flex items-center gap-2 mb-4 px-6 py-2 rounded-full backdrop-blur-sm animate-fade-in
              ${isDark ? "bg-accent/20 border border-accent/30" : "bg-accent/10 border border-[#fdeada]"}`}
              >
                <Newspaper className="w-4 h-4 text-accent animate-pulse" />
                <span className="text-accent font-semibold text-sm tracking-wider">
                  LATEST UPDATES
                </span>
              </div>
              <h2
                className={`text-4xl md:text-5xl font-bold mb-4 ${headingClass}`}
              >
                AI Technology & Insights
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#8B6B4A] to-[#8B6B4A] mx-auto mb-6"></div>
              <p className={`text-lg max-w-2xl mx-auto ${bodyClass}`}>
                Stay updated with the latest technology trends and industry
                insights
              </p>
            </div>

            {/* Category Buttons */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <button
                onClick={() =>
                  dispatch(setSelectedCategory({ _id: null, name: "All" }))
                }
                className={`group relative px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${!selectedCategory?._id || selectedCategory?.name === "All"
                  ? "bg-gradient-to-r from-[#573010] to-[#8B6B4A] text-white shadow-lg shadow-[#573010]/30"
                  : isDark
                    ? "bg-gray-900 text-gray-400 hover:text-white border border-gray-800 hover:border-[#573010]/50"
                    : "bg-white text-gray-600 hover:text-gray-900 border border-gray-300 hover:border-[#573010]"
                  }`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  All
                </span>
              </button>

              {(categories || []).map((category) => (
                <button
                  key={category._id}
                  onClick={() => dispatch(setSelectedCategory(category))}
                  className={`group relative px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${selectedCategory?._id === category._id
                    ? "bg-gradient-to-r from-[#8B6B4A] to-[#6E4E35] text-white shadow-lg shadow-[#8B6B4A]/30"
                    : isDark
                      ? "bg-gray-900 text-gray-400 hover:text-[#D9C5B5] border border-gray-800 hover:border-[#8B6B4A]/50"
                      : "bg-white text-gray-600 hover:text-[#3D220E] border border-gray-300 hover:border-[#8B6B4A]"
                    }`}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {getIconForCategory(category.name)}
                    {category.name}
                  </span>
                </button>
              ))}
            </div>

            {loading && (
              <div className="min-h-[500px] flex items-center justify-center">
                <div className="flex flex-col items-center">

                  {/* Animated Loader */}
                  <div className="relative mb-8">

                    <div className="w-24 h-24 rounded-full border-4 border-[#8B6B4A]/20"></div>

                    <div className="absolute inset-0 w-24 h-24 rounded-full border-4 border-transparent border-t-[#8B6B4A] animate-spin"></div>

                    <div
                      className="absolute inset-3 w-[72px] h-[72px] rounded-full border-4 border-transparent border-r-[#C9A27A] animate-spin"
                      style={{
                        animationDirection: "reverse",
                        animationDuration: "1.4s",
                      }}
                    ></div>

                    <div className="absolute inset-0 flex items-center justify-center">
                      <Cpu className="w-10 h-10 text-[#8B6B4A] animate-pulse" />
                    </div>

                  </div>

                  <h3
                    className={`text-2xl font-bold mb-2 ${isDark ? "text-white" : "text-[#3D220E]"
                      }`}
                  >
                    Loading Technology
                  </h3>

                  <p
                    className={`text-base ${isDark ? "text-gray-400" : "text-[#6E4E35]"
                      }`}
                  >
                    Fetching the latest technology articles...
                  </p>

                  <div className="flex gap-2 mt-6">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#8B6B4A] animate-bounce"></span>

                    <span
                      className="w-2.5 h-2.5 rounded-full bg-[#A77A55] animate-bounce"
                      style={{ animationDelay: "0.15s" }}
                    ></span>

                    <span
                      className="w-2.5 h-2.5 rounded-full bg-[#D9C5B5] animate-bounce"
                      style={{ animationDelay: "0.3s" }}
                    ></span>
                  </div>

                </div>
              </div>
            )}

            {error && !loading && (
              <div className="text-center py-20">
                <p className="text-accent text-lg">{error}</p>
              </div>
            )}

            {!loading && !error && filteredNewsItems.length === 0 && (
              <div className="text-center py-20">
                <Newspaper className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className={`text-lg ${bodyClass}`}>
                  {!selectedCategory?._id || selectedCategory?.name === "All"
                    ? "No products available at the moment"
                    : `No products found in "${selectedCategory?.name}" category`}
                </p>
              </div>
            )}

            {!loading && !error && filteredNewsItems.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredNewsItems.map((news, idx) =>
                {
                  const slug = news.slug || news._id;
                  const hasLiked = Boolean(updatedItems[slug]?.liked ?? userLikes.has(slug));

                  return (
                    <article
                      key={slug}
                      className={`group relative rounded-2xl overflow-hidden border transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${cardClass}`}
                      style={{ animationDelay: `${idx * 150}ms` }}
                    >
                      {news.trending && (
                        <div className="absolute top-4 left-4 z-20 inline-flex items-center justify-center gap-1 px-3 py-1.5 bg-[#8B6B4A] border border-[#C9A27A]/40 rounded-full shadow-lg animate-pulse">
                          <TrendingUp className="w-4 h-4 text-white" />
                          <span className="text-white text-xs font-semibold leading-none">
                            Trending
                          </span>
                        </div>
                      )}
                      <div className="relative h-56 overflow-hidden bg-gray-800">
                        {news.image ? (
                          <img
                            src={news.image}
                            alt={news.title}
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Newspaper className="w-16 h-16 text-gray-600" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                        <div className="absolute top-4 right-4 inline-flex items-center justify-center px-3 py-1 h-8 bg-black/45 backdrop-blur-sm rounded-full border border-[#D8B48A]/40">
                          <span className="text-[#E7D3BE] text-xs font-semibold leading-none">
                            {news.category}
                          </span>
                        </div>
                      </div>

                      <div className="p-6">
                        <div
                          className={`flex items-center gap-4 mb-4 text-sm ${bodyClass}`}
                        >
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{news.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{news.readTime}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            <span>{news.views || 0}</span>
                          </div>
                        </div>
                        <h3
                          className={`text-xl font-bold mb-3 line-clamp-2 ${headingClass} group-hover:text-accent transition-colors`}
                        >
                          {news.title}
                        </h3>
                        <div
                          className={`text-sm mb-4 line-clamp-3 leading-relaxed ${bodyClass}`}
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(news.description || ""),
                          }}
                        />
                        <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                          <div className="flex items-center gap-5">
                            <button
                              onClick={() => handleAction("like", news)}
                              className={`flex items-center gap-1 transition-colors ${hasLiked
                                ? "text-[#8B6B4A]"
                                : "hover:text-[#8B6B4A]"
                                }`}
                            >
                              <Heart
                                className={`w-5 h-5 ${hasLiked ? "fill-current" : ""}`}
                              />
                              {updatedItems[slug]?.likes ?? news.likes ?? 0}
                            </button>
                            <button
                              onClick={() => handleAction("comment", news)}
                              className="flex items-center gap-1 hover:text-[#8B6B4A] transition-colors"
                            >
                              <MessageCircle className="w-5 h-5" />
                              {getCommentCount(news)}
                            </button>
                          </div>
                          <button
                            onClick={() => handleAction("read", news)}
                            className="flex items-center gap-2 px-5 py-2 text-[#8B6B4A] hover:text-[#3D220E] font-medium rounded-lg border border-[#8B6B4A]/30 hover:border-[#8B6B4A] hover:bg-[#F5EDE4] transition-all"
                          >
                            Read More <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* Tech Stack Section */}
        <section
          className={`bg-black py-24 relative overflow-hidden ${isDark ? "" : "bg-white"}`}
        >
          <div className="container mx-auto px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <h2
                className={`text-4xl md:text-5xl font-bold mb-4 ${headingClass}`}
              >
                Technologies We Excel In
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#C9A27A] via-[#8B6B4A] to-[#6E4E35] mx-auto mb-6"></div>
              <p className={`text-lg ${bodyClass}`}>
                Modern, reliable, and battle-tested tech stack
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6 max-w-6xl mx-auto">
              {[
                { name: "Java + Spring Boot", icon: Code2 },
                { name: "React / Angular", icon: Code2 },
                { name: "Node.js", icon: Zap },
                { name: "MySQL / PostgreSQL", icon: Database },
                { name: "AWS", icon: Cloud },
                { name: "Azure", icon: Cloud },
                { name: "GCP", icon: Cloud },
              ].map((tech) =>
              {
                const TechIcon = tech.icon;
                return (
                  <div
                    key={tech.name}
                    className={`group relative rounded-xl p-6 text-center font-semibold border transition-all duration-300 hover:scale-110 cursor-pointer ${cardClass}`}
                  >
                    <div className="relative z-10 flex flex-col items-center gap-3">
                      <TechIcon
                        className={`w-8 h-8 ${accentClass} transition-colors`}
                      />
                      <div
                        className={`group-hover:text-primary transition-colors text-sm ${bodyClass}`}
                      >
                        {tech.name}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Comment Modal */}
        {showCommentModal && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div
              className={`max-w-lg w-full rounded-xl p-8 border shadow-2xl ${isDark
                ? "bg-[#111827] border-[#8B6B4A]/30 shadow-black/70"
                : "bg-[#FCFAF8] border-[#E8D9C2] shadow-[#E8D9C2]/50"
                }`}
            >
              <div className="flex justify-between items-center mb-5">
                <h2
                  className={`text-2xl font-bold ${isDark ? "text-white" : "text-[#3D220E]"
                    }`}
                >Write a Comment</h2>
                <button
                  onClick={() => setShowCommentModal(false)}
                  className={`p-2 rounded-full transition ${isDark
                    ? "hover:bg-[#3D220E]/40 text-gray-300"
                    : "hover:bg-[#F5EDE4] text-[#8B6B4A]"
                    }`}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="What are your thoughts?"
                rows={5}
                className={`w-full p-4 rounded-2xl border resize-y min-h-[140px]
transition-all duration-300
focus:outline-none focus:ring-2 focus:ring-[#8B6B4A]
${isDark
                    ? "bg-gray-800 border-gray-700 text-white focus:border-[#8B6B4A]"
                    : "bg-white border-[#E8D9C2] text-[#3D220E] focus:border-[#8B6B4A]"
                  }`}
              />
              <div className="flex gap-3 mt-5">
                <button
                  onClick={() => setShowCommentModal(false)}
                  className={`flex-1 py-3 rounded-xl font-semibold border transition-all duration-300
${isDark
                      ? "border-[#8B6B4A]/30 text-gray-300 hover:bg-[#3D220E]/40 hover:border-[#8B6B4A]"
                      : "border-[#E8D9C2] text-[#8B6B4A] hover:bg-[#F5EDE4] hover:border-[#8B6B4A]"
                    }`}
                >
                  Cancel
                </button>
                <button
                  onClick={submitComment}
                  disabled={loadingAction || !commentText.trim()}
                  className={`flex-1 py-3 rounded-xl font-semibold text-white flex items-center justify-center transition-all duration-300
${commentText.trim()
                      ? "bg-[#8B6B4A] hover:bg-[#6E4E35]"
                      : "bg-gray-400 cursor-not-allowed"
                    }`}
                >
                  {loadingAction ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    "Post Comment"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Verification Modal */}
        {showVerifyModal && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div
              className={`max-w-md w-full rounded-3xl p-8 border shadow-2xl ${isDark
                ? "bg-[#111827] border-[#8B6B4A]/30 shadow-black/70"
                : "bg-[#FCFAF8] border-[#E8D9C2] shadow-[#E8D9C2]/50"
                }`}
            >
              <h2 className="text-2xl font-bold mb-6 text-center">
                {step === "form" ? "Verify Yourself" : "Enter OTP"}
              </h2>
              {step === "form" ? (
                <>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={userInfo.name}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, name: e.target.value })
                    }
                    className={`w-full p-3 rounded-xl mb-4 border transition-all
focus:outline-none focus:ring-2 focus:ring-[#8B6B4A]
${isDark
                        ? "bg-gray-800 border-gray-700 text-white"
                        : "bg-white border-[#E8D9C2] text-[#3D220E]"
                      }`}
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={userInfo.email}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, email: e.target.value })
                    }
                    className={`w-full p-3 rounded-lg mb-4 border ${isDark ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-300"}`}
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={userInfo.phone}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, phone: e.target.value })
                    }
                    className={`w-full p-3 rounded-lg mb-6 border ${isDark ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-300"}`}
                  />
                  <button
                    onClick={sendOtp}
                    disabled={loadingAction}
                    className="w-full bg-[#8B6B4A] hover:bg-[#6E4E35] py-3 rounded-xl text-white font-semibold transition-all disabled:opacity-70"
                  >
                    Send OTP
                  </button>
                </>
              ) : (
                <>
                  <p className="text-center mb-6 text-sm opacity-75">
                    OTP sent to <strong>{userInfo.email}</strong>
                  </p>
                  <input
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                    className={`w-full p-4 text-center text-2xl tracking-[10px] rounded-xl border mb-6 transition-all
focus:outline-none focus:ring-2 focus:ring-[#8B6B4A]
${isDark
                        ? "bg-gray-800 border-gray-700 text-white"
                        : "bg-white border-[#E8D9C2] text-[#3D220E]"
                      }`}
                  />
                  <button
                    onClick={verifyOtp}
                    disabled={loadingAction}
                    className="w-full bg-[#8B6B4A] hover:bg-[#6E4E35] py-3 rounded-xl text-white font-semibold transition-all disabled:opacity-70"
                  >
                    {loadingAction ? "Verifying..." : "Verify OTP"}
                  </button>
                </>
              )}
              <button
                onClick={() => setShowVerifyModal(false)}
                className={`mt-6 text-sm underline block mx-auto transition-colors ${isDark
                  ? "text-[#D9C5B5] hover:text-white"
                  : "text-[#8B6B4A] hover:text-[#3D220E]"
                  }`}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Animations */}
        <style jsx>{`
          @keyframes float {
            0%,
            100% {
              transform: translateY(0px) rotate(0deg);
            }
            50% {
              transform: translateY(-20px) rotate(5deg);
            }
          }
          @keyframes float-delayed {
            0%,
            100% {
              transform: translateY(0px) rotate(0deg);
            }
            50% {
              transform: translateY(-30px) rotate(-5deg);
            }
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          .animate-float-delayed {
            animation: float-delayed 7s ease-in-out infinite;
          }
        `}</style>
      </div>
    </>
  );
};

export default Technology;





// import React, { useEffect, useState, useMemo } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useTheme } from "../context/ThemeContext";
// import { useNavigate, Link } from "react-router-dom";
// import DOMPurify from "dompurify";
// import { Helmet } from "react-helmet-async";
// import { HashLink } from "react-router-hash-link";
// import
// {
//   Code2,
//   Search,
//   Wrench,
//   Database,
//   Cloud,
//   Smartphone,
//   Shield,
//   Zap,
//   Building2,
//   ShoppingCart,
//   Building,
//   Landmark,
//   ArrowRight,
//   CheckCircle2,
//   Sparkles,
//   Rocket,
//   ChevronRight,
//   Newspaper,
//   Calendar,
//   Clock,
//   TrendingUp,
//   Eye,
//   Share2,
//   Bookmark,
//   MessageCircle,
//   ChevronLeft,
//   Filter,
//   Star,
//   Cpu,
//   Globe,
//   Heart,
//   X,
//   Loader2,
// } from "lucide-react";

// import
// {
//   fetchCategories,
//   fetchProducts,
//   setSelectedCategory,
//   incrementPostView,
//   togglePostLike,
//   sendCommentOtp,
//   postComment,
// } from "./technologyslice/technologySlice";

// const Technology = () =>
// {
//   const { isDark } = useTheme();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { categories, selectedCategory, newsItems, loading, error } =
//     useSelector((state) => state.technology);

//   const [scrollY, setScrollY] = useState(0);
//   const [showScrollTop, setShowScrollTop] = useState(false);

//   // Engagement States
//   const [showVerifyModal, setShowVerifyModal] = useState(false);
//   const [showCommentModal, setShowCommentModal] = useState(false);
//   const [pendingSlug, setPendingSlug] = useState(null);
//   const [commentText, setCommentText] = useState("");
//   const [userInfo, setUserInfo] = useState({ name: "", email: "", phone: "" });
//   const [step, setStep] = useState("form");
//   const [otp, setOtp] = useState("");
//   const [isVerified, setIsVerified] = useState(false);
//   const [loadingAction, setLoadingAction] = useState(false);

//   const [updatedItems, setUpdatedItems] = useState({});
//   const [userLikes, setUserLikes] = useState(new Set());

//   // Load saved data
//   useEffect(() =>
//   {
//     const savedUser = localStorage.getItem("verifiedUser");
//     if (savedUser)
//     {
//       try
//       {
//         const parsed = JSON.parse(savedUser);
//         setUserInfo({
//           name: parsed.name || parsed.user || "",
//           email: parsed.email || "",
//           phone: parsed.phone || "",
//         });
//         setIsVerified(true);
//       } catch (error)
//       {
//         console.warn("Failed to parse verifiedUser", error);
//       }
//     }

//     const savedLikes = localStorage.getItem("userLikesTech");
//     if (savedLikes) setUserLikes(new Set(JSON.parse(savedLikes)));
//   }, []);

//   useEffect(() =>
//   {
//     dispatch(fetchCategories());
//   }, [dispatch]);

//   useEffect(() =>
//   {
//     const categoryId = selectedCategory?._id || null;
//     dispatch(fetchProducts(categoryId));
//   }, [dispatch, selectedCategory]);

//   useEffect(() =>
//   {
//     const handleScroll = () =>
//     {
//       setScrollY(window.scrollY);
//       setShowScrollTop(window.scrollY > 500);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const scrollToTop = () =>
//   {
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   };

//   const filteredNewsItems = useMemo(() =>
//   {
//     if (!newsItems || newsItems.length === 0) return [];

//     if (!selectedCategory?._id || selectedCategory?.name === "All")
//     {
//       return newsItems;
//     }

//     return newsItems.filter((item) =>
//     {
//       const itemCat = (item.category || item.categoryName || "")
//         .trim()
//         .toLowerCase();
//       const selCat = (selectedCategory.name || "").trim().toLowerCase();
//       const idMatch =
//         item.categoryId === selectedCategory._id ||
//         item.category_id === selectedCategory._id ||
//         item.categoryId?._id === selectedCategory._id;

//       return itemCat === selCat || idMatch;
//     });
//   }, [newsItems, selectedCategory]);

//   const getIconForCategory = (category) =>
//   {
//     const cat = (category || "").toLowerCase();
//     if (cat.includes("ai") || cat.includes("artificial intelligence"))
//       return <Cpu className="w-5 h-5" />;
//     if (cat.includes("hardware")) return <Zap className="w-5 h-5" />;
//     if (cat.includes("company") || cat.includes("update"))
//       return <Building2 className="w-5 h-5" />;
//     if (cat.includes("industry") || cat.includes("news"))
//       return <Newspaper className="w-5 h-5" />;
//     if (cat.includes("software") || cat.includes("developer"))
//       return <Code2 className="w-5 h-5" />;
//     return <Globe className="w-5 h-5" />;
//   };

//   // ====================== HANDLE ACTIONS ======================
//   const handleAction = (action, item) =>
//   {
//     const slug = item.slug || item._id;

//     if (action === "read")
//     {
//       navigate(`/technology/${slug}`);
//       return;
//     }
//     if (action === "view")
//     {
//       dispatch(incrementPostView(slug));
//       return;
//     }

//     if (!isVerified)
//     {
//       setPendingSlug(slug);
//       setShowVerifyModal(true);
//       setStep("form");
//       setUserInfo({ name: "", email: "", phone: "" });
//       return;
//     }

//     if (action === "like")
//     {
//       if (userLikes.has(slug)) return;
//       dispatch(togglePostLike({ slug, email: userInfo.email }));
//       const newLikes = new Set(userLikes);
//       newLikes.add(slug);
//       setUserLikes(newLikes);
//       localStorage.setItem("userLikesTech", JSON.stringify([...newLikes]));
//     } else if (action === "comment")
//     {
//       setPendingSlug(slug);
//       setCommentText("");
//       setShowCommentModal(true);
//     }
//   };

//   const sendOtp = async () =>
//   {
//     if (!userInfo.name || !userInfo.email || !userInfo.phone)
//     {
//       alert("Name, Email and Phone are required");
//       return;
//     }
//     setLoadingAction(true);
//     await dispatch(
//       sendCommentOtp({
//         slug: pendingSlug,
//         name: userInfo.name,
//         email: userInfo.email,
//         phone: userInfo.phone,
//       }),
//     );
//     setStep("otp");
//     setLoadingAction(false);
//   };

//   const verifyOtp = () =>
//   {
//     setIsVerified(true);
//     localStorage.setItem(
//       "verifiedUser",
//       JSON.stringify({ ...userInfo, verifiedAt: new Date().toISOString() }),
//     );
//     setShowVerifyModal(false);
//     setTimeout(() => setShowCommentModal(true), 300);
//   };

//   const submitComment = async () =>
//   {
//     if (!commentText.trim()) return alert("Please write a comment");

//     setLoadingAction(true);
//     const result = await dispatch(
//       postComment({
//         slug: pendingSlug,
//         email: userInfo.email,
//         comment: commentText.trim(),
//       }),
//     );

//     if (!result.error)
//     {
//       setUpdatedItems((prev) => ({
//         ...prev,
//         [pendingSlug]: { comments: result.payload?.comments || [] },
//       }));
//       setShowCommentModal(false);
//       setCommentText("");
//       alert("✅ Comment posted successfully!");
//     } else
//     {
//       alert("Failed to post comment");
//     }
//     setLoadingAction(false);
//   };

//   // ====================== THEME CLASSES ======================
//   const cardClass = isDark
//     ? "bg-gray-900 border border-[#8B6B4A]/25 hover:border-[#8B6B4A]/60 hover:shadow-xl hover:shadow-[#8B6B4A]/20"
//     : "bg-white border border-[#E8D9C2] shadow-lg hover:shadow-2xl hover:shadow-[#E8D9C2]/50";

//   const headingClass = isDark ? "text-white" : "text-[#3D220E]";
//   const bodyClass = isDark ? "text-gray-300" : "text-[#5C4635]";
//   const accentClass = "text-[#8B6B4A]";

//   const serviceLink =
//     "font-bold text-[#8B6B4A] hover:text-[#6B4F2A] transition-colors duration-200";

//   return (
//     <>
//       <Helmet>
//         <title>Technology Solutions Company | Atla IKS</title>
//         <meta
//           name="description"
//           content="Explore software, cloud, AI & advanced technology solutions for businesses."
//         />
//         <meta
//           name="keywords"
//           content="Technology Solutions Company	IT Services, Tech Solutions"
//         />
//       </Helmet>
//       <div
//         className={`min-h-screen overflow-x-hidden relative transition-colors duration-700
//       ${isDark ? "bg-black text-white" : "bg-gray-50 text-gray-900"}`}
//       >
//         {/* Hero Section */}
//         <section
//           className="relative py-32 md:py-40 overflow-hidden"
//           style={{
//             backgroundImage: isDark
//               ? "linear-gradient(135deg, #000000 0%, rgba(87,48,16,0.25) 45%, #000000 100%)"
//               : "linear-gradient(135deg, #f7efe2 0%, #f3e4cf 45%, #ffffff 100%)",
//           }}
//         >
//           <div className="absolute inset-0 opacity-30">
//             <div
//               className="absolute top-20 left-10 w-64 h-64 rounded-2xl overflow-hidden transform hover:scale-110 transition-transform duration-700 animate-float"
//               style={{
//                 transform: `translateY(${scrollY * 0.3}px) rotate(${scrollY * 0.05}deg)`,
//                 animationDelay: "0s",
//               }}
//             >
//               <img
//                 src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=400&fit=crop"
//                 alt="Technology"
//                 className="w-full h-full object-cover"
//               />
//               <div
//                 className={`absolute inset-0 ${isDark ? "bg-gradient-to-br from-[#9d6231]/40 to-black/60" : "bg-gradient-to-br from-[#9d6231]/30 to-white/60"} mix-blend-multiply`}
//               ></div>
//             </div>
//             <div
//               className="absolute top-40 right-20 w-72 h-72 rounded-2xl overflow-hidden transform hover:scale-110 transition-transform duration-700 animate-float-delayed"
//               style={{
//                 transform: `translateY(${scrollY * 0.2}px) rotate(${-scrollY * 0.03}deg)`,
//                 animationDelay: "1s",
//               }}
//             >
//               <img
//                 src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=400&fit=crop"
//                 alt="Coding"
//                 className="w-full h-full object-cover"
//               />
//               <div
//                 className={`absolute inset-0 ${isDark ? "bg-gradient-to-br from-[#8B6B4A]/40 to-black/60" : "bg-gradient-to-br from-[#9d6231]/30 to-white/60"} mix-blend-multiply`}
//               ></div>
//             </div>
//             <div
//               className="absolute bottom-32 left-1/3 w-80 h-80 rounded-2xl overflow-hidden transform hover:scale-110 transition-transform duration-700 animate-float"
//               style={{
//                 transform: `translateY(${scrollY * 0.25}px) rotate(${scrollY * 0.04}deg)`,
//                 animationDelay: "2s",
//               }}
//             >
//               <img
//                 src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400&h=400&fit=crop"
//                 alt="Analytics"
//                 className="w-full h-full object-cover"
//               />
//               <div
//                 className={`absolute inset-0 ${isDark ? "bg-gradient-to-br from-[#573010]/40 to-black/60" : "bg-gradient-to-br from-[#9d6231]/30 to-white/60"} mix-blend-multiply`}
//               ></div>
//             </div>
//           </div>

//           <div className="absolute inset-0">
//             <div className="absolute top-20 left-20 w-2 h-2 bg-primary rounded-full animate-ping"></div>
//             <div
//               className="absolute top-40 right-40 w-3 h-3 bg-accent rounded-full animate-pulse"
//               style={{ animationDelay: "0.5s" }}
//             ></div>
//             <div
//               className="absolute bottom-40 left-1/4 w-2 h-2 bg-primary rounded-full animate-ping"
//               style={{ animationDelay: "1s" }}
//             ></div>
//             <div
//               className="absolute top-60 right-1/3 w-3 h-3 bg-accent rounded-full animate-pulse"
//               style={{ animationDelay: "1.5s" }}
//             ></div>
//           </div>

//           <div className="absolute inset-0 opacity-20">
//             <div className="absolute top-20 left-20 w-72 h-72 bg-accent rounded-full blur-3xl animate-pulse"></div>
//             <div
//               className="absolute bottom-20 right-20 w-96 h-96 bg-primary rounded-full blur-3xl animate-pulse"
//               style={{ animationDelay: "1s" }}
//             ></div>
//           </div>

//           <div
//             className="absolute inset-0 opacity-5"
//             style={{
//               backgroundImage:
//                 "linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)",
//               backgroundSize: "50px 50px",
//             }}
//           ></div>

//           <div className="container mx-auto px-6 lg:px-8 relative z-10 text-center">
//             <div
//               className={`inline-flex items-center gap-2 mb-6 px-6 py-2 rounded-full backdrop-blur-sm animate-fade-in
//             ${isDark ? "bg-[#8B6B4A]/20 border border-[#8B6B4A]/30" : "bg-[#8B6B4A]/10 border border-[#8B6B4A]/20"}`}
//             >
//               <Sparkles className="w-4 h-4 text-[#8B6B4A] animate-pulse" />
//               <span className="text-[#8B6B4A] font-semibold text-sm tracking-wider">
//                 TECHNOLOGY EXCELLENCE
//               </span>
//             </div>
//             <h1
//               className={`text-5xl md:text-6xl lg:text-7xl font-extrabold mb-8 tracking-tight animate-slide-up
//             ${isDark ? "bg-gradient-to-r from-white via-[#8B6B4A] to-white bg-clip-text text-transparent" : "text-gray-900"}`}
//             >
//               Cutting-Edge Technology Solutions
//             </h1>
//             <p
//               className={`text-lg md:text-xl max-w-3xl mx-auto mb-12 text-gray-600 leading-relaxed animate-slide-up ${bodyClass}`}
//               style={{ animationDelay: "0.2s" }}
//             >
//               We craft{" "}
//               <Link
//                 to="/software"
//                 className={serviceLink}
//               >
//                 high-performance
//               </Link>
//               , scalable, and secure{" "}
//               <Link
//                 to="/software"
//                 className={serviceLink}
//               >
//                 digital products
//               </Link>{" "}
//               that drive real{" "}
//               <HashLink
//                 smooth
//                 to="/technology#articles"
//                 className={serviceLink}
//               >
//                 business growth
//               </HashLink>{" "}
//               with precision and{" "}
//               <Link
//                 to="/ai-mlservice"
//                 className={serviceLink}
//               >
//                 innovation
//               </Link>
//               .
//             </p>
//             <div
//               className="flex flex-wrap justify-center gap-6 animate-slide-up"
//               style={{ animationDelay: "0.4s" }}
//             >
//               <button
//                 className="group relative bg-gradient-to-r from-[#573010] to-[#8B6B4A] text-white font-bold px-10 py-5 rounded-lg shadow-2xl shadow-[#573010]/30 hover:shadow-[#573010]/50 transform hover:scale-105 transition-all duration-300 overflow-hidden"
//                 onClick={() => navigate("/service")}
//               >
//                 <span className="relative z-10 flex items-center gap-2">
//                   Explore Services{" "}
//                   <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                 </span>
//               </button>
//               <button
//                 className={`group relative border-2 font-bold px-10 py-5 rounded-lg hover:scale-105 transition-all duration-300
//               ${isDark ? "border-primary text-white hover:bg-primary/90" : "border-primary text-primary hover:bg-primary hover:text-white"}`}
//                 onClick={() => navigate("/contact")}
//               >
//                 <span className="flex items-center gap-2">
//                   Contact Us{" "}
//                   <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                 </span>
//               </button>
//             </div>
//           </div>
//         </section>

//         {/* Tech News Section */}
//         <section
//           id="articles"
//           className={`py-24 relative overflow-hidden ${isDark ? "bg-black" : "bg-white"}`}
//         >
//           <div className="container mx-auto px-6 lg:px-8 relative z-10">
//             <div className="text-center mb-12">
//               <div
//                 className={`inline-flex items-center gap-2 mb-4 px-6 py-2 rounded-full backdrop-blur-sm animate-fade-in
//               ${isDark ? "bg-accent/20 border border-accent/30" : "bg-accent/10 border border-[#fdeada]"}`}
//               >
//                 <Newspaper className="w-4 h-4 text-accent animate-pulse" />
//                 <span className="text-accent font-semibold text-sm tracking-wider">
//                   LATEST UPDATES
//                 </span>
//               </div>
//               <h2
//                 className={`text-4xl md:text-5xl font-bold mb-4 ${headingClass}`}
//               >
//                 AI Technology & Insights
//               </h2>
//               <div className="w-24 h-1 bg-gradient-to-r from-[#8B6B4A] to-[#8B6B4A] mx-auto mb-6"></div>
//               <p className={`text-lg max-w-2xl mx-auto ${bodyClass}`}>
//                 Stay updated with the latest technology trends and industry
//                 insights
//               </p>
//             </div>

//             {/* Category Buttons */}
//             <div className="flex flex-wrap justify-center gap-3 mb-12">
//               <button
//                 onClick={() =>
//                   dispatch(setSelectedCategory({ _id: null, name: "All" }))
//                 }
//                 className={`group relative px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${!selectedCategory?._id || selectedCategory?.name === "All"
//                   ? "bg-gradient-to-r from-[#573010] to-[#8B6B4A] text-white shadow-lg shadow-[#573010]/30"
//                   : isDark
//                     ? "bg-gray-900 text-gray-400 hover:text-white border border-gray-800 hover:border-[#573010]/50"
//                     : "bg-white text-gray-600 hover:text-gray-900 border border-gray-300 hover:border-[#573010]"
//                   }`}
//               >
//                 <span className="relative z-10 flex items-center gap-2">
//                   <Globe className="w-4 h-4" />
//                   All
//                 </span>
//               </button>

//               {(categories || []).map((category) => (
//                 <button
//                   key={category._id}
//                   onClick={() => dispatch(setSelectedCategory(category))}
//                   className={`group relative px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${selectedCategory?._id === category._id
//                     ? "bg-gradient-to-r from-[#8B6B4A] to-[#6E4E35] text-white shadow-lg shadow-[#8B6B4A]/30"
//                     : isDark
//                       ? "bg-gray-900 text-gray-400 hover:text-[#D9C5B5] border border-gray-800 hover:border-[#8B6B4A]/50"
//                       : "bg-white text-gray-600 hover:text-[#3D220E] border border-gray-300 hover:border-[#8B6B4A]"
//                     }`}
//                 >
//                   <span className="relative z-10 flex items-center gap-2">
//                     {getIconForCategory(category.name)}
//                     {category.name}
//                   </span>
//                 </button>
//               ))}
//             </div>

//             {loading && (
//               <div className="min-h-[500px] flex items-center justify-center">
//                 <div className="flex flex-col items-center">

//                   {/* Animated Loader */}
//                   <div className="relative mb-8">

//                     <div className="w-24 h-24 rounded-full border-4 border-[#8B6B4A]/20"></div>

//                     <div className="absolute inset-0 w-24 h-24 rounded-full border-4 border-transparent border-t-[#8B6B4A] animate-spin"></div>

//                     <div
//                       className="absolute inset-3 w-[72px] h-[72px] rounded-full border-4 border-transparent border-r-[#C9A27A] animate-spin"
//                       style={{
//                         animationDirection: "reverse",
//                         animationDuration: "1.4s",
//                       }}
//                     ></div>

//                     <div className="absolute inset-0 flex items-center justify-center">
//                       <Cpu className="w-10 h-10 text-[#8B6B4A] animate-pulse" />
//                     </div>

//                   </div>

//                   <h3
//                     className={`text-2xl font-bold mb-2 ${isDark ? "text-white" : "text-[#3D220E]"
//                       }`}
//                   >
//                     Loading Technology
//                   </h3>

//                   <p
//                     className={`text-base ${isDark ? "text-gray-400" : "text-[#6E4E35]"
//                       }`}
//                   >
//                     Fetching the latest technology articles...
//                   </p>

//                   <div className="flex gap-2 mt-6">
//                     <span className="w-2.5 h-2.5 rounded-full bg-[#8B6B4A] animate-bounce"></span>

//                     <span
//                       className="w-2.5 h-2.5 rounded-full bg-[#A77A55] animate-bounce"
//                       style={{ animationDelay: "0.15s" }}
//                     ></span>

//                     <span
//                       className="w-2.5 h-2.5 rounded-full bg-[#D9C5B5] animate-bounce"
//                       style={{ animationDelay: "0.3s" }}
//                     ></span>
//                   </div>

//                 </div>
//               </div>
//             )}

//             {error && !loading && (
//               <div className="text-center py-20">
//                 <p className="text-accent text-lg">{error}</p>
//               </div>
//             )}

//             {!loading && !error && filteredNewsItems.length === 0 && (
//               <div className="text-center py-20">
//                 <Newspaper className="w-16 h-16 text-gray-600 mx-auto mb-4" />
//                 <p className={`text-lg ${bodyClass}`}>
//                   {!selectedCategory?._id || selectedCategory?.name === "All"
//                     ? "No products available at the moment"
//                     : `No products found in "${selectedCategory?.name}" category`}
//                 </p>
//               </div>
//             )}

//             {!loading && !error && filteredNewsItems.length > 0 && (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                 {filteredNewsItems.map((news, idx) =>
//                 {
//                   const slug = news.slug || news._id;
//                   const hasLiked = userLikes.has(slug);

//                   return (
//                     <article
//                       key={slug}
//                       className={`group relative rounded-2xl overflow-hidden border transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${cardClass}`}
//                       style={{ animationDelay: `${idx * 150}ms` }}
//                     >
//                       {news.trending && (
//                         <div className="absolute top-4 left-4 z-20 inline-flex items-center justify-center gap-1 px-3 py-1.5 bg-[#8B6B4A] border border-[#C9A27A]/40 rounded-full shadow-lg animate-pulse">
//                           <TrendingUp className="w-4 h-4 text-white" />
//                           <span className="text-white text-xs font-semibold leading-none">
//                             Trending
//                           </span>
//                         </div>
//                       )}
//                       <div className="relative h-56 overflow-hidden bg-gray-800">
//                         {news.image ? (
//                           <img
//                             src={news.image}
//                             alt={news.title}
//                             className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
//                           />
//                         ) : (
//                           <div className="w-full h-full flex items-center justify-center">
//                             <Newspaper className="w-16 h-16 text-gray-600" />
//                           </div>
//                         )}
//                         <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
//                         <div className="absolute top-4 right-4 inline-flex items-center justify-center px-3 py-1 h-8 bg-black/45 backdrop-blur-sm rounded-full border border-[#D8B48A]/40">
//                           <span className="text-[#E7D3BE] text-xs font-semibold leading-none">
//                             {news.category}
//                           </span>
//                         </div>
//                       </div>

//                       <div className="p-6">
//                         <div
//                           className={`flex items-center gap-4 mb-4 text-sm ${bodyClass}`}
//                         >
//                           <div className="flex items-center gap-1">
//                             <Calendar className="w-4 h-4" />
//                             <span>{news.date}</span>
//                           </div>
//                           <div className="flex items-center gap-1">
//                             <Clock className="w-4 h-4" />
//                             <span>{news.readTime}</span>
//                           </div>
//                           <div className="flex items-center gap-1">
//                             <Eye className="w-4 h-4" />
//                             <span>{news.views || 0}</span>
//                           </div>
//                         </div>
//                         <h3
//                           className={`text-xl font-bold mb-3 line-clamp-2 ${headingClass} group-hover:text-accent transition-colors`}
//                         >
//                           {news.title}
//                         </h3>
//                         <div
//                           className={`text-sm mb-4 line-clamp-3 leading-relaxed ${bodyClass}`}
//                           dangerouslySetInnerHTML={{
//                             __html: DOMPurify.sanitize(news.description || ""),
//                           }}
//                         />
//                         <div className="flex items-center justify-between pt-4 border-t border-gray-800">
//                           <div className="flex items-center gap-5">
//                             <button
//                               onClick={() => handleAction("like", news)}
//                               className={`flex items-center gap-1 transition-colors ${hasLiked
//                                 ? "text-[#8B6B4A]"
//                                 : "hover:text-[#8B6B4A]"
//                                 }`}
//                             >
//                               <Heart
//                                 className={`w-5 h-5 ${hasLiked ? "fill-current" : ""}`}
//                               />
//                               {news.likes || 0}
//                             </button>
//                             <button
//                               onClick={() => handleAction("comment", news)}
//                               className="flex items-center gap-1 hover:text-[#8B6B4A] transition-colors"
//                             >
//                               <MessageCircle className="w-5 h-5" />
//                               {(news.comments?.length || 0) +
//                                 (updatedItems[slug]?.comments?.length || 0)}
//                             </button>
//                           </div>
//                           <button
//                             onClick={() => handleAction("read", news)}
//                             className="flex items-center gap-2 px-5 py-2 text-[#8B6B4A] hover:text-[#3D220E] font-medium rounded-lg border border-[#8B6B4A]/30 hover:border-[#8B6B4A] hover:bg-[#F5EDE4] transition-all"
//                           >
//                             Read More <ArrowRight className="w-4 h-4" />
//                           </button>
//                         </div>
//                       </div>
//                     </article>
//                   );
//                 })}
//               </div>
//             )}
//           </div>
//         </section>

//         {/* Tech Stack Section */}
//         <section
//           className={`bg-black py-24 relative overflow-hidden ${isDark ? "" : "bg-white"}`}
//         >
//           <div className="container mx-auto px-6 lg:px-8 relative z-10">
//             <div className="text-center mb-16">
//               <h2
//                 className={`text-4xl md:text-5xl font-bold mb-4 ${headingClass}`}
//               >
//                 Technologies We Excel In
//               </h2>
//               <div className="w-24 h-1 bg-gradient-to-r from-[#C9A27A] via-[#8B6B4A] to-[#6E4E35] mx-auto mb-6"></div>
//               <p className={`text-lg ${bodyClass}`}>
//                 Modern, reliable, and battle-tested tech stack
//               </p>
//             </div>
//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6 max-w-6xl mx-auto">
//               {[
//                 { name: "Java + Spring Boot", icon: Code2 },
//                 { name: "React / Angular", icon: Code2 },
//                 { name: "Node.js", icon: Zap },
//                 { name: "MySQL / PostgreSQL", icon: Database },
//                 { name: "AWS", icon: Cloud },
//                 { name: "Azure", icon: Cloud },
//                 { name: "GCP", icon: Cloud },
//               ].map((tech) =>
//               {
//                 const TechIcon = tech.icon;
//                 return (
//                   <div
//                     key={tech.name}
//                     className={`group relative rounded-xl p-6 text-center font-semibold border transition-all duration-300 hover:scale-110 cursor-pointer ${cardClass}`}
//                   >
//                     <div className="relative z-10 flex flex-col items-center gap-3">
//                       <TechIcon
//                         className={`w-8 h-8 ${accentClass} transition-colors`}
//                       />
//                       <div
//                         className={`group-hover:text-primary transition-colors text-sm ${bodyClass}`}
//                       >
//                         {tech.name}
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </section>

//         {/* Comment Modal */}
//         {showCommentModal && (
//           <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
//             <div
//               className={`max-w-lg w-full rounded-xl p-8 border shadow-2xl ${isDark
//                 ? "bg-[#111827] border-[#8B6B4A]/30 shadow-black/70"
//                 : "bg-[#FCFAF8] border-[#E8D9C2] shadow-[#E8D9C2]/50"
//                 }`}
//             >
//               <div className="flex justify-between items-center mb-5">
//                 <h2
//                   className={`text-2xl font-bold ${isDark ? "text-white" : "text-[#3D220E]"
//                     }`}
//                 >Write a Comment</h2>
//                 <button
//                   onClick={() => setShowCommentModal(false)}
//                   className={`p-2 rounded-full transition ${isDark
//                     ? "hover:bg-[#3D220E]/40 text-gray-300"
//                     : "hover:bg-[#F5EDE4] text-[#8B6B4A]"
//                     }`}
//                 >
//                   <X className="w-6 h-6" />
//                 </button>
//               </div>
//               <textarea
//                 value={commentText}
//                 onChange={(e) => setCommentText(e.target.value)}
//                 placeholder="What are your thoughts?"
//                 rows={5}
//                 className={`w-full p-4 rounded-2xl border resize-y min-h-[140px]
// transition-all duration-300
// focus:outline-none focus:ring-2 focus:ring-[#8B6B4A]
// ${isDark
//                     ? "bg-gray-800 border-gray-700 text-white focus:border-[#8B6B4A]"
//                     : "bg-white border-[#E8D9C2] text-[#3D220E] focus:border-[#8B6B4A]"
//                   }`}
//               />
//               <div className="flex gap-3 mt-5">
//                 <button
//                   onClick={() => setShowCommentModal(false)}
//                   className={`flex-1 py-3 rounded-xl font-semibold border transition-all duration-300
// ${isDark
//                       ? "border-[#8B6B4A]/30 text-gray-300 hover:bg-[#3D220E]/40 hover:border-[#8B6B4A]"
//                       : "border-[#E8D9C2] text-[#8B6B4A] hover:bg-[#F5EDE4] hover:border-[#8B6B4A]"
//                     }`}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={submitComment}
//                   disabled={loadingAction || !commentText.trim()}
//                   className={`flex-1 py-3 rounded-xl font-semibold text-white flex items-center justify-center transition-all duration-300
// ${commentText.trim()
//                       ? "bg-[#8B6B4A] hover:bg-[#6E4E35]"
//                       : "bg-gray-400 cursor-not-allowed"
//                     }`}
//                 >
//                   {loadingAction ? (
//                     <Loader2 className="w-5 h-5 animate-spin" />
//                   ) : (
//                     "Post Comment"
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Verification Modal */}
//         {showVerifyModal && (
//           <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
//             <div
//               className={`max-w-md w-full rounded-3xl p-8 border shadow-2xl ${isDark
//                 ? "bg-[#111827] border-[#8B6B4A]/30 shadow-black/70"
//                 : "bg-[#FCFAF8] border-[#E8D9C2] shadow-[#E8D9C2]/50"
//                 }`}
//             >
//               <h2 className="text-2xl font-bold mb-6 text-center">
//                 {step === "form" ? "Verify Yourself" : "Enter OTP"}
//               </h2>
//               {step === "form" ? (
//                 <>
//                   <input
//                     type="text"
//                     placeholder="Full Name"
//                     value={userInfo.name}
//                     onChange={(e) =>
//                       setUserInfo({ ...userInfo, name: e.target.value })
//                     }
//                     className={`w-full p-3 rounded-xl mb-4 border transition-all
// focus:outline-none focus:ring-2 focus:ring-[#8B6B4A]
// ${isDark
//                         ? "bg-gray-800 border-gray-700 text-white"
//                         : "bg-white border-[#E8D9C2] text-[#3D220E]"
//                       }`}
//                   />
//                   <input
//                     type="email"
//                     placeholder="Email Address"
//                     value={userInfo.email}
//                     onChange={(e) =>
//                       setUserInfo({ ...userInfo, email: e.target.value })
//                     }
//                     className={`w-full p-3 rounded-lg mb-4 border ${isDark ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-300"}`}
//                   />
//                   <input
//                     type="tel"
//                     placeholder="Phone Number"
//                     value={userInfo.phone}
//                     onChange={(e) =>
//                       setUserInfo({ ...userInfo, phone: e.target.value })
//                     }
//                     className={`w-full p-3 rounded-lg mb-6 border ${isDark ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-300"}`}
//                   />
//                   <button
//                     onClick={sendOtp}
//                     disabled={loadingAction}
//                     className="w-full bg-[#8B6B4A] hover:bg-[#6E4E35] py-3 rounded-xl text-white font-semibold transition-all disabled:opacity-70"
//                   >
//                     Send OTP
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   <p className="text-center mb-6 text-sm opacity-75">
//                     OTP sent to <strong>{userInfo.email}</strong>
//                   </p>
//                   <input
//                     type="text"
//                     placeholder="Enter 6-digit OTP"
//                     value={otp}
//                     onChange={(e) => setOtp(e.target.value)}
//                     maxLength={6}
//                     className={`w-full p-4 text-center text-2xl tracking-[10px] rounded-xl border mb-6 transition-all
// focus:outline-none focus:ring-2 focus:ring-[#8B6B4A]
// ${isDark
//                         ? "bg-gray-800 border-gray-700 text-white"
//                         : "bg-white border-[#E8D9C2] text-[#3D220E]"
//                       }`}
//                   />
//                   <button
//                     onClick={verifyOtp}
//                     className="w-full bg-[#8B6B4A] hover:bg-[#6E4E35] py-3 rounded-xl text-white font-semibold transition-all disabled:opacity-70"
//                   >
//                     Verify OTP
//                   </button>
//                 </>
//               )}
//               <button
//                 onClick={() => setShowVerifyModal(false)}
//                 className={`mt-6 text-sm underline block mx-auto transition-colors ${isDark
//                   ? "text-[#D9C5B5] hover:text-white"
//                   : "text-[#8B6B4A] hover:text-[#3D220E]"
//                   }`}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Animations */}
//         <style jsx>{`
//           @keyframes float {
//             0%,
//             100% {
//               transform: translateY(0px) rotate(0deg);
//             }
//             50% {
//               transform: translateY(-20px) rotate(5deg);
//             }
//           }
//           @keyframes float-delayed {
//             0%,
//             100% {
//               transform: translateY(0px) rotate(0deg);
//             }
//             50% {
//               transform: translateY(-30px) rotate(-5deg);
//             }
//           }
//           .animate-float {
//             animation: float 6s ease-in-out infinite;
//           }
//           .animate-float-delayed {
//             animation: float-delayed 7s ease-in-out infinite;
//           }
//         `}</style>
//       </div>
//     </>
//   );
// };

// export default Technology;
