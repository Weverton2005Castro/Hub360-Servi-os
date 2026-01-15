import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Category from "./pages/Category";
import ItemsAdmin from "./pages/admin/items";

import Categories from "./pages/admin/Categories";
import Dashboard from "./pages/admin/Dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Público */}
        <Route path="/" element={<Home />} />
        <Route path="/categoria/:id" element={<Category />} />

        {/* Admin */}
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/items" element={<ItemsAdmin />} />
        <Route path="/admin/categories" element={<Categories />} />
      </Routes>
    </BrowserRouter>
  );
}
