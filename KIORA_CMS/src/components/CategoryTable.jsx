export default function CategoryTable({
  categories,
  openEditModal,
  handleDelete,
}) {
  return (
    <div className="mx-8 py-10">
      <div className="bg-white rounded-3xl shadow-lg p-6">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="border-b-2 border-black">
                <th>No.</th>
                <th>Category</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => {
                return (
                  <tr key={category.id} className="border-b">
                    <th>{index + 1}</th>
                    <td>{category.name}</td>
                    <td className="space-x-2">
                      <button
                        onClick={() => openEditModal(category)}
                        className="btn btn-sm btn-warning"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(category.id)}
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
