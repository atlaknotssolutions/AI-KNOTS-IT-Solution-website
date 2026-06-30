import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addToCart } from "../Redux/cart/cartSlice";
import { useTheme } from "../../context/ThemeContext";

const ProductForSellsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isDark } = useTheme();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) {
      navigate("/productforsells", { replace: true });
      return;
    }

    const fetchProduct = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await axios.get(
          `http://localhost:8000/api/productforsells/${id}`,
        );
        setProduct(res.data?.data || res.data || null);
      } catch (err) {
        console.error("Product detail fetch failed", err);
        setError("Unable to load product details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${isDark ? "bg-black text-white" : "bg-gray-50 text-gray-900"}`}
      >
        <div className="text-xl font-semibold animate-pulse">
          Loading product details...
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div
        className={`min-h-screen flex flex-col items-center justify-center px-6 ${isDark ? "bg-black text-white" : "bg-gray-50 text-gray-900"}`}
      >
        <div className="text-4xl font-bold mb-4">Product Not Found</div>
        <p className="text-lg mb-8 text-center max-w-xl">
          {error || "We could not find the product you were looking for."}
        </p>
        <div className="flex gap-4">
          <Link
            to="/productforsells"
            className={`px-6 py-3 rounded-full font-semibold transition ${isDark ? "bg-white/10 hover:bg-white/20 text-white" : "bg-[#3D220E] hover:bg-[#432610] text-white"}`}
          >
            Back to products
          </Link>
          <button
            onClick={() => navigate(-1)}
            className={`px-6 py-3 rounded-full font-semibold transition ${isDark ? "bg-red-900/70 hover:bg-red-800 text-white" : "bg-red-100 hover:bg-red-200 text-red-700"}`}
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  const descriptionLines = product.description
    ? product.description.split(/\r?\n/).filter(Boolean)
    : [];

  return (
    <div
      className={`${isDark ? "bg-black text-white" : "bg-white text-gray-900"}`}
    >
      <div className="relative overflow-hidden">
        {product.images?.[0] ? (
          <img
            src={product.images[0]}
            alt={product.productname}
            className="w-full h-[420px] object-cover"
          />
        ) : (
          <div
            className={`w-full h-[420px] ${isDark ? "bg-zinc-900" : "bg-gray-100"}`}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <p className="inline-flex items-center gap-2 rounded-full bg-[#3D220E] px-4 py-2 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-black/20">
            {product.category?.name || "Package"}
          </p>
          <h1 className="mt-6 text-4xl md:text-5xl font-black tracking-tight">
            {product.productname}
          </h1>
          <p className="mt-4 text-lg text-gray-200 max-w-3xl">
            {product.duration || "Contact for details"}
          </p>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_0.6fr]">
          <section>
            <div className="mb-8">
              <div className="flex flex-wrap items-center gap-3 text-sm font-medium uppercase tracking-[0.2em] text-[#3D220E]">
                <span>{product.category?.name || "Package"}</span>
                <span>•</span>
                <span>{product.type || "Custom"}</span>
              </div>
              <div className="mt-4 text-5xl font-black">
                ₹{product.price ?? 0}
              </div>
            </div>

            <div
              className={`rounded-3xl border ${isDark ? "border-red-900/40 bg-zinc-950/80" : "border-gray-200 bg-white shadow-sm"} p-8`}
            >
              <h2 className="text-2xl font-bold mb-6">What’s included</h2>
              <div className="space-y-4 text-lg leading-relaxed">
                {descriptionLines.length > 0 ? (
                  descriptionLines.map((line, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <span className="mt-1 text-xl">✅</span>
                      <span>{line}</span>
                    </div>
                  ))
                ) : (
                  <p>No description available for this product.</p>
                )}
              </div>
            </div>
          </section>

          <aside
            className={`rounded-3xl border ${isDark ? "border-red-900/40 bg-zinc-950/80" : "border-gray-200 bg-white shadow-sm"} p-8 flex flex-col gap-6`}
          >
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-gray-500">
                Price
              </p>
              <div className="mt-3 text-4xl font-black">
                ₹{product.price ?? 0}
              </div>
              <p className="mt-2 text-sm text-gray-500">
                {product.duration || "Contact for details"}
              </p>
            </div>

            <button
              onClick={() =>
                dispatch(
                  addToCart({
                    id: product._id,
                    name: product.productname,
                    price: product.price ?? 0,
                    type: product.type || "custom",
                    duration: product.duration || "As per requirement",
                  }),
                )
              }
              className="w-full rounded-2xl bg-[#3D220E] px-6 py-4 text-lg font-bold text-white transition hover:bg-[#2f180f]"
            >
              Add to Cart
            </button>

            <Link
              to="/productforsells"
              className={`inline-flex justify-center rounded-2xl px-6 py-4 text-sm font-semibold transition ${isDark ? "bg-white/10 text-white hover:bg-white/15" : "bg-gray-100 text-gray-900 hover:bg-gray-200"}`}
            >
              ← Back to all packages
            </Link>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default ProductForSellsDetail;
