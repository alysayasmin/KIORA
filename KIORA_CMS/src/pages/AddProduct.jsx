import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Toastify from "toastify-js";

import baseUrl from "../constants/baseUrl";
// import Navbar from "../components/Navbar";
import Form from "../components/Form";

export default function AddProduct() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    imgUrl: "",
    categoryId: "",
  });

  function showToast(message) {
    Toastify({
      text: message,
      duration: 3000,
      gravity: "top",
      position: "right",
    }).showToast();
  }

  function handleChange(e, fieldName) {
    setForm((oldValue) => {
      return {
        ...oldValue,
        [fieldName]: e.target.value,
      };
    });
  }

  async function fetchCategories() {
    try {
      const { data } = await axios.get(`${baseUrl}/categories`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      setCategories(data.data);
    } catch (error) {
      console.log(error);

      showToast(error.response?.data?.message || "Failed to fetch categories");
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const { data } = await axios.post(`${baseUrl}/product`, form, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      showToast(data.message || "Product created successfully");

      navigate("/product");
    } catch (error) {
      console.log(error);

      showToast(error.response?.data?.message || "Failed to create product");
    }
  }

  return (
    <Form
      title="Add New Product"
      form={form}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      categories={categories}
    />
  );
}
