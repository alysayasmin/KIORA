import { Link } from "react-router";

export default function Form({
  title,
  form,
  handleChange,
  handleSubmit,
  categories,
}) {
  return (
    <>
      <div className="mx-8 mt-6 flex items-center justify-between">
        <h1 className="text-4xl font-bold">{title}</h1>
      </div>

      <div className="mx-8 py-8">
        <div className="bg-white rounded-3xl shadow-lg p-6">
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Product Name */}
            <div>
              <label className="font-semibold block mb-2">Product Name</label>

              <input
                type="text"
                value={form.name}
                onChange={(e) => handleChange(e, "name")}
                className="input input-bordered w-full"
                placeholder="Enter product name..."
              />
            </div>

            {/* Description */}
            <div>
              <label className="font-semibold block mb-2">Description</label>

              <textarea
                value={form.description}
                onChange={(e) => handleChange(e, "description")}
                className="textarea textarea-bordered w-full"
                rows={4}
                placeholder="Enter product description..."
              />
            </div>

            {/* Price */}
            <div>
              <label className="font-semibold block mb-2">Price</label>

              <input
                type="number"
                value={form.price}
                onChange={(e) => handleChange(e, "price")}
                className="input input-bordered w-full"
                placeholder="Enter product price..."
              />
            </div>

            {/* Stock */}
            <div>
              <label className="font-semibold block mb-2">Stock</label>

              <input
                type="number"
                value={form.stock}
                onChange={(e) => handleChange(e, "stock")}
                className="input input-bordered w-full"
                placeholder="Enter product stock..."
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="font-semibold block mb-2">Image URL</label>

              <input
                type="text"
                value={form.imgUrl}
                onChange={(e) => handleChange(e, "imgUrl")}
                className="input input-bordered w-full"
                placeholder="Enter Image URL..."
              />
            </div>

            {/* Category */}
            <div>
              <label className="font-semibold block mb-2">Category</label>

              <select
                value={form.categoryId}
                onChange={(e) => handleChange(e, "categoryId")}
                className="select select-bordered w-full"
              >
                <option value="" disabled>
                  Select Category
                </option>

                {categories.map((category) => {
                  return (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Action */}
            <div className="flex gap-3 mt-8">
              <button type="submit" className="btn btn-info">
                Save
              </button>

              <Link to="/product" className="btn btn-outline">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
