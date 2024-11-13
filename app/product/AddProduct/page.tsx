export default function page() {
  return (
    <div>
        <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg">
  <h2 className="text-2xl font-bold mb-6 text-center">Add New Product</h2>
  <form action="#" method="POST">
    <div className="mb-4">
      <label htmlFor="productName" className="block text-gray-700">
        Product Name
      </label>
      <input
        type="text"
        id="productName"
        name="productName"
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
        placeholder="Enter product name"
      />
    </div>
    <div className="mb-4">
      <label htmlFor="description" className="block text-gray-700">
        Description
      </label>
      <textarea
        id="description"
        name="description"
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
        rows={4}
        placeholder="Enter product description"
        defaultValue={""}
      />
    </div>
    <div className="mb-4">
      <label htmlFor="price" className="block text-gray-700">
        Price ($)
      </label>
      <input
        type="number"
        id="price"
        name="price"
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
        placeholder="Enter product price"
      />
    </div>
    <div className="mb-4">
      <label htmlFor="image" className="block text-gray-700">
        Upload Image
      </label>
      <input
        type="file"
        id="image"
        name="image"
        accept="image/*"
        className="mt-1 block w-full text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
      />
    </div>
    <div className="flex justify-center">
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
      >
        Add Product
      </button>
    </div>
  </form>
</div>

    </div>
  )
}
