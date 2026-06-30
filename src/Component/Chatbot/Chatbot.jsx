

// // // // // import React, { useState, useRef, useEffect } from "react";
// // // // // import { motion, AnimatePresence } from "framer-motion";
// // // // // import { MessageCircle, X, Send } from "lucide-react";
// // // // // import { useTheme } from "../../context/ThemeContext";

// // // // // const Chatbot = () => {
// // // // //   const { isDark } = useTheme();
// // // // //   const [isOpen, setIsOpen] = useState(false);
// // // // //   const [showScrollTop, setShowScrollTop] = useState(false);
// // // // //   const [messages, setMessages] = useState([
// // // // //     {
// // // // //       type: "bot",
// // // // //       text: "Hi! I'm Atlas, your AI assistant at AI Knots IT Solution. How can I help you today?",
// // // // //     },
// // // // //   ]);
// // // // //   const [input, setInput] = useState("");
// // // // //   const [isLoading, setIsLoading] = useState(false);
// // // // //   const chatRef = useRef(null);

// // // // //   const quickReplies = [
// // // // //     "Tell me about your services",
// // // // //     "How can you help my business?",
// // // // //     "What is your pricing?",
// // // // //     "Contact information",
// // // // //   ];

// // // // //   // Scroll to Top
// // // // //   useEffect(() => {
// // // // //     const toggleVisibility = () => setShowScrollTop(window.scrollY > 400);
// // // // //     window.addEventListener("scroll", toggleVisibility);
// // // // //     return () => window.removeEventListener("scroll", toggleVisibility);
// // // // //   }, []);

// // // // //   const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

// // // // //   // Auto-scroll chat
// // // // //   useEffect(() => {
// // // // //     if (chatRef.current) {
// // // // //       chatRef.current.scrollTop = chatRef.current.scrollHeight;
// // // // //     }
// // // // //   }, [messages]);

// // // // //   const sendMessage = async (text = input) => {
// // // // //     if (!text.trim() || isLoading) return;

// // // // //     const userText = text.trim();
// // // // //     setInput("");
// // // // //     setIsLoading(true);
// // // // //     const tempId = Date.now();

// // // // //     setMessages((prev) => [
// // // // //       ...prev,
// // // // //       { type: "user", text: userText },
// // // // //       { type: "bot", text: "Thinking...", id: tempId },
// // // // //     ]);

// // // // //     try {
// // // // //       // Optional: Fetch latest website content (you can move this to backend later)
// // // // //       let websiteContext = "";
// // // // //       try {
// // // // //         const siteRes = await fetch("https://www.aiknotsit.com/");
// // // // //         if (siteRes.ok) {
// // // // //           const html = await siteRes.text();
// // // // //           // Simple extraction (you can improve this with a backend scraper)
// // // // //           websiteContext = html.slice(0, 8000); // limit size
// // // // //         }
// // // // //       } catch (e) {
// // // // //         console.warn("Could not fetch website content");
// // // // //       }

// // // // //       const response = await fetch("http://localhost:11434/api/generate", {
// // // // //         method: "POST",
// // // // //         headers: { "Content-Type": "application/json" },
// // // // //         body: JSON.stringify({
// // // // //           model: "llama3.2:3b",
// // // // //           prompt: `
// // // // // You are Atlas, the official friendly and professional AI Assistant of AI Knots IT Solution.

// // // // // Company Website: https://www.aiknotsit.com/

// // // // // Latest website content (use this as primary knowledge source):
// // // // // ${websiteContext || "No fresh data available. Use your trained knowledge."}

// // // // // Core Services:
// // // // // - Web Development
// // // // // - Mobile App Development
// // // // // - QA Testing & Quality Assurance
// // // // // - L2 Support
// // // // // - Voice, Chat & Email BPO
// // // // // - Infrastructure Setup
// // // // // - Digital Transformation
// // // // // - Digital Marketing

// // // // // Contact:
// // // // // - Office: 103, Goyal Vihar, Plot No 31-C, Zone 2, M.P. Nagar, Bhopal - 462011, Madhya Pradesh, India
// // // // // - Phone: +91 78696 36070
// // // // // - Email: support@aiknotsit.com (or support@atlaknots.com)

// // // // // Rules:
// // // // // - Always be helpful, professional and concise.
// // // // // - Prefer information from the website context above.
// // // // // - If you don't know something, say: "I don't have that information right now. Please contact the AI Knots team at +91 78696 36070."
// // // // // - Never make up information.

// // // // // User Question: ${userText}
// // // // // `,
// // // // //           stream: false,
// // // // //         }),
// // // // //       });

// // // // //       if (!response.ok) throw new Error("Failed to connect to Ollama");

// // // // //       const data = await response.json();

// // // // //       setMessages((prev) =>
// // // // //         prev
// // // // //           .filter((msg) => msg.id !== tempId)
// // // // //           .concat({
// // // // //             type: "bot",
// // // // //             text: data.response || "Sorry, I couldn't generate a response.",
// // // // //           })
// // // // //       );
// // // // //     } catch (error) {
// // // // //       console.error("Ollama Error:", error);
// // // // //       setMessages((prev) =>
// // // // //         prev
// // // // //           .filter((msg) => msg.id !== tempId)
// // // // //           .concat({
// // // // //             type: "bot",
// // // // //             text: "❌ Can't connect to Ollama. Make sure it's running with 'llama3.2:3b'.",
// // // // //           })
// // // // //       );
// // // // //     } finally {
// // // // //       setIsLoading(false);
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <>
// // // // //       {/* Scroll to Top Button */}
// // // // //       <button
// // // // //         onClick={scrollToTop}
// // // // //         className={`fixed bottom-8 right-8 z-[90] p-4 rounded-full bg-[#8B6B4A] text-white shadow-lg shadow-red-900/40 transition-all duration-300 ${
// // // // //           showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16 pointer-events-none"
// // // // //         }`}
// // // // //         aria-label="Scroll back to top"
// // // // //       >
// // // // //         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // // //           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
// // // // //         </svg>
// // // // //       </button>

// // // // //       {/* Floating Chat Button */}
// // // // //       <button
// // // // //         onClick={() => setIsOpen(!isOpen)}
// // // // //         className="fixed bottom-8 right-24 z-[100] p-4 rounded-full bg-[#8B6B4A] hover:bg-[#6B4B3A] text-white shadow-xl shadow-red-900/50 transition-all duration-300 flex items-center justify-center"
// // // // //         aria-label="Open Chatbot"
// // // // //       >
// // // // //         <MessageCircle className="w-6 h-6" />
// // // // //       </button>

// // // // //       {/* Chat Window */}
// // // // //       <AnimatePresence>
// // // // //         {isOpen && (
// // // // //           <motion.div
// // // // //             initial={{ opacity: 0, y: 100, scale: 0.95 }}
// // // // //             animate={{ opacity: 1, y: 0, scale: 1 }}
// // // // //             exit={{ opacity: 0, y: 100, scale: 0.95 }}
// // // // //             transition={{ duration: 0.3 }}
// // // // //             className={`fixed bottom-24 right-8 z-[110] w-full max-w-[380px] border rounded-3xl shadow-2xl overflow-hidden ${
// // // // //               isDark ? "bg-gray-950 border-[#8B6B4A]/50" : "bg-white border-gray-200"
// // // // //             }`}
// // // // //           >
// // // // //             {/* Header */}
// // // // //             <div className="bg-[#8B6B4A] p-4 flex items-center justify-between">
// // // // //               <div className="flex items-center gap-3">
// // // // //                 <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center">
// // // // //                   <MessageCircle className="w-6 h-6" />
// // // // //                 </div>
// // // // //                 <div>
// // // // //                   <h3 className="font-semibold text-white">Atlas Assistant</h3>
// // // // //                   <p className="text-xs text-red-100">Online • AI Knots IT</p>
// // // // //                 </div>
// // // // //               </div>
// // // // //               <button onClick={() => setIsOpen(false)} className="text-white hover:text-red-200 transition-colors">
// // // // //                 <X className="w-5 h-5" />
// // // // //               </button>
// // // // //             </div>

// // // // //             {/* Messages */}
// // // // //             <div
// // // // //               ref={chatRef}
// // // // //               className={`h-80 overflow-y-auto p-4 space-y-4 ${isDark ? "bg-black/60" : "bg-gray-50"}`}
// // // // //             >
// // // // //               {messages.map((msg, idx) => (
// // // // //                 <div key={idx} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
// // // // //                   <div
// // // // //                     className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
// // // // //                       msg.type === "user"
// // // // //                         ? "bg-red-600 text-white"
// // // // //                         : isDark
// // // // //                         ? "bg-gray-900 text-gray-200 border border-gray-800"
// // // // //                         : "bg-gray-100 text-gray-800 border border-gray-200"
// // // // //                     }`}
// // // // //                   >
// // // // //                     {msg.text}
// // // // //                   </div>
// // // // //                 </div>
// // // // //               ))}
// // // // //             </div>

// // // // //             {/* Quick Replies */}
// // // // //             <div className={`p-3 border-t flex flex-wrap gap-2 ${isDark ? "border-gray-800 bg-gray-950" : "border-gray-200 bg-white"}`}>
// // // // //               {quickReplies.map((reply, idx) => (
// // // // //                 <button
// // // // //                   key={idx}
// // // // //                   onClick={() => sendMessage(reply)}
// // // // //                   disabled={isLoading}
// // // // //                   className={`text-xs px-4 py-2 rounded-full transition-all ${
// // // // //                     isDark ? "bg-gray-900 hover:bg-red-950 border border-gray-700" : "bg-gray-100 hover:bg-red-50 border border-gray-300"
// // // // //                   }`}
// // // // //                 >
// // // // //                   {reply}
// // // // //                 </button>
// // // // //               ))}
// // // // //             </div>

// // // // //             {/* Input Area */}
// // // // //             <div className={`p-4 border-t flex gap-2 ${isDark ? "border-gray-800 bg-gray-950" : "border-gray-200 bg-white"}`}>
// // // // //               <input
// // // // //                 type="text"
// // // // //                 value={input}
// // // // //                 onChange={(e) => setInput(e.target.value)}
// // // // //                 onKeyDown={(e) => e.key === "Enter" && sendMessage()}
// // // // //                 placeholder="Type your message..."
// // // // //                 className={`flex-1 rounded-full px-5 py-3 text-sm focus:outline-none ${
// // // // //                   isDark
// // // // //                     ? "bg-gray-900 border border-gray-700 focus:border-red-600"
// // // // //                     : "bg-gray-100 border border-gray-300 focus:border-red-500"
// // // // //                 }`}
// // // // //                 disabled={isLoading}
// // // // //               />
// // // // //               <button
// // // // //                 onClick={() => sendMessage()}
// // // // //                 disabled={!input.trim() || isLoading}
// // // // //                 className="bg-red-600 hover:bg-red-700 disabled:bg-gray-700 p-3 rounded-full transition-all"
// // // // //               >
// // // // //                 <Send className="w-5 h-5" />
// // // // //               </button>
// // // // //             </div>
// // // // //           </motion.div>
// // // // //         )}
// // // // //       </AnimatePresence>
// // // // //     </>
// // // // //   );
// // // // // };

// // // // // export default Chatbot;




// // // // import React, { useState, useRef, useEffect } from "react";
// // // // import { motion, AnimatePresence } from "framer-motion";
// // // // import { MessageCircle, X, Send } from "lucide-react";
// // // // import { useTheme } from "../../context/ThemeContext";

// // // // const Chatbot = () => {
// // // //   const { isDark } = useTheme();
// // // //   const [isOpen, setIsOpen] = useState(false);
// // // //   const [showScrollTop, setShowScrollTop] = useState(false);
// // // //   const [messages, setMessages] = useState([
// // // //     {
// // // //       type: "bot",
// // // //       text: "Hi! I'm Atlas, your AI assistant at AI Knots IT Solution. How can I help you today?",
// // // //     },
// // // //   ]);
// // // //   const [input, setInput] = useState("");
// // // //   const [isLoading, setIsLoading] = useState(false);
// // // //   const chatRef = useRef(null);

// // // //   const quickReplies = [
// // // //     "Tell me about your services",
// // // //     "How can you help my business?",
// // // //     "What is your pricing?",
// // // //     "Contact information",
// // // //   ];

// // // //   // Scroll to Top
// // // //   useEffect(() => {
// // // //     const toggleVisibility = () => setShowScrollTop(window.scrollY > 400);
// // // //     window.addEventListener("scroll", toggleVisibility);
// // // //     return () => window.removeEventListener("scroll", toggleVisibility);
// // // //   }, []);

// // // //   const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

// // // //   // Auto-scroll chat
// // // //   useEffect(() => {
// // // //     if (chatRef.current) {
// // // //       chatRef.current.scrollTop = chatRef.current.scrollHeight;
// // // //     }
// // // //   }, [messages]);

// // // //   const sendMessage = async (text = input) => {
// // // //     if (!text.trim() || isLoading) return;

// // // //     const userText = text.trim();
// // // //     setInput("");
// // // //     setIsLoading(true);
// // // //     const tempId = Date.now();

// // // //     setMessages((prev) => [
// // // //       ...prev,
// // // //       { type: "user", text: userText },
// // // //       { type: "bot", text: "Thinking...", id: tempId },
// // // //     ]);

// // // //     try {
// // // //       // Generate unique session ID
// // // //       const sessionId = crypto.randomUUID?.() || `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

// // // //       const payload = {
// // // //         output_type: "chat",
// // // //         input_type: "chat",
// // // //         input_value: userText,
// // // //         session_id: sessionId,
// // // //       };

// // // //       const response = await fetch(
// // // //         "http://localhost:7860/api/v1/run/2a77917b-8dac-4b57-bb0e-d3bf941e0884",
// // // //         {
// // // //           method: "POST",
// // // //           headers: {
// // // //             "Content-Type": "application/json",
// // // //             "x-api-key": "sk-eGUHS_Kf-IKIhF5eSk1cgYmzw6JEnoh4ykCLEdPAMWA", // ← Yeh change kar dena
// // // //           },
// // // //           body: JSON.stringify(payload),
// // // //         }
// // // //       );

// // // //       if (!response.ok) {
// // // //         throw new Error(`Langflow Error: ${response.status}`);
// // // //       }

// // // //       const data = await response.json();

// // // //       // Langflow ke response ko handle karna (structure thoda alag hota hai)
// // // //       let botReply = "Sorry, I couldn't process your request.";

// // // //       if (data.outputs?.[0]?.outputs?.[0]?.outputs?.message) {
// // // //         botReply = data.outputs[0].outputs[0].outputs.message;
// // // //       } else if (data.outputs?.[0]?.outputs?.[0]?.results?.message) {
// // // //         botReply = data.outputs[0].outputs[0].results.message;
// // // //       } else if (typeof data === "string") {
// // // //         botReply = data;
// // // //       } else if (data.message) {
// // // //         botReply = data.message;
// // // //       }

// // // //       setMessages((prev) =>
// // // //         prev
// // // //           .filter((msg) => msg.id !== tempId)
// // // //           .concat({
// // // //             type: "bot",
// // // //             text: botReply,
// // // //           })
// // // //       );
// // // //     } catch (error) {
// // // //       console.error("Langflow Error:", error);
// // // //       setMessages((prev) =>
// // // //         prev
// // // //           .filter((msg) => msg.id !== tempId)
// // // //           .concat({
// // // //             type: "bot",
// // // //             text: "❌ Can't connect to Langflow. Make sure it's running on port 7860.",
// // // //           })
// // // //       );
// // // //     } finally {
// // // //       setIsLoading(false);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <>
// // // //       {/* Scroll to Top Button */}
// // // //       <button
// // // //         onClick={scrollToTop}
// // // //         className={`fixed bottom-8 right-8 z-[90] p-4 rounded-full bg-[#8B6B4A] text-white shadow-lg shadow-red-900/40 transition-all duration-300 ${
// // // //           showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16 pointer-events-none"
// // // //         }`}
// // // //         aria-label="Scroll back to top"
// // // //       >
// // // //         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // // //           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
// // // //         </svg>
// // // //       </button>

// // // //       {/* Floating Chat Button */}
// // // //       <button
// // // //         onClick={() => setIsOpen(!isOpen)}
// // // //         className="fixed bottom-8 right-24 z-[100] p-4 rounded-full bg-[#8B6B4A] hover:bg-[#6B4B3A] text-white shadow-xl shadow-red-900/50 transition-all duration-300 flex items-center justify-center"
// // // //         aria-label="Open Chatbot"
// // // //       >
// // // //         <MessageCircle className="w-6 h-6" />
// // // //       </button>

// // // //       {/* Chat Window */}
// // // //       <AnimatePresence>
// // // //         {isOpen && (
// // // //           <motion.div
// // // //             initial={{ opacity: 0, y: 100, scale: 0.95 }}
// // // //             animate={{ opacity: 1, y: 0, scale: 1 }}
// // // //             exit={{ opacity: 0, y: 100, scale: 0.95 }}
// // // //             transition={{ duration: 0.3 }}
// // // //             className={`fixed bottom-24 right-8 z-[110] w-full max-w-[380px] border rounded-3xl shadow-2xl overflow-hidden ${
// // // //               isDark ? "bg-gray-950 border-[#8B6B4A]/50" : "bg-white border-gray-200"
// // // //             }`}
// // // //           >
// // // //             {/* Header */}
// // // //             <div className="bg-[#8B6B4A] p-4 flex items-center justify-between">
// // // //               <div className="flex items-center gap-3">
// // // //                 <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center">
// // // //                   <MessageCircle className="w-6 h-6" />
// // // //                 </div>
// // // //                 <div>
// // // //                   <h3 className="font-semibold text-white">Atlas Assistant</h3>
// // // //                   <p className="text-xs text-red-100">Online • AI Knots IT</p>
// // // //                 </div>
// // // //               </div>
// // // //               <button onClick={() => setIsOpen(false)} className="text-white hover:text-red-200 transition-colors">
// // // //                 <X className="w-5 h-5" />
// // // //               </button>
// // // //             </div>

// // // //             {/* Messages */}
// // // //             <div
// // // //               ref={chatRef}
// // // //               className={`h-80 overflow-y-auto p-4 space-y-4 ${isDark ? "bg-black/60" : "bg-gray-50"}`}
// // // //             >
// // // //               {messages.map((msg, idx) => (
// // // //                 <div key={idx} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
// // // //                   <div
// // // //                     className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
// // // //                       msg.type === "user"
// // // //                         ? "bg-red-600 text-white"
// // // //                         : isDark
// // // //                         ? "bg-gray-900 text-gray-200 border border-gray-800"
// // // //                         : "bg-gray-100 text-gray-800 border border-gray-200"
// // // //                     }`}
// // // //                   >
// // // //                     {msg.text}
// // // //                   </div>
// // // //                 </div>
// // // //               ))}
// // // //             </div>

// // // //             {/* Quick Replies */}
// // // //             <div className={`p-3 border-t flex flex-wrap gap-2 ${isDark ? "border-gray-800 bg-gray-950" : "border-gray-200 bg-white"}`}>
// // // //               {quickReplies.map((reply, idx) => (
// // // //                 <button
// // // //                   key={idx}
// // // //                   onClick={() => sendMessage(reply)}
// // // //                   disabled={isLoading}
// // // //                   className={`text-xs px-4 py-2 rounded-full transition-all ${
// // // //                     isDark ? "bg-gray-900 hover:bg-red-950 border border-gray-700" : "bg-gray-100 hover:bg-red-50 border border-gray-300"
// // // //                   }`}
// // // //                 >
// // // //                   {reply}
// // // //                 </button>
// // // //               ))}
// // // //             </div>

// // // //             {/* Input Area */}
// // // //             <div className={`p-4 border-t flex gap-2 ${isDark ? "border-gray-800 bg-gray-950" : "border-gray-200 bg-white"}`}>
// // // //               <input
// // // //                 type="text"
// // // //                 value={input}
// // // //                 onChange={(e) => setInput(e.target.value)}
// // // //                 onKeyDown={(e) => e.key === "Enter" && sendMessage()}
// // // //                 placeholder="Type your message..."
// // // //                 className={`flex-1 rounded-full px-5 py-3 text-sm focus:outline-none ${
// // // //                   isDark
// // // //                     ? "bg-gray-900 border border-gray-700 focus:border-red-600"
// // // //                     : "bg-gray-100 border border-gray-300 focus:border-red-500"
// // // //                 }`}
// // // //                 disabled={isLoading}
// // // //               />
// // // //               <button
// // // //                 onClick={() => sendMessage()}
// // // //                 disabled={!input.trim() || isLoading}
// // // //                 className="bg-red-600 hover:bg-red-700 disabled:bg-gray-700 p-3 rounded-full transition-all"
// // // //               >
// // // //                 <Send className="w-5 h-5" />
// // // //               </button>
// // // //             </div>
// // // //           </motion.div>
// // // //         )}
// // // //       </AnimatePresence>
// // // //     </>
// // // //   );
// // // // };

// // // // export default Chatbot;

// // // import React, { useState, useRef, useEffect } from "react";
// // // import { motion, AnimatePresence } from "framer-motion";
// // // import { MessageCircle, X, Send } from "lucide-react";
// // // import { useTheme } from "../../context/ThemeContext";

// // // const Chatbot = () => {
// // //   const { isDark } = useTheme();
// // //   const [isOpen, setIsOpen] = useState(false);
// // //   const [showScrollTop, setShowScrollTop] = useState(false);
// // //   const [messages, setMessages] = useState([
// // //     {
// // //       type: "bot",
// // //       text: "Hi! I'm Atlas, your AI assistant at AI Knots IT Solution. How can I help you today?",
// // //     },
// // //   ]);
// // //   const [input, setInput] = useState("");
// // //   const [isLoading, setIsLoading] = useState(false);
// // //   const chatRef = useRef(null);

// // //   const quickReplies = [
// // //     "Tell me about your services",
// // //     "How can you help my business?",
// // //     "What is your pricing?",
// // //     "Contact information",
// // //   ];

// // //   useEffect(() => {
// // //     const toggleVisibility = () => setShowScrollTop(window.scrollY > 400);
// // //     window.addEventListener("scroll", toggleVisibility);
// // //     return () => window.removeEventListener("scroll", toggleVisibility);
// // //   }, []);

// // //   const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

// // //   useEffect(() => {
// // //     if (chatRef.current) {
// // //       chatRef.current.scrollTop = chatRef.current.scrollHeight;
// // //     }
// // //   }, [messages]);

// // //   // Helper function to safely extract text from Langflow response
// // //   const extractBotReply = (data) => {
// // //     if (!data) return "Sorry, I couldn't process your request.";

// // //     // Try different possible Langflow response structures
// // //     try {
// // //       // Common structure 1
// // //       if (data.outputs?.[0]?.outputs?.[0]?.outputs?.message) {
// // //         return data.outputs[0].outputs[0].outputs.message;
// // //       }
// // //       // Common structure 2
// // //       if (data.outputs?.[0]?.outputs?.[0]?.results?.message) {
// // //         return data.outputs[0].outputs[0].results.message;
// // //       }
// // //       // Structure 3
// // //       if (data.outputs?.[0]?.outputs?.[0]?.text) {
// // //         return data.outputs[0].outputs[0].text;
// // //       }
// // //       // Direct message
// // //       if (data.message && typeof data.message === "string") {
// // //         return data.message;
// // //       }
// // //       // If response is string
// // //       if (typeof data === "string") {
// // //         return data;
// // //       }
// // //       // Fallback: stringify object for debugging
// // //       if (typeof data === "object") {
// // //         console.log("Langflow Full Response:", data); // For debugging
// // //         return "I received your message. How else can I assist you?";
// // //       }
// // //     } catch (e) {
// // //       console.error("Response parsing error:", e);
// // //     }

// // //     return "I'm here to help! Could you please rephrase your question?";
// // //   };

// // //   const sendMessage = async (text = input) => {
// // //     if (!text.trim() || isLoading) return;

// // //     const userText = text.trim();
// // //     setInput("");
// // //     setIsLoading(true);
// // //     const tempId = Date.now();

// // //     setMessages((prev) => [
// // //       ...prev,
// // //       { type: "user", text: userText },
// // //       { type: "bot", text: "Thinking...", id: tempId },
// // //     ]);

// // //     try {
// // //       const sessionId = crypto.randomUUID?.() || `session-${Date.now()}`;

// // //       const payload = {
// // //         output_type: "chat",
// // //         input_type: "chat",
// // //         input_value: userText,
// // //         session_id: sessionId,
// // //       };

// // //       const response = await fetch(
// // //         "http://localhost:7860/api/v1/run/2a77917b-8dac-4b57-bb0e-d3bf941e0884",
// // //         {
// // //           method: "POST",
// // //           headers: {
// // //             "Content-Type": "application/json",
// // //             "x-api-key": "sk-eGUHS_Kf-IKIhF5eSk1cgYmzw6JEnoh4ykCLEdPAMWA",   // ← Replace with real key
// // //           },
// // //           body: JSON.stringify(payload),
// // //         }
// // //       );

// // //       if (!response.ok) throw new Error(`HTTP ${response.status}`);

// // //       const data = await response.json();
// // //       const botReply = extractBotReply(data);

// // //       setMessages((prev) =>
// // //         prev
// // //           .filter((msg) => msg.id !== tempId)
// // //           .concat({ type: "bot", text: botReply })
// // //       );
// // //     } catch (error) {
// // //       console.error("Langflow Error:", error);
// // //       setMessages((prev) =>
// // //         prev
// // //           .filter((msg) => msg.id !== tempId)
// // //           .concat({
// // //             type: "bot",
// // //             text: "❌ Unable to connect to AI. Please check if Langflow is running.",
// // //           })
// // //       );
// // //     } finally {
// // //       setIsLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <>
// // //       {/* Scroll to Top Button */}
// // //       <button
// // //         onClick={scrollToTop}
// // //         className={`fixed bottom-8 right-8 z-[90] p-4 rounded-full bg-[#8B6B4A] text-white shadow-lg shadow-red-900/40 transition-all duration-300 ${
// // //           showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16 pointer-events-none"
// // //         }`}
// // //         aria-label="Scroll back to top"
// // //       >
// // //         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
// // //         </svg>
// // //       </button>

// // //       {/* Floating Chat Button */}
// // //       <button
// // //         onClick={() => setIsOpen(!isOpen)}
// // //         className="fixed bottom-8 right-24 z-[100] p-4 rounded-full bg-[#8B6B4A] hover:bg-[#6B4B3A] text-white shadow-xl shadow-red-900/50 transition-all duration-300 flex items-center justify-center"
// // //         aria-label="Open Chatbot"
// // //       >
// // //         <MessageCircle className="w-6 h-6" />
// // //       </button>

// // //       {/* Chat Window */}
// // //       <AnimatePresence>
// // //         {isOpen && (
// // //           <motion.div
// // //             initial={{ opacity: 0, y: 100, scale: 0.95 }}
// // //             animate={{ opacity: 1, y: 0, scale: 1 }}
// // //             exit={{ opacity: 0, y: 100, scale: 0.95 }}
// // //             transition={{ duration: 0.3 }}
// // //             className={`fixed bottom-24 right-8 z-[110] w-full max-w-[380px] border rounded-3xl shadow-2xl overflow-hidden ${
// // //               isDark ? "bg-gray-950 border-[#8B6B4A]/50" : "bg-white border-gray-200"
// // //             }`}
// // //           >
// // //             {/* Header */}
// // //             <div className="bg-[#8B6B4A] p-4 flex items-center justify-between">
// // //               <div className="flex items-center gap-3">
// // //                 <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center">
// // //                   <MessageCircle className="w-6 h-6" />
// // //                 </div>
// // //                 <div>
// // //                   <h3 className="font-semibold text-white">Atlas Assistant</h3>
// // //                   <p className="text-xs text-red-100">Online • AI Knots IT</p>
// // //                 </div>
// // //               </div>
// // //               <button onClick={() => setIsOpen(false)} className="text-white hover:text-red-200 transition-colors">
// // //                 <X className="w-5 h-5" />
// // //               </button>
// // //             </div>

// // //             {/* Messages Area */}
// // //             <div
// // //               ref={chatRef}
// // //               className={`h-80 overflow-y-auto p-4 space-y-4 ${isDark ? "bg-black/60" : "bg-gray-50"}`}
// // //             >
// // //               {messages.map((msg, idx) => (
// // //                 <div key={idx} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
// // //                   <div
// // //                     className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
// // //                       msg.type === "user"
// // //                         ? "bg-red-600 text-white"
// // //                         : isDark
// // //                         ? "bg-gray-900 text-gray-200 border border-gray-800"
// // //                         : "bg-gray-100 text-gray-800 border border-gray-200"
// // //                     }`}
// // //                   >
// // //                     {msg.text}
// // //                   </div>
// // //                 </div>
// // //               ))}
// // //             </div>

// // //             {/* Quick Replies */}
// // //             <div className={`p-3 border-t flex flex-wrap gap-2 ${isDark ? "border-gray-800 bg-gray-950" : "border-gray-200 bg-white"}`}>
// // //               {quickReplies.map((reply, idx) => (
// // //                 <button
// // //                   key={idx}
// // //                   onClick={() => sendMessage(reply)}
// // //                   disabled={isLoading}
// // //                   className={`text-xs px-4 py-2 rounded-full transition-all ${
// // //                     isDark ? "bg-gray-900 hover:bg-red-950 border border-gray-700" : "bg-gray-100 hover:bg-red-50 border border-gray-300"
// // //                   }`}
// // //                 >
// // //                   {reply}
// // //                 </button>
// // //               ))}
// // //             </div>

// // //             {/* Input Area */}
// // //             <div className={`p-4 border-t flex gap-2 ${isDark ? "border-gray-800 bg-gray-950" : "border-gray-200 bg-white"}`}>
// // //               <input
// // //                 type="text"
// // //                 value={input}
// // //                 onChange={(e) => setInput(e.target.value)}
// // //                 onKeyDown={(e) => e.key === "Enter" && sendMessage()}
// // //                 placeholder="Type your message..."
// // //                 className={`flex-1 rounded-full px-5 py-3 text-sm focus:outline-none ${
// // //                   isDark
// // //                     ? "bg-gray-900 border border-gray-700 focus:border-red-600"
// // //                     : "bg-gray-100 border border-gray-300 focus:border-red-500"
// // //                 }`}
// // //                 disabled={isLoading}
// // //               />
// // //               <button
// // //                 onClick={() => sendMessage()}
// // //                 disabled={!input.trim() || isLoading}
// // //                 className="bg-red-600 hover:bg-red-700 disabled:bg-gray-700 p-3 rounded-full transition-all"
// // //               >
// // //                 <Send className="w-5 h-5" />
// // //               </button>
// // //             </div>
// // //           </motion.div>
// // //         )}
// // //       </AnimatePresence>
// // //     </>
// // //   );
// // // };

// // // export default Chatbot;

// // // import React, { useState, useRef, useEffect } from "react";
// // // import { motion, AnimatePresence } from "framer-motion";
// // // import { MessageCircle, X, Send } from "lucide-react";
// // // import { useTheme } from "../../context/ThemeContext";

// // // const Chatbot = () => {
// // //   const { isDark } = useTheme();
// // //   const [isOpen, setIsOpen] = useState(false);
// // //   const [showScrollTop, setShowScrollTop] = useState(false);
// // //   const [messages, setMessages] = useState([
// // //     {
// // //       type: "bot",
// // //       text: "Hi! I'm Atlas, your AI assistant at AI Knots IT Solution. How can I help you today?",
// // //     },
// // //   ]);
// // //   const [input, setInput] = useState("");
// // //   const [isLoading, setIsLoading] = useState(false);
// // //   const chatRef = useRef(null);

// // //   const quickReplies = [
// // //     "Tell me about your services",
// // //     "How can you help my business?",
// // //     "What is your pricing?",
// // //     "Contact information",
// // //   ];

// // //   useEffect(() => {
// // //     const toggleVisibility = () => setShowScrollTop(window.scrollY > 400);
// // //     window.addEventListener("scroll", toggleVisibility);
// // //     return () => window.removeEventListener("scroll", toggleVisibility);
// // //   }, []);

// // //   const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

// // //   useEffect(() => {
// // //     if (chatRef.current) {
// // //       chatRef.current.scrollTop = chatRef.current.scrollHeight;
// // //     }
// // //   }, [messages]);

// // //   // Improved safe text extractor
// // //   const extractBotReply = (data) => {
// // //     console.log("🔍 Full Langflow Response:", data); // Check this in console

// // //     if (!data) return "Sorry, I couldn't process your request.";

// // //     // Handle different Langflow response structures
// // //     let text = "";

// // //     try {
// // //       // Most common Langflow structure for chat output
// // //       if (data.outputs?.[0]?.outputs?.[0]?.outputs?.message) {
// // //         text = data.outputs[0].outputs[0].outputs.message;
// // //       } else if (data.outputs?.[0]?.outputs?.[0]?.results?.message) {
// // //         text = data.outputs[0].outputs[0].results.message;
// // //       } else if (data.outputs?.[0]?.outputs?.[0]?.text) {
// // //         text = data.outputs[0].outputs[0].text;
// // //       } 
// // //       // New structure you are getting: { message, type }
// // //       else if (data.outputs?.[0]?.outputs?.[0]?.message?.message) {
// // //         text = data.outputs[0].outputs[0].message.message;
// // //       } else if (data.message?.message) {
// // //         text = data.message.message;
// // //       } else if (data.message && typeof data.message === "string") {
// // //         text = data.message;
// // //       } 
// // //       // Direct object
// // //       else if (typeof data === "object" && data.message) {
// // //         text = typeof data.message === "string" 
// // //           ? data.message 
// // //           : JSON.stringify(data.message);
// // //       }

// // //       // Final fallback
// // //       if (!text && typeof data === "object") {
// // //         text = JSON.stringify(data).slice(0, 200) + "...";
// // //       }

// // //       return text || "I received your message. How can I assist you further?";
// // //     } catch (err) {
// // //       console.error("Response parsing failed:", err);
// // //       return "I'm having trouble understanding the response right now.";
// // //     }
// // //   };

// // //   const sendMessage = async (text = input) => {
// // //     if (!text.trim() || isLoading) return;

// // //     const userText = text.trim();
// // //     setInput("");
// // //     setIsLoading(true);
// // //     const tempId = Date.now();

// // //     setMessages((prev) => [
// // //       ...prev,
// // //       { type: "user", text: userText },
// // //       { type: "bot", text: "Thinking...", id: tempId },
// // //     ]);

// // //     try {
// // //       const sessionId = crypto.randomUUID?.() || `session-${Date.now()}`;

// // //       const payload = {
// // //         output_type: "chat",
// // //         input_type: "chat",
// // //         input_value: userText,
// // //         session_id: sessionId,
// // //       };

// // //       const response = await fetch(
// // //         "http://localhost:7860/api/v1/run/2a77917b-8dac-4b57-bb0e-d3bf941e0884",
// // //         {
// // //           method: "POST",
// // //           headers: {
// // //             "Content-Type": "application/json",
// // //             "x-api-key": "sk-Q9HtqsO3xcbEHyugHdRJw3jkBcQhvTpZ6WIS8XnbBnE", // ← Replace this
// // //           },
// // //           body: JSON.stringify(payload),
// // //         }
// // //       );

// // //       if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

// // //       const data = await response.json();
// // //       const botReply = extractBotReply(data);

// // //       setMessages((prev) =>
// // //         prev
// // //           .filter((msg) => msg.id !== tempId)
// // //           .concat({ type: "bot", text: botReply })
// // //       );
// // //     } catch (error) {
// // //       console.error("Langflow Error:", error);
// // //       setMessages((prev) =>
// // //         prev
// // //           .filter((msg) => msg.id !== tempId)
// // //           .concat({
// // //             type: "bot",
// // //             text: "❌ Unable to connect to Langflow. Please make sure it is running.",
// // //           })
// // //       );
// // //     } finally {
// // //       setIsLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <>
// // //       {/* Scroll to Top Button */}
// // //       <button
// // //         onClick={scrollToTop}
// // //         className={`fixed bottom-8 right-8 z-[90] p-4 rounded-full bg-[#8B6B4A] text-white shadow-lg shadow-red-900/40 transition-all duration-300 ${
// // //           showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16 pointer-events-none"
// // //         }`}
// // //         aria-label="Scroll back to top"
// // //       >
// // //         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
// // //         </svg>
// // //       </button>

// // //       {/* Floating Chat Button */}
// // //       <button
// // //         onClick={() => setIsOpen(!isOpen)}
// // //         className="fixed bottom-8 right-24 z-[100] p-4 rounded-full bg-[#8B6B4A] hover:bg-[#6B4B3A] text-white shadow-xl shadow-red-900/50 transition-all duration-300 flex items-center justify-center"
// // //         aria-label="Open Chatbot"
// // //       >
// // //         <MessageCircle className="w-6 h-6" />
// // //       </button>

// // //       {/* Chat Window */}
// // //       <AnimatePresence>
// // //         {isOpen && (
// // //           <motion.div
// // //             initial={{ opacity: 0, y: 100, scale: 0.95 }}
// // //             animate={{ opacity: 1, y: 0, scale: 1 }}
// // //             exit={{ opacity: 0, y: 100, scale: 0.95 }}
// // //             transition={{ duration: 0.3 }}
// // //             className={`fixed bottom-24 right-8 z-[110] w-full max-w-[380px] border rounded-3xl shadow-2xl overflow-hidden ${
// // //               isDark ? "bg-gray-950 border-[#8B6B4A]/50" : "bg-white border-gray-200"
// // //             }`}
// // //           >
// // //             {/* Header */}
// // //             <div className="bg-[#8B6B4A] p-4 flex items-center justify-between">
// // //               <div className="flex items-center gap-3">
// // //                 <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center">
// // //                   <MessageCircle className="w-6 h-6" />
// // //                 </div>
// // //                 <div>
// // //                   <h3 className="font-semibold text-white">Atlas Assistant</h3>
// // //                   <p className="text-xs text-red-100">Online • AI Knots IT</p>
// // //                 </div>
// // //               </div>
// // //               <button onClick={() => setIsOpen(false)} className="text-white hover:text-red-200 transition-colors">
// // //                 <X className="w-5 h-5" />
// // //               </button>
// // //             </div>

// // //             {/* Messages */}
// // //             <div
// // //               ref={chatRef}
// // //               className={`h-80 overflow-y-auto p-4 space-y-4 ${isDark ? "bg-black/60" : "bg-gray-50"}`}
// // //             >
// // //               {messages.map((msg, idx) => (
// // //                 <div key={idx} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
// // //                   <div
// // //                     className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
// // //                       msg.type === "user"
// // //                         ? "bg-red-600 text-white"
// // //                         : isDark
// // //                         ? "bg-gray-900 text-gray-200 border border-gray-800"
// // //                         : "bg-gray-100 text-gray-800 border border-gray-200"
// // //                     }`}
// // //                   >
// // //                     {typeof msg.text === "string" ? msg.text : "Error displaying message"}
// // //                   </div>
// // //                 </div>
// // //               ))}
// // //             </div>

// // //             {/* Quick Replies & Input Area (same as before) */}
// // //             <div className={`p-3 border-t flex flex-wrap gap-2 ${isDark ? "border-gray-800 bg-gray-950" : "border-gray-200 bg-white"}`}>
// // //               {quickReplies.map((reply, idx) => (
// // //                 <button
// // //                   key={idx}
// // //                   onClick={() => sendMessage(reply)}
// // //                   disabled={isLoading}
// // //                   className={`text-xs px-4 py-2 rounded-full transition-all ${
// // //                     isDark ? "bg-gray-900 hover:bg-red-950 border border-gray-700" : "bg-gray-100 hover:bg-red-50 border border-gray-300"
// // //                   }`}
// // //                 >
// // //                   {reply}
// // //                 </button>
// // //               ))}
// // //             </div>

// // //             <div className={`p-4 border-t flex gap-2 ${isDark ? "border-gray-800 bg-gray-950" : "border-gray-200 bg-white"}`}>
// // //               <input
// // //                 type="text"
// // //                 value={input}
// // //                 onChange={(e) => setInput(e.target.value)}
// // //                 onKeyDown={(e) => e.key === "Enter" && sendMessage()}
// // //                 placeholder="Type your message..."
// // //                 className={`flex-1 rounded-full px-5 py-3 text-sm focus:outline-none ${
// // //                   isDark
// // //                     ? "bg-gray-900 border border-gray-700 focus:border-red-600"
// // //                     : "bg-gray-100 border border-gray-300 focus:border-red-500"
// // //                 }`}
// // //                 disabled={isLoading}
// // //               />
// // //               <button
// // //                 onClick={() => sendMessage()}
// // //                 disabled={!input.trim() || isLoading}
// // //                 className="bg-red-600 hover:bg-red-700 disabled:bg-gray-700 p-3 rounded-full transition-all"
// // //               >
// // //                 <Send className="w-5 h-5" />
// // //               </button>
// // //             </div>
// // //           </motion.div>
// // //         )}
// // //       </AnimatePresence>
// // //     </>
// // //   );
// // // };

// // // export default Chatbot;

// // import React, { useState, useRef, useEffect } from "react";
// // import { motion, AnimatePresence } from "framer-motion";
// // import { MessageCircle, X, Send } from "lucide-react";
// // import { useTheme } from "../../context/ThemeContext";

// // const Chatbot = () => {
// //   const { isDark } = useTheme();
// //   const [isOpen, setIsOpen] = useState(false);
// //   const [showScrollTop, setShowScrollTop] = useState(false);
// //   const [messages, setMessages] = useState([
// //     {
// //       type: "bot",
// //       text: "Hi! I'm Atlas, your AI assistant at AI Knots IT Solution. How can I help you today?",
// //     },
// //   ]);
// //   const [input, setInput] = useState("");
// //   const [isLoading, setIsLoading] = useState(false);
// //   const chatRef = useRef(null);

// //   const quickReplies = [
// //     "Tell me about your services",
// //     "How can you help my business?",
// //     "What is your pricing?",
// //     "Contact information",
// //   ];

// //   useEffect(() => {
// //     const toggleVisibility = () => setShowScrollTop(window.scrollY > 400);
// //     window.addEventListener("scroll", toggleVisibility);
// //     return () => window.removeEventListener("scroll", toggleVisibility);
// //   }, []);

// //   const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

// //   useEffect(() => {
// //     if (chatRef.current) {
// //       chatRef.current.scrollTop = chatRef.current.scrollHeight;
// //     }
// //   }, [messages]);

// //   // Updated extractBotReply function
// //   const extractBotReply = (data) => {
// //     console.log("🔍 Full Langflow Response:", data);

// //     if (!data) return "Sorry, I couldn't process your request.";

// //     try {
// //       // ✅ Main fix: Direct "text" field from your Langflow response
// //       if (data.text && typeof data.text === "string") {
// //         return data.text;
// //       }

// //       // Other possible Langflow structures
// //       if (data.outputs?.[0]?.outputs?.[0]?.outputs?.message) {
// //         return data.outputs[0].outputs[0].outputs.message;
// //       }
// //       if (data.outputs?.[0]?.outputs?.[0]?.results?.message) {
// //         return data.outputs[0].outputs[0].results.message;
// //       }
// //       if (data.outputs?.[0]?.outputs?.[0]?.text) {
// //         return data.outputs[0].outputs[0].text;
// //       }
// //       if (data.message?.message) {
// //         return data.message.message;
// //       }
// //       if (typeof data.message === "string") {
// //         return data.message;
// //       }

// //       // Final fallback - search for any text field
// //       if (typeof data === "object") {
// //         for (const key of ["text", "content", "response", "output", "answer", "reply"]) {
// //           if (data[key] && typeof data[key] === "string" && data[key].length > 0) {
// //             return data[key];
// //           }
// //         }
// //       }

// //       return "I received your message. How can I assist you further?";
// //     } catch (err) {
// //       console.error("Response parsing failed:", err);
// //       return "I'm having trouble understanding the response right now.";
// //     }
// //   };

// //   const sendMessage = async (text = input) => {
// //     if (!text.trim() || isLoading) return;

// //     const userText = text.trim();
// //     setInput("");
// //     setIsLoading(true);
// //     const tempId = Date.now();

// //     setMessages((prev) => [
// //       ...prev,
// //       { type: "user", text: userText },
// //       { type: "bot", text: "Thinking...", id: tempId },
// //     ]);

// //     try {
// //       const sessionId = crypto.randomUUID?.() || `session-${Date.now()}`;

// //       const payload = {
// //         output_type: "chat",
// //         input_type: "chat",
// //         input_value: userText,
// //         session_id: sessionId,
// //       };

// //       const response = await fetch(
// //         "http://localhost:7860/api/v1/run/2a77917b-8dac-4b57-bb0e-d3bf941e0884",
// //         {
// //           method: "POST",
// //           headers: {
// //             "Content-Type": "application/json",
// //             "x-api-key": "sk-Q9HtqsO3xcbEHyugHdRJw3jkBcQhvTpZ6WIS8XnbBnE", // Uncomment if needed
// //           },
// //           body: JSON.stringify(payload),
// //         }
// //       );

// //       if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

// //       const data = await response.json();
// //       const botReply = extractBotReply(data);

// //       setMessages((prev) =>
// //         prev
// //           .filter((msg) => msg.id !== tempId)
// //           .concat({ type: "bot", text: botReply })
// //       );
// //     } catch (error) {
// //       console.error("Langflow Error:", error);
// //       setMessages((prev) =>
// //         prev
// //           .filter((msg) => msg.id !== tempId)
// //           .concat({
// //             type: "bot",
// //             text: "❌ Unable to connect to Langflow. Please make sure it is running.",
// //           })
// //       );
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   return (
// //     <>
// //       {/* Scroll to Top Button */}
// //       <button
// //         onClick={scrollToTop}
// //         className={`fixed bottom-8 right-8 z-[90] p-4 rounded-full bg-[#8B6B4A] text-white shadow-lg shadow-red-900/40 transition-all duration-300 ${
// //           showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16 pointer-events-none"
// //         }`}
// //         aria-label="Scroll back to top"
// //       >
// //         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
// //         </svg>
// //       </button>

// //       {/* Floating Chat Button */}
// //       <button
// //         onClick={() => setIsOpen(!isOpen)}
// //         className="fixed bottom-8 right-24 z-[100] p-4 rounded-full bg-[#8B6B4A] hover:bg-[#6B4B3A] text-white shadow-xl shadow-red-900/50 transition-all duration-300 flex items-center justify-center"
// //         aria-label="Open Chatbot"
// //       >
// //         <MessageCircle className="w-6 h-6" />
// //       </button>

// //       {/* Chat Window */}
// //       <AnimatePresence>
// //         {isOpen && (
// //           <motion.div
// //             initial={{ opacity: 0, y: 100, scale: 0.95 }}
// //             animate={{ opacity: 1, y: 0, scale: 1 }}
// //             exit={{ opacity: 0, y: 100, scale: 0.95 }}
// //             transition={{ duration: 0.3 }}
// //             className={`fixed bottom-24 right-8 z-[110] w-full max-w-[380px] border rounded-3xl shadow-2xl overflow-hidden ${
// //               isDark ? "bg-gray-950 border-[#8B6B4A]/50" : "bg-white border-gray-200"
// //             }`}
// //           >
// //             {/* Header */}
// //             <div className="bg-[#8B6B4A] p-4 flex items-center justify-between">
// //               <div className="flex items-center gap-3">
// //                 <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center">
// //                   <MessageCircle className="w-6 h-6" />
// //                 </div>
// //                 <div>
// //                   <h3 className="font-semibold text-white">Atlas Assistant</h3>
// //                   <p className="text-xs text-red-100">Online • AI Knots IT</p>
// //                 </div>
// //               </div>
// //               <button onClick={() => setIsOpen(false)} className="text-white hover:text-red-200 transition-colors">
// //                 <X className="w-5 h-5" />
// //               </button>
// //             </div>

// //             {/* Messages */}
// //             <div
// //               ref={chatRef}
// //               className={`h-80 overflow-y-auto p-4 space-y-4 ${isDark ? "bg-black/60" : "bg-gray-50"}`}
// //             >
// //               {messages.map((msg, idx) => (
// //                 <div key={idx} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
// //                   <div
// //                     className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
// //                       msg.type === "user"
// //                         ? "bg-red-600 text-white"
// //                         : isDark
// //                         ? "bg-gray-900 text-gray-200 border border-gray-800"
// //                         : "bg-gray-100 text-gray-800 border border-gray-200"
// //                     }`}
// //                   >
// //                     {typeof msg.text === "string" ? msg.text : "Error displaying message"}
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>

// //             {/* Quick Replies */}
// //             <div className={`p-3 border-t flex flex-wrap gap-2 ${isDark ? "border-gray-800 bg-gray-950" : "border-gray-200 bg-white"}`}>
// //               {quickReplies.map((reply, idx) => (
// //                 <button
// //                   key={idx}
// //                   onClick={() => sendMessage(reply)}
// //                   disabled={isLoading}
// //                   className={`text-xs px-4 py-2 rounded-full transition-all ${
// //                     isDark ? "bg-gray-900 hover:bg-red-950 border border-gray-700" : "bg-gray-100 hover:bg-red-50 border border-gray-300"
// //                   }`}
// //                 >
// //                   {reply}
// //                 </button>
// //               ))}
// //             </div>

// //             {/* Input Area */}
// //             <div className={`p-4 border-t flex gap-2 ${isDark ? "border-gray-800 bg-gray-950" : "border-gray-200 bg-white"}`}>
// //               <input
// //                 type="text"
// //                 value={input}
// //                 onChange={(e) => setInput(e.target.value)}
// //                 onKeyDown={(e) => e.key === "Enter" && sendMessage()}
// //                 placeholder="Type your message..."
// //                 className={`flex-1 rounded-full px-5 py-3 text-sm focus:outline-none ${
// //                   isDark
// //                     ? "bg-gray-900 border border-gray-700 focus:border-red-600"
// //                     : "bg-gray-100 border border-gray-300 focus:border-red-500"
// //                 }`}
// //                 disabled={isLoading}
// //               />
// //               <button
// //                 onClick={() => sendMessage()}
// //                 disabled={!input.trim() || isLoading}
// //                 className="bg-red-600 hover:bg-red-700 disabled:bg-gray-700 p-3 rounded-full transition-all"
// //               >
// //                 <Send className="w-5 h-5" />
// //               </button>
// //             </div>
// //           </motion.div>
// //         )}
// //       </AnimatePresence>
// //     </>
// //   );
// // };

// // export default Chatbot;


// import React, { useState, useRef, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { MessageCircle, X, Send } from "lucide-react";
// import { useTheme } from "../../context/ThemeContext";

// const Chatbot = () => {
//   const { isDark } = useTheme();
//   const [isOpen, setIsOpen] = useState(false);
//   const [showScrollTop, setShowScrollTop] = useState(false);
//   const [messages, setMessages] = useState([
//     {
//       type: "bot",
//       text: "Hi! I'm Atlas, your AI assistant at AI Knots IT Solution. How can I help you today?",
//     },
//   ]);
//   const [input, setInput] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const chatRef = useRef(null);

//   const quickReplies = [
//     "Tell me about your services",
//     "How can you help my business?",
//     "What is your pricing?",
//     "Contact information",
//   ];

//   useEffect(() => {
//     const toggleVisibility = () => setShowScrollTop(window.scrollY > 400);
//     window.addEventListener("scroll", toggleVisibility);
//     return () => window.removeEventListener("scroll", toggleVisibility);
//   }, []);

//   const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

//   useEffect(() => {
//     if (chatRef.current) {
//       chatRef.current.scrollTop = chatRef.current.scrollHeight;
//     }
//   }, [messages]);

//   // Updated extractBotReply for the new Langflow structure
//   const extractBotReply = (data) => {
//     console.log("🔍 Full Langflow Response:", data);

//     if (!data) return "Sorry, I couldn't process your request.";

//     try {
//       // Primary path - Deep nested structure from your response
//       if (data.outputs?.[0]?.outputs?.[0]?.results?.message?.text) {
//         return data.outputs[0].outputs[0].results.message.text;
//       }

//       // Alternative paths
//       if (data.outputs?.[0]?.outputs?.[0]?.outputs?.message?.text) {
//         return data.outputs[0].outputs[0].outputs.message.text;
//       }

//       if (data.outputs?.[0]?.outputs?.[0]?.artifacts?.message) {
//         return data.outputs[0].outputs[0].artifacts.message;
//       }

//       if (data.outputs?.[0]?.outputs?.[0]?.messages?.[0]?.message) {
//         return data.outputs[0].outputs[0].messages[0].message;
//       }

//       // Fallbacks
//       if (data.text && typeof data.text === "string") {
//         return data.text;
//       }

//       if (data.message?.message) {
//         return data.message.message;
//       }

//       if (typeof data.message === "string") {
//         return data.message;
//       }

//       // Last resort: Search any string that looks like a reply
//       if (typeof data === "object") {
//         for (const key of ["text", "message", "content", "response", "output"]) {
//           if (data[key] && typeof data[key] === "string" && data[key].length > 5) {
//             return data[key];
//           }
//         }
//       }

//       return "I received your message. How can I assist you further?";
//     } catch (err) {
//       console.error("Response parsing failed:", err);
//       return "I'm having trouble understanding the response right now.";
//     }
//   };

//   const sendMessage = async (text = input) => {
//     if (!text.trim() || isLoading) return;

//     const userText = text.trim();
//     setInput("");
//     setIsLoading(true);
//     const tempId = Date.now();

//     setMessages((prev) => [
//       ...prev,
//       { type: "user", text: userText },
//       { type: "bot", text: "Thinking...", id: tempId },
//     ]);

//     try {
//       const sessionId = crypto.randomUUID?.() || `session-${Date.now()}`;

//       const payload = {
//         output_type: "chat",
//         input_type: "chat",
//         input_value: userText,
//         session_id: sessionId,
//       };

//       const response = await fetch(
//         "http://localhost:7860/api/v1/run/2a77917b-8dac-4b57-bb0e-d3bf941e0884",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             "x-api-key": "sk-Q9HtqsO3xcbEHyugHdRJw3jkBcQhvTpZ6WIS8XnbBnE", // Uncomment only if required
//           },
//           body: JSON.stringify(payload),
//         }
//       );

//       if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

//       const data = await response.json();
//       const botReply = extractBotReply(data);

//       setMessages((prev) =>
//         prev
//           .filter((msg) => msg.id !== tempId)
//           .concat({ type: "bot", text: botReply })
//       );
//     } catch (error) {
//       console.error("Langflow Error:", error);
//       setMessages((prev) =>
//         prev
//           .filter((msg) => msg.id !== tempId)
//           .concat({
//             type: "bot",
//             text: "❌ Unable to connect to Langflow. Please make sure it is running.",
//           })
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <>
//       {/* Scroll to Top Button */}
//       <button
//         onClick={scrollToTop}
//         className={`fixed bottom-8 right-8 z-[90] p-4 rounded-full bg-[#8B6B4A] text-white shadow-lg shadow-red-900/40 transition-all duration-300 ${
//           showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16 pointer-events-none"
//         }`}
//         aria-label="Scroll back to top"
//       >
//         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
//         </svg>
//       </button>

//       {/* Floating Chat Button */}
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="fixed bottom-8 right-24 z-[100] p-4 rounded-full bg-[#8B6B4A] hover:bg-[#6B4B3A] text-white shadow-xl shadow-red-900/50 transition-all duration-300 flex items-center justify-center"
//         aria-label="Open Chatbot"
//       >
//         <MessageCircle className="w-6 h-6" />
//       </button>

//       {/* Chat Window */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: 100, scale: 0.95 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, y: 100, scale: 0.95 }}
//             transition={{ duration: 0.3 }}
//             className={`fixed bottom-24 right-8 z-[110] w-full max-w-[380px] border rounded-3xl shadow-2xl overflow-hidden ${
//               isDark ? "bg-gray-950 border-[#8B6B4A]/50" : "bg-white border-gray-200"
//             }`}
//           >
//             {/* Header */}
//             <div className="bg-[#8B6B4A] p-4 flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center">
//                   <MessageCircle className="w-6 h-6" />
//                 </div>
//                 <div>
//                   <h3 className="font-semibold text-white">Atlas Assistant</h3>
//                   <p className="text-xs text-red-100">Online • AI Knots IT</p>
//                 </div>
//               </div>
//               <button onClick={() => setIsOpen(false)} className="text-white hover:text-red-200 transition-colors">
//                 <X className="w-5 h-5" />
//               </button>
//             </div>

//             {/* Messages Area */}
//             <div
//               ref={chatRef}
//               className={`h-80 overflow-y-auto p-4 space-y-4 ${isDark ? "bg-black/60" : "bg-gray-50"}`}
//             >
//               {messages.map((msg, idx) => (
//                 <div key={idx} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
//                   <div
//                     className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
//                       msg.type === "user"
//                         ? "bg-red-600 text-white"
//                         : isDark
//                         ? "bg-gray-900 text-gray-200 border border-gray-800"
//                         : "bg-gray-100 text-gray-800 border border-gray-200"
//                     }`}
//                   >
//                     {typeof msg.text === "string" ? msg.text : "Error displaying message"}
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Quick Replies */}
//             <div className={`p-3 border-t flex flex-wrap gap-2 ${isDark ? "border-gray-800 bg-gray-950" : "border-gray-200 bg-white"}`}>
//               {quickReplies.map((reply, idx) => (
//                 <button
//                   key={idx}
//                   onClick={() => sendMessage(reply)}
//                   disabled={isLoading}
//                   className={`text-xs px-4 py-2 rounded-full transition-all ${
//                     isDark ? "bg-gray-900 hover:bg-red-950 border border-gray-700" : "bg-gray-100 hover:bg-red-50 border border-gray-300"
//                   }`}
//                 >
//                   {reply}
//                 </button>
//               ))}
//             </div>

//             {/* Input Area */}
//             <div className={`p-4 border-t flex gap-2 ${isDark ? "border-gray-800 bg-gray-950" : "border-gray-200 bg-white"}`}>
//               <input
//                 type="text"
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//                 placeholder="Type your message..."
//                 className={`flex-1 rounded-full px-5 py-3 text-sm focus:outline-none ${
//                   isDark
//                     ? "bg-gray-900 border border-gray-700 focus:border-red-600"
//                     : "bg-gray-100 border border-gray-300 focus:border-red-500"
//                 }`}
//                 disabled={isLoading}
//               />
//               <button
//                 onClick={() => sendMessage()}
//                 disabled={!input.trim() || isLoading}
//                 className="bg-red-600 hover:bg-red-700 disabled:bg-gray-700 p-3 rounded-full transition-all"
//               >
//                 <Send className="w-5 h-5" />
//               </button>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// export default Chatbot;

// import React, { useState, useRef, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { MessageCircle, X, Send } from "lucide-react";
// import { useTheme } from "../../context/ThemeContext";

// const Chatbot = () => {
//   const { isDark } = useTheme();
//   const [isOpen, setIsOpen] = useState(false);
//   const [showScrollTop, setShowScrollTop] = useState(false);
//   const [messages, setMessages] = useState([
//     {
//       type: "bot",
//       text: "Hi! I'm Atlas, your AI assistant at AI Knots IT Solution. How can I help you today?",
//     },
//   ]);
//   const [input, setInput] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const chatRef = useRef(null);

//   const apiKey = "sk-Q9HtqsO3xcbEHyugHdRJw3jkBcQhvTpZ6WIS8XnbBnE"; // ← Change this

//   const quickReplies = [
//     "Tell me about your services",
//     "How can you help my business?",
//     "What is your pricing?",
//     "Contact information",
//   ];

//   useEffect(() => {
//     const toggleVisibility = () => setShowScrollTop(window.scrollY > 400);
//     window.addEventListener("scroll", toggleVisibility);
//     return () => window.removeEventListener("scroll", toggleVisibility);
//   }, []);

//   const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

//   useEffect(() => {
//     if (chatRef.current) {
//       chatRef.current.scrollTop = chatRef.current.scrollHeight;
//     }
//   }, [messages]);

//   // Updated extractBotReply for the new Langflow structure
//   const extractBotReply = (data) => {
//     console.log("🔍 Full Langflow Response:", data);

//     if (!data) return "Sorry, I couldn't process your request.";

//     try {
//       if (data.outputs?.[0]?.outputs?.[0]?.results?.message?.text) {
//         return data.outputs[0].outputs[0].results.message.text;
//       }
//       if (data.outputs?.[0]?.outputs?.[0]?.outputs?.message?.text) {
//         return data.outputs[0].outputs[0].outputs.message.text;
//       }
//       if (data.outputs?.[0]?.outputs?.[0]?.artifacts?.message) {
//         return data.outputs[0].outputs[0].artifacts.message;
//       }
//       if (data.outputs?.[0]?.outputs?.[0]?.messages?.[0]?.message) {
//         return data.outputs[0].outputs[0].messages[0].message;
//       }

//       // Fallbacks
//       if (data.text && typeof data.text === "string") return data.text;
//       if (data.message?.message) return data.message.message;
//       if (typeof data.message === "string") return data.message;

//       if (typeof data === "object") {
//         for (const key of ["text", "message", "content", "response", "output"]) {
//           if (data[key] && typeof data[key] === "string" && data[key].length > 5) {
//             return data[key];
//           }
//         }
//       }

//       return "I received your message. How can I assist you further?";
//     } catch (err) {
//       console.error("Response parsing failed:", err);
//       return "I'm having trouble understanding the response right now.";
//     }
//   };

//   const sendMessage = async (text = input) => {
//     if (!text.trim() || isLoading) return;

//     const userText = text.trim();
//     setInput("");
//     setIsLoading(true);

//     const tempId = Date.now();

//     // Add user message + temporary bot message
//     setMessages((prev) => [
//       ...prev,
//       { type: "user", text: userText },
//       { type: "bot", text: "Thinking...", id: tempId },
//     ]);

//     try {
//       const sessionId = crypto.randomUUID?.() || `session-${Date.now()}`;

//       const payload = {
//         output_type: "chat",
//         input_type: "chat",
//         input_value: userText,
//         session_id: sessionId,
//       };

//       const options = {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "x-api-key": apiKey,
//         },
//         body: JSON.stringify(payload),
//       };

//       const response = await fetch(
//         "http://localhost:7860/api/v1/run/2a77917b-8dac-4b57-bb0e-d3bf941e0884",
//         options
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const data = await response.json();
//       const botReply = extractBotReply(data);

//       // Replace temporary message with actual reply
//       setMessages((prev) =>
//         prev.map((msg) =>
//           msg.id === tempId ? { ...msg, text: botReply, id: undefined } : msg
//         )
//       );
//     } catch (err) {
//       console.error("Chat API Error:", err);
//       const errorMsg = "Sorry, I'm having trouble connecting right now. Please try again.";

//       setMessages((prev) =>
//         prev.map((msg) =>
//           msg.id === tempId ? { ...msg, text: errorMsg, id: undefined } : msg
//         )
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <>
//       {/* Scroll to Top Button */}
//       <button
//         onClick={scrollToTop}
//         className={`fixed bottom-8 right-8 z-[90] p-4 rounded-full bg-[#8B6B4A] text-white shadow-lg shadow-red-900/40 transition-all duration-300 ${
//           showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16 pointer-events-none"
//         }`}
//         aria-label="Scroll back to top"
//       >
//         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
//         </svg>
//       </button>

//       {/* Floating Chat Button */}
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="fixed bottom-8 right-24 z-[100] p-4 rounded-full bg-[#8B6B4A] hover:bg-[#6B4B3A] text-white shadow-xl shadow-red-900/50 transition-all duration-300 flex items-center justify-center"
//         aria-label="Open Chatbot"
//       >
//         <MessageCircle className="w-6 h-6" />
//       </button>

//       {/* Chat Window */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: 100, scale: 0.95 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, y: 100, scale: 0.95 }}
//             transition={{ duration: 0.3 }}
//             className={`fixed bottom-24 right-8 z-[110] w-full max-w-[380px] border rounded-3xl shadow-2xl overflow-hidden ${
//               isDark ? "bg-gray-950 border-[#8B6B4A]/50" : "bg-white border-gray-200"
//             }`}
//           >
//             {/* Header */}
//             <div className="bg-[#8B6B4A] p-4 flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center">
//                   <MessageCircle className="w-6 h-6" />
//                 </div>
//                 <div>
//                   <h3 className="font-semibold text-white">Atlas Assistant</h3>
//                   <p className="text-xs text-red-100">Online • AI Knots IT</p>
//                 </div>
//               </div>
//               <button onClick={() => setIsOpen(false)} className="text-white hover:text-red-200 transition-colors">
//                 <X className="w-5 h-5" />
//               </button>
//             </div>

//             {/* Messages Area */}
//             <div
//               ref={chatRef}
//               className={`h-80 overflow-y-auto p-4 space-y-4 ${isDark ? "bg-black/60" : "bg-gray-50"}`}
//             >
//               {messages.map((msg, idx) => (
//                 <div key={idx} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
//                   <div
//                     className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
//                       msg.type === "user"
//                         ? "bg-red-600 text-white"
//                         : isDark
//                         ? "bg-gray-900 text-gray-200 border border-gray-800"
//                         : "bg-gray-100 text-gray-800 border border-gray-200"
//                     }`}
//                   >
//                     {typeof msg.text === "string" ? msg.text : "Error displaying message"}
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Quick Replies */}
//             <div className={`p-3 border-t flex flex-wrap gap-2 ${isDark ? "border-gray-800 bg-gray-950" : "border-gray-200 bg-white"}`}>
//               {quickReplies.map((reply, idx) => (
//                 <button
//                   key={idx}
//                   onClick={() => sendMessage(reply)}
//                   disabled={isLoading}
//                   className={`text-xs px-4 py-2 rounded-full transition-all ${
//                     isDark ? "bg-gray-900 hover:bg-red-950 border border-gray-700" : "bg-gray-100 hover:bg-red-50 border border-gray-300"
//                   }`}
//                 >
//                   {reply}
//                 </button>
//               ))}
//             </div>

//             {/* Input Area */}
//             <div className={`p-4 border-t flex gap-2 ${isDark ? "border-gray-800 bg-gray-950" : "border-gray-200 bg-white"}`}>
//               <input
//                 type="text"
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//                 placeholder="Type your message..."
//                 className={`flex-1 rounded-full px-5 py-3 text-sm focus:outline-none ${
//                   isDark
//                     ? "bg-gray-900 border border-gray-700 focus:border-red-600"
//                     : "bg-gray-100 border border-gray-300 focus:border-red-500"
//                 }`}
//                 disabled={isLoading}
//               />
//               <button
//                 onClick={() => sendMessage()}
//                 disabled={!input.trim() || isLoading}
//                 className="bg-red-600 hover:bg-red-700 disabled:bg-gray-700 p-3 rounded-full transition-all"
//               >
//                 <Send className="w-5 h-5" />
//               </button>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// export default Chatbot;

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const Chatbot = () => {
  const { isDark } = useTheme();
  
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      type: "bot",
      text: "Hi! I'm Atlas, your AI assistant at AI Knots IT Solution. How can I help you today?",
    },
    {
      //type hello
      id: "hello",
      type: "bot",
      text: "Hello! How can I assist you today?",
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const chatRef = useRef(null);
  const apiKey = "sk-Q9HtqsO3xcbEHyugHdRJw3jkBcQhvTpZ6WIS8XnbBnE"; // ← Update this

  const quickReplies = [
    "Tell me about your services",
    "How can you help my business?",
    "What is your pricing?",
    "Contact information",
  ];

  // Auto-scroll to bottom
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  // Scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const extractBotReply = useCallback((data) => {
    console.log("🔍 Langflow Response:", data);

    if (!data) return "Sorry, I couldn't process your request.";

    try {
      // Primary paths
      return (
        data.outputs?.[0]?.outputs?.[0]?.results?.message?.text ||
        data.outputs?.[0]?.outputs?.[0]?.outputs?.message?.text ||
        data.outputs?.[0]?.outputs?.[0]?.artifacts?.message ||
        data.outputs?.[0]?.outputs?.[0]?.messages?.[0]?.message ||
        data.text ||
        data.message?.message ||
        data.message ||
        // Deep search fallback
        Object.values(data).find(
          (val) => typeof val === "string" && val.length > 10
        ) ||
        "I received your message. How can I assist you further?"
      );
    } catch (err) {
      console.error("Response parsing failed:", err);
      return "I'm having trouble understanding the response right now.";
    }
  }, []);

  const sendMessage = useCallback(async (text = input) => {
    const userText = text?.trim();
    if (!userText || isLoading) return;

    setInput("");
    setIsLoading(true);

    const tempId = Date.now();

    // Add user message + loading bot message
    setMessages((prev) => [
      ...prev,
      { id: `user-${tempId}`, type: "user", text: userText },
      { id: tempId, type: "bot", isLoading: true },
    ]);

    try {
      const sessionId = crypto.randomUUID?.() || `session-${Date.now()}`;

      const response = await fetch(
        "http://localhost:7860/api/v1/run/2a77917b-8dac-4b57-bb0e-d3bf941e0884",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey,
          },
          body: JSON.stringify({
            output_type: "chat",
            input_type: "chat",
            input_value: userText,
            session_id: sessionId,
          }),
        }
      );

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = await response.json();
      const botReply = extractBotReply(data);

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === tempId ? { id: `bot-${tempId}`, type: "bot", text: botReply } : msg
        )
      );
    } catch (error) {
      console.error("Chat Error:", error);
      const errorMsg = "Sorry, I'm having trouble connecting. Please try again.";

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === tempId ? { id: `bot-${tempId}`, type: "bot", text: errorMsg } : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, extractBotReply]);

  // Loading Animation
  const LoadingDots = () => (
    <div className="flex items-center gap-1.5 px-4 py-3">
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 bg-current rounded-full animate-bounce"
            style={{ animationDelay: `${i * 150}ms` }}
          />
        ))}
      </div>
    </div>
  );

  return (
    <>
      {/* Scroll to Top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-8 right-8 z-[90] p-4 rounded-full bg-[#8B6B4A] text-white shadow-lg shadow-red-900/40 transition-all duration-300 ${
          showScrollTop ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-label="Scroll to top"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>

      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-24 z-[100] p-4 rounded-full bg-[#8B6B4A] hover:bg-[#6B4B3A] text-white shadow-xl shadow-red-900/50 transition-all"
        aria-label="Open Chat"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className={`fixed bottom-24 right-8 z-[110] w-full max-w-[380px] border rounded-3xl shadow-2xl overflow-hidden ${
              isDark ? "bg-gray-950 border-[#8B6B4A]/50" : "bg-white border-gray-200"
            }`}
          >
            {/* Header */}
            <div className="bg-[#8B6B4A] p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Atlas Assistant</h3>
                  <p className="text-xs text-red-100">Online • AI Knots IT</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="text-white hover:text-red-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={chatRef}
              className={`h-80 overflow-y-auto p-4 space-y-4 ${isDark ? "bg-black/60" : "bg-gray-50"}`}
            >
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                      msg.type === "user"
                        ? "bg-red-600 text-white"
                        : isDark
                        ? "bg-gray-900 text-gray-200 border border-gray-800"
                        : "bg-gray-100 text-gray-800 border border-gray-200"
                    }`}
                  >
                    {msg.isLoading ? <LoadingDots /> : msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Replies */}
            <div className={`p-3 border-t flex flex-wrap gap-2 ${isDark ? "border-gray-800 bg-gray-950" : "border-gray-200 bg-white"}`}>
              {quickReplies.map((reply, idx) => (
                <button
                  key={idx}
                  onClick={() => sendMessage(reply)}
                  disabled={isLoading}
                  className={`text-xs px-4 py-2 rounded-full transition-all ${
                    isDark 
                      ? "bg-gray-900 hover:bg-red-950 border border-gray-700" 
                      : "bg-gray-100 hover:bg-red-50 border border-gray-300"
                  }`}
                >
                  {reply}
                </button>
              ))}
            </div>

            {/* Input Area */}
            <div className={`p-4 border-t flex gap-2 ${isDark ? "border-gray-800 bg-gray-950" : "border-gray-200 bg-white"}`}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type your message..."
                disabled={isLoading}
                className={`flex-1 rounded-full px-5 py-3 text-sm focus:outline-none ${
                  isDark
                    ? "bg-gray-900 border border-gray-700 focus:border-red-600"
                    : "bg-gray-100 border border-gray-300 focus:border-red-500"
                }`}
              />
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || isLoading}
                className="bg-red-600 hover:bg-red-700 disabled:bg-gray-700 p-3 rounded-full transition-all flex-shrink-0"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;