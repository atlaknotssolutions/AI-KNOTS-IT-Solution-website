import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/cart/cartSlice";

const ProductForSells = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8000/api/productforsells");
      setProducts(res.data?.data || res.data || []);
    } catch (err) {
      console.error("Failed to load products", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Products For Sells</h2>

        {loading ? (
          <div>Loading...</div>
        ) : products.length === 0 ? (
          <div>No products available</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <div key={p._id} className="bg-white rounded-2xl shadow p-4">
                <div className="h-48 flex items-center justify-center overflow-hidden rounded">
                  {p.images && p.images[0] ? (
                    <img
                      src={p.images[0]}
                      alt={p.productname}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-gray-400">No Image</div>
                  )}
                </div>
                <h3 className="mt-4 text-xl font-semibold">{p.productname}</h3>
                <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                  {p.description}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <div className="text-lg font-bold">
                    ₹{p.price || p.priceInr || 0}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      to={`/productforsells/${p._id}`}
                      className="px-4 py-2 bg-slate-800 text-white rounded"
                    >
                      View Details
                    </Link>
                    <button
                      onClick={() =>
                        dispatch(
                          addToCart({
                            id: p._id,
                            name: p.productname,
                            price: p.price || p.priceInr || 0,
                          }),
                        )
                      }
                      className="px-4 py-2 bg-green-600 text-white rounded"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductForSells;
