import { useEffect, useState } from "react";
import axios from "axios";
import Toastify from "toastify-js";

import CategoryTable from "../components/CategoryTable";
import baseUrl from "../constants/baseUrl";
import Button from "../components/Button";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState("add");
  const [categoryName, setCategoryName] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  function showToast(message) {
    Toastify({
      text: message,
      duration: 3000,
      gravity: "top",
      position: "right",
    }).showToast();
  }

  function openAddModal() {
    setMode("add");
    setCategoryName("");
    setSelectedId(null);
    setIsModalOpen(true);
  }

  function openEditModal(category) {
    setMode("edit");
    setCategoryName(category.name);
    setSelectedId(category.id);
    setIsModalOpen(true);
  }

  //!read
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

  //!add
  async function handleSubmitCategory(e) {
    e.preventDefault();

    try {
      if (mode === "add") {
        const { data } = await axios.post(
          `${baseUrl}/categories`,
          {
            name: categoryName,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.access_token}`,
            },
          },
        );

        showToast(data.message || "Category created");
      } else {
        const { data } = await axios.put(
          `${baseUrl}/categories/${selectedId}`,
          {
            name: categoryName,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.access_token}`,
            },
          },
        );

        showToast(data.message || "Category updated");
      }

      setIsModalOpen(false);

      fetchCategories();
    } catch (error) {
      console.log(error);

      showToast(error.response?.data?.message || "Failed to save category");
    }
  }

  //!deelet
  async function handleDelete(id) {
    try {
      const { data } = await axios.delete(`${baseUrl}/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      showToast(data.message || "Category deleted successfully");

      fetchCategories();
    } catch (error) {
      console.log(error);

      showToast(error.response?.data?.message || "Failed to delete category");
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      {/* Header */}
      <div className="mx-8 mt-6 flex items-center justify-between">
        <h1 className="text-4xl font-bold">KIORA Category Management</h1>

        <Button
          properti="+ Add Category"
          onClick={openAddModal}
          className="btn btn-warning text-amber-50"
        />
      </div>

      {/* Table */}
      <CategoryTable
        categories={categories}
        openEditModal={openEditModal}
        handleDelete={handleDelete}
      />

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[420px]">
            <h2 className="text-2xl font-bold mb-5">
              {mode === "add" ? "Add Category" : "Edit Category"}
            </h2>

            <form onSubmit={handleSubmitCategory}>
              <input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Category name"
                className="input input-bordered w-full"
              />

              <div className="flex gap-3 mt-6">
                <button type="submit" className="btn btn-info">
                  Save
                </button>

                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
