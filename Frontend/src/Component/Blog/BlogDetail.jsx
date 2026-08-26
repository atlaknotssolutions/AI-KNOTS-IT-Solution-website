

import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import DOMPurify from "dompurify";
import { useTheme } from "../../context/ThemeContext";
import Toast from "../../Component/common/Toast.jsx";

import
{
  fetchBlogPostById,
  clearCurrentPost,
  sendCommentOtp,
  verifyCommentOtp,
  postComment,
} from "../Redux/Blog/blogSlice.js";

const BlogDetail = () =>
{
  const { slug } = useParams();           // ← Changed to slug
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isDark } = useTheme();

  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [userInfo, setUserInfo] = useState({ name: "", email: "", phone: "" });
  const [step, setStep] = useState("form");
  const [otp, setOtp] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({
    show:false,
    type:"success",
    title:"",
    message:"",
  });

  const showToast=(type,title,message)=>{
    setToast({show:true,type,title,message});
    setTimeout(()=>setToast({show:false,type:"success",title:"",message:""}),3000);
  };

  const { currentPost, detailStatus, detailError } = useSelector(
    (state) => state.blog
  );

  // Fetch post when slug changes
  useEffect(() =>
  {
    if (!slug)
    {
      navigate("/blog", { replace: true });
      return;
    }

    dispatch(fetchBlogPostById(slug));     // ← Now passing slug

    // Cleanup on unmount or slug change
    return () =>
    {
      dispatch(clearCurrentPost());
    };
  }, [slug, dispatch, navigate]);

  useEffect(() =>
  {
    const savedUser = localStorage.getItem("verifiedUser");

    if (savedUser)
    {
      try
      {
        const parsedUser = JSON.parse(savedUser);

        if (parsedUser?.email)
        {
          setUserInfo({
            name: parsedUser.name || "",
            email: parsedUser.email || "",
            phone: parsedUser.phone || "",
          });

          setIsVerified(true);
        }
      } catch (error)
      {
        console.error("Failed to parse verifiedUser from localStorage", error);
      }
    }
  }, []);


  // Loading State
  if (detailStatus === "loading")
  {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${isDark ? "bg-black" : "bg-gray-50"
          }`}
      >
        <div className="flex flex-col items-center">

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
              <span className="text-3xl animate-pulse">✦</span>
            </div>
          </div>

          <h3
            className={`text-2xl font-bold mb-2 ${isDark ? "text-white" : "text-[#3D220E]"
              }`}
          >
            Loading Article
          </h3>

          <p
            className={`text-base ${isDark ? "text-gray-400" : "text-[#6E4E35]"
              }`}
          >
            Preparing the latest article for you...
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

  // Error / Not Found State
  if (detailStatus === "failed" || !currentPost)
  {
    return (
      <div
        className={`min-h-screen flex flex-col items-center justify-center p-6 ${isDark ? "bg-black text-white" : "bg-gray-50 text-gray-900"
          }`}
      >
        <h1 className="text-4xl md:text-5xl font-black text-[#8B6B4A] mb-4">
          Oops!
        </h1>

        <p
          className={`text-xl mb-8 text-center max-w-md ${isDark ? "text-gray-300" : "text-[#5C4635]"
            }`}
        >
          {detailError || "Post not found"}
        </p>

        <Link
          to="/blog"
          className={`px-8 py-4 rounded-xl font-medium transition-all duration-300 ${isDark
            ? "bg-[#3D220E]/40 hover:bg-[#3D220E]/60 border border-[#8B6B4A]/40 text-[#E7D3BE]"
            : "bg-[#F5EDE4] hover:bg-[#EAD8C6] border border-[#8B6B4A] text-[#8B6B4A] hover:text-[#3D220E]"
            }`}
        >
          ← Back to Blog
        </Link>
      </div>
    );
  }

  const post = currentPost;

  const sanitizedContent = DOMPurify.sanitize(
    post.content || post.fullDescription || post.description || ""
  );

  const sendOtp = async () =>
  {
    if (!userInfo.name || !userInfo.email || !userInfo.phone)
    {
      showToast("warning","Required Fields","Name, Email and Phone Number are required.");
      return;
    }

    setLoading(true);

    const result = await dispatch(
      sendCommentOtp({
        postId: post._id,
        name: userInfo.name,
        email: userInfo.email,
        phone: userInfo.phone,
      })
    );

    setLoading(false);

    if (result.error)
    {
      showToast("error","OTP Failed",result.payload || "Failed to send OTP");
      return;
    }

    setStep("otp");
  };


  const verifyOtp = async () =>
  {
    if (!otp.trim())
    {
      showToast("warning","OTP Required","Please enter OTP.");
      return;
    }

    setLoading(true);

    const result = await dispatch(
      verifyCommentOtp({
        postId: post._id,
        email: userInfo.email,
        otp: otp.trim(),
      })
    );

    setLoading(false);

    if (result.error)
    {
      showToast("error","Verification Failed",result.payload || "Invalid OTP");
      return;
    }

    setIsVerified(true);

    localStorage.setItem(
      "verifiedUser",
      JSON.stringify({ ...userInfo, verifiedAt: new Date().toISOString() })
    );

    setShowVerifyModal(false);
    setShowCommentModal(true);
  };

  const submitComment = async () =>
  {
    if (!commentText.trim())
    {
      showToast("warning","Comment Required","Please write a comment.");
      return;
    }

    setLoading(true);

    const result = await dispatch(
      postComment({
        postId: post._id,
        email: userInfo.email,
        comment: commentText.trim(),
      })
    );

    setLoading(false);

    if (!result.error)
    {
      setCommentText("");
      setShowCommentModal(false);
      dispatch(fetchBlogPostById(slug));
      localStorage.setItem("blogCommentsUpdated", "true");
      showToast("success","Comment Posted","Your comment has been published successfully.");
    } else
    {
      showToast("error","Comment Failed",result.payload || "Failed to post comment");
    }
  };


  return (



    <div
      className={`min-h-screen  ${isDark ? "bg-black text-white" : "bg-white text-gray-900"}`}
    >

      <Toast {...toast} isDark={isDark} />

      {/* Hero Section */}
      <div className="relative h-auto mr-20 ml-20 overflow-hidden">
        {post.images?.[0] ? (
          <img
            src={post.images[0]}
            alt={post.name}
            className="w-full h-full object-cover brightness-75"
          />
        ) : (
          <div className={`absolute inset-0 ${isDark ? "bg-gradient-to-br from-gray-900 to-black" : "bg-gradient-to-br from-gray-100 to-white"}`} />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent" />

        {/* Title & Meta - Moved inside hero for better design */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 max-w-5xl mx-auto">



        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 md:px-8 py-12 md:py-20">


        <span
          className={`inline-block px-4 py-1.5 mb-4 text-sm rounded-full border ${isDark
            ? "bg-[#3D220E]/40 border-[#8B6B4A]/40 text-[#E7D3BE]"
            : "bg-[#F5EDE4] border-[#E8D9C2] text-[#8B6B4A]"
            }`}
        >
          {post.category?.name || "Uncategorized"}
        </span>

        <div className={`flex flex-wrap items-center gap-4 text-lg ${isDark ? "text-gray-400" : "text-gray-600"}`}>
          <div>
            {post.createdAt
              ? new Date(post.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })
              : "Recently"}
          </div>
          <div className="flex items-center gap-2">
            <span>•</span>
            <span>{post.author ? `By ${post.author}` : "Anonymous"}</span>
          </div>
        </div>

        <h1 className={`text-4xl md:text-6xl pt-12 font-bold leading-tight tracking-tight ${isDark ? "text-gray-400" : "text-gray-800"
              } mb-6`}>
          {post.name || "Untitled"}
        </h1>
        <article className={`prose max-w-none ${isDark ? "prose-invert" : ""}`}>
          {sanitizedContent ? (
            <div
              className={`text-[1.1rem] leading-relaxed ${isDark ? "text-gray-300" : "text-gray-700"}`}
              dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            />
          ) : (
            <p className="text-center py-20 italic text-gray-500">
              Content not available
            </p>
          )}

          {/* Additional Images */}
          {post.images?.length > 1 && (
            <div className="my-16 grid grid-cols-1 md:grid-cols-2 gap-6">
              {post.images.slice(1).map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Blog image ${idx + 2}`}
                  className="rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 object-cover"
                />
              ))}
            </div>
          )}
        </article>

        {/* Comments Section */}
        <section className={`mt-20 rounded-[32px] p-8 md:p-10 border shadow-2xl
${isDark
            ? "bg-[#111827] border-[#8B6B4A]/25 shadow-black/50"
            : "bg-[#FCFAF8] border-[#E8D9C2] shadow-[#E8D9C2]/40"
          }`}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Comments</h2>
              <p className="text-gray-500 dark:text-gray-400">
                {post.comments?.length || 0} comment{post.comments?.length !== 1 ? "s" : ""}
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
          {/* // comment card */}
          {post.comments?.length > 0 ? (
            <div className="space-y-6">
              {post.comments.map((comment, index) => (
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
                        {comment.user?.name ||
                          comment.name ||
                          comment.userName ||
                          comment.user?.user ||
                          (comment.user?.email || comment.email
                            ? (comment.user?.email || comment.email).split("@")[0]
                            : "Anonymous")}
                      </p>
                      <p className={`text-[12px] ${isDark ? "text-gray-500" : "text-[#8B6B4A]"
                        }`}>
                        {comment.createdAt
                          ? new Date(comment.createdAt).toLocaleString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                          : "Just now"}
                      </p>
                    </div>
                  </div>
                  <p className={`mt-4 text-[14px] leading-8 ${isDark
                    ? "text-gray-200"
                    : "text-[#5C4635]"
                    }`}>
                    {comment.comment}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <p>No comments yet. Be the first!</p>
            </div>
          )}
        </section>


        {showCommentModal && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className={`max-w-lg w-full rounded-2xl p-6 shadow-2xl ${isDark ? "bg-gray-900" : "bg-white"}`}>
              <h2 className="text-2xl font-bold mb-5">Write a Comment</h2>

              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="What are your thoughts?"
                rows={5}
                className={`w-full p-4 rounded-xl border min-h-[120px] focus:outline-none focus:ring-2 focus:ring-[#8B6B4A] ${isDark ? "bg-gray-800 border-gray-700 text-white" : "bg-gray-50 border-gray-300"
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
                  disabled={loading || !commentText.trim()}
                  className="flex-1 py-3 rounded-xl bg-[#8B6B4A] hover:bg-[#7A5D42] text-white font-medium disabled:opacity-60"
                >
                  {loading ? "Posting..." : "Post Comment"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Back Button */}
        <div className="text-center mt-16">
          <Link
            to="/blog"
            className={`inline-flex items-center px-8 py-4 rounded-xl font-medium text-lg transition-all duration-300 ${isDark
              ? "bg-[#3D220E]/40 hover:bg-[#3D220E]/60 border border-[#8B6B4A]/40 text-[#E7D3BE] hover:border-[#8B6B4A]"
              : "bg-[#F5EDE4] hover:bg-[#EAD8C6] border border-[#8B6B4A] text-[#8B6B4A] hover:text-[#3D220E]"
              }`}
          >
            ← Back to all articles
          </Link>
        </div>
      </main>

      {showVerifyModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className={`max-w-md w-full rounded-2xl p-8 ${isDark ? "bg-gray-900" : "bg-white"} shadow-2xl`}>
            <h2 className="text-2xl font-bold mb-6 text-center">
              {step === "form" ? "Verify Yourself" : "Enter OTP"}
            </h2>

            {step === "form" ? (
              <>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={userInfo.name}
                  onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                  className={`w-full p-3 rounded-lg mb-4 border ${isDark ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-300"}`}
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  value={userInfo.email}
                  onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                  className={`w-full p-3 rounded-lg mb-4 border ${isDark ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-300"}`}
                />

                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={userInfo.phone}
                  onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                  className={`w-full p-3 rounded-lg mb-6 border ${isDark ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-300"
                    }`}
                />

                <button
                  onClick={sendOtp}
                  disabled={loading}
                  className="w-full bg-[#8B6B4A] hover:bg-[#7A5D42] py-3 rounded-lg text-white font-medium disabled:opacity-70"
                >
                  {loading ? "Sending OTP..." : "Send OTP"}
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
                  className={`w-full p-4 text-center text-2xl tracking-widest rounded-lg border mb-6 ${isDark ? "bg-gray-800" : "bg-gray-50"}`}
                />

                <button
                  onClick={verifyOtp}
                  disabled={loading}
                  className="w-full bg-[#8B6B4A] hover:bg-[#7A5D42] py-3 rounded-lg text-white font-medium disabled:opacity-70"
                >
                  {loading ? "Verifying..." : "Verify OTP"}
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
    </div>
  );
};

export default BlogDetail;


// import React, { useEffect, useState } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import DOMPurify from "dompurify";
// import { useTheme } from "../../context/ThemeContext";

// import
// {
//   fetchBlogPostById,
//   clearCurrentPost,
//   sendCommentOtp,
//   verifyCommentOtp,
//   postComment,
// } from "../Redux/Blog/blogSlice.js";

// const BlogDetail = () =>
// {
//   const { slug } = useParams();           // ← Changed to slug
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { isDark } = useTheme();

//   const [showVerifyModal, setShowVerifyModal] = useState(false);
//   const [showCommentModal, setShowCommentModal] = useState(false);
//   const [commentText, setCommentText] = useState("");
//   const [userInfo, setUserInfo] = useState({ name: "", email: "", phone: "" });
//   const [step, setStep] = useState("form");
//   const [otp, setOtp] = useState("");
//   const [isVerified, setIsVerified] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [toast, setToast] = useState({
//     show:false,
//     type:"success",
//     title:"",
//     message:"",
//   });

//   const showToast=(type,title,message)=>{
//     setToast({show:true,type,title,message});
//     setTimeout(()=>setToast({show:false,type:"success",title:"",message:""}),3000);
//   };

//   const { currentPost, detailStatus, detailError } = useSelector(
//     (state) => state.blog
//   );

//   // Fetch post when slug changes
//   useEffect(() =>
//   {
//     if (!slug)
//     {
//       navigate("/blog", { replace: true });
//       return;
//     }

//     dispatch(fetchBlogPostById(slug));     // ← Now passing slug

//     // Cleanup on unmount or slug change
//     return () =>
//     {
//       dispatch(clearCurrentPost());
//     };
//   }, [slug, dispatch, navigate]);

//   useEffect(() =>
//   {
//     const savedUser = localStorage.getItem("verifiedUser");

//     if (savedUser)
//     {
//       try
//       {
//         const parsedUser = JSON.parse(savedUser);

//         if (parsedUser?.email && parsedUser?.phone)
//         {
//           setUserInfo({
//             name: parsedUser.name || "",
//             email: parsedUser.email || "",
//             phone: parsedUser.phone || "",
//           });

//           setIsVerified(true);
//         }
//       } catch (error)
//       {
//         console.error("Failed to parse verifiedUser from localStorage", error);
//       }
//     }
//   }, []);


//   // Loading State
//   if (detailStatus === "loading")
//   {
//     return (
//       <div
//         className={`min-h-screen flex items-center justify-center ${isDark ? "bg-black" : "bg-gray-50"
//           }`}
//       >
//         <div className="flex flex-col items-center">

//           <div className="relative mb-8">
//             <div className="w-24 h-24 rounded-full border-4 border-[#8B6B4A]/20"></div>

//             <div className="absolute inset-0 w-24 h-24 rounded-full border-4 border-transparent border-t-[#8B6B4A] animate-spin"></div>

//             <div
//               className="absolute inset-3 w-[72px] h-[72px] rounded-full border-4 border-transparent border-r-[#D9C5B5] animate-spin"
//               style={{
//                 animationDirection: "reverse",
//                 animationDuration: "1.4s",
//               }}
//             ></div>

//             <div className="absolute inset-0 flex items-center justify-center">
//               <span className="text-3xl animate-pulse">✦</span>
//             </div>
//           </div>

//           <h3
//             className={`text-2xl font-bold mb-2 ${isDark ? "text-white" : "text-[#3D220E]"
//               }`}
//           >
//             Loading Article
//           </h3>

//           <p
//             className={`text-base ${isDark ? "text-gray-400" : "text-[#6E4E35]"
//               }`}
//           >
//             Preparing the latest article for you...
//           </p>

//           <div className="flex gap-2 mt-6">
//             <span className="w-2.5 h-2.5 rounded-full bg-[#8B6B4A] animate-bounce"></span>
//             <span
//               className="w-2.5 h-2.5 rounded-full bg-[#A77A55] animate-bounce"
//               style={{ animationDelay: "0.15s" }}
//             ></span>
//             <span
//               className="w-2.5 h-2.5 rounded-full bg-[#D9C5B5] animate-bounce"
//               style={{ animationDelay: "0.3s" }}
//             ></span>
//           </div>

//         </div>
//       </div>
//     );
//   }

//   // Error / Not Found State
//   if (detailStatus === "failed" || !currentPost)
//   {
//     return (
//       <div
//         className={`min-h-screen flex flex-col items-center justify-center p-6 ${isDark ? "bg-black text-white" : "bg-gray-50 text-gray-900"
//           }`}
//       >
//         <h1 className="text-4xl md:text-5xl font-black text-[#8B6B4A] mb-4">
//           Oops!
//         </h1>

//         <p
//           className={`text-xl mb-8 text-center max-w-md ${isDark ? "text-gray-300" : "text-[#5C4635]"
//             }`}
//         >
//           {detailError || "Post not found"}
//         </p>

//         <Link
//           to="/blog"
//           className={`px-8 py-4 rounded-xl font-medium transition-all duration-300 ${isDark
//             ? "bg-[#3D220E]/40 hover:bg-[#3D220E]/60 border border-[#8B6B4A]/40 text-[#E7D3BE]"
//             : "bg-[#F5EDE4] hover:bg-[#EAD8C6] border border-[#8B6B4A] text-[#8B6B4A] hover:text-[#3D220E]"
//             }`}
//         >
//           ← Back to Blog
//         </Link>
//       </div>
//     );
//   }

//   const post = currentPost;

//   const sanitizedContent = DOMPurify.sanitize(
//     post.content || post.fullDescription || post.description || ""
//   );

//   const sanitizedDescription = DOMPurify.sanitize(post.description || "", {
//     ALLOWED_TAGS: [],
//     ALLOWED_ATTR: [],
//   })
//     .replace(/&nbsp;/g, " ")
//     .replace(/\s+/g, " ")
//     .trim();


//   const sendOtp = async () =>
//   {
//     if (!userInfo.name || !userInfo.email || !userInfo.phone)
//     {
//       showToast("warning","Required Fields","Name, Email and Phone Number are required.");
//       return;
//     }

//     setLoading(true);

//     await dispatch(
//       sendCommentOtp({
//         postId: post._id,
//         name: userInfo.name,
//         email: userInfo.email,
//         phone: userInfo.phone,
//       })
//     );

//     setStep("otp");
//     setLoading(false);
//   };


//   const verifyOtp = async () =>
//   {
//     if (!otp.trim())
//     {
//       showToast("warning","OTP Required","Please enter OTP.");
//       return;
//     }

//     setLoading(true);

//     const result = await dispatch(
//       verifyCommentOtp({
//         postId: post._id,
//         email: userInfo.email,
//         otp: otp.trim(),
//       })
//     );

//     setLoading(false);

//     if (result.error)
//     {
//       showToast("error","Verification Failed",result.payload || "Invalid OTP");
//       return;
//     }

//     setIsVerified(true);

//     localStorage.setItem(
//       "verifiedUser",
//       JSON.stringify({ ...userInfo, verifiedAt: new Date().toISOString() })
//     );

//     setShowVerifyModal(false);
//     setShowCommentModal(true);
//   };

//   const submitComment = async () =>
//   {
//     if (!commentText.trim())
//     {
//       showToast("warning","Comment Required","Please write a comment.");
//       return;
//     }

//     setLoading(true);

//     const result = await dispatch(
//       postComment({
//         postId: post._id,
//         email: userInfo.email,
//         comment: commentText.trim(),
//       })
//     );

//     setLoading(false);

//     if (!result.error)
//     {
//       setCommentText("");
//       setShowCommentModal(false);
//       dispatch(fetchBlogPostById(slug));
//       localStorage.setItem("blogCommentsUpdated", "true");
//       showToast("success","Comment Posted","Your comment has been published successfully.");
//     } else
//     {
//       showToast("error","Comment Failed",result.payload || "Failed to post comment");
//     }
//   };


//   return (



//     <div
//       className={`min-h-screen  ${isDark ? "bg-black text-white" : "bg-white text-gray-900"}`}
//     >

//       {toast.show && (
//         <div className="fixed top-24 right-6 z-[9999] animate-in slide-in-from-right duration-300">
//           <div className={`px-6 py-4 rounded-2xl shadow-2xl border backdrop-blur-xl flex items-center gap-3 ${
//             toast.type==="success"
//             ? (isDark?"bg-[#3D220E]/95 border-[#8B6B4A]/40 text-white":"bg-white border-[#E8D9C2] text-[#3D220E]")
//             : toast.type==="error"
//             ? (isDark?"bg-red-900/95 border-red-500/40 text-white":"bg-white border-red-200 text-red-700")
//             : (isDark?"bg-yellow-900/95 border-yellow-500/40 text-white":"bg-white border-yellow-200 text-yellow-700")
//           }`}>
//             <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
//               toast.type==="success"?"bg-green-500":toast.type==="error"?"bg-red-500":"bg-yellow-500"
//             }`}>
//               {toast.type==="success"?"✓":toast.type==="error"?"✕":"!"}
//             </div>
//             <div>
//               <p className="font-semibold text-[15px]">{toast.title}</p>
//               <p className="text-sm opacity-80">{toast.message}</p>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Hero Section */}
//       <div className="relative h-auto mr-20 ml-20 overflow-hidden">
//         {post.images?.[0] ? (
//           <img
//             src={post.images[0]}
//             alt={post.name}
//             className="w-full h-full object-cover brightness-75"
//           />
//         ) : (
//           <div className={`absolute inset-0 ${isDark ? "bg-gradient-to-br from-gray-900 to-black" : "bg-gradient-to-br from-gray-100 to-white"}`} />
//         )}

//         <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent" />

//         {/* Title & Meta - Moved inside hero for better design */}
//         <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 max-w-5xl mx-auto">



//         </div>
//       </div>

//       {/* Main Content */}
//       <main className="max-w-4xl mx-auto px-6 md:px-8 py-12 md:py-20">


//         <span
//           className={`inline-block px-4 py-1.5 mb-4 text-sm rounded-full border ${isDark
//             ? "bg-[#3D220E]/40 border-[#8B6B4A]/40 text-[#E7D3BE]"
//             : "bg-[#F5EDE4] border-[#E8D9C2] text-[#8B6B4A]"
//             }`}
//         >
//           {post.category?.name || "Uncategorized"}
//         </span>

//         <div className={`flex flex-wrap items-center gap-4 text-lg ${isDark ? "text-gray-400" : "text-gray-600"}`}>
//           <div>
//             {post.createdAt
//               ? new Date(post.createdAt).toLocaleDateString("en-US", {
//                 month: "long",
//                 day: "numeric",
//                 year: "numeric",
//               })
//               : "Recently"}
//           </div>
//           <div className="flex items-center gap-2">
//             <span>•</span>
//             <span>{post.author ? `By ${post.author}` : "Anonymous"}</span>
//           </div>
//         </div>

//         <h1 className={`text-4xl md:text-6xl font-bold leading-tight mb-6 
//                text-zinc-900 dark:text-white 
//                tracking-tight  ${isDark ? "text-gray-300" : "text-gray-700"}`}>
//           {post.name || "Untitled"}
//         </h1>
//         <article className={`prose max-w-none ${isDark ? "prose-invert" : ""}`}>
//           {sanitizedContent ? (
//             <div
//               className={`text-[1.1rem] leading-relaxed ${isDark ? "text-gray-300" : "text-gray-700"}`}
//               dangerouslySetInnerHTML={{ __html: sanitizedContent }}
//             />
//           ) : (
//             <p className="text-center py-20 italic text-gray-500">
//               Content not available
//             </p>
//           )}

//           {/* Additional Images */}
//           {post.images?.length > 1 && (
//             <div className="my-16 grid grid-cols-1 md:grid-cols-2 gap-6">
//               {post.images.slice(1).map((img, idx) => (
//                 <img
//                   key={idx}
//                   src={img}
//                   alt={`Blog image ${idx + 2}`}
//                   className="rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 object-cover"
//                 />
//               ))}
//             </div>
//           )}
//         </article>

//         {/* Comments Section */}
//         <section className={`mt-20 rounded-[32px] p-8 md:p-10 border shadow-2xl
// ${isDark
//             ? "bg-[#111827] border-[#8B6B4A]/25 shadow-black/50"
//             : "bg-[#FCFAF8] border-[#E8D9C2] shadow-[#E8D9C2]/40"
//           }`}>
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
//             <div>
//               <h2 className="text-3xl font-bold mb-2">Comments</h2>
//               <p className="text-gray-500 dark:text-gray-400">
//                 {post.comments?.length || 0} comment{post.comments?.length !== 1 ? "s" : ""}
//               </p>
//             </div>

//             <button
//               onClick={() =>
//               {
//                 if (isVerified)
//                 {
//                   setShowCommentModal(true);
//                 } else
//                 {
//                   setShowVerifyModal(true);
//                   setStep("form");
//                 }
//               }}
//               className="px-6 py-3 bg-gradient-to-r from-[#3D220E] to-[#3D220E]/90 text-white rounded-full font-bold shadow-lg shadow-[#3D220E]/30 hover:shadow-[#3D220E]/50 transition-all"
//             >
//               Write a Comment
//             </button>
//           </div>
//           {/* // comment card */}
//           {post.comments?.length > 0 ? (
//             <div className="space-y-6">
//               {post.comments.map((comment, index) => (
//                 <div
//                   key={comment._id || index}
//                   className={`p-6 rounded-3xl border transition-all duration-300
// ${isDark
//                       ? "bg-[#1B2434] border-[#8B6B4A]/20 hover:border-[#8B6B4A]/50"
//                       : "bg-white border-[#E8D9C2] hover:border-[#8B6B4A]/40"
//                     }`}
//                 >
//                   <div className="flex justify-between mb-3">
//                     <div>
//                       <p
//                         className={`text-[16px] font-bold ${isDark ? "text-white" : "text-[#3D220E]"
//                           }`}
//                       >
//                         {comment.user?.name ||
//                           comment.user?.user ||
//                           (comment.user?.email
//                             ? comment.user.email.split("@")[0]
//                             : "Anonymous")}
//                       </p>
//                       <p className={`text-[12px] ${isDark ? "text-gray-500" : "text-[#8B6B4A]"
//                         }`}>
//                         {comment.createdAt
//                           ? new Date(comment.createdAt).toLocaleString("en-US", {
//                             month: "short",
//                             day: "numeric",
//                             year: "numeric",
//                             hour: "2-digit",
//                             minute: "2-digit",
//                           })
//                           : "Just now"}
//                       </p>
//                     </div>
//                   </div>
//                   <p className={`mt-4 text-[14px] leading-8 ${isDark
//                     ? "text-gray-200"
//                     : "text-[#5C4635]"
//                     }`}>
//                     {comment.comment}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="text-center py-12 text-gray-500 dark:text-gray-400">
//               <p>No comments yet. Be the first!</p>
//             </div>
//           )}
//         </section>


//         {showCommentModal && (
//           <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
//             <div className={`max-w-lg w-full rounded-2xl p-6 shadow-2xl ${isDark ? "bg-gray-900" : "bg-white"}`}>
//               <h2 className="text-2xl font-bold mb-5">Write a Comment</h2>

//               <textarea
//                 value={commentText}
//                 onChange={(e) => setCommentText(e.target.value)}
//                 placeholder="What are your thoughts?"
//                 rows={5}
//                 className={`w-full p-4 rounded-xl border min-h-[120px] focus:outline-none focus:ring-2 focus:ring-[#8B6B4A] ${isDark ? "bg-gray-800 border-gray-700 text-white" : "bg-gray-50 border-gray-300"
//                   }`}
//               />

//               <div className="flex gap-3 mt-5">
//                 <button
//                   onClick={() => setShowCommentModal(false)}
//                   className="flex-1 py-3 rounded-xl border font-medium"
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   onClick={submitComment}
//                   disabled={loading || !commentText.trim()}
//                   className="flex-1 py-3 rounded-xl bg-[#8B6B4A] hover:bg-[#7A5D42] text-white font-medium disabled:opacity-60"
//                 >
//                   {loading ? "Posting..." : "Post Comment"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Back Button */}
//         <div className="text-center mt-16">
//           <Link
//             to="/blog"
//             className={`inline-flex items-center px-8 py-4 rounded-xl font-medium text-lg transition-all duration-300 ${isDark
//               ? "bg-[#3D220E]/40 hover:bg-[#3D220E]/60 border border-[#8B6B4A]/40 text-[#E7D3BE] hover:border-[#8B6B4A]"
//               : "bg-[#F5EDE4] hover:bg-[#EAD8C6] border border-[#8B6B4A] text-[#8B6B4A] hover:text-[#3D220E]"
//               }`}
//           >
//             ← Back to all articles
//           </Link>
//         </div>
//       </main>

//       {showVerifyModal && (
//         <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
//           <div className={`max-w-md w-full rounded-2xl p-8 ${isDark ? "bg-gray-900" : "bg-white"} shadow-2xl`}>
//             <h2 className="text-2xl font-bold mb-6 text-center">
//               {step === "form" ? "Verify Yourself" : "Enter OTP"}
//             </h2>

//             {step === "form" ? (
//               <>
//                 <input
//                   type="text"
//                   placeholder="Full Name"
//                   value={userInfo.name}
//                   onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
//                   className={`w-full p-3 rounded-lg mb-4 border ${isDark ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-300"}`}
//                 />

//                 <input
//                   type="email"
//                   placeholder="Email Address"
//                   value={userInfo.email}
//                   onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
//                   className={`w-full p-3 rounded-lg mb-4 border ${isDark ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-300"}`}
//                 />

//                 <input
//                   type="tel"
//                   placeholder="Phone Number"
//                   value={userInfo.phone}
//                   onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
//                   className={`w-full p-3 rounded-lg mb-6 border ${isDark ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-300"
//                     }`}
//                 />

//                 <button
//                   onClick={sendOtp}
//                   disabled={loading}
//                   className="w-full bg-[#8B6B4A] hover:bg-[#7A5D42] py-3 rounded-lg text-white font-medium disabled:opacity-70"
//                 >
//                   {loading ? "Sending OTP..." : "Send OTP"}
//                 </button>
//               </>
//             ) : (
//               <>
//                 <p className="text-center mb-6 text-sm opacity-75">
//                   OTP sent to <strong>{userInfo.email}</strong>
//                 </p>

//                 <input
//                   type="text"
//                   placeholder="Enter 6-digit OTP"
//                   value={otp}
//                   onChange={(e) => setOtp(e.target.value)}
//                   maxLength={6}
//                   className={`w-full p-4 text-center text-2xl tracking-widest rounded-lg border mb-6 ${isDark ? "bg-gray-800" : "bg-gray-50"}`}
//                 />

//                 <button
//                   onClick={verifyOtp}
//                   disabled={loading}
//                   className="w-full bg-[#8B6B4A] hover:bg-[#7A5D42] py-3 rounded-lg text-white font-medium disabled:opacity-70"
//                 >
//                   {loading ? "Verifying..." : "Verify OTP"}
//                 </button>
//               </>
//             )}

//             <button
//               onClick={() => setShowVerifyModal(false)}
//               className="mt-6 text-sm text-gray-500 underline block mx-auto"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BlogDetail;

// import React, { useEffect, useState } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import DOMPurify from "dompurify";
// import { useTheme } from "../../context/ThemeContext";

// import
// {
//   fetchBlogPostById,
//   clearCurrentPost,
//   sendCommentOtp,
//   verifyCommentOtp,
//   postComment,
// } from "../Redux/Blog/blogSlice.js";

// const BlogDetail = () =>
// {
//   const { slug } = useParams();           // ← Changed to slug
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { isDark } = useTheme();

//   const [showVerifyModal, setShowVerifyModal] = useState(false);
//   const [showCommentModal, setShowCommentModal] = useState(false);
//   const [commentText, setCommentText] = useState("");
//   const [userInfo, setUserInfo] = useState({ name: "", email: "", phone: "" });
//   const [step, setStep] = useState("form");
//   const [otp, setOtp] = useState("");
//   const [isVerified, setIsVerified] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");

//   const { currentPost, detailStatus, detailError } = useSelector(
//     (state) => state.blog
//   );

//   // Fetch post when slug changes
//   useEffect(() =>
//   {
//     if (!slug)
//     {
//       navigate("/blog", { replace: true });
//       return;
//     }

//     dispatch(fetchBlogPostById(slug));     // ← Now passing slug

//     // Cleanup on unmount or slug change
//     return () =>
//     {
//       dispatch(clearCurrentPost());
//     };
//   }, [slug, dispatch, navigate]);

//   useEffect(() =>
//   {
//     const savedUser = localStorage.getItem("verifiedUser");

//     if (savedUser)
//     {
//       try
//       {
//         const parsedUser = JSON.parse(savedUser);

//         if (parsedUser?.email && parsedUser?.phone)
//         {
//           setUserInfo({
//             name: parsedUser.name || "",
//             email: parsedUser.email || "",
//             phone: parsedUser.phone || "",
//           });

//           setIsVerified(true);
//         }
//       } catch (error)
//       {
//         console.error("Failed to parse verifiedUser from localStorage", error);
//       }
//     }
//   }, []);


//   // Loading State
//   if (detailStatus === "loading")
//   {
//     return (
//       <div
//         className={`min-h-screen flex items-center justify-center ${isDark ? "bg-black" : "bg-gray-50"
//           }`}
//       >
//         <div className="flex flex-col items-center">

//           <div className="relative mb-8">
//             <div className="w-24 h-24 rounded-full border-4 border-[#8B6B4A]/20"></div>

//             <div className="absolute inset-0 w-24 h-24 rounded-full border-4 border-transparent border-t-[#8B6B4A] animate-spin"></div>

//             <div
//               className="absolute inset-3 w-[72px] h-[72px] rounded-full border-4 border-transparent border-r-[#D9C5B5] animate-spin"
//               style={{
//                 animationDirection: "reverse",
//                 animationDuration: "1.4s",
//               }}
//             ></div>

//             <div className="absolute inset-0 flex items-center justify-center">
//               <span className="text-3xl animate-pulse">✦</span>
//             </div>
//           </div>

//           <h3
//             className={`text-2xl font-bold mb-2 ${isDark ? "text-white" : "text-[#3D220E]"
//               }`}
//           >
//             Loading Article
//           </h3>

//           <p
//             className={`text-base ${isDark ? "text-gray-400" : "text-[#6E4E35]"
//               }`}
//           >
//             Preparing the latest article for you...
//           </p>

//           <div className="flex gap-2 mt-6">
//             <span className="w-2.5 h-2.5 rounded-full bg-[#8B6B4A] animate-bounce"></span>
//             <span
//               className="w-2.5 h-2.5 rounded-full bg-[#A77A55] animate-bounce"
//               style={{ animationDelay: "0.15s" }}
//             ></span>
//             <span
//               className="w-2.5 h-2.5 rounded-full bg-[#D9C5B5] animate-bounce"
//               style={{ animationDelay: "0.3s" }}
//             ></span>
//           </div>

//         </div>
//       </div>
//     );
//   }

//   // Error / Not Found State
//   if (detailStatus === "failed" || !currentPost)
//   {
//     return (
//       <div
//         className={`min-h-screen flex flex-col items-center justify-center p-6 ${isDark ? "bg-black text-white" : "bg-gray-50 text-gray-900"
//           }`}
//       >
//         <h1 className="text-4xl md:text-5xl font-black text-[#8B6B4A] mb-4">
//           Oops!
//         </h1>

//         <p
//           className={`text-xl mb-8 text-center max-w-md ${isDark ? "text-gray-300" : "text-[#5C4635]"
//             }`}
//         >
//           {detailError || "Post not found"}
//         </p>

//         <Link
//           to="/blog"
//           className={`px-8 py-4 rounded-xl font-medium transition-all duration-300 ${isDark
//             ? "bg-[#3D220E]/40 hover:bg-[#3D220E]/60 border border-[#8B6B4A]/40 text-[#E7D3BE]"
//             : "bg-[#F5EDE4] hover:bg-[#EAD8C6] border border-[#8B6B4A] text-[#8B6B4A] hover:text-[#3D220E]"
//             }`}
//         >
//           ← Back to Blog
//         </Link>
//       </div>
//     );
//   }

//   const post = currentPost;

//   const sanitizedContent = DOMPurify.sanitize(
//     post.content || post.fullDescription || post.description || ""
//   );

//   const sanitizedDescription = DOMPurify.sanitize(post.description || "", {
//     ALLOWED_TAGS: [],
//     ALLOWED_ATTR: [],
//   })
//     .replace(/&nbsp;/g, " ")
//     .replace(/\s+/g, " ")
//     .trim();


//   const sendOtp = async () =>
//   {
//     if (!userInfo.name || !userInfo.email || !userInfo.phone)
//     {
//       alert("Name, Email and Phone Number are required");
//       return;
//     }

//     setLoading(true);

//     await dispatch(
//       sendCommentOtp({
//         postId: post._id,
//         name: userInfo.name,
//         email: userInfo.email,
//         phone: userInfo.phone,
//       })
//     );

//     setStep("otp");
//     setLoading(false);
//   };


//   const verifyOtp = async () =>
//   {
//     if (!otp.trim())
//     {
//       alert("Please enter OTP");
//       return;
//     }

//     setLoading(true);

//     const result = await dispatch(
//       verifyCommentOtp({
//         postId: post._id,
//         email: userInfo.email,
//         otp: otp.trim(),
//       })
//     );

//     setLoading(false);

//     if (result.error)
//     {
//       alert(result.payload || "Invalid OTP");
//       return;
//     }

//     setIsVerified(true);

//     localStorage.setItem(
//       "verifiedUser",
//       JSON.stringify({ ...userInfo, verifiedAt: new Date().toISOString() })
//     );

//     setShowVerifyModal(false);
//     setShowCommentModal(true);
//   };

//   const submitComment = async () =>
//   {
//     if (!commentText.trim())
//     {
//       alert("Please write a comment");
//       return;
//     }

//     setLoading(true);

//     const result = await dispatch(
//       postComment({
//         postId: post._id,
//         email: userInfo.email,
//         comment: commentText.trim(),
//       })
//     );

//     setLoading(false);

//     if (!result.error)
//     {
//       setCommentText("");
//       setShowCommentModal(false);
//       dispatch(fetchBlogPostById(slug));
//       localStorage.setItem("blogCommentsUpdated", "true");
//       setSuccessMessage("Comment posted successfully!");
//       setTimeout(() => setSuccessMessage(""), 3000);
//     } else
//     {
//       alert(result.payload || "Failed to post comment");
//     }
//   };


//   return (



//     <div
//       className={`min-h-screen  ${isDark ? "bg-black text-white" : "bg-white text-gray-900"}`}
//     >

//       {successMessage && (
//         <div className="fixed top-24 right-6 z-[9999] animate-in slide-in-from-right duration-300">
//           <div
//             className={`px-6 py-4 rounded-2xl shadow-2xl border backdrop-blur-xl flex items-center gap-3
//       ${isDark
//                 ? "bg-[#3D220E]/95 border-[#8B6B4A]/40 text-white shadow-[#3D220E]/40"
//                 : "bg-white border-[#E8D9C2] text-[#3D220E] shadow-[#8B6B4A]/20"
//               }`}
//           >
//             <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
//               ✓
//             </div>

//             <div>
//               <p className="font-semibold text-[15px]">
//                 Comment Posted
//               </p>
//               <p className="text-sm opacity-80">
//                 Your comment has been published successfully.
//               </p>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Hero Section */}
//       <div className="relative h-auto mr-20 ml-20 overflow-hidden">
//         {post.images?.[0] ? (
//           <img
//             src={post.images[0]}
//             alt={post.name}
//             className="w-full h-full object-cover brightness-75"
//           />
//         ) : (
//           <div className={`absolute inset-0 ${isDark ? "bg-gradient-to-br from-gray-900 to-black" : "bg-gradient-to-br from-gray-100 to-white"}`} />
//         )}

//         <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent" />

//         {/* Title & Meta - Moved inside hero for better design */}
//         <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 max-w-5xl mx-auto">



//         </div>
//       </div>

//       {/* Main Content */}
//       <main className="max-w-4xl mx-auto px-6 md:px-8 py-12 md:py-20">


//         <span
//           className={`inline-block px-4 py-1.5 mb-4 text-sm rounded-full border ${isDark
//             ? "bg-[#3D220E]/40 border-[#8B6B4A]/40 text-[#E7D3BE]"
//             : "bg-[#F5EDE4] border-[#E8D9C2] text-[#8B6B4A]"
//             }`}
//         >
//           {post.category?.name || "Uncategorized"}
//         </span>

//         <div className={`flex flex-wrap items-center gap-4 text-lg ${isDark ? "text-gray-400" : "text-gray-600"}`}>
//           <div>
//             {post.createdAt
//               ? new Date(post.createdAt).toLocaleDateString("en-US", {
//                 month: "long",
//                 day: "numeric",
//                 year: "numeric",
//               })
//               : "Recently"}
//           </div>
//           <div className="flex items-center gap-2">
//             <span>•</span>
//             <span>{post.author ? `By ${post.author}` : "Anonymous"}</span>
//           </div>
//         </div>

//         <h1 className={`text-4xl md:text-6xl font-bold leading-tight mb-6 
//                text-zinc-900 dark:text-white 
//                tracking-tight  ${isDark ? "text-gray-300" : "text-gray-700"}`}>
//           {post.name || "Untitled"}
//         </h1>
//         <article className={`prose max-w-none ${isDark ? "prose-invert" : ""}`}>
//           {sanitizedContent ? (
//             <div
//               className={`text-[1.1rem] leading-relaxed ${isDark ? "text-gray-300" : "text-gray-700"}`}
//               dangerouslySetInnerHTML={{ __html: sanitizedContent }}
//             />
//           ) : (
//             <p className="text-center py-20 italic text-gray-500">
//               Content not available
//             </p>
//           )}

//           {/* Additional Images */}
//           {post.images?.length > 1 && (
//             <div className="my-16 grid grid-cols-1 md:grid-cols-2 gap-6">
//               {post.images.slice(1).map((img, idx) => (
//                 <img
//                   key={idx}
//                   src={img}
//                   alt={`Blog image ${idx + 2}`}
//                   className="rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 object-cover"
//                 />
//               ))}
//             </div>
//           )}
//         </article>

//         {/* Comments Section */}
//         <section className={`mt-20 rounded-[32px] p-8 md:p-10 border shadow-2xl
// ${isDark
//             ? "bg-[#111827] border-[#8B6B4A]/25 shadow-black/50"
//             : "bg-[#FCFAF8] border-[#E8D9C2] shadow-[#E8D9C2]/40"
//           }`}>
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
//             <div>
//               <h2 className="text-3xl font-bold mb-2">Comments</h2>
//               <p className="text-gray-500 dark:text-gray-400">
//                 {post.comments?.length || 0} comment{post.comments?.length !== 1 ? "s" : ""}
//               </p>
//             </div>

//             <button
//               onClick={() =>
//               {
//                 if (isVerified)
//                 {
//                   setShowCommentModal(true);
//                 } else
//                 {
//                   setShowVerifyModal(true);
//                   setStep("form");
//                 }
//               }}
//               className="px-6 py-3 bg-gradient-to-r from-[#3D220E] to-[#3D220E]/90 text-white rounded-full font-bold shadow-lg shadow-[#3D220E]/30 hover:shadow-[#3D220E]/50 transition-all"
//             >
//               Write a Comment
//             </button>
//           </div>
//           {/* // comment card */}
//           {post.comments?.length > 0 ? (
//             <div className="space-y-6">
//               {post.comments.map((comment, index) => (
//                 <div
//                   key={comment._id || index}
//                   className={`p-6 rounded-3xl border transition-all duration-300
// ${isDark
//                       ? "bg-[#1B2434] border-[#8B6B4A]/20 hover:border-[#8B6B4A]/50"
//                       : "bg-white border-[#E8D9C2] hover:border-[#8B6B4A]/40"
//                     }`}
//                 >
//                   <div className="flex justify-between mb-3">
//                     <div>
//                       <p
//                         className={`text-[16px] font-bold ${isDark ? "text-white" : "text-[#3D220E]"
//                           }`}
//                       >
//                         {comment.user?.name ||
//                           comment.user?.user ||
//                           (comment.user?.email
//                             ? comment.user.email.split("@")[0]
//                             : "Anonymous")}
//                       </p>
//                       <p className={`text-[12px] ${isDark ? "text-gray-500" : "text-[#8B6B4A]"
//                         }`}>
//                         {comment.createdAt
//                           ? new Date(comment.createdAt).toLocaleString("en-US", {
//                             month: "short",
//                             day: "numeric",
//                             year: "numeric",
//                             hour: "2-digit",
//                             minute: "2-digit",
//                           })
//                           : "Just now"}
//                       </p>
//                     </div>
//                   </div>
//                   <p className={`mt-4 text-[14px] leading-8 ${isDark
//                     ? "text-gray-200"
//                     : "text-[#5C4635]"
//                     }`}>
//                     {comment.comment}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="text-center py-12 text-gray-500 dark:text-gray-400">
//               <p>No comments yet. Be the first!</p>
//             </div>
//           )}
//         </section>


//         {showCommentModal && (
//           <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
//             <div className={`max-w-lg w-full rounded-2xl p-6 shadow-2xl ${isDark ? "bg-gray-900" : "bg-white"}`}>
//               <h2 className="text-2xl font-bold mb-5">Write a Comment</h2>

//               <textarea
//                 value={commentText}
//                 onChange={(e) => setCommentText(e.target.value)}
//                 placeholder="What are your thoughts?"
//                 rows={5}
//                 className={`w-full p-4 rounded-xl border min-h-[120px] focus:outline-none focus:ring-2 focus:ring-[#8B6B4A] ${isDark ? "bg-gray-800 border-gray-700 text-white" : "bg-gray-50 border-gray-300"
//                   }`}
//               />

//               <div className="flex gap-3 mt-5">
//                 <button
//                   onClick={() => setShowCommentModal(false)}
//                   className="flex-1 py-3 rounded-xl border font-medium"
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   onClick={submitComment}
//                   disabled={loading || !commentText.trim()}
//                   className="flex-1 py-3 rounded-xl bg-[#8B6B4A] hover:bg-[#7A5D42] text-white font-medium disabled:opacity-60"
//                 >
//                   {loading ? "Posting..." : "Post Comment"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Back Button */}
//         <div className="text-center mt-16">
//           <Link
//             to="/blog"
//             className={`inline-flex items-center px-8 py-4 rounded-xl font-medium text-lg transition-all duration-300 ${isDark
//               ? "bg-[#3D220E]/40 hover:bg-[#3D220E]/60 border border-[#8B6B4A]/40 text-[#E7D3BE] hover:border-[#8B6B4A]"
//               : "bg-[#F5EDE4] hover:bg-[#EAD8C6] border border-[#8B6B4A] text-[#8B6B4A] hover:text-[#3D220E]"
//               }`}
//           >
//             ← Back to all articles
//           </Link>
//         </div>
//       </main>

//       {showVerifyModal && (
//         <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
//           <div className={`max-w-md w-full rounded-2xl p-8 ${isDark ? "bg-gray-900" : "bg-white"} shadow-2xl`}>
//             <h2 className="text-2xl font-bold mb-6 text-center">
//               {step === "form" ? "Verify Yourself" : "Enter OTP"}
//             </h2>

//             {step === "form" ? (
//               <>
//                 <input
//                   type="text"
//                   placeholder="Full Name"
//                   value={userInfo.name}
//                   onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
//                   className={`w-full p-3 rounded-lg mb-4 border ${isDark ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-300"}`}
//                 />

//                 <input
//                   type="email"
//                   placeholder="Email Address"
//                   value={userInfo.email}
//                   onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
//                   className={`w-full p-3 rounded-lg mb-4 border ${isDark ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-300"}`}
//                 />

//                 <input
//                   type="tel"
//                   placeholder="Phone Number"
//                   value={userInfo.phone}
//                   onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
//                   className={`w-full p-3 rounded-lg mb-6 border ${isDark ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-300"
//                     }`}
//                 />

//                 <button
//                   onClick={sendOtp}
//                   disabled={loading}
//                   className="w-full bg-[#8B6B4A] hover:bg-[#7A5D42] py-3 rounded-lg text-white font-medium disabled:opacity-70"
//                 >
//                   {loading ? "Sending OTP..." : "Send OTP"}
//                 </button>
//               </>
//             ) : (
//               <>
//                 <p className="text-center mb-6 text-sm opacity-75">
//                   OTP sent to <strong>{userInfo.email}</strong>
//                 </p>

//                 <input
//                   type="text"
//                   placeholder="Enter 6-digit OTP"
//                   value={otp}
//                   onChange={(e) => setOtp(e.target.value)}
//                   maxLength={6}
//                   className={`w-full p-4 text-center text-2xl tracking-widest rounded-lg border mb-6 ${isDark ? "bg-gray-800" : "bg-gray-50"}`}
//                 />

//                 <button
//                   onClick={verifyOtp}
//                   disabled={loading}
//                   className="w-full bg-[#8B6B4A] hover:bg-[#7A5D42] py-3 rounded-lg text-white font-medium disabled:opacity-70"
//                 >
//                   {loading ? "Verifying..." : "Verify OTP"}
//                 </button>
//               </>
//             )}

//             <button
//               onClick={() => setShowVerifyModal(false)}
//               className="mt-6 text-sm text-gray-500 underline block mx-auto"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BlogDetail;