import Toastify from "toastify-js";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { formatRupiah } from "../helper/rupiah";
import baseUrl from "../constants/baseUrl";

export default function ProductPage() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  async function fetchProductDetail() {
    try {
      const { data } = await axios.get(
        `${baseUrl}/pub/product/${id}`
      );

      console.log(data);

      setProduct(data.data);
    } catch (error) {
      console.log(error);
      showError(error.response?.data?.message || "No product");
    }
  }

  useEffect(() => {
    fetchProductDetail();
  }, [id]);

  if (!product) {
    return (
      <div className="mx-8 py-8">
        <h1>Loading...</h1>
      </div>
    );
  }

  function showError(message) {
      Toastify({
        text: message,
        duration: 3000,
        gravity: "top",
        position: "right",
      }).showToast();
    }

  return (
    <div className="mx-8 py-8">
      <div className="bg-white rounded-3xl shadow-lg p-6">

        <div className="rounded-3xl bg-gray-100 overflow-hidden">
          <img
            src={product.imgUrl}
            className="w-full h-[550px] object-cover"
            alt={product.name}
          />
        </div>

        <div className="flex flex-col mx-5">
          <h1 className="text-5xl font-bold mt-8">
            {product.name}
          </h1>

          <p className="text-4xl font-bold text-amber-800 mt-8">
            Rp{formatRupiah(product.price)}
          </p>

          <div className="mt-5">
            <h2 className="font-semibold text-xl">
              Stock :
            </h2>

            <p className="text-gray-500">
              {product.stock}
            </p>
          </div>

          <div className="pb-10 mt-5">
            <h2 className="text-3xl font-bold mb-5">
              Description
            </h2>

            <div className="bg-gray-50 rounded-2xl p-5">
              <p className="leading-9 text-gray-600 whitespace-pre-line">
                {product.description}
              </p>
            </div>
          </div>

          <Link
            to="/"
            className="mt-10 text-center rounded-full bg-slate-900 text-white py-4 text-lg font-semibold hover:bg-gray-800 transition"
          >
            Back to Home
          </Link>
        </div>

      </div>
    </div>
  );
}