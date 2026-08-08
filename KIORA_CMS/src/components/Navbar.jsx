import { NavLink, useNavigate } from "react-router";
import Button from "./Button";

export default function Navbar() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("access_token");
    navigate("/login");
  }

  return (
    <nav className="w-full bg-slate-900">
      <div className="flex items-center justify-end gap-3 px-4 py-4 sm:px-6 sm:py-5 md:gap-4 md:px-8">

        {/* product */}
        <NavLink
          to="/product"
          className="rounded-full bg-yellow-400 px-5 py-2 text-sm font-semibold text-black transition hover:bg-yellow-300 sm:px-6 sm:py-2.5 sm:text-base"
        >
          Product
        </NavLink>

        {/* categories */}
        <NavLink
          to="/categories"
          className="rounded-full bg-yellow-400 px-5 py-2 text-sm font-semibold text-black transition hover:bg-yellow-300 sm:px-6 sm:py-2.5 sm:text-base"
        >
          Category
        </NavLink>

        {/* add user */}
        <NavLink
          to="/add-user"
          className="rounded-full bg-yellow-400 px-5 py-2 text-sm font-semibold text-black transition hover:bg-yellow-300 sm:px-6 sm:py-2.5 sm:text-base"
        >
          Add User
        </NavLink>

        {/* logout */}
        <Button
          properti="Logout"
          onClick={handleLogout}
          className="rounded-2xl bg-red-300 px-5 py-2 text-sm font-semibold text-black transition hover:bg-red-400 sm:px-6 sm:py-2.5 sm:text-base"
        />
      </div>
    </nav>
  );
}
