import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../../Redux/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Trash2, ArrowLeft, ShoppingBag } from "lucide-react";

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, totalItems, totalAmount } = useSelector((state) => state.cart);

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    if (window.confirm("Clear entire cart?")) {
      dispatch(clearCart());
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-950">
        <div className="text-center">
          <ShoppingBag className="w-24 h-24 mx-auto text-gray-400 mb-6" />
          <h2 className="text-4xl font-bold mb-4">Your Cart is Empty</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Looks like you haven't added anything yet.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-8 py-4 bg-[#3D220E] text-white rounded-2xl font-bold hover:bg-red-900 transition-all"
          >
            Browse Packages
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
                  className="self-start p-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50 rounded-2xl transition-all"
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
                <hr className="border-red-200 dark:border-red-900" />
                <div className="flex justify-between text-2xl font-bold text-[#3D220E]">
                  <span>Total</span>
                  <span>₹{(totalAmount * 1.18).toFixed(0)}</span>
                </div>
              </div>

              <button
                onClick={() => navigate("/contact")}
                className="w-full bg-[#3D220E] hover:bg-red-900 text-white py-5 rounded-2xl font-bold text-xl transition-all mb-4"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={handleClearCart}
                className="w-full py-4 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50 rounded-2xl font-medium transition-all"
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