import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import Toastify from "toastify-js";

import baseUrl from "../constants/baseUrl";
import Form from "../components/Form";

export default function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    imgUrl: "",
    categoryId: "",
  });

  const [categories, setCategories] = useState([]);

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

  async function fetchProduct() {
    try {
      const { data } = await axios.get(`${baseUrl}/product/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      console.log(data);

      setForm({
        name: data.data.name,
        description: data.data.description,
        price: data.data.price,
        stock: data.data.stock,
        imgUrl: data.data.imgUrl,
        categoryId: data.data.categoryId,
      });
    } catch (error) {
      console.log(error);

      showToast(error.response?.data?.message || "Failed to fetch product");
    }
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
    fetchProduct();
    fetchCategories();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const { data } = await axios.put(`${baseUrl}/product/${id}`, form, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      showToast(data.message || "Product updated successfully");

      navigate("/product");
    } catch (error) {
      console.log(error);

      showToast(error.response?.data?.message || "Failed to update product");
    }
  }

  return (
    <Form
      title="Edit Product"
      form={form}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      categories={categories}
    />
  );
}
