import { BrowserRouter, Routes, Route } from "react-router";

import LoginBase from "./layouts/Login";
import ManagementBase from "./layouts/Management";

import Login from "./pages/Login";
import Product from "./pages/Product";
import Category from "./pages/Category";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import AddUser from "./pages/AddUser";
import NotFound from "./pages/NotFound";
import UploadImage from "./pages/UploadImage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<LoginBase />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<ManagementBase />}>
          <Route path="/product" element={<Product />} />
          <Route path="/categories" element={<Category />} />
          <Route path="/product-add" element={<AddProduct />} />
          <Route path="/product-edit/:id" element={<EditProduct />} />
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/upload-image/:id" element={<UploadImage />} />
        </Route>

        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}