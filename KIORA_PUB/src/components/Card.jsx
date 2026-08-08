import { Link } from "react-router";
import { formatRupiah } from "../helper/rupiah";


export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden hover:shadow-lg transition">
      <figure>
        <img
          src={product.imgUrl}
          className="w-full h-64 object-cover"
          alt={product.name}
        />
      </figure>

      <div className="p-4">
        <h3 className="font-bold text-lg">
          {product.name}
        </h3>

        <p className="text-gray-500 text-sm line-clamp-2">
          {product.description}
        </p>

        <p className="font-bold text-2xl mt-2">
          Rp{formatRupiah(product.price)}
        </p>

        <h3 className="font-bold text-lg">
          Stock : {product.stock}
        </h3>

        <Link
          to={`/products/${product.id}`}
          className="inline-block mt-4 bg-slate-900 text-white px-5 py-2 rounded-full hover:bg-gray-700 transition"
        >
          See Detail
        </Link>
      </div>
    </div>
  );
}