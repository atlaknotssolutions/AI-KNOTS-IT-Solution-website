import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import DOMPurify from "dompurify";
import { useTheme } from "../context/ThemeContext";
import
{
  fetchSinglePost,
  incrementPostView,
  togglePostLike,
  sendCommentOtp,
  verifyCommentOtp,
  postComment,
} from "./technologyslice/technologySlice";
import Toast from "../Component/common/Toast";

const TechnologyDetail = () =>
{
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { isDark } = useTheme();

  const { newsItems, loading, error } = useSelector(
    (state) => state.technology
  );

  const [post, setPost] = useState(null);
  const hasIncrementedView = useRef(false);

  const [commentText, setCommentText] = useState("");
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [step, setStep] = useState("form");
  const [isVerified, setIsVerified] = useState(false);

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });

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

  // ✅ FIX: Load verified user info from localStorage (was missing here,
  // that's why user always looked "Anonymous" / unverified on this page
  // even after verifying on the listing page).
  useEffect(() =>
  {
    const savedUser = localStorage.getItem("verifiedUser");
    if (savedUser)
    {
      try
      {
        const parsed = JSON.parse(savedUser);
        setUserInfo({
          name: parsed.name || parsed.user || "",
          email: parsed.email || "",
          phone: parsed.phone || "",
        });
        setIsVerified(true);
      } catch (err)
      {
        console.warn("Failed to parse verifiedUser", err);
      }
    }
  }, []);

  useEffect(() =>
  {
    hasIncrementedView.current = false;
  }, [slug]);

  useEffect(() =>
  {
    if (!slug) return;
    dispatch(fetchSinglePost(slug));
  }, [slug, dispatch]);

  useEffect(() =>
  {
    if (slug && post && !hasIncrementedView.current)
    {
      dispatch(incrementPostView(slug));
      hasIncrementedView.current = true;
    }
  }, [slug, post, dispatch]);

  useEffect(() =>
  {
    if (!slug) return;

    const foundPost = newsItems.find((item) => item.slug === slug);

    if (foundPost)
    {
      setPost(foundPost);
    }
  }, [newsItems, slug]);

  if (loading && !post)
  {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${isDark ? "bg-black" : "bg-gray-50"
          }`}
      >
        <div className="flex flex-col items-center">

          {/* Premium Loader */}
          <div className="relative mb-8">

            <div className="w-24 h-24 rounded-full border-4 border-[#8B6B4A]/20"></div>

            <div className="absolute inset-0 w-24 h-24 rounded-full border-4 border-transparent border-t-[#8B6B4A] animate-spin"></div>

            <div
              className="absolute inset-3 w-[72px] h-[72px] rounded-full border-4 border-transparent border-r-[#D9C5B5] animate-spin"
              style={{
                animationDirection: "reverse",
                animationDuration: "1.4s",
              }}
            ></div>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-[#8B6B4A] text-white flex items-center justify-center font-bold text-xl shadow-lg">
                AI
              </div>
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
            Preparing the latest technology article...
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
    );
  }

  if (error || !post)
  {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${isDark ? "bg-black text-white" : "bg-gray-50"
          }`}
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <Link
            to="/technology"
            className="text-blue-600 hover:underline text-lg"
          >
            ← Back to Technology
          </Link>
        </div>
      </div>
    );
  }

  const sanitizedContent = DOMPurify.sanitize(post.description || "");

  // ✅ Helper: robustly resolve a display name + email for a comment,
  // trying every shape the backend might return it in.
  const getCommentDisplay = (comment) =>
  {
    const email =
      comment.user?.email || comment.email || comment.user?.userEmail || null;

    const name =
      comment.user?.name ||
      comment.name ||
      comment.userName ||
      comment.author ||
      comment.user?.user ||
      (email ? email.split("@")[0] : null) ||
      "Anonymous";

    return { name, email };
  };

  const handleLike = () =>
  {
    if (!userInfo.email)
    {
      // handleLike
      showToast(
        "warning",
        "Verification Required",
        "Please verify your email first."
      );
      setShowVerifyModal(true);
      setStep("form");
      return;
    }

    dispatch(togglePostLike({ slug, email: userInfo.email }));
  };

  const sendOtp = async () =>
  {
    if (!userInfo.name || !userInfo.email || !userInfo.phone)
    {
      // sendOtp
      showToast(
        "warning",
        "Missing Information",
        "Name, Email and Phone are required."
      );
      return;
    }

    setIsSubmitting(true);

    const result = await dispatch(
      sendCommentOtp({
        slug,
        name: userInfo.name,
        email: userInfo.email,
        phone: userInfo.phone,
      })
    );

    setIsSubmitting(false);

    if (!result.error)
    {
      setStep("otp");
    } else
    {
      // sendOtp error
      showToast(
        "error",
        "OTP Failed",
        result.payload?.message || "Failed to send OTP."
      );
    }
  };

  const verifyOtp = async () =>
  {
    if (!otp.trim())
    {
      // verifyOtp
      showToast(
        "warning",
        "OTP Required",
        "Please enter the OTP."
      );
      return;
    }

    setIsSubmitting(true);

    const result = await dispatch(
      verifyCommentOtp({
        slug,
        email: userInfo.email,
        otp: otp.trim(),
      })
    );

    setIsSubmitting(false);

    if (!result.error)
    {
      setIsVerified(true);

      localStorage.setItem(
        "verifiedUser",
        JSON.stringify({ ...userInfo, verifiedAt: new Date().toISOString() })
      );

      setShowVerifyModal(false);
      setShowCommentModal(true);
    } else
    {
      // verifyOtp error
      showToast(
        "error",
        "Verification Failed",
        result.payload || "OTP expired or invalid."
      );
    }
  };


  const submitComment = async () =>
  {
    if (!commentText.trim())
    {
      // submitComment
      showToast(
        "warning",
        "Comment Required",
        "Please write a comment before submitting."
      );
      return;
    }

    setIsSubmitting(true);

    const result = await dispatch(
      postComment({
        slug,
        name: userInfo.name,
        email: userInfo.email,
        phone: userInfo.phone,
        comment: commentText.trim(),
      })
    );

    if (!result.error)
    {
      setCommentText("");
      setShowCommentModal(false);

      const freshPost = await dispatch(fetchSinglePost(slug));

      if (freshPost.payload)
      {
        setPost(freshPost.payload);
      }

      // submitComment success
      showToast(
        "success",
        "Comment Posted",
        "Your comment has been posted successfully!"
      );
    } else
    {
      // submitComment error
      showToast(
        "error",
        "Comment Failed",
        result.payload?.message || "Failed to post comment."
      );
    }

    setIsSubmitting(false);
  };

  return (
    <div
      className={`min-h-screen ${isDark ? "bg-black text-white" : "bg-white text-gray-900"
        }`}
    >
      <div className="relative h-auto mr-20 ml-20 overflow-hidden">
        {post.image ? (
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover brightness-75"
          />
        ) : (
          <div
            className={`absolute inset-0 ${isDark
              ? "bg-gradient-to-br from-gray-900 to-black"
              : "bg-gradient-to-br from-gray-100 to-white"
              }`}
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>

      <main className="max-w-4xl mx-auto px-6 md:px-8 py-12 md:py-20">
        <span
          className={`inline-block px-4 py-1.5 mb-4 text-sm rounded-full border ${isDark
            ? "bg-[#3D220E]/40 border-[#8B6B4A]/40 text-[#E7D3BE]"
            : "bg-[#F5EDE4] border-[#E8D9C2] text-[#8B6B4A]"
            }`}
        >
          {post.category || "Technology"}
        </span>

        <div
          className={`flex flex-wrap items-center gap-4 text-lg ${isDark ? "text-gray-400" : "text-gray-600"
            } mb-4`}
        >
          <div>{post.date || "Recently"}</div>

          <div className="flex items-center gap-2">
            <span>•</span>
            <span>{post.author ? `By ${post.author}` : "Anonymous"}</span>
          </div>

          <h1
            className={`text-4xl md:text-6xl pt-12 font-bold leading-tight tracking-tight ${isDark ? "text-gray-400" : "text-gray-800"
              } mb-6`}
          >
            {post.title}
          </h1>
        </div>

        <article className={`prose max-w-none ${isDark ? "prose-invert" : ""}`}>
          {sanitizedContent ? (
            <div
              className={`text-[1.1rem] leading-relaxed ${isDark ? "text-gray-300" : "text-gray-700"
                }`}
              dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            />
          ) : (
            <p className="text-center py-20 italic text-gray-500">
              Content not available
            </p>
          )}

          {post.images?.length > 1 && (
            <div className="my-16 grid grid-cols-1 md:grid-cols-2 gap-6">
              {post.images.slice(1).map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Additional image ${idx + 2}`}
                  className="rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 object-cover"
                />
              ))}
            </div>
          )}
        </article>

        <div className="flex justify-end mt-8">
          <button
            onClick={handleLike}
            className="flex items-center gap-2 text-[#8B6B4A] hover:text-[#3D220E] text-2xl font-medium transition-colors duration-300"
          >
            ❤️ <span>{post.likes || 0}</span>
          </button>
        </div>

        <section
          className={`mt-20 rounded-[32px] p-8 md:p-10 border shadow-2xl ${isDark
            ? "bg-[#111827] border-[#8B6B4A]/25 shadow-black/50"
            : "bg-[#FCFAF8] border-[#E8D9C2] shadow-[#E8D9C2]/40"
            }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h2
                className={`text-3xl font-black mb-2 ${isDark ? "text-white" : "text-[#3D220E]"
                  }`}
              >
                Comments
              </h2>

              <p className={`${isDark ? "text-gray-400" : "text-[#8B6B4A]"}`}>
                {post.comments?.length || 0} comment
                {post.comments?.length !== 1 ? "s" : ""}
              </p>
            </div>

            <button
              onClick={() =>
              {
                if (isVerified)
                {
                  setShowCommentModal(true);
                } else
                {
                  setShowVerifyModal(true);
                  setStep("form");
                }
              }}
              className="px-6 py-3 bg-gradient-to-r from-[#3D220E] to-[#3D220E]/90 text-white rounded-full font-bold shadow-lg shadow-[#3D220E]/30 hover:shadow-[#3D220E]/50 transition-all"
            >
              Write a Comment
            </button>
          </div>

          {post.comments?.length > 0 ? (
            <div className="space-y-6">
              {post.comments.map((comment, index) =>
              {
                const { name, email } = getCommentDisplay(comment);

                return (
                  <div
                    key={comment._id || index}
                    className={`p-6 rounded-3xl border transition-all duration-300
${isDark
                        ? "bg-[#1B2434] border-[#8B6B4A]/20 hover:border-[#8B6B4A]/50"
                        : "bg-white border-[#E8D9C2] hover:border-[#8B6B4A]/40"
                      }`}
                  >
                    <div className="flex justify-between mb-3">
                      <div>
                        <p
                          className={`text-[16px] font-bold ${isDark ? "text-white" : "text-[#3D220E]"
                            }`}
                        >
                          {email ? email.split("@")[0] : name}
                        </p>

                        {/* {email && (
                            <p
                              className={`text-sm ${isDark ? "text-gray-400" : "text-[#8B6B4A]/80"
                                }`}
                            >
                              {email}
                            </p>
                          )} */}

                        <p
                          className={`text-[12px] ${isDark ? "text-gray-500" : "text-[#8B6B4A]"
                            }`}
                        >
                          {comment.createdAt
                            ? new Date(comment.createdAt).toLocaleString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )
                            : "Just now"}
                        </p>
                      </div>
                    </div>

                    <p
                      className={`mt-4 text-[14px] leading-8 ${isDark
                        ? "text-gray-200"
                        : "text-[#5C4635]"
                        }`}
                    >
                      {comment.comment}
                    </p>
                  </div>
                );
              })}
            </div>
          ) : (
            <div
              className={`text-center py-12 ${isDark ? "text-gray-400" : "text-[#8B6B4A]"
                }`}
            >
              No comments yet. Be the first to comment!
            </div>
          )}
        </section>

        {showCommentModal && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div
              className={`max-w-lg w-full rounded-2xl p-6 shadow-2xl ${isDark ? "bg-gray-900" : "bg-white"
                }`}
            >
              <h2 className="text-2xl font-bold mb-5">Write a Comment</h2>

              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="What are your thoughts?"
                rows={5}
                className={`w-full p-4 rounded-xl border min-h-[120px] focus:outline-none focus:ring-2 focus:ring-[#8B6B4A] ${isDark
                  ? "bg-gray-800 border-gray-700 text-white"
                  : "bg-gray-50 border-gray-300"
                  }`}
              />

              <div className="flex gap-3 mt-5">
                <button
                  onClick={() => setShowCommentModal(false)}
                  className="flex-1 py-3 rounded-xl border font-medium"
                >
                  Cancel
                </button>

                <button
                  onClick={submitComment}
                  disabled={isSubmitting || !commentText.trim()}
                  className="flex-1 py-3 rounded-xl bg-[#8B6B4A] hover:bg-[#7A5D42] text-white font-medium disabled:opacity-60"
                >
                  {isSubmitting ? "Posting..." : "Post Comment"}
                </button>
              </div>
            </div>
          </div>
        )}

        {showVerifyModal && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div
              className={`max-w-md w-full rounded-2xl p-8 ${isDark ? "bg-gray-900" : "bg-white"
                } shadow-2xl`}
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
                    className={`w-full p-3 rounded-lg mb-4 border ${isDark
                      ? "bg-gray-800 border-gray-700 text-white"
                      : "bg-gray-50 border-gray-300"
                      }`}
                  />

                  <input
                    type="email"
                    placeholder="Email Address"
                    value={userInfo.email}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, email: e.target.value })
                    }
                    className={`w-full p-3 rounded-lg mb-4 border ${isDark
                      ? "bg-gray-800 border-gray-700 text-white"
                      : "bg-gray-50 border-gray-300"
                      }`}
                  />

                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={userInfo.phone}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, phone: e.target.value })
                    }
                    className={`w-full p-3 rounded-lg mb-6 border ${isDark
                      ? "bg-gray-800 border-gray-700 text-white"
                      : "bg-gray-50 border-gray-300"
                      }`}
                  />

                  <button
                    onClick={sendOtp}
                    disabled={isSubmitting}
                    className="w-full bg-[#8B6B4A] hover:bg-[#7A5D42] py-3 rounded-lg text-white font-medium disabled:opacity-70"
                  >
                    {isSubmitting ? "Sending OTP..." : "Send OTP"}
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
                    className={`w-full p-4 text-center text-2xl tracking-widest rounded-lg border mb-6 ${isDark
                      ? "bg-gray-800 text-white border-gray-700"
                      : "bg-gray-50 border-gray-300"
                      }`}
                  />

                  <button
                    onClick={verifyOtp}
                    disabled={isSubmitting}
                    className="w-full bg-[#8B6B4A] hover:bg-[#7A5D42] py-3 rounded-lg text-white font-medium disabled:opacity-70"
                  >
                    {isSubmitting ? "Verifying..." : "Verify OTP"}
                  </button>
                </>
              )}

              <button
                onClick={() => setShowVerifyModal(false)}
                className="mt-6 text-sm text-gray-500 underline block mx-auto"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="text-center mt-16">
          <Link
            to="/technology"
            className={`inline-flex items-center px-8 py-4 rounded-xl font-medium text-lg transition-all ${isDark
              ? "bg-[#3D220E]/40 hover:bg-[#3D220E]/60 border border-[#8B6B4A]/40 text-[#E7D3BE]"
              : "bg-[#F5EDE4] hover:bg-[#EAD8C6] border border-[#8B6B4A] text-[#8B6B4A] hover:text-[#3D220E]"
              }`}
          >
            ← Back to Technology
          </Link>
        </div>
      </main>
      {/* Toast */}
      <Toast
        show={toast.show}
        type={toast.type}
        title={toast.title}
        message={toast.message}
        isDark={isDark}
      />
    </div>
  );
};

export default TechnologyDetail;
