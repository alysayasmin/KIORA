import { Link } from "react-router";

export default function Notfound404() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
      <div className="text-center">
        {/* <img src="/logo.png"></img> */}

        <h1 className="text-8xl font-bold text-slate-900">404</h1>

        <h2 className="text-3xl font-bold mt-4">Page Not Found</h2>

        <p className="text-gray-500 mt-3">
          Oops!.., look like the page you looking for not here..
        </p>

        <Link
          to="/"
          className="inline-block mt-8 bg-slate-900 text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-700 transition"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
