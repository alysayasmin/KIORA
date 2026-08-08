import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router";
import axios from "axios";
import Toastify from "toastify-js";

import baseUrl from "../constants/baseUrl";

export default function UploadImage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [file, setFile] = useState(null);

  function showToast(message) {
    Toastify({
      text: message,
      duration: 3000,
      gravity: "top",
      position: "right",
    }).showToast();
  }

  async function fetchProduct() {
    try {
      const { data } = await axios.get(`${baseUrl}/product/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      setProduct(data.data);
    } catch (error) {
      console.log(error);

      showToast(error.response?.data?.message || "Failed to fetch product");
    }
  }

  useEffect(() => {
    fetchProduct();
  }, []);

  async function handleUpload(e) {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("image", file);

      const { data } = await axios.patch(`${baseUrl}/product/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      showToast(data.message || "Image uploaded successfully");

      navigate("/product");
    } catch (error) {
      console.log(error);

      showToast(error.response?.data?.message || "Failed to upload image");
    }
  }

  if (!product) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <div className="mx-8 mt-6">
        <h1 className="text-4xl font-bold">Upload Product Image</h1>
      </div>

      <div className="mx-8 py-8">
        <div className="bg-white rounded-3xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-5">{product.name}</h2>

          <div className="mb-6">
            <img
              src={product.imgUrl}
              alt={product.name}
              className="w-72 h-52 object-cover rounded-xl"
            />
          </div>

          <form onSubmit={handleUpload} className="space-y-5">
            <div>
              <label className="font-semibold block mb-2">
                Select New Image
              </label>

              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="file-input file-input-bordered w-full"
              />
            </div>

            <div className="flex gap-3">
              <button type="submit" className="btn btn-info">
                Upload
              </button>

              <Link to="/product" className="btn btn-outline">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
