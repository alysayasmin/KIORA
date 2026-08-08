import { Outlet, Navigate } from "react-router";
import Navbar from "../components/Navbar";

export default function Management() {
  const accessToken = localStorage.getItem("access_token");

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
