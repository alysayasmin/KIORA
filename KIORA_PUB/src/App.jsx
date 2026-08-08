import { BrowserRouter, Routes, Route } from "react-router";

import BaseLayout from "./layouts/BaseLayout";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import NotFound from "./pages/NotFound";

import "toastify-js/src/toastify.css";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<BaseLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/products/:id" element={<ProductPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
