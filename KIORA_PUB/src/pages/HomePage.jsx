import ProductCard from "../components/Card";
import { useEffect, useState } from "react";
import axios from "axios";
import Toastify from "toastify-js";
import baseUrl from "../constants/baseUrl";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [sort, setSort] = useState("");

  async function fetchCategories() {
    try {
      const { data } = await axios.get(
        `${baseUrl}/categories`,
      );

      setCategories(data.data);
    } catch (error) {
      console.log(error);
      showError(error.response?.data?.message || "Failed to fetch categorie");
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchProducts() {
    try {
      const { data } = await axios.get(
        `${baseUrl}/pub/products`,
        {
          params: {
            page: page,
            limit: 10,
            filterName: search,
            catId: categoryId,
            sort: sort,
          },
        },
      );

      setProducts(data.data.data);
      setTotalPage(data.data.totalPage);
    } catch (error) {
      console.log(error);
      showError(error.response?.data?.message || "Failed to fetch product");
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [page, search, categoryId, sort]);

  function handleSearch(e) {
    e.preventDefault();

    setSearch(searchInput);
    setPage(1);
  }

  function showError(message) {
    Toastify({
      text: message,
      duration: 3000,
      gravity: "top",
      position: "right",
    }).showToast();
  }

  function handleFilter(id) {
    setCategoryId(id);
    setPage(1);
  }

  return (
    <>
      {/* Carousel */}
      <section className="mx-10 py-6">
        <div className="carousel carousel-center items-stretch rounded-2xl space-x-6 w-full">
          {/* Slide 1 */}
          <div id="slide1" className="carousel-item relative w-full">
            <img
              src="https://images.unsplash.com/photo-1624927637280-f033784c1279?q=80&w=2074&auto=format&fit=crop"
              className="w-full h-[600px] object-cover"
              alt="Slide 1"
            />

            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 justify-between">
              <a href="#slide3" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide2" className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>

          {/* Slide 2 */}
          <div id="slide2" className="carousel-item relative w-full">
            <img
              src="https://images.unsplash.com/photo-1580307403392-4a0c05de0ecf?q=80&w=2070&auto=format&fit=crop"
              className="w-full h-[600px] object-cover"
              alt="Slide 2"
            />

            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 justify-between">
              <a href="#slide1" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide3" className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>

          {/* Slide 3 */}
          <div id="slide3" className="carousel-item relative w-full">
            <img
              src="https://images.unsplash.com/photo-1600290601761-34066aa1599d?q=80&w=2070&auto=format&fit=crop"
              className="w-full h-[600px] object-cover"
              alt="Slide 3"
            />

            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 justify-between">
              <a href="#slide2" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide1" className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Logo, Search */}
      <header className="bg-white">
        <div className="mx-auto flex items-center gap-6 px-15 py-5">
          <img src="/logo.png" alt="Logo" className="h-12" />

          <form className="flex-1" onSubmit={handleSearch}>
            <div className="flex items-center bg-gray-100 rounded-full px-6 py-3">
              <i className="fa-solid fa-magnifying-glass text-xl text-gray-700"></i>

              <input
                type="text"
                placeholder="Cari..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full bg-transparent border-none outline-none focus:outline-none focus:ring-0 focus:border-none ml-5 text-lg"
              />
            </div>
          </form>
        </div>
      </header>

      {/* Category, Srot */}
      <section className="mx-10 py-5">
        <div className="flex justify-between items-center gap-3 mb-8">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => handleFilter("")}
              className={
                categoryId === ""
                  ? "bg-black text-white px-6 py-3 rounded-full font-semibold"
                  : "bg-gray-100 text-black px-6 py-3 rounded-full font-semibold"
              }
            >
              All
            </button>

            {categories.map((category) => {
              return (
                <button
                  key={category.id}
                  onClick={() => handleFilter(category.id)}
                  className={
                    categoryId === category.id
                      ? "bg-black text-white px-6 py-3 rounded-full font-semibold"
                      : "bg-gray-100 text-black px-6 py-3 rounded-full font-semibold"
                  }
                >
                  {category.name}
                </button>
              );
            })}
          </div>

          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              setPage(1);
            }}
            className="border border-gray-300 px-5 py-3 rounded-full bg-white"
          >
            <option value="">Sort By</option>

            <option value="price">Harga Termurah</option>

            <option value="-price">Harga Termahal</option>

            <option value="name">Nama A-Z</option>

            <option value="-name">Nama Z-A</option>
          </select>
        </div>
      </section>

      {/* Product */}
      <section className="mx-10 py-2">
        <h2 className="text-3xl font-bold mb-8">
          Selalu ada produk spesial untukmu...
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
        </div>
      </section>

      {/* Pagination */}
      <section className="mx-10 mb-16">
        <div className="flex justify-center gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-5 py-2 rounded-full border hover:bg-gray-100 disabled:opacity-50"
          >
            Previous
          </button>

          {Array.from({ length: totalPage }, (_, index) => {
            const pageNumber = index + 1;

            return (
              <button
                key={pageNumber}
                onClick={() => setPage(pageNumber)}
                className={
                  page === pageNumber
                    ? "w-10 h-10 rounded-full bg-black text-white"
                    : "w-10 h-10 rounded-full border"
                }
              >
                {pageNumber}
              </button>
            );
          })}

          <button
            disabled={page === totalPage}
            onClick={() => setPage(page + 1)}
            className="px-5 py-2 rounded-full border hover:bg-gray-100 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </section>

      {/* Sub Info */}
      <div className="mx-10">
        <h4 className="text-2xl font-bold mb-1 py-5">
          KIORA - Solusi rumah nyaman, gaya, dan terjangkau untuk semua
        </h4>

        <p>
          KIORA selalu berkomitmen untuk menciptakan hidup yang lebih baik bagi
          banyak orang. Sebagai toko furnitur rumah, kami memberikan solusi
          cerdas, bergaya, namun tetap dengan harga terjangkau sehingga lebih
          banyak orang dapat membelinya.
        </p>

        <p className="py-3">
          Jelajahi koleksi dekorasi rumah kami yang menawan, mulai dari tirai
          hingga pencahayaan, serta produk musiman yang akan menyempurnakan
          ruangan Anda.
        </p>
      </div>
    </>
  );
}
