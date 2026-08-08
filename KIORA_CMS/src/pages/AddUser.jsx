import { useState } from "react";
import { useNavigate, Link } from "react-router";
import axios from "axios";
import Toastify from "toastify-js";

import baseUrl from "../constants/baseUrl";

export default function AddUser() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    username: "",
    phoneNumber: "",
    addres: "",
    password: "",
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

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const { data } = await axios.post(`${baseUrl}/add-User`, form, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      console.log(data);

      showToast(data.message || "Success create new staff");

      navigate("/product");
    } catch (error) {
      console.log(error);

      showToast(error.response?.data?.message || "Failed to create staff");
    }
  }

  return (
    <>
      <div className="mx-8 mt-6 flex items-center justify-between">
        <h1 className="text-4xl font-bold">Kiora Staff Registration</h1>
      </div>

      <div className="mx-8 py-8">
        <div className="bg-white rounded-3xl shadow-lg p-6">
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label className="font-semibold block mb-2">Email</label>

              <input
                type="email"
                value={form.email}
                onChange={(e) => handleChange(e, "email")}
                className="input input-bordered w-full"
                placeholder="Enter email"
              />
            </div>

            {/* Username */}
            <div>
              <label className="font-semibold block mb-2">Username</label>

              <input
                type="text"
                value={form.username}
                onChange={(e) => handleChange(e, "username")}
                className="input input-bordered w-full"
                placeholder="Enter username"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="font-semibold block mb-2">Phone Number</label>

              <input
                type="text"
                value={form.phoneNumber}
                onChange={(e) => handleChange(e, "phoneNumber")}
                className="input input-bordered w-full"
                placeholder="Enter phone number"
              />
            </div>

            {/* Address */}
            <div>
              <label className="font-semibold block mb-2">Address</label>

              <textarea
                value={form.addres}
                onChange={(e) => handleChange(e, "addres")}
                className="textarea textarea-bordered w-full"
                placeholder="Enter address"
              />
            </div>

            {/* Password */}
            <div>
              <label className="font-semibold block mb-2">Password</label>

              <input
                type="password"
                value={form.password}
                onChange={(e) => handleChange(e, "password")}
                className="input input-bordered w-full"
                placeholder="Enter password"
              />
            </div>

            <div className="flex gap-3 mt-8">
              <button type="submit" className="btn btn-info">
                Save
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
