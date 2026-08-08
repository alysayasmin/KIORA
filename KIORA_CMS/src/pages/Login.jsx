import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Toastify from "toastify-js";
import BaseUrl from "../constants/baseUrl";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function showToast(message) {
    Toastify({
      text: message,
      duration: 3000,
      gravity: "top",
      position: "right",
    }).showToast();
  }

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${BaseUrl}/login`, {
        email,
        password,
      });

      console.log(data);

      localStorage.setItem("access_token", data.access_token);

      showToast("Login Success");

      navigate("/product");
    } catch (error) {
      console.log(error);

      showToast(error.response?.data?.message || "Unauthorized");
    }
  }

  return (
    <section className="grid lg:grid-cols-2 min-h-[850px]">
      {/* Left Image */}
      <div>
        <img
          src="https://images.pexels.com/photos/5805489/pexels-photo-5805489.jpeg"
          className="w-full h-full object-cover"
          alt="KIORA"
        />
      </div>

      {/* Right Form */}
      <form
        onSubmit={handleLogin}
        className="flex items-center justify-center bg-white"
      >
        <div className="w-[420px]">
          {/* Email */}
          <div className="mb-8">
            <label htmlFor="email" className="block font-semibold text-xl mb-3">
              Input your Email
            </label>

            <input
              id="email"
              type="email"
              placeholder="Staff@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div className="mb-8">
            <label
              htmlFor="password"
              className="block font-semibold text-xl mb-3"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="mt-4 w-full bg-gray-800 hover:bg-gray-600 transition text-white font-bold py-5 rounded-full text-xl"
          >
            Sign In
          </button>
        </div>
      </form>
    </section>
  );
}
