import { Link } from "react-router";

export default function ProductTable({ products, handleDelete, handleUpload }) {
  return (
    <div className="mx-8 py-10">
      <div className="bg-white rounded-3xl shadow-lg p-6">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="border-b-2 border-black">
                <th>No.</th>
                <th>Picture</th>
                <th>Name</th>
                <th>Description</th>
                <th>Stock</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product, index) => {
                return (
                  <tr key={product.id} className="border-b">
                    <th>{index + 1}</th>

                    <td>
                      <div className="avatar">
                        <div className="w-32 h-24 rounded-xl">
                          <img
                            src={product.imgUrl}
                            alt={product.name}
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </td>

                    <td>{product.name}</td>

                    <td className="max-w-xs">
                      <p className="line-clamp-2">{product.description}</p>
                    </td>

                    <td>{product.stock}</td>

                    <td className="space-x-2">
                      <Link
                        to={`/product-edit/${product.id}`}
                        className="btn btn-sm btn-warning"
                      >
                        Edit
                      </Link>

                      <Link
                        to={`/upload-image/${product.id}`}
                        className="btn btn-sm btn-info text-white cursor-pointer"
                      >
                        <i className="fa-solid fa-image"></i>
                      </Link>

                      <button
                        onClick={() => handleDelete(product.id)}
                        className="btn btn-sm btn-error text-white"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
