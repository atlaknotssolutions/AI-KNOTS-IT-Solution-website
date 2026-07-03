import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../../Redux/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Trash2, ArrowLeft, ShoppingBag } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext";

export default function Cart()
{
  const { isDark } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, totalItems, totalAmount } = useSelector((state) => state.cart);

  const handleRemove = (id) =>
  {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () =>
  {
    if (window.confirm("Clear entire cart?"))
    {
      dispatch(clearCart());
    }
  };

  if (cart.length === 0)
  {
    return (
      <div
        className={`min-h-screen flex items-center justify-center px-6 ${isDark
            ? "bg-gradient-to-b from-black via-gray-950 to-black"
            : "bg-gradient-to-b from-[#faf7f3] via-white to-[#f8f4ef]"
          }`}
      >
        <div className="text-center max-w-3xl mx-auto">

          <div
            className={`w-28 h-28 mx-auto mb-8 rounded-full flex items-center justify-center ${isDark
                ? "bg-[#3D220E]/30 border border-[#8B6B4A]/30"
                : "bg-[#F5EDE4] border border-[#E8D9C2]"
              }`}
          >
            <ShoppingBag className="w-14 h-14 text-[#8B6B4A]" />
          </div>

          <h1
            className={`text-5xl md:text-7xl font-black mb-6 ${isDark ? "text-white" : "text-[#3D220E]"
              }`}
          >
            Your Cart is{" "}
            <span className="text-[#8B6B4A]">Empty</span>
          </h1>

          <p
            className={`text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed mb-12 ${isDark ? "text-gray-300" : "text-[#5C4635]"
              }`}
          >
            Looks like you haven't added any packages yet. Browse our services and
            find the perfect solution for your business.
          </p>

          <button
            onClick={() => navigate("/")}
            className="px-12 py-6 md:px-14 md:py-7 bg-gradient-to-r from-[#3D220E] to-[#3D220E]/90 rounded-full text-xl md:text-3xl font-black shadow-2xl shadow-[#3D220E]/60 hover:shadow-[#3D220E]/80 transition-all text-white hover:scale-105"
          >
            Browse Packages →
          </button>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-3 hover:bg-gray-200 dark:hover:bg-zinc-800 rounded-xl transition-all"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-4xl md:text-5xl font-black text-[#3D220E]">
              Your Cart
            </h1>
          </div>
          <p className="text-xl font-medium">
            {totalItems} Item{totalItems > 1 ? "s" : ""}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-xl border border-red-100 dark:border-red-900/30 flex gap-6"
              >
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-[#3D220E]">{item.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    {item.duration || item.type}
                  </p>
                </div>

                <div className="text-right">
                  <div className="text-3xl font-black text-[#3D220E]">
                    ₹{item.price.toLocaleString("en-IN")}
                  </div>
                  <p className="text-sm text-gray-500">Per package</p>
                </div>

                <button
                  onClick={() => handleRemove(item.id)}
                  className="self-start p-3 text-[#8B6B4A] hover:text-[#3D220E] hover:bg-[#F5EDE4] dark:text-[#D9C5B5] dark:hover:text-white dark:hover:bg-[#3D220E]/40 rounded-2xl transition-all duration-300"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 sticky top-8 shadow-xl border border-red-100 dark:border-red-900/30">
              <h3 className="text-2xl font-bold mb-6">Order Summary</h3>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-lg">
                  <span>Subtotal</span>
                  <span>₹{totalAmount.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span>GST (18%)</span>
                  <span>₹{(totalAmount * 0.18).toFixed(0)}</span>
                </div>
                <hr className="border-[#E8D9C2] dark:border-[#8B6B4A]/30" />
                <div className="flex justify-between text-2xl font-bold text-[#3D220E]">
                  <span>Total</span>
                  <span>₹{(totalAmount * 1.18).toFixed(0)}</span>
                </div>
              </div>

              <button
                onClick={() => navigate("/contact")}
                className="w-full bg-gradient-to-r from-[#3D220E] to-[#3D220E]/90 hover:from-[#4A2A12] hover:to-[#3D220E] text-white py-5 rounded-2xl font-bold text-xl shadow-xl shadow-[#3D220E]/30 hover:shadow-[#3D220E]/50 transition-all duration-300"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={handleClearCart}
                className="w-full py-4 text-[#8B6B4A] hover:text-[#3D220E] hover:bg-[#F5EDE4] dark:text-[#D9C5B5] dark:hover:text-white dark:hover:bg-[#3D220E]/40 rounded-2xl font-medium transition-all duration-300"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}