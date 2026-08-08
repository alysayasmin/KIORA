import { useEffect, useState } from "react";
import axios from "axios";
import Toastify from "toastify-js";
import { Link } from "react-router";

import ProductTable from "../components/ProductTable";
import baseUrl from "../constants/baseUrl";

export default function Product() {
  const [products, setProducts] = useState([]);

  //! info
  function showToast(message) {
    Toastify({
      text: message,
      duration: 3000,
      gravity: "top",
      position: "right",
    }).showToast();
  }

  //! ambil produk
  async function fetchProducts() {
    try {
      const { data } = await axios.get(`${baseUrl}/product`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      console.log(data);

      setProducts(data.data);
    } catch (error) {
      console.log(error);
      showToast(error.response?.data?.message || "Failed to fetch products");
    }
  }

  //!delete
  async function handleDelete(id) {
    try {
      const { data } = await axios.delete(`${baseUrl}/product/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      showToast(data.message || "Product deleted successfully");

      fetchProducts();
    } catch (error) {
      console.log(error);

      showToast(error.response?.data?.message || "Failed to delete product");
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <div className="mx-8 mt-6 flex items-center justify-between">
        <h1 className="text-4xl font-bold">KIORA Product Management</h1>

        <Link
          to="/product-add"
          className="btn btn-warning text-amber-50"
        >
          + Add Product
        </Link>
      </div>

      <ProductTable
        products={products}
        handleDelete={handleDelete}
        handleUpload={handleUpload}
      />
    </>
  );
}
